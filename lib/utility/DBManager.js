/* eslint-env node */
import ServerConst from "../utility/ServerConst.js";

class DBManager {

    constructor() {
        this.db = require("mongoose");

        //setup connection to database
        this.db.connect(ServerConst.dbURL);
        console.log("Server now connected to database!");
        
        this.Slide = this.db.model("Slide", new this.db.Schema({
            name: String,
            pdfPath: String,
            comments: Array,
        }));
    }

    insert(slide) {
    }
}

export default DBManager;