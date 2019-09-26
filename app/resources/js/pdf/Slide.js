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
        this._pdf = pdf;
        this._idCount = 0;

        this.notifyAll(new Event("commentsChanged", this.comments));
    }

    //calling this function will add a comment to the array of the slide. It is also the only way to parse available comment type information and generate
    //the comment from the right class, this is why this function needs to be called, when receiving slides, that already have comments 
    addComment(page, type, comment) {
        if(comment !== "") {
            if(type === "text") {
                this._comments.push(new TextComment(this._idCount, page, comment));
            }
            if(type === "video") {
                this._comments.push(new VideoComment(this._idCount, page, comment));
            }
            if(type === "audio") {
                this._comments.push(new AudioComment(this._idCount, page, comment));
            }
            this._idCount++;
        }
        this.notifyAll(new Event("commentsChanged", this.comments));
    }

    //by using this function with a id parameter, you can delete a comment
    removeComment(id) {
        for(let i = 0; i < this._comments.length; i++) {
            if(this._comments[i].id === id) {
                this._comments.splice(i);
            }
        }
        this.notifyAll(new Event("commentsChanged", this.comments));
    }

    //generates a JSON-String from a Object, that is representive for this slide, this is important for data transfer between the client and the server side
    generateJSONString() {
        let literal = {
            name: this._name,
            pdfPath: this._pdf,
            comments: this._comments,
        };

        return JSON.stringify(literal);
    }

    //here are the getter and setter methods needed for the Slide class
    set name(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    get pdf() {
        return this._pdf;
    }

    get comments(){
        return this._comments;
    }

    get idCount(){
        return this._idCount;
    }
}

export default Slide;
