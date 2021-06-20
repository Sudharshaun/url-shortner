const shortID = require("shortid");
const config = require("config");
const validUrl = require("valid-url");
const Url = require('../models/urls');
const statuses = require('../responseStatuses');
const baseUrl = `http://localhost:8080/api`;

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Checks if the URL is already available else saves the data and returns the data to render.
 */

const shortUrlRoute = async (req, res) => {
    const fullURL = req.body.longUrl;
    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json(statuses.INTERNAL_ERROR);
    }
    if(validUrl.isUri(fullURL)){
        try {
            let url = await Url.findOne({ fullURL });
            if(url) {
                url["code"] = 201;
                return res.status(200).json(url);
            } else {
                const newEntry = await saveURLDataInDB(req, fullURL);
                return res.status(201).json(newEntry);
            }
        } catch(err) {
            console.error(err.message);
            return res.status(500).json(statuses.INTERNAL_ERROR + err.message);
        }
    } else {
        res.status(400).json(statuses.INVALID_URL);
    }
}

const getUserAddressArray = (req) => {
    const userIPAddressArr = [];
    const userIdentityObj = {
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        userAgent: req.get('User-Agent')
    };
    userIPAddressArr.push(userIdentityObj);
    return userIPAddressArr;
}

/**
 * 
 * @param {*} req 
 * @param {Original URL} fullURL 
 * Saves the data in database with the input values after validation
 */

const saveURLDataInDB = async (req, fullURL) => {
    const isLoggingEnabled = req.body.isLoggingEnabled;
    const expiryDate = req.body.expiryDate;
    const urlID = shortID.generate();
    const shortenedURL = baseUrl + "/" + urlID;
    const userIPAddressArr = getUserAddressArray(req);
    const newEntry = new Url({
        fullURL,
        shortenedURL,
        urlID,
        isLoggingEnabled,
        expiryDate,
        hitsCount: 0,
        userIdentity: userIPAddressArr,
    });
    await newEntry.save();
    return newEntry;
}

module.exports = shortUrlRoute;