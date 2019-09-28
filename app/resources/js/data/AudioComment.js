/* eslint-env browser */
import Comment from "../data/Comment.js";

class AudioComment extends Comment {

    constructor(id, page, content) {
        super(id, page, "audio", content);
    }
}

export default AudioComment;
