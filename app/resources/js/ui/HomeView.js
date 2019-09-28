/* eslint-env browser */

class HomeView {

    constructor() {
        //get objects of important view elements
        this.uploadButton = document.getElementById("default-wrapper");
        this.uploadSection = document.getElementById("upload-wrapper");
        this.confirmUploadButton = document.getElementById("confirm-upload");
        this.loadingCircle = document.getElementById("loading-circle");
        this.pathDisplay = document.getElementById("path-display");
        this.progressLabel = document.getElementById("progress-label");
        this.browseButton = document.getElementById("browse-btn");
        this.itemSearch = document.getElementById("itemsearch");
        this.itemSearchButton = document.getElementById("itemsearch-btn");
    }

    changePathDisplay(text) {
        this.pathDisplay.placeholder = text;
    }

    disableBrowseButton() {
        this.browseButton.disabled = true;
    }

    //functions for hiding and showing important elements
    showUploadButton(isShown){
        if(isShown) {
            this.uploadButton.classList.remove("hidden");
        } else {
            this.uploadButton.classList.add("hidden");
        }
    }

    showUploadSection(isShown){
        if(isShown) {
            this.uploadSection.classList.remove("hidden");
        } else {
            this.uploadSection.classList.add("hidden");
        }
    }

    showConfirmUploadButton(isShown){
        if(isShown) {
            this.confirmUploadButton.classList.remove("hidden");
        } else {
            this.confirmUploadButton.classList.add("hidden");
        }
    }

    showLoadingCircle(isShown){
        if(isShown) {
            this.loadingCircle.classList.remove("hidden");
            this.progressLabel.classList.remove("hidden");
        } else {
            this.loadingCircle.classList.add("hidden");
            this.progressLabel.classList.add("hidden");
        }
    }

    disableSearch(){
        this.itemSearch.disabled = true;
        this.itemSearchButton.disabled = true;
    }
}

export default HomeView;