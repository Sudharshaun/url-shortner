const Url = require('../models/urls');
const express = require('express');

const fetchAllURLsRegistered = express.Router();
fetchAllURLsRegistered.get('/', async (req, res) => {
    console.log("BERUHHHHH");
    try{
        const serverData = await Url.find({});
        console.log(serverData);
        return res.status(201).json(serverData);
    } catch(error) {
        return res.status(500).json(error);
    }
    }
)

module.exports = fetchAllURLsRegistered;