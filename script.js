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

// All the cities from the map to be Shuffled
let citiesToShuffle =  cities.slice();

// All the districts flags
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
        lose();
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

      // district index for finding the corresponding flag
      let cityIndex=-1;
      for(let i=0;i<cities.length;i++){
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
      const flagContainer = document.createElement('div');
      flagContainer.innerHTML = cities[cityIndex];
      flagContainer.appendChild(districtFlag);
      document.getElementById('flagContainer').appendChild(flagContainer);

      // display the district name on the map when user clicked on the correct district
      const name = 'Name';
      let correctAnswerNameId = (correctAnswer+name);
      let goodAnswerElement = document.getElementById(correctAnswerNameId);
      goodAnswerElement.setAttribute('class', 'cityName');
      
      console.log(count);
     
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

const elements = document.getElementsByClassName("cityColor");

for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', handlerEvent, false);
}

// Fills in provinces that have been correctly clicked on and updates the score

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
    if(citiesDisplay.innerHTML == 'undefined'){
      // citiesDisplay.innerHTML = "";
      citiesDisplay.style.color = "#d6373f";
      citiesDisplay.innerHTML = "You won!";

    }
    score.innerHTML = count + " / " + citiesToShuffle.length;
   
}
// Stop the timer and display win message
function win() {
  clearInterval(interval);
  // citiesDisplay.style.color = "#d6373f";
  // citiesDisplay.innerHTML = "You won!";
  let happyDuke = document.querySelector(".theDuke");
  happyDuke.src =  "happy-duke.gif";
  let infoNotNecessaryIfWin = document.querySelector("p");
  infoNotNecessaryIfWin.style.display="none";
  // let moreSpaceZ = document.querySelector("span#cities");
  let buttonContainer = document.querySelector("h1");
  const buttonPlay = document.createElement("a");
  buttonPlay.setAttribute('class', 'btn-gradient cyan mini');
  buttonPlay.innerHTML = "Play Again";
  buttonContainer.append(buttonPlay);

}

// Stop the timer and display lose message
function lose() {
    clearInterval(interval);
    timer.style.color = "#d6373f";
    citiesDisplay.style.color = "#d6373f";
    citiesDisplay.innerHTML = "Sorry, out of time!";
    let infoNotNecessaryIfLose = document.querySelector("p");
    infoNotNecessaryIfLose.style.display="none";
    let moreSpaceY = document.querySelector("h1");
    const buttonPlay = document.createElement("a");
    buttonPlay.setAttribute('class', 'btn-gradient cyan mini');
    buttonPlay.innerHTML = "Play Again";
    moreSpaceY.append(buttonPlay);
    let sadDuke = document.querySelector(".theDuke");
    sadDuke.src =  "wave-duke.gif";
    let blockMap = document.querySelector("#luxembourg");
    blockMap.style.pointerEvents="none";
    
  }
  
// Array shuffle algorithm from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

// Restart game Button Play
// TO DO:

// Code refactoring 
// TO DO: