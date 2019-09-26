/* eslint-env browser */
import PDFManager from "../js/pdf/PDFManager.js";
import ReaderView from "../js/ui/ReaderView.js";
import Slide from "../js/pdf/Slide.js";
import Connection from "../js/utility/Connection.js";

var pdfManager = new PDFManager(),
    view = new ReaderView(),
    conn = new Connection(),
    currentSlides,
    audioUpload,
    videoUpload;

function init() {
    var pdfPath = document.getElementById("pdf-path").innerText.trim(),
        pdfName = document.getElementById("pdf-name").innerText.trim(),
        pdfComments = document.getElementById("pdf-comments").innerText,
        pdfEdit = document.getElementById("pdf-edit").innerText.trim();
    
    //not good, place elsewhere
    audioUpload = document.getElementById("audio-upload");

    initButtons();
    intiPDF(pdfPath);
    initSlides(pdfName, pdfPath, pdfComments);
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
    view.updatePageDisplay(event.data);
    view.updateComments(event.data.currentPage, currentSlides.comments);
}

function onCommentsChanged(event) {
    console.log("comment!");
    view.updateComments(pdfManager.currentPage, event.data);
}

function onAudioComment() {
    view.showAudioButton(false);
    view.showAudioSection(true);
}

function onVideoComment() {
    view.showVideoButton(false);
    view.showVideoSection(true);
}

function onAudioUpload() {
    let comment = view.commentInput;

    view.updateSlideString(currentSlides);
    audioUpload.click();
    currentSlides.addComment(pdfManager.currentPage, "audio", comment);
}

function onAudioRecord() {
  //TO DO
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

//init functions
function initButtons() {
    document.getElementById("btn-previous").addEventListener("click", onShowPrevious);
    document.getElementById("btn-next").addEventListener("click", onShowNext);
    document.getElementById("btn-send").addEventListener("click", onTextComment);
    document.getElementById("publish-btn").addEventListener("click", onPublish);

    document.getElementById("audio-btn").addEventListener("click", onAudioComment);
    document.getElementById("video-btn").addEventListener("click", onVideoComment);
    document.getElementById("audio-upload-btn").addEventListener("click", onAudioUpload);
    document.getElementById("audio-record-btn").addEventListener("click", onAudioRecord);
    document.getElementById("video-upload-btn").addEventListener("click", onVideoUpload);
    document.getElementById("video-record-btn").addEventListener("click", onVideoRecord);
}

function intiPDF(pdfPath){
    pdfManager.addEventListener("pageChanged", onPageChanged);
    pdfManager.renderPDF(pdfPath);
}

function initSlides(pdfName, pdfPath, pdfComments) {
    let comments = [];

    if(pdfComments.trim() !== ""){
     comments = JSON.parse(pdfComments).comments;
    }

    //init the current slide
    currentSlides = new Slide(pdfName, pdfPath, []);
    comments.forEach(comment => {
        // eslint-disable-next-line no-underscore-dangle
        currentSlides.addComment(comment._page, comment._type, comment._content);
    });
    currentSlides.addEventListener("commentsChanged", onCommentsChanged);

    console.log(currentSlides);
    view.updateNameDisplay(pdfName);
}

function adjustUI(edit) {
    if(edit !== "true") {
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
