'use strict'

require('dotenv').config();
const delta = 3.92; // 256/65
const WebSocket = require('ws');
const cloud = require('./cloud.js')
const fs = require('fs');

let ws;
let isConnected = false;
let attributeTranslation;


var data = {
    id: process.env.BOAT_ID,
    boatAttributes: []
}

function addToData(value, name) {
    let exists = false;
    data.boatAttributes.forEach(attribute => {
        if (getAttributeNameFromCloud(attribute.type) === name) {
            console.log('Finns redan!')
            attribute.type = getCloudAttributeIdByName(name);
            attribute.value = value.toString();
            attribute.timestamp = new Date().toISOString();
            exists = true;
        }
    })
    if (!exists) {
        console.log('Finns ej!')
        let cloudAttributeId = getCloudAttributeIdByName(name);
        console.log(cloudAttributeId);
        data.boatAttributes.push({ type: cloudAttributeId, value: value.toString(), timestamp: new Date().toISOString() })
    }
}

function readAttributeConfig() {
    let rawdata = fs.readFileSync('attributeConfig.json');
    attributeTranslation = JSON.parse(rawdata);
}

function getCloudAttributeIdByName(name) {
    let result;
    attributeTranslation.forEach(attribute => {
        if (attribute.name === name) {
            result = attribute.cloudAttributeId;
        }
    })
    return result;
}

function getCloudAttributeId(boatAttributeId) {
    let result;
    attributeTranslation.forEach(attribute => {
        if (attribute.boatAttributeId === boatAttributeId) {
            result = attribute.cloudAttributeId;
        }
    })
    return result;
}

function getBoatAttributeId(cloudAttributeId) {
    let result;
    attributeTranslation.forEach(attribute => {
        if (attribute.cloudAttributeId === cloudAttributeId) {
            result = attribute.boatAttributeId;
        }
    })
    return result;
}

function getAttributeNameFromLocal(boatAttributeId) {
    let result;
    attributeTranslation.forEach(attribute => {
        if (attribute.boatAttributeId === boatAttributeId) {
            result = attribute.name;
        }
    })
    return result;
}

function getAttributeNameFromCloud(cloudAttributeId) {
    let result;
    attributeTranslation.forEach(attribute => {
        if (attribute.cloudAttributeId === cloudAttributeId) {
            result = attribute.name;
        }
    })
    return result;
}

function connect() {
    ws = new WebSocket(`ws://${process.env.WDU_IP}/ws`);

    ws.onopen = function ws_open(e) {
        console.log("onopen: " + JSON.stringify(e));
        isConnected = true;

        console.log("CloudID: " + getCloudAttributeId(5));
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
        let attributeName = getAttributeNameFromLocal(command);
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

function getData() {
    return data;
}

module.exports = {
    connect,
    readAttributeConfig,
    getData
}