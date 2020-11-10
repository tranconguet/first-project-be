const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/User');

router.get('/', async (req,res) =>{
    mongoose.connect('mongodb://localhost:27017/first-project-db',{ useNewUrlParser: true, useUnifiedTopology: true }, async (err, db) => {
        await db.collection('Users').find({}).toArray((err, result) =>{
            res.json(result);
            db.close();
          });
    });
});

router.delete('/:userName', async (req, res) => {
    const userName = req.params.userName
    mongoose.connect('mongodb://localhost:27017/first-project-db',{ useNewUrlParser: true, useUnifiedTopology: true }, async (err, db) => {
        await db.collection('Users').deleteOne({userName: userName})
        .then(response=>{
            res.send('ok')
            db.close()
        });
    });
})

router.get('/:userId', async (req,res) =>{
    const id = req.params.userId;
    console.log(id);
    mongoose.connect('mongodb://localhost:27017/first-project-db',{ useNewUrlParser: true, useUnifiedTopology: true }, async (err, db) => {
        await db.collection('Users').find({_id: mongoose.Types.ObjectId(id)}).toArray((err, result) =>{
            res.json(result);
            db.close();
          });
    });
})

router.get('/users/:userName', async (req,res) =>{
    const name = req.params.userName;
    console.log(name);
    mongoose.connect('mongodb://localhost:27017/first-project-db',{ useNewUrlParser: true, useUnifiedTopology: true }, async (err, db) => {
        await db.collection('Users').find({userName: name}).toArray((err, result) =>{
            res.json(result);
            db.close();
          });
    });
})

router.post('/', (req,res) =>{
    let newUser;
    if(req.body.type === 'candidate'){
        newUser = new User({
            userName: req.body.userName,
            password: req.body.password,
            type: 'candidate'
        });
    }
    if(req.body.type === 'employer'){
        newUser = new User({
            userName: req.body.userName,
            password: req.body.password,
            type: 'employer',
            fullName: req.body.fullName,
            address: req.body.address
        });
    }
    mongoose.connect('mongodb://localhost:27017/first-project-db',{ useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
        db.collection('Users').insertOne(newUser, () => {
            res.send('item has been inserted!')
        });
    });
})

router.patch('/users/:userName', (req,res) =>{
    let data;
    if(req.body.type ==='candidate'){
        data = {
            // userName: req.body.userName,
            // password: req.body.password,
            // type: req.body.type,
            fullName: req.body.fullName,
            sex: req.body.sex,
            dateOfBirth: req.body.dateOfBirth,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            hobbies: req.body.hobbies,
            literacy: req.body.literacy,
            gpa: req.body.gpa,
            skills: req.body.skills,
            experiences: req.body.experiences
        }
    }
    if(req.body.type === 'employer')
        data = {
            // userName: req.body.userName,
            // password: req.body.password,
            // type: req.body.type,
            fullName: req.body.fullName,
            activeDate: req.body.activeDate,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            major: req.body.major,
            skills: req.body.skills,
            overviews: req.body.overviews,
            benefits: req.body.benefits
        }
    mongoose.connect('mongodb://localhost:27017/first-project-db',{ useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
        db.collection('Users').updateOne({userName: req.body.userName},{$set: data},()=>{
            console.log(req.body);
            res.send('ok');
        })});
    });


module.exports = router;