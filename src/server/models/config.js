const mongoose = require('mongoose');
const uri = 'mongodb+srv://shaun:shaun@cluster0.nm0nh.mongodb.net/urlshortner?retryWrites=true&w=majority';
const connectDB = () => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then( () => {
        console.log('Connected to DB');
    }).catch( (err) => {
        console.error(`Couldn't connect ${err}`);
    })
}

module.exports = connectDB;