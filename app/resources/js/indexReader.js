/* eslint-env browser */
import PDFManager from "../js/data/PDFManager.js";
import ReaderView from "../js/ui/ReaderView.js";
import Slide from "../js/data/Slide.js";
import Connection from "../js/utility/Connection.js";
import AudioRecorder from "../js/data/AudioRecorder.js";

var view = new ReaderView(),
    pdfManager = new PDFManager(view.readerDimensions),
    conn = new Connection(),
    pdfEdit,
    audioRecorder,
    currentSlides,
    audioUpload,
    startRecording,
    stopRecording,
    videoUpload,
    audioPlayBtns = [],
    audioPosSliders = [],
    audioVolSliders = [],
    audios = [];

function init() {
    var pdfPath = document.getElementById("pdf-path").innerText.trim(),
        pdfName = document.getElementById("pdf-name").innerText.trim(),
        pdfComments = document.getElementById("pdf-comments").innerText,
        pdfIDCount = document.getElementById("pdf-idcount").innerText.trim();
    pdfEdit = document.getElementById("pdf-edit").innerText.trim();

    //not good, place elsewhere
    audioUpload = document.getElementById("audio-upload");
    startRecording = document.getElementById("record");
    stopRecording = document.getElementById("stop-record");
    startRecording.addEventListener("click", onStartRecording);
    stopRecording.addEventListener("click", onStopRecording);
    audioUpload.addEventListener("input", onNewAudioSelected);

    view.addEventListener("newTextComment", onNewTextComment);
    view.addEventListener("newAudioComment", onNewAudioComment);

    initButtons();
    intiPDF(pdfPath);
    initSlides(pdfName, pdfPath, pdfComments, pdfIDCount);
    adjustUI(pdfEdit);
}

//event handler
function onShowPrevious() {
    pdfManager.previousPage();
}

function onShowNext() {
    pdfManager.nextPage();
}

function onTextComment() {
    let comment = view.commentInput;
    currentSlides.addComment(pdfManager.currentPage, "text", comment);
}

function onPageChanged(event) {
    //clear audio arrays, so that index does not count on to infinity
    audioPlayBtns = [];
    audioPosSliders = [];
    audioVolSliders = [];
    audios = [];

    view.updatePageDisplay(event.data);
    view.updateComments(event.data.currentPage, currentSlides.comments);
}

function onCommentsChanged(event) {
    view.updateComments(pdfManager.currentPage, event.data, pdfEdit);
}

function onNewTextComment(event) {
    //register listener which then calls the respective function and hands it the id of the comment by binding it to the callback
    document.getElementsByClassName("comment-edit-btn")[event.data].addEventListener("click", onCommentEdit.bind(this, event.data));
    document.getElementsByClassName("comment-delete-btn")[event.data].addEventListener("click", onCommentDelete.bind(this, event.data));
    document.getElementsByClassName("comment-content")[event.data].addEventListener("input", onCommentEdited.bind(this, event.data));
}

function onNewAudioComment(event) {
    document.getElementsByClassName("comment-delete-btn")[event.data].addEventListener("click", onCommentDelete.bind(this, event.data));
}

function onCommentEdit(id) {
    document.getElementsByClassName("comment-content")[id].contentEditable = true;
}

function onCommentEdited(id) {
    currentSlides.changeComment(id, document.getElementsByClassName("comment-content")[id].innerText);
}

function onCommentDelete(id) {
    var confirm = window.confirm("Do you really want to delete this comment?")
    if(confirm == true) {
        currentSlides.removeComment(id);
    }
}

function onAudioComment() {
    view.showAudioButton(false);
    view.showAudioSection(true);
}

function onAudioUpload() {
    audioUpload.click();
}

function onNewAudioSelected() {
    var audioForm = document.getElementById("audio-form");

    audioForm.onsubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData(audioForm);

        formData.append("slide", currentSlides.generateJSONStringPage(pdfManager.currentPage));

        let response = await fetch("/audioupload", {
            method: 'POST',
            body: formData,
        });

        response.json().then(function (data) {
            console.log(data.comments);
            currentSlides = new Slide(currentSlides.name, currentSlides.pdf, [], currentSlides.idCount + 1);
            currentSlides.addEventListener("commentsChanged", onCommentsChanged);
            data.comments.forEach(comment => {
                currentSlides.addComment(comment._page, comment._type, comment._content);
            });
        });
    };

    document.getElementById("audio-confirm-btn").click();
}

function onOpenRecordAudio() {
    view.showRecordAudioMenu(true);

    if(audioRecorder === undefined) {
        console.log("here");
        audioRecorder = new AudioRecorder;
        audioRecorder.addEventListener("newAudioAvailable", onNewAudioAvailable);
        audioRecorder.addEventListener("recordingStarted", onRecordingStarted);
    }
}

function onStartRecording() {
    audioRecorder.startRecording();
}

function onRecordingStarted() {
    //disable recording button, so that user can't start a new record while there is already one running
    view.enableRecordButton(false);
    view.enableStopRecordButton(true);
}

