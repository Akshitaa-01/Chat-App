const socket=io();                            //  creates connection to servwr 
let btn=document.querySelector("button");
let inp=document.querySelector("input");
let form=document.querySelector("form");
 
form.addEventListener("sumbit",(e)=>{
    e.preventDefault();
});

btn.addEventListener("click",()=>{
    let msg=inp.value;
    if (msg.trim()!==""){
        Socket.emit("chatMsg",msg);
    }
    inp.value="";
    inp.focus();
});