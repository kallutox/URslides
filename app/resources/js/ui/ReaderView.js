/* eslint-env browser */

class ReaderView {

    constructor() {
        this.commentWrapper = document.getElementById("comments-wrapper");
        this.commentTextArea = document.getElementById("comment-input");
        this.heightCorrectionEl = document.getElementById("comment-height-correction");
        this.pageDisplay = document.getElementById("page-num");
    }

    updatePageDisplay(pageValue) {
        this.pageDisplay.innerText = pageValue;
    }

    addTextComment() {
        var newEl = document.createElement("p"),
            comment = this.commentInput,
            cNode = document.createTextNode(comment);
        if(comment !== "") {
            newEl.appendChild(cNode);
            newEl.classList.add("text-comment");
            this.commentWrapper.insertBefore(newEl, this.heightCorrectionEl);
            this.commentTextArea.value = "";
       }
    }

    addAudioComment() {
        //TODO
    }

    addVideoComment() {
        //TODO
    }

    get commentInput() {
        return this.commentTextArea.value;
    }

}

export default ReaderView;