/* eslint-env browser */

class ReaderView {

    constructor() {
        this.backButton = document.getElementById("back-btn");
        this.slidesName = document.getElementById("slides-name");
        this.publishButton = document.getElementById("publish-btn");
        this.commentWrapper = document.getElementById("comments-wrapper");
        this.commentInputArea = document.getElementById("input-area");
        this.commentTextArea = document.getElementById("comment-input");
        this.heightCorrectionEl = document.getElementById("comment-height-correction");
        this.pageDisplay = document.getElementById("page-num");

        this.videoButton = document.getElementById("video-btn");
        this.audioButton = document.getElementById("audio-btn");
        this.videoSection = document.getElementById("video-section");
        this.audioSection = document.getElementById("audio-section");

        this.slidesName = document.getElementById("slides-name");
    }

    updateNameDisplay(name) {
        this.slidesName.innerText = name + "  🖉";
    }

    updatePageDisplay(pageValues) {
        this.pageDisplay.innerText = pageValues.currentPage + "/" + pageValues.totalPages;
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

    updateComments(page, comments) {
        clearComments(this.commentWrapper, this.heightCorrectionEl);
        comments.forEach(comment => {
            if(comment.page === page) {
                let newEl = document.createElement("p"),
                    cNode = document.createTextNode(comment.content);

                newEl.appendChild(cNode);
                newEl.classList.add("text-comment");
                this.commentWrapper.insertBefore(newEl, this.heightCorrectionEl);
            }
        });
    }

    uploadAudioComment() {
        //TODO
    }

    recordAudioComment() {
        //TODO
    }
    uploadVideoComment() {
        //TODO
    }

    recordVideoComment() {
        //TODO
    }

    showCommentInputArea(isShown){
        if(isShown) {
            this.commentInputArea.classList.remove("hidden");
        } else {
            this.commentInputArea.classList.add("hidden");
        }
    }

    showPublishButton(isShown){
        if(isShown) {
            this.publishButton.classList.remove("hidden");
        } else {
            this.publishButton.classList.add("hidden");
        }
    }

    showBackButton(isShown){
        if(isShown) {
            this.backButton.classList.remove("hidden");
        } else {
            this.backButton.classList.add("hidden");
        }
    }

    showAudioButton(isShown){
      if(isShown){
        this.audioButton.classList.remove("hidden");
      } else {
        this.audioButton.classList.add("hidden");
      }
    }

    showVideoButton(isShown){
      if(isShown){
        this.videoButton.classList.remove("hidden");
      } else {
        this.videoButton.classList.add("hidden");
      }
    }

    showAudioSection(isShown){
      if(isShown){
        this.audioSection.classList.remove("hidden");
      } else {
        this.audioSection.classList.add("hidden");
      }
    }

    showVideoSection(isShown){
      if(isShown){
        this.videoSection.classList.remove("hidden");
      } else {
        this.videoSection.classList.add("hidden");
      }
    }

    editSlidesName(editable){
      if(editable){
        this.slidesName.contentEditable = "true";
      } else {
        this.slidesName.contentEditable = "false";
      }
    }

    get commentInput() {
        let value = this.commentTextArea.value;

        this.commentTextArea.value = "";
        return value;
    }

}

function clearComments(wrapper, correction) {
    wrapper.innerText = "";
    wrapper.appendChild(correction);
}

export default ReaderView;
