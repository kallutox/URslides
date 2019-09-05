/* eslint-env browser */
import PDFManager from "../js/utility/PDFManager.js";

var pdfManager = new PDFManager();

function init() {
    console.log("app started!");

    //PDF example
    document.getElementById("btn-previous").addEventListener("click", onShowPrevious);
    pdfManager.loadPDFbyID();
    pdfManager.render(2);
}

function onShowPrevious(){
    pdfManager.render(pdfManager.previousPage);
}

init();