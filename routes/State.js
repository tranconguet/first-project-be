const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const State = require('../model/State');

router.get('/',(req,res) =>{
    mongoose.connect('mongodb://localhost:27017/first-project-db',{ useNewUrlParser: true, useUnifiedTopology: true }, async (err, db) => {
        await db.collection('State').find({}).toArray((err, result) =>{
            res.json(result);
            db.close();
          });
    });
});

router.delete('/',(req,res) =>{
    mongoose.connect('mongodb://localhost:27017/first-project-db',{ useNewUrlParser: true, useUnifiedTopology: true }, async (err, db) => {
        db.collection('State').deleteMany();
    });
});

router.post('/:userName',(req,res) =>{
    mongoose.connect('mongodb://localhost:27017/first-project-db',{ useNewUrlParser: true, useUnifiedTopology: true }, async (err, db) => {
        const user = {userName: req.params.userName};
        db.collection('State').insertOne({userName: req.params.userName});
        res.json(user);
    });
})


module.exports = router;