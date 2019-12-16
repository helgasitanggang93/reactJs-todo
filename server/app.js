require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const todoRoutes = require('./routes');
const cors = require('cors');
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || `mongodb://localhost:27017/react-todo`
mongoose.set('useNewUrlParser', true);
mongoose.connect(uri, function (err) {
    if (err) {
        console.log(err);
    }else {
        console.log(`mongodb://localhost:27017/react-todo successfully connected`);
        
    }
});
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use('/', todoRoutes);
app.listen(port, function () {
    console.log(`listening on port ${port}`);
    
});