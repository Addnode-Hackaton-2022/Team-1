'use strict'

require('dotenv').config();
const delta = 256/65;
const WebSocket = require('ws');
const functions = require("./functions.js");

let ws;
let isConnected = false;

var data = {
    id: process.env.BOAT_ID,
    boatAttributes: []
}

function addToData(value, name) {
    let exists = false;
    data.boatAttributes.forEach(attribute => {
        if (functions.getAttributeNameFromCloud(attribute.type) === name) {
            attribute.type = functions.getCloudAttributeIdByName(name);
            attribute.value = value.toString();
            attribute.timestamp = new Date().toISOString();
            exists = true;
        }
    })
    if (!exists) {
        let cloudAttributeId = functions.getCloudAttributeIdByName(name);
        console.log(cloudAttributeId);
        data.boatAttributes.push({ type: cloudAttributeId, value: value.toString(), timestamp: new Date().toISOString() })
    }
}

function connect() {
    ws = new WebSocket(`ws://${process.env.WDU_IP}/ws`);

    ws.onopen = function ws_open(e) {
        console.log("onopen: " + JSON.stringify(e));
        isConnected = true;

        console.log("CloudID: " + functions.getCloudAttributeId(5));
    };

    ws.onclose = function ws_close(e) {
        console.log("onclose: " + e);
        if (isConnected) {
            console.log("reconnect");
        }
        connect();
    };

    ws.onmessage = function ws_message(e) {
        const parsed = JSON.parse(e.data);

        //const alarm_level = 5;
        //const tank_level = 1;
        //const test_level = 7;

        const command = parsed.data[0];
        let attributeName = functions.getAttributeNameFromLocal(command);
        switch (attributeName) {
            case "alarm_level":
                const v2 = parsed.data[5];
                const signed = parsed.data[6];

                const current =
                    signed <= 0 ? Math.ceil(v2 / delta) : Math.ceil(v2 / delta) + 65;
                addToData(current, attributeName);
                break;
            case "tank_level":
                if (parsed.messagecmd === 5) {
                    const v2 = parsed.data[5];
                    const signed = parsed.data[6];

                    const current =
                        signed <= 0 ? Math.ceil(v2 / delta) : Math.ceil(v2 / delta) + 65;
                    addToData(current, attributeName);
                }   
                break;
            case "reserved":
                if (parsed.messagecmd === 5) {
                    const v2 = parsed.data[5];
                    const signed = parsed.data[6];

                    const current =
                        signed <= 0 ? Math.ceil(v2 / delta) : Math.ceil(v2 / delta) + (65 * signed);
                    addToData(current, attributeName);
                }
                break;
        }
    };

    ws.onerror = function ws_error(e) {
        // todo reconnect
        console.log("onerror: " + e);
    };
}

function setAlarmLevel(val) {
	const message = {
		data: [4, 0, 0, parseInt(val), 0],
		messagecmd: 3,
		messagetype: 17,
		size: 5,
	};
	const json = JSON.stringify(message);
	addToData(val, "alarm_level");
	if(ws.readyState === WebSocket.OPEN){
		ws.send(json);
	}
	else {
		setTimeout(() => {
			setAlarmLevel(val)
		}, 2000)
	}
}

function getData() {
    return data;
}

module.exports = {
    connect,
    getData,
	setAlarmLevel
}