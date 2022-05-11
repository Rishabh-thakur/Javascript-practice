const TypeWriter = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

//Type Method
TypeWriter.prototype.type = function () {
  //current index
  const current = this.wordIndex % this.words.length;
  //Get full text of current words
  const fullTxt = this.words[current];
  //check if deleting
  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  //Type speed
  let typeSpeed = 300;
  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  //If word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    typeSpeed = this.wait;
    //set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.wordIndex++;
    //pause before start typing
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

//Init on DOM Load

/*
//ES6 classes
class typewriter{
    constructor(txtElement, words, wait = 3000){
        this.txtElement = txtElement;
        this.words = words;
        this.txt = "";
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }
};

type(){
    //current index
  const current = this.wordIndex % this.words.length;
  //Get full text of current words
  const fullTxt = this.words[current];
  //check if deleting
  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  //Type speed
  let typeSpeed = 300;
  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  //If word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    typeSpeed = this.wait;
    //set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.wordIndex++;
    //pause before start typing
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
}
*/
document.addEventListener("DOMContentLoaded", init);

//Init App
function init() {
  const element = document.querySelector(".txt-type");
  const words = JSON.parse(element.getAttribute("data-words"));
  const wait = element.getAttribute("data-wait");
  new TypeWriter(element, words, wait);
}
