const fs = require('fs');

let attributeTranslation;

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

module.exports = {
	readAttributeConfig,
	getCloudAttributeIdByName,
	getCloudAttributeId,
	getBoatAttributeId,
	getAttributeNameFromLocal,
	getAttributeNameFromCloud
}
