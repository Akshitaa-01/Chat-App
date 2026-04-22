const express=require("express");
const app=express();
const mongoose=require("mongoose");
const http=require("http");
const {Server}=require("socket.io");
const path=require("path");

const server=http.createServer(app);                    //we make server khud se kyuki socket.io ko direct access chchaiye
const io = new Server(server);                         //also it attaches socket.io to the http server we made upar 
const port=8080;                                     // io=socket.io server -> mangages all connected users(whole server)

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views",));
app.use(express.static(path.join(__dirname,"/public",)));

main()
 .then((res)=>{
    console.log("db connection estabilished");
 })
 .catch((err) => {
    console.log(err)
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chatapp');
}

io.on('connection', (socket) => {                                           //listens for new user connection like app.use {on ->listns for event}
    console.log("user connected");                                               //connection and disconnect is event
    socket.on("disconnect",()=>{                                                //socket->specified user
        console.log("user disconnected");
        socket.broadcast.emit("userleft",(socket.username));
    });
    socket.on("chatMsg",(data)=>{
        io.emit("chatMsg",data);
    });                                                                              //socket.broadcast.emit()=only to other 
    socket.on("userJoined",(username)=>{          
        socket.username=username                                                          //socket.io=to only thst user
        socket.broadcast.emit("userJoined",(username));                                           //io.emit=to all including sender  
    })
    socket.on("usertyping",(username)=>{
        socket.broadcast.emit("usertyping",username);
    }); 
});
server.listen(port,()=>{
    console.log("app is listening");
});

