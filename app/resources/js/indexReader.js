/* eslint-env browser */
import PDFManager from "../js/utility/PDFManager.js";

var pdfManager = new PDFManager();

function init() {
    console.log("app started!");

    //PDF example
    document.getElementById("btn-previous").addEventListener("click", onShowPrevious);
    document.getElementById("btn-next").addEventListener("click", onShowNext);
    pdfManager.loadPDFbyID();
}

function onShowPrevious(){
    pdfManager.previousPage();
}

function onShowNext(){
    pdfManager.nextPage();
}

init();