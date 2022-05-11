const wrapper = document.querySelector(".wrapper");
const inputpart = wrapper.querySelector(".input-part");
const infoTxt = inputpart.querySelector(".info-txt");
const inputField = inputpart.querySelector("input");
const locationBtn = inputpart.querySelector("button");
const wIcon = document.querySelector(".weather-part img")

let api;
inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("your browser not support geolocation");
  }
});

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid= 72a1b49b770b61019ad6b3c4aa3df8f0`;
  fetchdata();
}

function onError(error) {
  infoTxt.innerText = error.message;
  infoTxt.classList.add("error");
}

function requestApi(city) {
api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=72a1b49b770b61019ad6b3c4aa3df8f0
`;
fetchdata();
}

function fetchdata(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api)
      .then((response) => response.json())
      .then((result) => weatherDetails(result));
}

function weatherDetails(info) {
    infoTxt.classList.replace("pending","error");
  if(info.cod == "404"){
      infoTxt.innerText = `${inputField.value} isn't a valid city name`;
  }
  else{
      const city = info.name;
      const country = info.sys.country;
      const {description,id} = info.weather[0];
      const {feels_like,humidity,temp} = info.main;

      if(id == 800){
          wIcon.src = "img/sun.png";
      }else if(id >=200 && id <=232){
          wIcon.src = "img/storm.png";
      }
      else if(id >=600 && id <=622){
        wIcon.src = "img/weather.png";
    }
    else if(id >=701 && id <=781){
        wIcon.src = "img/cloudy.png";
    }
    else if(id >=801 && id <=804){
        wIcon.src = "img/cloud.png";
    }
    else if((id >=300 && id <=321) || (id >= 500 && id <= 531)){
        wIcon.src = "img/rain.png";
    }
    
      
      
      wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
      wrapper.querySelector(".weather").innerText = description;
      wrapper.querySelector(".location span").innerText = `${city},${country}`;
      wrapper.querySelector(".temp .dipper-2").innerText = Math.floor(feels_like);
      wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

      infoTxt.classList.remove("pending","error");
      wrapper.classList.add("active");
      console.log(info);
  }
}
