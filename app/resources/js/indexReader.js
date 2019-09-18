/* eslint-env browser */
import PDFManager from "../js/pdf/PDFManager.js";
import ReaderView from "../js/ui/ReaderView.js";
import Slide from "../js/pdf/Slide.js";
import Connection from "../js/utility/Connection.js";

var pdfManager = new PDFManager(),
    view = new ReaderView(),
    conn = new Connection(),
    currentSlides;

function init() {
    var pdfPath = document.getElementById("pdf-path").innerText.trim(),
        pdfName = document.getElementById("pdf-name").innerText.trim(),
        pdfComments = document.getElementById("pdf-comments").innerText,
        pdfEdit = document.getElementById("pdf-edit").innerText.trim();
    
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
    view.updateComments(pdfManager.currentPage, event.data);
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
}

function intiPDF(pdfPath){
    pdfManager.addEventListener("pageChanged", onPageChanged);
    pdfManager.renderPDF(pdfPath);
}

function initSlides(pdfName, pdfPath, pdfComments) {
    let comments = JSON.parse(pdfComments).comments;

    currentSlides = new Slide(pdfName, pdfPath, comments);
    currentSlides.addEventListener("commentsChanged", onCommentsChanged);
}

function adjustUI(edit) {
    if(edit !== "true") {
        view.showPublishButton(false);
        view.showCommentInputArea(false);
        view.showBackButton(true);
    }
}

init();