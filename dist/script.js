(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  var citiesDisplay = document.querySelector('#cities');
  var score = document.querySelector('#score');
  var timer = document.querySelector('#timer');
  // All the cities from the map
  var cities = [
      'Clervaux',
      'Wiltz',
      'Diekirch',
      'Vianden',
      'Redange',
      'Mersch',
      'Echternach',
      'Capellen',
      'Luxembourg',
      'Grevenmacher',
      'eschSurAlzette',
      'Remich'
  ];
  // All the cities from the map to be Shuffled
  var citiesToShuffle = cities.slice();
  // All the districts flags
  var citiesFlags = [
      'districts/1.Coat_of_arms_clervaux_luxbrg.png',
      'districts/2.Coat_of_arms_wiltz_luxbrg.png',
      'districts/3.Coat_of_arms_diekirch_luxbrg.png',
      'districts/4.Coat_of_arms_vianden_luxbrg.png',
      'districts/5.Coat_of_arms_redange_sur_attert_luxbrg.png',
      'districts/6.Coat_of_arms_mersch_luxbrg.png',
      'districts/7.Coat_of_arms_echternach_luxbrg.png',
      'districts/8.Jacob_van_der_Capellen_wapen.png',
      'districts/9.Blason_ville_lu_Luxembourg-ville.png',
      'districts/10.Coat_of_arms_grevenmacher_luxbrg.png',
      'districts/11.Coat_of_arms_esch_alzette_luxbrg.png',
      'districts/12.Coat_of_arms_remich_luxbrg.png'
  ];
  var count = 0;
  var seconds = 60;
  var flagForCorrectAnswer;
  init();
  // Count down timer
  var interval = setInterval(function setTimer() {
      if (seconds > 9) {
          timer.innerHTML = '00:' + seconds;
      }
      else if (seconds > 0) {
          timer.innerHTML = '00:0' + seconds;
          timer.style.color = '#d6373f';
      }
      else {
          timer.innerHTML = '00:00';
          lose();
      }
      seconds--;
  }, 1000);
  // On click:
  var handlerEvent = function (event) {
      var correctAnswer = citiesToShuffle[count].toLowerCase();
      var color = 'Color';
      var correctAnswerId = (correctAnswer + color);
      var eventTarget = event.target;
      var userAnswer = eventTarget.id;
      var theCity = citiesToShuffle[count];
      deleteBorderColorBadAnswer();
      if (correctAnswerId === userAnswer) {
          // Answer guessed
          // for correct answer new color style is applied on the map for the district
          var colors = ['#7bc5e0', '#e5898e', '#faf8f2'];
          eventTarget.style.fill = colors[Math.floor(Math.random() * colors.length)];
          // district index for finding the corresponding flag
          var cityIndex = -1;
          for (var i = 0; i < cities.length; i++) {
              if (cities[i] === theCity) {
                  cityIndex = i;
                  break;
              }
          }
          flagForCorrectAnswer = citiesFlags[cityIndex];
          // img holder for every source url of the corresponding flag
          var districtFlagNode = document.querySelector('.districtFlag');
          var districtFlag = districtFlagNode.cloneNode();
          districtFlag.setAttribute('src', flagForCorrectAnswer);
          // collect all the flags into container when user responds correctly
          var flagContainer = document.createElement('div');
          flagContainer.innerHTML = cities[cityIndex];
          flagContainer.appendChild(districtFlag);
          document.getElementById('flagContainer').appendChild(flagContainer);
          // display the district name on the map when user clicked on the correct district
          var name_1 = 'Name';
          var correctAnswerNameId = (correctAnswer + name_1);
          var goodAnswerElement = document.getElementById(correctAnswerNameId);
          goodAnswerElement.setAttribute('class', 'cityName');
          console.log(count);
          count++;
          if (count === cities.length) {
              win();
          }
          display();
          // else{
          // }
      }
      else {
          // Answer not guessed
          var userWrongAnswer = eventTarget.id;
          var badAnswerElement = document.getElementById(userWrongAnswer);
          // removing hover class
          badAnswerElement.setAttribute('class', 'cityColor');
          var currentClass = badAnswerElement.getAttribute('class');
          currentClass += ' wrongAnswer';
          badAnswerElement.setAttribute('class', currentClass);
      }
  };
  var elements = document.getElementsByClassName('cityColor');
  for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener('click', handlerEvent, false);
  }
  // Fills in provinces that have been correctly clicked on and updates the score
  function deleteBorderColorBadAnswer() {
      var badAnswer = document.querySelector('.wrongAnswer');
      if (badAnswer != null) {
          var currentClass = badAnswer.getAttribute('class');
          currentClass = currentClass.replace('wrongAnswer', '');
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
      if (citiesDisplay.innerHTML === 'undefined') {
          // citiesDisplay.innerHTML = "";
          citiesDisplay.style.color = '#d6373f';
          citiesDisplay.innerHTML = 'You won!';
      }
      score.innerHTML = count + ' / ' + citiesToShuffle.length;
  }
  // Stop the timer and display win message
  function win() {
      clearInterval(interval);
      // citiesDisplay.style.color = "#d6373f";
      // citiesDisplay.innerHTML = "You won!";
      var happyDuke = document.querySelector('.theDuke');
      happyDuke.src = 'happy-duke.gif';
      var infoNotNecessaryIfWin = document.querySelector('p');
      infoNotNecessaryIfWin.style.display = 'none';
      // let moreSpaceZ = document.querySelector("span#cities");
      var buttonContainer = document.querySelector('h1');
      var buttonPlay = document.createElement('a');
      buttonPlay.setAttribute('class', 'btn-gradient cyan mini');
      buttonPlay.innerHTML = 'Play Again';
      buttonPlay.addEventListener("click", function (e) { return window.location.reload(); });
      buttonContainer.append(buttonPlay);
  }
  // Stop the timer and display lose message
  function lose() {
      clearInterval(interval);
      timer.style.color = '#d6373f';
      citiesDisplay.style.color = '#d6373f';
      citiesDisplay.innerHTML = 'Sorry, out of time!';
      var infoNotNecessaryIfLose = document.querySelector('p');
      infoNotNecessaryIfLose.style.display = 'none';
      var moreSpaceY = document.querySelector('h1');
      var buttonPlay = document.createElement('a');
      buttonPlay.setAttribute('class', 'btn-gradient cyan mini');
      buttonPlay.innerHTML = 'Play Again';
      buttonPlay.addEventListener("click", function (e) { return window.location.reload(); });
      moreSpaceY.append(buttonPlay);
      var sadDuke = document.querySelector('.theDuke');
      sadDuke.src = 'wave-duke.gif';
      var blockMap = document.querySelector('#luxembourg');
      blockMap.style.pointerEvents = 'none';
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

})));
//# sourceMappingURL=script.js.map
