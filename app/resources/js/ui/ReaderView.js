/* eslint-env browser */

class ReaderView {

    constructor() {
        this.commentWrapper = document.getElementById("comments-wrapper");
        this.commentTextArea = document.getElementById("comment-input");
        this.heightCorrectionEl = document.getElementById("comment-height-correction");
        this.pageDisplay = document.getElementById("page-num");
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

    addAudioComment() {
        //TODO
    }

    addVideoComment() {
        //TODO
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