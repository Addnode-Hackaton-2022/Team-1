'use strict'

require('dotenv').config();
const axios = require('axios');
const apiUrl = process.env.API_URL;
const functions = require("./functions.js");
const socket = require("./socket.js");

async function postDataToCloud(boatAttributes) {
    const data = JSON.stringify(boatAttributes);
    let res = await axios.post(
        `${apiUrl}/boat/update`,
        data, {
            headers: {
                'Content-Type': 'application/json',
            }
    }
    );
	readDataFromCloud(res.data);
    return res.data;
}

function readDataFromCloud(response) {
	response.boatAttributes.forEach(attribute => {
		if(functions.getAttributeNameFromCloud(attribute.type) === "alarm_level") {
			socket.setAlarmLevel(attribute.value);
		}
    })
}

module.exports = {
    postDataToCloud
}