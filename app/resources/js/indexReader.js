/* eslint-env browser */
import PDFManager from "../js/pdf/PDFManager.js";
import ReaderView from "../js/ui/ReaderView.js";
import DBManager from "../js/utility/DBManager.js";

var pdfManager = new PDFManager(),
    view = new ReaderView(),
    dbm = new DBManager();

function init() {
    console.log("app started!");

    //PDF example
    document.getElementById("btn-previous").addEventListener("click", onShowPrevious);
    document.getElementById("btn-next").addEventListener("click", onShowNext);
    document.getElementById("btn-send").addEventListener("click", onTextComment);
    pdfManager.addEventListener("pageChanged", onPageChanged);
    pdfManager.renderPDF(document.getElementById("pdf-path").innerText);
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

function onPageChanged(event){
    view.updatePageDisplay(event.data);
}

init();