function onStopRecording() {
    audioRecorder.stopRecording();
}

function onNewAudioAvailable(event) {
    var audioForm = document.getElementById("record-form");

    audioForm.onsubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData(audioForm);

        formData.append("audio-upload", event.data, currentSlides.name + (currentSlides.idCount + 1)+ "01.mp3");
        formData.append("slide", currentSlides.generateJSONStringPage(pdfManager.currentPage));

        let response = await fetch("/audioupload", {
            method: 'POST',
            body: formData,
        });

        response.json().then(function (data) {
            console.log(data.comments);
            currentSlides = new Slide(currentSlides.name, currentSlides.pdf, [], currentSlides.idCount + 1);
            currentSlides.addEventListener("commentsChanged", onCommentsChanged);
            data.comments.forEach(comment => {
                currentSlides.addComment(comment._page, comment._type, comment._content);
            });
        });
    };

    //reenable recording button, because process of pushing the current one is now done
    view.enableRecordButton(true);
    view.enableStopRecordButton(false);

    document.getElementById("record-confirm-btn").click();
}

function onCloseRecordAudio() {
    view.showRecordAudioMenu(false);
}

function onVideoComment() {
    view.showVideoButton(false);
    view.showVideoSection(true);
}

function onVideoUpload() {
    let comment = view.commentInput;

    videoUpload.click();
    currentSlides.addComment(pdfManager.currentPage, "video", comment);
}

function onVideoRecord() {
    //TO DO
}

function onPublish() {
    currentSlides.name = view.slidesNameContent;
    conn.post(currentSlides.generateJSONString());
}

//event handler for audio player
function onPlayPause(i) {
    if (audios[i].paused) {
        audios[i].play();
        audioPlayBtns[i].src = "img/pause_glyph.png";
    } else {
        audios[i].pause();
        audioPlayBtns[i].src = "img/play_glyph.png";
    }
}

function onPosInput(i) {
    audios[i].currentTime = audioPosSliders[i].value / 100 * audios[i].duration;
}

function onVolInput(i) {
    audios[i].volume = audioVolSliders[i].value / 100;
}

function onAudioEnd(i) {
    audioPlayBtns[i].src = "img/play_glyph.png";
    audioPosSliders[i].value = 0;
}

function onAudioTimeChanged(i) {
    audioPosSliders[i].value = audios[i].currentTime / audios[i].duration * 100;
}

//init functions
function initButtons() {
    //init all Buttons needed in the index module and also all listeners
    document.getElementById("btn-previous").addEventListener("click", onShowPrevious);
    document.getElementById("btn-next").addEventListener("click", onShowNext);
    document.getElementById("btn-send").addEventListener("click", onTextComment);
    document.getElementById("publish-btn").addEventListener("click", onPublish);
    document.getElementById("audio-btn").addEventListener("click", onAudioComment);
    document.getElementById("video-btn").addEventListener("click", onVideoComment);
    document.getElementById("audio-upload-btn").addEventListener("click", onAudioUpload);
    document.getElementById("audio-record-btn").addEventListener("click", onOpenRecordAudio);
    document.getElementById("close-recording-section").addEventListener("click", onCloseRecordAudio)
    document.getElementById("video-upload-btn").addEventListener("click", onVideoUpload);
    document.getElementById("video-record-btn").addEventListener("click", onVideoRecord);
}

function intiPDF(pdfPath) {
    pdfManager.addEventListener("pageChanged", onPageChanged);
    pdfManager.renderPDF(pdfPath);
}

function initSlides(pdfName, pdfPath, pdfComments, pdfIDCount) {
    var comments = [],
        idCount = 0;

    //test if there are comments given
    if (pdfComments.trim() !== "") {
        comments = JSON.parse(pdfComments).comments;
    }

    //test if an idCount is already given
    if (pdfIDCount !== "") {
        idCount = pdfIDCount;
    }

    //init the current slide
    currentSlides = new Slide(pdfName, pdfPath, [], idCount);
    comments.forEach(comment => {
        // eslint-disable-next-line no-underscore-dangle
        currentSlides.addComment(comment._page, comment._type, comment._content);
    });
    currentSlides.addEventListener("commentsChanged", onCommentsChanged);

    console.log(currentSlides);
    //cut off pdf file ending
    if(pdfName.substring(pdfName.length - 4, pdfName.length) === ".pdf") {
        view.slidesNameContent = pdfName.substring(0, pdfName.length - 4);
    } else {
        view.slidesNameContent = pdfName;
    }
}

function adjustUI(edit) {
    if (edit !== "true") {
        view.showPublishButton(false);
        view.showCommentInputArea(false);
        view.showBackButton(true);
        view.showVideoButton(false);
        view.showAudioButton(false);
        view.showVideoSection(false);
        view.showAudioSection(false);
        view.editSlidesName(false);
    } else {
        view.showEditSymbol(true);
    }
}

init();
