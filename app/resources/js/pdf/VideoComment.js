/* eslint-env browser */
import Comment from "../pdf/Comment.js";

class VideoComment extends Comment {

    constructor(id, page, content) {
        super(id, page, "video", content);
    }
}

export default VideoComment;
