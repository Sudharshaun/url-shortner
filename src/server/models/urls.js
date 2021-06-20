const mongoose = require('mongoose');
const shortId = require('shortid');

const shortUrlSchema = new mongoose.Schema({
	fullURL: {
		type: String,
		required: true
	},
	urlID: {
		type: String,
	},
	shortenedURL: {
		type: String,
		required: true,
		default: shortId.generate
	},
	isExpiryDateGiven: {
		type: Boolean,
	},
	expiryDate: {
		type: Date,
		required: false,
	},
	isLoggingEnabled: {
		type: Boolean,
		required: true,
		default: false,
	},
	hitsCount: {
		type: Number,
		required: true,
		default: 0,
	},
	userIdentity: {
		type: Array,
	}
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)