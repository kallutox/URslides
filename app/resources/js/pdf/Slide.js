/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import TextComment from "../pdf/TextComment.js";
import VideoComment from "../pdf/VideoComment.js";
import AudioComment from "../pdf/AudioComment.js";
import Observable, { Event } from "../utility/Observable.js";

class Slide extends Observable{

    constructor(name, pdf, comments) {
        super();
        this._name = name;
        this._comments = comments;
        this.pdf = pdf;
        this.idCount = 0;

        this.notifyAll(new Event("commentsChanged", this.comments));
    }

    addComment(page, type, comment) {
        if(comment !== "") {
            if(type === "text") {
                this._comments.push(new TextComment(this.idCount, page, comment));
            }
            if(type === "video") {
                this._comments.push(new VideoComment(this.idCount, page, comment));
            }
            if(type === "audio") {
                this._comments.push(new AudioComment(this.idCount, page, comment));
            }
            this.idCount++;
        }
        this.notifyAll(new Event("commentsChanged", this.comments));
    }

    removeComment(id) {
        for(let i = 0; i < this._comments.length; i++) {
            if(this._comments[i].id === id) {
                this._comments.splice(i);
            }
        }
        this.notifyAll(new Event("commentsChanged", this.comments));
    }

    generateJSONString(name) {
        let literal = {
            name: name,
            pdfPath: this.pdf,
            comments: [
            ],
        };

        this._comments.forEach(comment => {
            literal.comments.push({
                id: comment.id,
                page: comment.page,
                content: comment.content,
            });
        });

        return JSON.stringify(literal);
    }

    /**
     * @param {string} name
     */
    set name(name) {
        this._name = name;
    }

    get comments(){
        return this._comments;
    }
}

export default Slide;
