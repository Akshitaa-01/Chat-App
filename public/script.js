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
inp.addEventListener("input",()=>{
    socket.emit("usertyping",username);
});
socket.on("chatMsg",(data)=>{                                              //this is recieving msg form server to display
    const item=document.createElement("div");
    item.style.maxWidth = "60%";
    item.style.padding = "8px 12px";
    item.style.margin = "8px";
    item.style.borderRadius = "10px";
    if (data.username===username){
        item.textContent="You:" +data.msg;
        item.style.backgroundColor = "#aee1f9";
        item.style.marginLeft = "auto"; 
        item.style.textAlign = "right";

    }else{
        item.textContent=data.username+":"+data.msg;
        item.style.backgroundColor = "#e4e6eb";
        item.style.marginRight = "auto"; 
        item.style.textAlign = "left";
    }
    messages.appendChild(item);
});

socket.on("userJoined",(username)=>{                                             
    let user = document.createElement("user");
    user.innerText = username + " joined the chat\n";
    messages.appendChild(user);
});

socket.on("userleft",(username)=>{                                             
    let user = document.createElement("user");
    user.innerText = username + " left the chat\n";
    messages.appendChild(user);
});
socket.on("usertyping",(username)=>{                                             
    const typingDiv = document.createElement("div");
    typingDiv.style.fontStyle = "italic";
    typingDiv.style.color = "gray";
    typingDiv.textContent = username + " is typing...";
    messages.appendChild(typingDiv);
    setTimeout(() => {
        typingDiv.remove();
    }, 50);
});