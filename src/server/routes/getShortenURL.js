const Url = require('../models/urls');
const statuses = require('../responseStatuses');

const getDifferenceBetweenDates = (date1, date2) => {
    const diffTime = Math.abs(date2 - date1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
 }

const updateValuesInDB = async (url, req) => {
    let hitsCount = url.hitsCount;
    hitsCount++;
    const existingIPAddress = url.userIdentity;
    const userIdentityObj = {
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        userAgent: req.get('User-Agent'),
    };
    existingIPAddress.push(userIdentityObj);
    await url.update({ hitsCount: hitsCount, userIdentity: existingIPAddress });
}

const getShortenedUrl = async (req, res) => {
    const shortUrlID = req.params.shortUrl;
    
    const url = await Url.findOne({ urlID: shortUrlID });
    console.log(url);
    try {
        if (url) {
            await updateValuesInDB(url, req);
            const isURLExpired = getDifferenceBetweenDates(new Date(), url.expiryDate) > 0 ? false : true;
            isURLExpired ? res.redirect(url.fullURL) : res.status(500).json(statuses.URL_EXPIRED);
        } else {
            return res.status(400).json(statuses.URL_DOESNT_EXIST);
        }
    }
    catch (err) {
        console.error(statuses.SHORT_URLCODE_ERROR + shortUrlID);
        return res.status(500).json(statuses.INTERNAL_ERROR);
    }
}

module.exports = getShortenedUrl;