const Url = require("../models/urls");

const getShortenedUrl = async (req, res) => {
    const shortUrlID = req.params.shortUrl;
    
    const url = await Url.findOne({ urlID: shortUrlID });
    console.log(url);
    try {
        if (url) {
            let hitsCount = url.hitsCount;
            hitsCount++;
            await url.update({ hitsCount: hitsCount });
            res.redirect(url.fullURL);
        } else {
            return res.status(400).json("The short url doesn't exists in our system.");
        }
    }
    catch (err) {
        console.error("Error while retrieving long url for shorturlcode " + shortUrlID);
        return res.status(500).json("There is some internal error.");
    }
}

module.exports = getShortenedUrl;