
    //this constructor controls all audios in the game audio controller for game
    class AudioController {
    constructor() {
        this.bgSounds = new Audio('assets/Audio/bgMusic.mp3');
        this.flipSounds = new Audio('assets/Audio/flipCardSound.mp3');
        this.matchSounds = new Audio('assets/Audio/matchedSound.mp3');
        this.victorySounds = new Audio('assets/Audio/victorySound.mp3');
        this.gameOverSounds = new Audio('assets/Audio/gameOverSound.mp3');
        this.bgSounds.volume = 0.3;
        this.bgSounds.loop = true;
    }

     startMusic() {
         //it begins the audio but pause other sounds that precedes it
        this.victorySounds.pause();
        this.gameOverSounds.pause();
        this.bgSounds.play();
    }
    stopMusic() {
        //this prevent overlapping of diffrent audios; each sounds play at a time
        this.matchSounds.pause();
        this.bgSounds.pause();
         this.victorySounds.pause();
         this.victorySounds.currentTime = 0;
        this.bgSounds.currentTime = 0;
    }
    flip() {
        //flipping card audio
        this.flipSounds.play();
        this.matchSounds.pause();
    }
    match() {
        //when cards match audio
        this.matchSounds.play();
    }
    victory() {
         //victory audio
        this.stopMusic();
        this.victorySounds.play();
    }
    gameOver() {
         //if the time ends against the player audio
        this.stopMusic();
        this.gameOverSounds.play();
    }
    
    
}


class ClimateChangeGame {
// this constructor is the template for almost all instances of the game
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining')
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }
  
    // this function begins the game
 startGame() {
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;
            setTimeout(() => {
            this.audioController.startMusic();
            this.shuffleCards(this.cardsArray);
            this.countdown = this.startCountdown();
            this.busy = false;
        }, 500)
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;  
     }

    // this function flips the cards
    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            if(this.cardToCheck) {
                this.checkForCardMatch(card);
            } else {
                this.cardToCheck = card;
            }
        }
    }

    // conditions if a card could be flipped
     canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}

    
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    // this function collect arrays from html to be used in Javascript

    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new ClimateChangeGame(60, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
      //   let audioController = new AudioController();
          audioController.startMusic();
        });
    });

// this perform a function whenever a card is clicked
    cards.forEach(card => {card.addEventListener('click', () => {
          game.flipCard(card);
    });
 }); 
}


 