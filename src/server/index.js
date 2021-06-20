const express = require('express');
const connectDB = require('./models/config');
const validateAndRedirectURL = require('./routes/getShortenURL');
const generateShortURLRoute = require('./routes/generateShortURL');
const fetchAllURLsRegistered = require('./routes/fetchShortenedURLs');

const app = express();
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  
app.use(express.json());
connectDB();
app.use(express.static('dist'));
app.use('/api/getAllUrls', fetchAllURLsRegistered);
app.get('/api/:shortUrl', validateAndRedirectURL);
app.post('/api/shorturl', generateShortURLRoute);
app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));