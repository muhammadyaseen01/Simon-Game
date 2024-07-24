let gameSeq = [];
let userSeq = [];
let btns = ["yellow","red","green","purple"];

let started = false;
let level = 0; //game is not started yet
let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started == false){
        started = true;
        levelUp();
    }
})

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(()=>{
        btn.classList.remove("flash");
    },100);
};

function levelUp(){
    userSeq = [];
    level++;
    h2.innerHTML = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    // console.log(gameSeq);
    // console.log(randBtn);
    btnFlash(randBtn);
}

function checkSeq(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,500)
        }
    }else{
        h2.innerHTML = `Game Over! Your score was ${level} <br/>Press any key to start.`
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(()=>{
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}


function btnPress(){
    let btn = this; //this refers to the element who call eventListener
    btnFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    // console.log(userColor);
    checkSeq(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}