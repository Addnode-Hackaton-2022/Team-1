'use strict'

const socket = require("./socket.js");
const cloud = require("./cloud.js");
const functions = require("./functions.js");

functions.readAttributeConfig();
socket.connect();

start()

function start() {
    cloud.postDataToCloud(socket.getData());
    setTimeout(() => {
        start()
    }, 2000)
}
