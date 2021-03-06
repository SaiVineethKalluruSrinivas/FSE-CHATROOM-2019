var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var routes = require('./routes/routes.js');
const chat = require('./models/chatSchema.js');

const port = 3000;

var app = express();

//connect to mongodb
mongoose.connection.openUri('mongodb://localhost:27017/chatroom');
mongoose.connection.on('connected', ()=>{
    console.log("Connected to DB");
});
mongoose.connection.on('error', (err)=>{
    if(err){
        console.log(`Error while connecting to DB ${err}`);
    }
});

//Cross origin support middle
app.use(cors());

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//serving static content
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api', routes);

app.get('/', (req, res)=>{
    res.send("Hello World");
});


io.on('connection', (socket) => {
  
  socket.on('disconnect', function(){
    io.emit('users-changed', {user: socket.username, event: 'left'});   
  });
 
  socket.on('userconnect', (username) => {
    socket.username = username;
    io.emit('users-changed', {user: username, event: 'joined'});
    console.log(username + ' joined the chatroom');    
  });
  
  socket.on('add-message', (message) => {

  	// for online users
    io.emit('message', {text: message.text, from: socket.username, created: new Date()});

    // for offline users
    ///////////////////////
    let newChat = new chat({
        text: message.text,
        from: socket.username,
        created: new Date()
    });

    newChat.save((err, MESSAGE)=>{
        if(err){
            console.log('MESSAGE FAILED TO ADD');
        }else{
            console.log('MESSAGE ADDED SUCCESSFULLY');
        }
    });

    /////////////////
	});

});

const socketport = 3001;

http.listen(socketport, function(){
   console.log('Socket listening at http://localhost:' + socketport);
});


app.listen(port , ()=> {
    console.log(`Backend server is listening at port ${port}`);
});















