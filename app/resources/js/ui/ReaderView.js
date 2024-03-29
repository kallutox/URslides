/* eslint-env browser */
import Observable, { Event } from "../utility/Observable.js";

class ReaderView extends Observable {

    constructor() {
        super();

        this.backButton = document.getElementById("back-btn");
        this.publishButton = document.getElementById("publish-btn");
        this.commentWrapper = document.getElementById("comments-wrapper");
        this.commentInputArea = document.getElementById("input-area");
        this.commentTextArea = document.getElementById("comment-input");
        this.heightCorrectionEl = document.getElementById("comment-height-correction");
        this.pageDisplay = document.getElementById("page-num");
        this.editSymbol = document.getElementById("edit-symbol");

        this.videoButton = document.getElementById("video-btn");
        this.audioButton = document.getElementById("audio-btn");
        this.videoSection = document.getElementById("video-section");
        this.audioSection = document.getElementById("audio-section");
        this.recordAudioItems = document.getElementById("recording-items-wrapper");
        this.recordAudioMenu = document.getElementById("recording-section");
        this.recordButton = document.getElementById("record");
        this.stopRecordButton = document.getElementById("stop-record");

        this.slidesName = document.getElementById("slides-name");
        this.slidesString = document.getElementById("slide-string");
        this.audioExample = document.getElementsByClassName("audio-example")[0];
    }

    updateNameDisplay(name) {
        this.slidesName.innerText = name;
    }

    updatePageDisplay(pageValues) {
        this.pageDisplay.innerText = pageValues.currentPage + "/" + pageValues.totalPages;
    }

    addTextComment() {
        var newEl = document.createElement("p"),
            comment = this.commentInput,
            cNode = document.createTextNode(comment);
        if (comment !== "") {
            newEl.appendChild(cNode);
            newEl.classList.add("text-comment");
            this.commentWrapper.insertBefore(newEl, this.heightCorrectionEl);
            this.commentTextArea.value = "";
        }
    }

    updateComments(page, comments, edit) {
        clearComments(this.commentWrapper, this.heightCorrectionEl);
        comments.forEach(comment => {
            switch (comment.type) {
                case "text": {
                    //here the html for text comments is generated and added to the reader.ejs
                    let wrapper = document.createElement("div"),
                        editButton = document.createElement("button"),
                        deleteButton = document.createElement("button"),
                        toolbar = document.createElement("div"),
                        content = document.createElement("div"),
                        cNode = document.createTextNode(comment.content);

                    editButton.innerText = "🖉";
                    editButton.classList.add("comment-edit-btn");
                    deleteButton.innerText = "🗑";
                    deleteButton.classList.add("comment-delete-btn");

                    toolbar.appendChild(deleteButton);
                    toolbar.appendChild(editButton);
                    toolbar.classList.add("toolbar");

                    content.appendChild(cNode);
                    content.classList.add("comment-content");

                    //only append if application is in edit mode
                    if (edit) {
                        wrapper.appendChild(toolbar);
                    }

                    wrapper.appendChild(content);
                    wrapper.classList.add("text-comment");
                    //test if comment was deleted
                    if (comment.content === "" || comment.page !== page) {
                        wrapper.classList.add("hidden");
                    }

                    this.commentWrapper.insertBefore(wrapper, this.heightCorrectionEl);

                    //listeneres for toolbar don't need to be registered when not editing
                    if (edit) {
                        this.notifyAll(new Event("newTextComment", comment.id));
                    }

                    break;
                }

                //here the html for audio comments is generated and added to the reader.ejs
                case "audio": {
                    let wrapper = document.createElement("div"),
                        editButton = document.createElement("button"),
                        deleteButton = document.createElement("button"),
                        toolbar = document.createElement("div"),
                        audio = document.createElement("audio");

                    //edit settings for audio node
                    audio.controls = true;
                    audio.src = comment.content;
                    audio.classList.add("comment-content");

                    //edit button also needed, for correct calculation of the button indices
                    editButton.classList.add("comment-edit-btn");
                    editButton.classList.add("hidden");
                    deleteButton.innerText = "🗑";
                    deleteButton.classList.add("comment-delete-btn");

                    toolbar.appendChild(deleteButton);
                    toolbar.appendChild(editButton);
                    toolbar.classList.add("toolbar");

                    //only append if application is in edit mode
                    if (edit) {
                        wrapper.appendChild(toolbar);
                    }

                    wrapper.appendChild(audio);
                    wrapper.classList.add("audio-comment");
                    //test if comment was deleted
                    if (comment.content === "" || comment.page !== page) {
                        wrapper.classList.add("hidden");
                    }

                    this.commentWrapper.insertBefore(wrapper, this.heightCorrectionEl);

                    //listeneres for toolbar don't need to be registered when not editing
                    if (edit) {
                        this.notifyAll(new Event("newAudioComment", comment.id));
                    }

                    break;
                }

                case "video": {
                    //add code that is used to generate the video comments
                    break;
                }

                default: {
                    console.log("Requested comment " + comment.type + " type is not available!");
                    break;
                }
            }
        });
    }

    showCommentInputArea(isShown) {
        if (isShown) {
            this.commentInputArea.classList.remove("hidden");
        } else {
            this.commentInputArea.classList.add("hidden");
        }
    }

    showPublishButton(isShown) {
        if (isShown) {
            this.publishButton.classList.remove("hidden");
        } else {
            this.publishButton.classList.add("hidden");
        }
    }

    showBackButton(isShown) {
        if (isShown) {
            this.backButton.classList.remove("hidden");
        } else {
            this.backButton.classList.add("hidden");
        }
    }

    showAudioButton(isShown) {
        if (isShown) {
            this.audioButton.classList.remove("hidden");
        } else {
            this.audioButton.classList.add("hidden");
        }
    }

    showVideoButton(isShown) {
        if (isShown) {
            this.videoButton.classList.remove("hidden");
        } else {
            this.videoButton.classList.add("hidden");
        }
    }

    showAudioSection(isShown) {
        if (isShown) {
            this.audioSection.classList.remove("hidden");
        } else {
            this.audioSection.classList.add("hidden");
        }
    }

    showVideoSection(isShown) {
        if (isShown) {
            this.videoSection.classList.remove("hidden");
        } else {
            this.videoSection.classList.add("hidden");
        }
    }

    showRecordAudioMenu(isShown) {
        if (isShown) {
            this.recordAudioItems.classList.remove("hidden");
            this.recordAudioMenu.classList.add("show-record");
        } else {
            this.recordAudioItems.classList.add("hidden");
            this.recordAudioMenu.classList.remove("show-record");
        }
    }

    showEditSymbol(isShown) {
        if (isShown) {
            this.editSymbol.classList.remove("hidden");
        } else {
            this.editSymbol.classList.add("hidden");
        }
    }

    enableRecordButton(isEnabled) {
        if (isEnabled) {
            this.recordButton.disabled = false;
        } else {
            this.recordButton.disabled = true;
        }
    }

    enableStopRecordButton(isEnabled) {
        if (isEnabled) {
            this.stopRecordButton.disabled = false;
        } else {
            this.stopRecordButton.disabled = true;
        }
    }

    editSlidesName(editable) {
        if (editable) {
            this.slidesName.contentEditable = "true";
        } else {
            this.slidesName.contentEditable = "false";
        }
    }

    get slidesNameContent() {
        return this.slidesName.innerText;
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
