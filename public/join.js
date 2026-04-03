const btn=document.querySelector("button");
const form=document.querySelector("form");
let userInp=document.querySelector("#username");


form.addEventListener("submit",(e)=>{
    e.preventDefault();
});
btn.addEventListener("click",()=>{
    let username=userInp.vallue;
    console.log(username);
});