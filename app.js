const express = require("express");
const mongoose = require('mongoose');
const app = express();
const db = require('./config/keys').mongoURI
const users = require("./routes/api/users");
const eventbrite = require("./routes/api/eventbrite");
const bodyParser = require('body-parser');
const passport = require('passport')
const path = require('path');
const server = require('./socketServer')

if (process.env.NODE_ENV === 'production') {
    app.use("/api/users", users);
    app.use("/api/eventbrite", eventbrite);
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
    
}
/* CHAT! */

/* REST OF THE API */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true  })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));


const port = process.env.PORT || 5000;

server(app,port)

app.use("/api/users", users);
app.use("/api/eventbrite", eventbrite);