/* eslint-disable no-underscore-dangle */
/* eslint-env browser */

class Comment {

    constructor(id, page, content) {
        this._id = id;
        this._page = page;
        this._content = content;
    }

    get id() {
        return this._id;
    }

    get page() {
        return this._page;
    }

    get content() {
        return this._content;
    }
}

export default Comment;