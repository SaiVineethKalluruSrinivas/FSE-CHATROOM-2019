const express = require('express');
const router = express.Router();


const user = require('../models/userSchema.js');
const chat = require('../models/chatSchema.js');


//FIND IF USER IS AVAILABLE
router.get('/user/:username', (req, res, next) => {
    user.findOne({'username': req.params.username},'username password',(err, user)=>{
        console.log('User found');
        res.json(user);
    })
});

// GET MESSAGES
router.get('/chats', (req, res, next) => {
    chat.find({},{ '_id': 0, 'text': 1, 'from': 1, 'created': 1},(err, user)=>{
        console.log('chats loaded');
        res.json(user);
    })
}); 

//DELETE ALL CHATS FOR ADMIN PURPOSES
router.delete('/chats', (req, res, next) => {
    chat.remove({}, (err,result) => {

        if(err){
            res.send(err);
        }
        else{
            res.json(result);
        }
    });
});

//ADD NEW USER
router.post('/user', (req, res, next) => {

  user.findOne({'username': req.body.username }, (err, USER)=> { 
    if (err) {
        console.log(err);
        return res.sendStatus(500);
    }

    //if username is new
    else if (!USER) {

        let newUser = new user({
        username: req.body.username,
        password: req.body.password
    });

    newUser.save((err, USER)=>{
        if(err){
            res.send(err);
        }else{
            res.send({status:'User added successfully'});
        }
    });
      
    }

    else
    {
    res.send({status:'User is present'});
    }

  });

});

//DELETING A USER FOR ADMIN PURPOSES
router.delete('/user/:id', (req, res, next) => {
    user.remove({_id: req.params.id}, (err, result)=>{
        if(err){
            res.send(err);
        }else{
            res.json(result);
        }
    });
});


router.delete('/user', (req, res, next) => {


    user.remove({}, (err,result) => {

        if(err){
            res.send(err);
        }
        else{
            res.json(result);
        }


    });
});

module.exports = router;
