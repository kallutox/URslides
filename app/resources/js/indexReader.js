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
    var pdfPath = document.getElementById("pdf-path").innerText,
        pdfName = document.getElementById("pdf-name").innerText;

    //PDF example
    document.getElementById("btn-previous").addEventListener("click", onShowPrevious);
    document.getElementById("btn-next").addEventListener("click", onShowNext);
    document.getElementById("btn-send").addEventListener("click", onTextComment);
    document.getElementById("publish-btn").addEventListener("click", onPublish);

    pdfManager.addEventListener("pageChanged", onPageChanged);
    pdfManager.renderPDF(pdfPath);
    
    currentSlides = new Slide(pdfName, pdfPath, [], 0);
    currentSlides.addEventListener("commentsChanged", onCommentsChanged);
}

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

init();