/* eslint-env browser */
import PDFManager from "../js/data/PDFManager.js";
import ReaderView from "../js/ui/ReaderView.js";
import Slide from "../js/data/Slide.js";
import Connection from "../js/utility/Connection.js";

var pdfManager = new PDFManager(),
    view = new ReaderView(),
    conn = new Connection(),
    currentSlides,
    audioUpload,
    videoUpload,
    audioPlayBtns = [],
    audioPosSliders = [],
    audioVolSliders = [],
    audios = [];

function init() {
    var pdfPath = document.getElementById("pdf-path").innerText.trim(),
        pdfName = document.getElementById("pdf-name").innerText.trim(),
        pdfComments = document.getElementById("pdf-comments").innerText,
        pdfEdit = document.getElementById("pdf-edit").innerText.trim(),
        pdfIDCount = document.getElementById("pdf-idcount").innerText.trim();

    //not good, place elsewhere
    audioUpload = document.getElementById("audio-upload");
    audioUpload.addEventListener("input", onNewAudioSelected);
    view.addEventListener("newAudio", onNewAudio);

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
    view.updateComments(pdfManager.currentPage, event.data);
}

function onAudioComment() {
    view.showAudioButton(false);
    view.showAudioSection(true);
}

function onAudioUpload() {
    let comment = view.commentInput;

    view.updateSlideString(currentSlides);
    audioUpload.click();
    currentSlides.addComment(pdfManager.currentPage, "audio", comment);
}

function onNewAudioSelected() {
    document.getElementById("audio-confirm-btn").click();
}

function onNewAudio(event) {
    //assign all audio arrays anew
    var index = audioPlayBtns.length;

    audioPlayBtns.push(document.getElementsByClassName("play-pause-btn")[index]);
    audioPosSliders = document.getElementsByClassName("audio-pos");
    audioVolSliders = document.getElementsByClassName("audio-vol");
    audios.push(new Audio(event.data));

    //add all listeners to new elements
    audioPlayBtns[index].addEventListener("click", onPlayPause.bind(this, index));
    audioPosSliders[index].addEventListener("input", onPosInput.bind(this, index));
    audioVolSliders[index].addEventListener("input", onVolInput.bind(this, index));
    audios[index].addEventListener("ended", onAudioEnd.bind(this, index));
    audios[index].addEventListener("timeupdate", onAudioTimeChanged.bind(this, index));
}

function onOpenRecordAudio() {
    view.showRecordAudioMenu(true);
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
    view.updateNameDisplay(pdfName);
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
        view.deleteEditSign();
    }
}

init();
