require('dotenv').config();
const axios = require('axios');
const apiUrl = process.env.API_URL;

async function postDataToCloud(boatAttributes) {
    const data = JSON.stringify(boatAttributes);
    console.log(data);
    let res = await axios.post(
        `${apiUrl}/boat/update`,
        data, {
            headers: {
                'Content-Type': 'application/json',
            }
    }
    );

    return res.data;
}

module.exports = {
    postDataToCloud
}