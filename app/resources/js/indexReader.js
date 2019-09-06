/* eslint-env browser */
import PDFManager from "../js/utility/PDFManager.js";
import ReaderView from "../js/ui/ReaderView.js";

var pdfManager = new PDFManager(),
    view = new ReaderView();

function init() {
    console.log("app started!");

    //PDF example
    document.getElementById("btn-previous").addEventListener("click", onShowPrevious);
    document.getElementById("btn-next").addEventListener("click", onShowNext);
    document.getElementById("btn-send").addEventListener("click", onTextComment);
    pdfManager.loadPDFbyID();
}

function onShowPrevious(){
    pdfManager.previousPage();
}

function onShowNext(){
    pdfManager.nextPage();
}

function onTextComment() {
    view.addTextComment();
}

init();