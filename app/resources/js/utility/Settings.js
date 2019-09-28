/* eslint-env browser */

const Settings = {

},

//constants and settings for the audio recorder and players
AudioSettings = {
    recorderSettings: {
        workerDir: "/js/libs/web-audio-recorder-js/",
        encoding: "mp3",
        numChannels: 2,
        onEncoderLoaded: function (recorder, encoding) {
            console.log(encoding + " encoder loaded!");
        },
    },
    recordingSettings: {
        timeLimit: 120,
        encodeAfterRecord: true,
        mp3: {
            //you can use values from 64 to 320
            bitRate: 64,
        },
    },
    mediaConstraints: {
        audio: true,
        video: false,
    },
};

export { AudioSettings };
export default Settings;