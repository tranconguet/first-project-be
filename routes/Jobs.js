const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/',(req,res) =>{
    mongoose.connect('mongodb://localhost:27017/first-project-db',{ useNewUrlParser: true, useUnifiedTopology: true }, async (err, db) => {
        await db.collection('Jobs').find({}).toArray((err, result) =>{
            console.log('hello');
            res.json(result);
            db.close();
          });
    });
});

router.delete('/:title', async (req, res) => {
    const title = req.params.title
    mongoose.connect('mongodb://localhost:27017/first-project-db',{ useNewUrlParser: true, useUnifiedTopology: true }, async (err, db) => {
        await db.collection('Jobs').deleteOne({title: title})
        .then(response=>{
            res.send('ok')
            db.close()
        });
    });
})

router.get('/:name',(req,res) =>{
    const name = req.params.name;
    mongoose.connect('mongodb://localhost:27017/first-project-db',{ useNewUrlParser: true, useUnifiedTopology: true }, async (err, db) => {
        await db.collection('Jobs').find({}).toArray((err, result) =>{
            const job = result.find(el => el.url.includes(name))
            res.json(job);
            db.close();
          });
    });
});


router.get('/search/:search',async (req,res) =>{
    let search = req.params.search.split(' ');
    search = search.map(el => el.toLowerCase());
    console.log(search);
    mongoose.connect('mongodb://localhost:27017/first-project-db',{ useNewUrlParser: true, useUnifiedTopology: true }, async (err, db) => {
        await db.collection('Jobs').find({}).toArray((err, result) =>{
            const list = result.filter(cur => {
                const resultsArray = search.map(el => {
                    const jobTitle = cur.title.toLowerCase();
                    const companyName = cur.employerInfo.name.toLowerCase();;
                    const tagList = cur.tagList.map(cur => cur.toLowerCase());
                    return jobTitle.includes(el) || companyName.includes(el) || tagList.find(el => el.includes(el));
                });
                return resultsArray.find(el => el === true);
            })
            res.json(list);
            db.close();
          });
    });
});

module.exports = router;