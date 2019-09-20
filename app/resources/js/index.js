/* eslint-env browser */
import HomeView from "../js/ui/HomeView.js";

var view = new HomeView(),
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
    view.showUploadButton(false);
    view.showUploadSection(true);
}

function onClickBrowseButton() {
    fileUpload.click();
}

function onFileSelection() {
    let path = fileUpload.value;
    if(path) {
        view.changePathDisplay(path);
    }
}

function onConfirmUpload() {
    view.showProgressBar(true);
    view.showConfirmUploadButton(false);
    view.disableBrowseButton();
}

init();
