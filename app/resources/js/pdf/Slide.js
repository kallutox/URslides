/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import Comment from "../pdf/Comment.js";
import Observable, { Event } from "../utility/Observable.js";

class Slide extends Observable{

    constructor(name, pdf, comments, idCount) {
        super();
        this._name = name;
        this._comments = comments;
        this.pdf = pdf;
        this.idCount = idCount;

        this.notifyAll(new Event("commentsChanged", this.comments));
    }

    addComment(page, comment) {
        if(comment !== "") {
            this._comments.push(new Comment(this.idCount, page, comment));
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
