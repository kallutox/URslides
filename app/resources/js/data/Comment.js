/* eslint-disable no-underscore-dangle */
/* eslint-env browser */

class Comment {

    constructor(id, page, type, content) {
        this._id = id;
        this._page = page;
        this._type = type;
        this._content = content;
    }

    set content(content) {
        this._content = content;
    }

    get id() {
        return this._id;
    }

    get page() {
        return this._page;
    }

    get type() {
        return this._type;
    }
    
    get content() {
        return this._content;
    }
}

export default Comment;