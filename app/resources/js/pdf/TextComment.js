/* eslint-env browser */
import Comment from "../pdf/Comment.js";

class TextComment extends Comment {

    constructor(id, page, content) {
        super(id, page, "text", content);
    }
}

export default TextComment;