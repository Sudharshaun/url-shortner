const shortID = require("shortid");
const config = require("config");
const validUrl = require("valid-url");
const Url = require('../models/urls');
const statuses = require('../responseStatuses');


const shortUrlRoute = async (req, res) => {
    const fullURL = req.body.longUrl;
    const isLoggingEnabled = req.body.isLoggingEnabled;
    const expiryDate = req.body.expiryDate;
    const baseUrl = `http://localhost:8080/api`;
    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json(statuses.INTERNAL_ERROR);
    }
    const urlID = shortID.generate();
    if(validUrl.isUri(fullURL)){
        try {
            let url = await Url.findOne({ fullURL });
            if(url) {
                url["code"] = 201;
                return res.status(200).json(url);
            } else {
                const shortenedURL = baseUrl + "/" + urlID;
                const userIPAddressArr = [];
                const userIdentityObj = {
                    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                    userAgent: req.get('User-Agent')
                }
                userIPAddressArr.push(userIdentityObj);
                url = new Url({
                    fullURL,
                    shortenedURL,
                    urlID,
                    isLoggingEnabled,
                    expiryDate,
                    hitsCount: 0,
                    userIdentity: userIPAddressArr,
                });
                await url.save()
                return res.status(201).json(url);
            }
        } catch(err) {
            console.error(err.message);
            return res.status(500).json(statuses.INTERNAL_ERROR + err.message);
        }
    }else {
        res.status(400).json(statuses.INVALID_URL);
    }
}

module.exports = shortUrlRoute;