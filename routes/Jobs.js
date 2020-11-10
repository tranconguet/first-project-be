const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Job = require('../model/Job')

router.get('/',(req,res) =>{
    Job.find({}).then(response=>{
            console.log('hello');
            res.json(response);
          });
    });

router.post('/',(req,res) =>{
    const data = req.body
    console.log(req.body)
    Job.insertOne(data).then(response=>{
            res.send('ok')
        });
    });

router.delete('/:title', async (req, res) => {
    const title = req.params.title
    Job.deleteOne({title: title})
        .then(response=>{
            res.send('ok')
        });
    });

router.get('/:name',(req,res) =>{
    const name = req.params.name;
    Job.find({}).then(response =>{
            const job = response.find(el => el.url.includes(name))
            res.json(job);
          });
    });


router.get('/search/:search',async (req,res) =>{
    let search = req.params.search.split(' ');
    search = search.map(el => el.toLowerCase());
    console.log(search);
    Job.find({}).then(response =>{
            const list = response.filter(cur => {
                const resultsArray = search.map(el => {
                    const jobTitle = cur.title.toLowerCase();
                    const companyName = cur.employerInfo.name.toLowerCase();;
                    const tagList = cur.tagList.map(cur => cur.toLowerCase());
                    return jobTitle.includes(el) || companyName.includes(el) || tagList.find(el => el.includes(el));
                });
                return resultsArray.find(el => el === true);
            })
            res.json(list);
          });
    });

module.exports = router;