const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const State = require('../model/State');

router.get('/',(req,res) =>{
    State.find({}).then(response =>{
            res.json(response);
          });
    });

router.delete('/',(req,res) =>{
    State.deleteMany();
    });

router.post('/:userName',(req,res) =>{
    const user = {userName: req.params.userName};
    State.insertOne({userName: req.params.userName}).then(response=>{
        res.json(user);
    });
});


module.exports = router;