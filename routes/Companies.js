const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/',(req,res) =>{
    mongoose.connect('mongodb://localhost:27017/first-project-db',{ useNewUrlParser: true, useUnifiedTopology: true }, async (err, db) => {
        await db.collection('Companies').find({}).toArray((err, result) =>{
            res.json(result);
            db.close();
          });
    });
});

router.delete('/:title', async (req, res) => {
    const title = req.params.title
    mongoose.connect('mongodb://localhost:27017/first-project-db',{ useNewUrlParser: true, useUnifiedTopology: true }, async (err, db) => {
        await db.collection('Companies').deleteOne({title: title})
        .then(response=>{
            res.send('ok')
            db.close()
        });
    });
})





module.exports = router;