const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require('./routes/userAuth');
const companiesRoute = require('./routes/Companies');
const jobsRoute = require('./routes/Jobs');
const stateRoute = require('./routes/State');

//Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//routes
app.get('/',(req,res) => {
    res.send('Here we are');
})

app.use('/state',stateRoute);
app.use('/auth',authRoute);
app.use('/companies',companiesRoute);
app.use('/jobs',jobsRoute);

//connect to the db
mongoose.connect('mongodb://localhost:27017/first-project-db',{ useNewUrlParser: true, useUnifiedTopology: true },() =>{
    console.log('Database here!');
});

//listening to the server

app.listen(3000);