const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const State = require('../model/State');
const User = require('../model/User');

router.get('/',(req,res) =>{
    State.find({}).then(response =>{
            res.json(response);
          });
    });

router.delete('/',(req,res) =>{
    State.deleteMany().then(response=>{
        res.send('ok')
    });
    });

router.post('/:userName',(req,res) =>{
    const user = new State({userName: req.params.userName});
    user.save().then(response=>{
        res.send('ok')
    })
});


module.exports = router;