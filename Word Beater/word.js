let arr = ["hello", "patrick", "nanocar", "telescope", "motive", "success"];
let timetake = 5;
let scoretake = 0;
let isplaying;

const inputTxt = document.querySelector(".inputtext");
const time = document.querySelector(".time span");
const score = document.querySelector(".score span");
const word = document.querySelector(".word");
const message = document.querySelector(".message");


window.addEventListener("DOMContentLoaded", () => {
  showword(arr);
  inputTxt.addEventListener("input", startmatch);
  setInterval(countdown, 1000);
  setInterval(checkstatus, 50);
});

function startmatch() {
  if (matchword()) {
    isplaying = true;
    timetake = 6;
    showword(arr);
    inputTxt.value = "";
    scoretake++;
  }
  score.innerHTML = scoretake;
}

function matchword() {
  if (word.innerHTML === inputTxt.value) {
    message.innerHTML = "correct!!";
    showmessage();
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}

function showword(arr) {
  let index = Math.floor(Math.random() * arr.length);
  word.innerHTML = arr[index];
}

function countdown() {
  if (timetake > 0) {
    timetake--;
  } else if (timetake === 0) {
    isplaying = false;
    //  message.innerHTML = "Game over !!!";
    //  message.classList.add('show-message');
    //  setTimeout(showmessage, 1000);
  }
  time.innerHTML = timetake;
}

function showmessage() {
  message.classList.add("show-message");
}

function checkstatus() {
  if (!isplaying && timetake === 0) {
    message.innerHTML = "Game Over !!!";
    scoretake = 0;
  }
  score.innerHTML = scoretake;
}
