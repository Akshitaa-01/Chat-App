const socket=io();                            //  creates user connection to servwr 
let btn=document.querySelector("button");
let inp=document.querySelector("input");
let form=document.querySelector("form");
let messages=document.querySelector(".messages");

let username=localStorage.getItem("username");

socket.emit("userJoined",username);
form.addEventListener("submit",(e)=>{
    e.preventDefault();
});

btn.addEventListener("click",()=>{
    let msg=inp.value;
    if (msg.trim()!==""){
        socket.emit("chatMsg",{
            username:username,
            msg:msg
        });      //emit is basically send to server
    }
    inp.value="";
    inp.focus();
});

socket.on("chatMsg",(data)=>{                                              //this is recieving msg form server to display
    const item=document.createElement("div");
    item.textContent=data.username+":"+data.msg;
    messages.appendChild(item);
});

socket.on("userJoined",(username)=>{                                             
    let user = document.createElement("user");
    user.innerText = username + " joined the chat";
    messages.appendChild(user);
});