const express=require("express");
const app=express();
const http=require("http");
const {Server}=require("socket.io");
const path=require("path");

const server=http.createServer(app);                    //we make server khud se kyuki socket.io ko direct access chchaiye
const io = new Server(server);                         //also it attaches socket.io to the http server we made upar 
const port=8080;                                     // io=socket.io server -> mangages all connected users(whole server)

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views",));
app.use(express.static(path.join(__dirname,"/public",)));

io.on('connection', (socket) => {                                           //listens for new user connection like app.use {on ->listns for event}
    console.log("user connected");                                               //connection and disconnect is event
    socket.on("disconnect",()=>{                                                //socket->specified user
        console.log("user disconnected");
    });
    socket.on("chatMsg",(data)=>{
        io.emit("chatMsg",data);
    });                                                                              //socket.broadcast.emit()=only to other 
    socket.on("userJoined",(username)=>{                                             //socket.io=to only thst user
        socket.broadcast.emit("userJoined",(username));                                           //io.emit=to all including sender  
    })
});
server.listen(port,()=>{
    console.log("app is listening");
});

