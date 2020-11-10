const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Company = require('../model/Company')

router.get('/',(req,res) =>{
    Company.find({}).then(response =>{
            res.json(response);
          });
    });

router.delete('/:title', async (req, res) => {
    const title = req.params.title
    Company.deleteOne({title: title})
        .then(response=>{
            res.send('ok')
        });
    });


module.exports = router;