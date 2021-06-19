const shortID = require("shortid");
const config = require("config");
const validUrl = require("valid-url");
const Url = require('../models/urls');
const shortUrlRoute = async (req, res) => {
    const fullURL = req.body.longUrl;
    const isLoggingEnabled = req.body.isLoggingEnabled;
    const expiryDate = req.body.expiryDate;
    const baseUrl = `http://localhost:8080/api`;
    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json("Internal error. Please come back later.");
    }

    const urlID = shortID.generate();

    if(validUrl.isUri(fullURL)){
        try {
            let url = await Url.findOne({ fullURL });
            if(url) {
                return res.status(200).json(url);
            } else {
                const shortenedURL = baseUrl + "/" + urlID;
                url = new Url({
                    fullURL,
                    shortenedURL,
                    urlID,
                    isLoggingEnabled,
                    expiryDate,
                    hitsCount: 0
                });
                await url.save()
                return res.status(201).json(url);
            }
        } catch(err) {
            console.error(err.message);
            return res.status(500).json("Internal Server error " + err.message);
        }
    }else {
        res.status(400).json("Invalid URL. Please enter a vlaid url for shortening.");
    }
}

module.exports = shortUrlRoute;