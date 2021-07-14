const mongoose = require('mongoose');
const uri = '';
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
