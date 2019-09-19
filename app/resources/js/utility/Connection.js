/* eslint-env browser */

class Connection {

    constructor() {
        this.xhr = new XMLHttpRequest();
    }

    get(){
        //here belongs the code for sending a get request to the Server
    }

    post(jsonString){
        this.xhr.open("POST","/save");
        this.xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
        this.xhr.send("json=" + jsonString);
    }
}

export default Connection;
