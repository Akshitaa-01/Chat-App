const socket=io();                            //  creates user connection to servwr 
let btn=document.querySelector("button");
let inp=document.querySelector("input");
let form=document.querySelector("form");
let messages=document.querySelector(".messages");

form.addEventListener("sumbit",(e)=>{
    e.preventDefault();
});

btn.addEventListener("click",()=>{
    let msg=inp.value;
    if (msg.trim()!==""){
        socket.emit("chatMsg",msg);      //emit is basically send to server
    }
    inp.value="";
    inp.focus();
});

socket.on("chatMsg",(msg)=>{
    const item=document.createElement("div");
    item.textContent=msg;
    messages.appendChild(item);
});