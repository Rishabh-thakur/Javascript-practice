//DOM elements
//window.addEventListener('load',()=>{});
    const time = document.getElementById("time");
    const greeting = document.getElementById("greeting");
     const namet = document.getElementById("namet");
    const focus = document.getElementById("focus");
    
    //show time
    function showtime() {
      let today = new Date();
      hour = today.getHours();
      min = today.getMinutes();
      sec = today.getSeconds();
    
      //Set AM and PM
      const amPm = hour >= 12 ? "PM" : "AM";
    
      //12 hour format
      hour = hour % 12 || 12;
    
      //output time
      time.innerHTML = `${hour}<span>:</span>${addzero(min)}<span>:</span>${addzero(
        sec
      )}`;
    
      setTimeout(showtime, 1000);
    }
    
    //addzero
    
    function addzero(n) {
      return (parseInt(n, 10) < 10 ? "0" : "") + n;
    }
    
    //setbackground
    function setBygreet() {
      let today = new Date();
      hour = today.getHours();
    
      if (hour < 12) {
        //morning
        document.body.style.backgroundImage = "url('img/morning.jpg')";
        greeting.textContent = "Good Morning";
      } else if (hour < 18) {
          //afternoon
          document.body.style.backgroundImage = "url('img/afternoon.jpg')";
        greeting.textContent = "Good Afternoon";
      } else {
        //evening
        document.body.style.backgroundImage = "url('img/evening.jpg')";
        greeting.textContent = "Good Evening";
        document.body.style.color = 'white';
      }
      document.body.style.backgroundSize = "cover";
    }
    
    function getName(){
      if(localStorage.getItem("name") === null){
        namet.textContent = "Enter Name";
      }
      else{
          namet.textContent = localStorage.getItem("name");
      }
    }
    
    
    function getFocus(){
        if(localStorage.getItem("focus") === null){
          focus.textContent = "Enter Focus";
        }
        else{
            focus.textContent = localStorage.getItem("name");
        }
      }
      
      function setName(e){
          if(e.type === 'keypress'){
            //make sure enter is pressed
            if(e.which == 13 || e.keyCode == 13){
                localStorage.setItem('name',e.target.innerText);
                namet.blur();
            }
          }else{
              localStorage.setItem("name",e.target.innerText);
          }
      }

      function setFocus(e){
        if(e.type === 'keypress'){
          //make sure enter is pressed
          if(e.which == 13 || e.keyCode == 13){
              localStorage.setItem('focus',e.target.innerText);
              namet.blur();
          }
        }else{
            localStorage.setItem("focus",e.target.innerText);
        }
    }


    namet.addEventListener('keypress',setName);
    namet.addEventListener('blur',setName);
    focus.addEventListener('keypress',setFocus);
    focus.addEventListener('blur',setFocus);
    showtime();
    setBygreet();
    getName();
    getFocus();
    

