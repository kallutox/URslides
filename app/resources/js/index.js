/* eslint-env browser */
import HomeView from "../js/ui/HomeView.js";

var hv = new HomeView(),
    fileUpload;

function init() {
    console.log("app started!");

    document.getElementById("upload-btn").addEventListener("click", onClickUploadButton);
    document.getElementById("browse-btn").addEventListener("click", onClickBrowseButton);
    document.getElementById("confirm-upload").addEventListener("click", onConfirmUpload);
    fileUpload = document.getElementById("file-upload");
    fileUpload.addEventListener("change", onFileSelection);
}

function onClickUploadButton() {
    fileUpload.click();
    hv.showUploadButton(false);
    hv.showUploadSection(true);
}

function onClickBrowseButton() {
    fileUpload.click();
}

function onFileSelection() {
    let path = fileUpload.value;
    if(path) {
        hv.changePathDisplay(path);
    }
}

function onConfirmUpload() {
    hv.showProgressBar(true);
    hv.showConfirmUploadButton(false);
    hv.disableBrowseButton();
}

init();