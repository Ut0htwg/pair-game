'use strict';
let startTime = 0;
const stopperFace = document.querySelector('.clock');
const cardsOfTheGame = document.querySelectorAll('.card');
const numberOfCardsPlaying = 9;         // !!!
const numberOfCardsAvailable = 18;      // !!!
const cardFaces = 
        [ '&#129409;', '&#128007;', '&#128024;', '&#128056;', '&#128051;', '&#128010;'
        , '&#128013;', '&#128034;', '&#128044;', '&#128012;', '&#128060;', '&#128057;'
        , '&#128053;', '&#128052;', '&#129429;', '&#128025;', '&#128043;', '&#128039;'
        ];
let cardArray = [];
let numberOfCardBacks;
let cardsOpen;
let currentCardsFace;
let lastCardsFace;
let setInt;
let clickActive = false;
let alreadyStarted = false;


const turnBackToFace = function (event) {
    event.target.classList.remove('card-back');
    event.target.classList.add('card-open');
    event.target.removeEventListener('click', handleClick);
}

const handleClick = (event) => {
    if (!clickActive) {
        clickActive = true;
        numberOfCardBacks = document.querySelectorAll('.card-back').length;
        if ( numberOfCardBacks === numberOfCardsAvailable &&
                !alreadyStarted ) {
            startTime = 0;
            alreadyStarted = true;
        }
        turnBackToFace(event);
        firstCardSecondCard(event);
    }
}

const firstCardSecondCard = (event) => {
    numberOfCardBacks = document.querySelectorAll('.card-back').length;
    if (numberOfCardBacks % 2 === 0) {      //second card of two cards
        handleCardsEvents(event);
        lastCardsFace = '';
        if ( numberOfCardBacks === 0 ) {
            const to = setTimeout( () => {
                clearTimeout(to);
                clickActive = false;
                beginNewGame();
            }, 5000);
        }
    } else {                                // first card of two cards
        lastCardsFace = event.target.innerHTML;
        clickActive = false;
    }
}

const handleCardsEvents = function (event) {
    currentCardsFace = event.target.innerHTML;
    if(lastCardsFace === currentCardsFace) {
        cardsToStayFaceUp();
        clickActive = false;
    } else {
        const turn = setTimeout( () => {
            turnTwoCardFacesToBack(event);
            clearTimeout(turn);
            clickActive = false;
        }, 2000);
    }
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

const deleteHalfOfItRandomly = (array) => {
    let i = numberOfCardsAvailable;
    while (i > numberOfCardsPlaying) {
        let randomIndex = Math.floor(Math.random() * i );
        array.splice(randomIndex, 1);
        i = array.length;
    };
    return array;
}

const initializeCardsOfTheGame = (array) => {
    cardArray = array.slice();
    cardArray = deleteHalfOfItRandomly(cardArray);
    cardArray = cardArray.concat(cardArray);
    cardArray = shufleCardArray(cardArray);
    addListener();
    addPictures();
    return cardArray;
}

const showTime = function () {
    let elapsedTime = startTime;
    let min = Math.floor(elapsedTime / 60);
    let sec = Math.floor(elapsedTime % 60);
    const timeMin = min < 10 ? `0${min}` : `${min}`;
    const timeSec = sec < 10 ? `0${sec}` : `${sec}`;
    const time = `${[timeMin, timeSec].join(':')}`;
    stopperFace.textContent = time;
}

const beginNewGame = function () {
    alreadyStarted = false;
    const cardWork = cardFaces.slice();
    cardArray = initializeCardsOfTheGame (cardWork);
    startTime = 0;
    setInt = setInterval(measureTime, 1000);

    function measureTime () {
        showTime();
        startTime += 1;
        numberOfCardBacks = document.querySelectorAll('.card-back').length;
        if ( numberOfCardBacks === 0 ) {        // game over
            clearInterval(setInt);
        }
    }
}

beginNewGame();
