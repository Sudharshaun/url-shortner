const express = require('express');
const connectDB = require('./models/config');
const getShortenedUrl = require('./routes/getShortenURL');
const shortUrlRoute = require('./routes/shortenedURLRoute');
const fetchAllURLsRegistered = require('./routes/fetchShortenedURLs');
const os = require('os');

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
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('/api/:shortUrl', getShortenedUrl);
app.post('/api/shorturl', shortUrlRoute);
app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));