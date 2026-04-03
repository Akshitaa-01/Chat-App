const btn=document.querySelector("button");
const form=document.querySelector("form");
let userInp=document.querySelector(".username");


form.addEventListener("submit",(e)=>{
    e.preventDefault();
});
btn.addEventListener("click",()=>{
    let username=userInp.value.trim();
    if (!username){
        alert("Enter username to enter chat");
        return;
    }
    localStorage.setItem("username",username);
    window.location.href="/chat.html";
});