'use strict';
let startTime = new Date();
const stopperFace = document.querySelector('.clock');
const cardsOfTheGame = document.querySelectorAll('.card');
const cardFaces = ['&#129409;', '&#128007;', '&#128024;', '&#128056;', '&#128051;'];
let cardArray = [];
let numberOfCardBacks;
let cardsOpen;
let lastCardsFace = ['', ''];
let setInt;
let startAfterFiveSec;


const handleClick = (event) => {
    numberOfCardBacks = document.querySelectorAll('.card-back').length;
    if ( numberOfCardBacks === 0 ) {        // first click (next game)
        turnBackToFace (event);
        lastCardsFace [0] = event.target.innerHTML;
    }
    numberOfCardBacks = document.querySelectorAll('.card-back').length;
    if ( numberOfCardBacks === 1 ) {        // last click
        turnBackToFace (event);             // game over
        lastCardsFace [1] = event.target.innerHTML;
        numberOfCardBacks = document.querySelectorAll('.card-back').length;

        const to = setTimeout( () => {
            clearTimeout(to);
            beginNewGame();
        }, 5000);
    }
    handleCardsEvents(event);
}

const turnBackToFace = function (event) {
    event.target.classList.remove('card-back');
    event.target.removeEventListener('click', handleClick);
}

const handleCardsEvents = function (event) {
    cardsOpen = document.querySelectorAll('.card-open');
    if ( cardsOpen.length === 2) {                             // second card
        if ( lastCardsFace [0] === lastCardsFace [1] &&
            lastCardsFace [0] > '' &&  
            lastCardsFace [1] > '' ) {                         // a pair found
            cardsToStayFaceUp();
            lastCardsFace = ['', ''];
            // return;
        }
        turnTwoCardFacesToBack(event);                   // cards don't match
        lastCardsFace = ['', ''];
    } 
    //      open cards
    if (lastCardsFace [0] === '') {
        lastCardsFace [0] = event.target.innerHTML;
    } else {
        lastCardsFace [1] = event.target.innerHTML;
    }
    turnBackToFace (event);
    event.target.classList.add('card-open');
    // cardsOpen = document.querySelectorAll('.card-open');
    // console.log(cardsOpen.length);
}

const cardsToStayFaceUp = function (event) {
    cardsOpen = document.querySelectorAll('.card-open');
    cardsOpen.forEach(element => {
        element.classList.remove('card-open');
    });
}

const turnTwoCardFacesToBack = function (event) {
    cardsOpen = document.querySelectorAll('.card-open');
    cardsOpen.forEach(element => {
        element.classList.add('card-back');
        element.classList.remove('card-open');
        element.addEventListener('click', handleClick);
    });

}

const initializeCardsOfTheGame = function (cardFaces) {
    cardArray = cardFaces;
    cardArray = cardArray.concat(cardArray);
    cardArray = shufleCardArray(cardArray);
    addListener();
    addPictures();
    return cardArray;
}

const addListener = () => {
    cardsOfTheGame.forEach(element => {
        element.addEventListener('click', handleClick);
    });
}

const addPictures = () => {
    let i=0;
    cardsOfTheGame.forEach(element => {
        element.innerHTML = cardArray[i];
        element.classList.add('card-back');
        element.classList.remove('card-open');
        i+=1;
    });
}

const shufleCardArray = function (array) {
    let currentIndex = array.length; let temporaryValue; let randomIndex;
    
    
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

const showTime = function () {
    let elapsedTime = new Date() - startTime;
    elapsedTime /= 1000;
    let min = Math.floor(elapsedTime / 60);
    let sec = Math.floor(elapsedTime % 60);
    const timeMin = min < 10 ? `0${min}` : `${min}`;
    const timeSec = sec < 10 ? `0${sec}` : `${sec}`;
    const time = `${[timeMin, timeSec].join(':')}`;
    stopperFace.textContent = time;
}

const beginNewGame = function () {
    
    cardArray = initializeCardsOfTheGame (cardFaces);
    startTime = new Date();
    setInt = setInterval(measureTime, 1000);

    function measureTime () {
        showTime();
        numberOfCardBacks = document.querySelectorAll('.card-back').length;
        if ( numberOfCardBacks === 0 ) {        // game over
            clearInterval(setInt);
        }
    }
    
}

const clockClick = function () {beginNewGame();};
stopperFace.addEventListener('click', clockClick);

beginNewGame();

