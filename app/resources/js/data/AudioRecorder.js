/* eslint-env browser */
//this module is based on the following tutorial https://blog.addpipe.com/using-webaudiorecorder-js-to-record-audio-on-your-website/
import { AudioSettings } from "../utility/Settings.js";
import Observable, { Event } from "../utility/Observable.js";

var gumStream,
    recorder,
    input,
    AudioContext = window.AudioContext || window.webkitAudioContext,
    audioContext;

class AudioRecorder extends Observable {

    constructor() {
        super();
    }

    startRecording() {
        let self = this;

        navigator.mediaDevices.getUserMedia(AudioSettings.mediaConstraints).then(function (stream) {
            audioContext = new AudioContext();

            gumStream = stream;

            input = audioContext.createMediaStreamSource(stream);

            recorder = new WebAudioRecorder(input, AudioSettings.recorderSettings);

            recorder.onComplete = function (recorder, blob) {
                self.notifyAll(new Event("newAudioAvailable", blob));
            };

            recorder.setOptions(AudioSettings.recordingSettings);

            //send an Event, so that the buttons in the recording menu can be adjusted
            self.notifyAll(new Event("recordingStarted"));
            recorder.startRecording();
        }).catch(function (err) {
            console.log(err);
        });
    }

    stopRecording() {
        gumStream.getAudioTracks()[0].stop();
        recorder.finishRecording();
    }
}

function startRecording() {

}

function stopRecording() {
    
}

export default AudioRecorder;