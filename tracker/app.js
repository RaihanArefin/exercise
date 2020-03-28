// Get all things ready
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
var newUser=  require('./models/user');
var newExercise=  require('./models/exercise');
// finding static content
app.use(express.static(__dirname+ '/public'));
mongoose.connect('mongodb://localhost/users',  { useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connect('mongodb://localhost/exercises',  { useNewUrlParser: true, useUnifiedTopology: true})

var identity = 0;
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
  });


app.post('/api/newUser', (req, res)=>{
    var response = req.body.user;
    const userData = new newUser({
        name: response
    })
    newUser.findOne({name: response}, (err, data)=>{
        if (err) return console.log("Cannot find")
        
            if(data === null){
                identity= 1
            }
        
    })
    if(identity === 1){
    userData.save((err, result)=>{
        if (err) return console.log("Error")
        if(result){
            res.json(result)
        }
        
    })
}
    
})


app.post('/api/newExercise', (req, res)=>{
    var query = req.body.userId
    var description = req.body.description
    var duration = req.body.duration
    var date = req.body.date
    newUser.findById(query, (err, docs)=>{
        if (err) return res.json("Not found")
        if(docs !== null){
            name = docs.name
            var userExercise = new newExercise({
                name: name,
                userId: query,
                description: description,
                duration: duration,
                date: date
            })
            userExercise.save((err, results)=>{
                if (err) return console.log("Error in line 2")
                if(results){
                    res.json(results)
                }
            })
        }
        else{
            res.json("UserId not found")
        }
    })
})


app.get('/:url', (req, res)=>{
    var url = req.params.url;
    newExercise.find({userId: url}, (err, view)=>{
        if (err){
            console.log("error in line 3")
        }
        if(view !== null){
            res.send(view)
        }
    })
})


app.listen(process.env.PORT || 3000, ()=>{
    console.log("Listening to the port.....")
})