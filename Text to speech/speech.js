//Init speechSynth API
const synt = window.speechSynthesis;

const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");
//Init the voices array
let voices = [];
const getvoices = () => {
  voices = synt.getVoices();

  //loop through voices and create an option for each one
  voices.forEach((voice) => {
    const option = document.createElement("option");
    //Fill option with voice and language
    option.textContent = voice.name + "(" + voice.lang + ")";

    //set needed attribute
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};

getvoices();
if (synt.onvoiceschanged !== undefined) {
  synt.onvoiceschanged = getvoices;
}

//speak
const speak = () => {
  //ADD BACKGROUND ANIMATION
  body.style.background = '#141414 url("img/background.gif")';
  body.style.backgroundRepeat = "repeat-x";
  body.style.backgroundSize = "100% 100%";
  //Check if speaking
  if (synt.speaking) {
    console.error("Already speaking...");
    return;
  }

  if (textInput.value !== "") {
    //ADD BACKGROUND ANIMATION
    body.style.background = '#141414 url("img/background.gif")';
    body.style.backgroundRepeat = "repeat-x";
    body.style.backgroundSize = "100% 100%";
    //Get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    //speak end

    speakText.onend = (e) => {
      console.log("Done speaking...");
      body.style.background = '#141414';
    };

    //speak error
    speakText.onerror = (e) => {
      console.error("something went wrong");
    };

    //selected voice
    const selectedVoice =
      voiceSelect.selectedOptions[0].getAttribute("data-name");

    //Loop through voices
    voices.forEach((voice) => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    //set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    //speal
    synt.speak(speakText);
  }
};

//EVENT LISTENERS
//text form submit
textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  speak();
  textInput.blur();
});

//Rate value change

rate.addEventListener("change", (e) => {
  rateValue.textContent = rate.value;
});

//Rate value change

pitch.addEventListener("change", (e) => {
  pitchValue.textContent = pitch.value;
});

//voice select change
voiceSelect.addEventListener("change", (e) => speak());
