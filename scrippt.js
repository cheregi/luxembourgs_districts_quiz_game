let citiesDisplay = document.querySelector("#cities");
let score = document.querySelector("#score");
let timer = document.querySelector("#timer");

// All the cities from the map
let cities = [
    "Clervaux", 
    "Wiltz", 
    "Diekirch", 
    "Vianden", 
    "Redange", 
    "Mersch", 
    "Echternach", 
    "Capellen", 
    "Luxembourg", 
    "Grevenmacher", 
    "eschSurAlzette", 
    "Remich" ];

// All the cities from the map Shuffled
let citiesToShuffle =  cities.slice();

// All the cities flags
let citiesFlags = [
  "districts/1.Coat_of_arms_clervaux_luxbrg.png", 
  "districts/2.Coat_of_arms_wiltz_luxbrg.png", 
  "districts/3.Coat_of_arms_diekirch_luxbrg.png", 
  "districts/4.Coat_of_arms_vianden_luxbrg.png", 
  "districts/5.Coat_of_arms_redange_sur_attert_luxbrg.png", 
  "districts/6.Coat_of_arms_mersch_luxbrg.png", 
  "districts/7.Coat_of_arms_echternach_luxbrg.png", 
  "districts/8.Jacob_van_der_Capellen_wapen.png", 
  "districts/9.Blason_ville_lu_Luxembourg-ville.png", 
  "districts/10.Coat_of_arms_grevenmacher_luxbrg.png", 
  "districts/11.Coat_of_arms_esch_alzette_luxbrg.png", 
  "districts/12.Coat_of_arms_remich_luxbrg.png" ];

let count = 0;
let seconds = 60;
let flagForCorrectAnswer;   

init();

// Count down timer
let interval = setInterval(function() {
  if (seconds > 9) {
    timer.innerHTML = "00:" + seconds
  } else if (seconds > 0) {
    timer.innerHTML = "00:0" + seconds
    timer.style.color = "#d6373f"
  } else {
    timer.innerHTML = "00:00"
    lose()
  }
  seconds--
}, 1000)


// On click:
let handlerEvent = function (e) {
  let correctAnswer = citiesToShuffle[count].toLowerCase();
  const color = 'Color';
  let correctAnswerId = (correctAnswer+color);
  let userAnswer = e.target.id;

  let theCity= citiesToShuffle[count];

  deleteBorderColorBadAnswer();
  if (correctAnswerId == userAnswer) {
      // Answer guessed
      // for correct answer new color style is applied on the map for the district
      let colors = ["#7bc5e0", "#e5898e", "#faf8f2"];
      e.target.style.fill = colors[Math.floor(Math.random() * colors.length)];

      // city index for finding the corresponding flag
      var cityIndex=-1;
      for(var i=0;i<cities.length;i++){
        if(cities[i]==theCity){
          cityIndex=i;
          break;
        }
      }
    
      flagForCorrectAnswer = citiesFlags[cityIndex];

      // img holder for every source url of the corresponding flag
      let districtFlag = document.querySelector(".districtFlag").cloneNode();
      districtFlag.setAttribute("src", flagForCorrectAnswer);

      // collect all the flags into container when user responds correctly
      var div = document.createElement('div');
      div.innerHTML = cities[cityIndex];
      div.appendChild(districtFlag);
      document.getElementById('flagContainer').appendChild(div);

      // display the district name on the map when user clicked on the correct district
      const name = 'Name';
      let correctAnswerNameId = (correctAnswer+name);
      let goodAnswerElement = document.getElementById(correctAnswerNameId);
      goodAnswerElement.setAttribute('class', 'cityName');
      
      count++;
      if (count == cities.length) {
        win();
      }
      display();
      // else{
      // }

  }else{
    // Answer not guessed
    let userWrongAnswer =  e.target.id;
    let badAnswerElement = document.getElementById(userWrongAnswer);
    // removing hover class
    badAnswerElement.setAttribute('class', 'cityColor');
    let currentClass = badAnswerElement.getAttribute('class');
    currentClass += ' wrongAnswer'
    badAnswerElement.setAttribute('class',currentClass);
   
  }
 
};

var elements = document.getElementsByClassName("cityColor");

for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', handlerEvent, false);
}

// Fills in provinces that have been correctly clicked on and updates score
// document.querySelector(".cityColor ").addEventListener('click', e => {


function deleteBorderColorBadAnswer(){
  
  let badAnswer = document.querySelector(".wrongAnswer");
  if(badAnswer!=null){
    let currentClass = badAnswer.getAttribute('class');
    currentClass=currentClass.replace('wrongAnswer','');
    badAnswer.setAttribute('class', currentClass);
  }
}
function init() {
    shuffle(citiesToShuffle);
    display();
}
// Display a new province and update the score
function display() {
    citiesDisplay.innerHTML = citiesToShuffle[count];
    score.innerHTML = count + " / " + citiesToShuffle.length;
   
}
// Stop the timer and display win message
function win() {
  clearInterval(interval);
  citiesDisplay.style.color = "#d6373f";
  citiesDisplay.innerHTML = "You won!";
}

// Stop the timer and display lose message
function lose() {
    clearInterval(interval);
    timer.style.color = "#d6373f";
    citiesDisplay.style.color = "#d6373f";
    citiesDisplay.innerHTML = "Sorry, out of time!";
  }
  
// Array shuffle algorithm from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
