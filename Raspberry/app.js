const socket = require("./socket.js");
const cloud = require("./cloud.js");


socket.readAttributeConfig();
socket.connect();

start()

function start() {
    cloud.postDataToCloud(socket.getData());
    setTimeout(() => {
        start()
    }, 2000)
}
