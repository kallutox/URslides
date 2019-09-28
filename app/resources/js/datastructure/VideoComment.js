/* eslint-env browser */
import Comment from "../data/Comment.js";

class VideoComment extends Comment {

    constructor(id, page, content) {
        super(id, page, "video", content);
    }
}

export default VideoComment;
