const Url = require('../models/urls');
const express = require('express');

const fetchAllURLsRegistered = express.Router();
fetchAllURLsRegistered.get('/', async (req, res) => {
    try{
        const serverData = await Url.find({});
        return res.status(201).json(serverData);
    } catch(error) {
        return res.status(500).json(error);
    }
})

module.exports = fetchAllURLsRegistered;