const socket = require("./socket.js");
const cloud = require("./cloud.js");


socket.readAttributeConfig();
socket.connect();

setTimeout(() => {
    start()
}, 2000)

function start() {
    cloud.postDataToCloud(socket.getData());
    setTimeout(() => {
        start()
    }, 2000)
}
