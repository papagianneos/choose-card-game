import { sounds } from "../modules/sounds.js";

(() => {
    document.getElementsByTagName('body')[0].style.backgroundImage = 'none';

    let pass = '', e;

    const codecheck = () => {
        if (pass.length >= 10) {
            if (pass == '++--PgnΚ>>') {
                sounds.success.play();
                clearInterval(e);
                sounds.door.play();
                setTimeout(() => {
                    $('#cardsHolder').fadeOut(2000);
                    cardWrapper.style.display = 'block';
                    buttonsHolder69.appendChild(playRecordingButton);
                    mainWrapper.appendChild(activateImaginaryCardButton);
                    mainWrapper.appendChild(buttonsHolder69);
                    $('#cardsHolder').fadeOut(0);
                    $('#cardsHolder').fadeIn(2000);
                    document.body.removeChild(document.getElementById('thing'));
                }, 6e3);
            }
            else {
                pass = '';
                sounds.error.play();
                for (var card of document.getElementsByClassName('buttonCard')) {
                    card.style.background = 'linear-gradient(#696763, rgba(20, 20, 20, .5))';
                    card.style.pointerEvents = 'auto';
                    sounds.button.play();
                }
            }
        }
    }

    e = setInterval(codecheck, 500);
    const codeProcess = (elem) => {
        pass += elem.innerText;
    }

    let playedRecording = false;

    let mainDiv = document.createElement('div');
    mainDiv.id = 'cardsHolder';
    mainDiv.style.position = 'fixed';
    mainDiv.style.top = '10px';

    let mainWrapper = document.createElement('div');
    mainWrapper.style.alignItems = 'center';
    mainWrapper.style.justifyContent = 'center';
    mainWrapper.style.textAlign = 'center';

    // ------------------------------------------------------------
    let cardWrapper = document.createElement('div');
    cardWrapper.style.display = 'none';

    let title_ = document.createElement('h1');
    const HTML_KEIMENO = `<keimeno style="color:darkgreen;animation:seismos 1s linear infinite;">FINE</keimeno>`;

    title_.innerHTML = `Game Status: ${HTML_KEIMENO}`;
    title_.style.animationDirection = 'alternate';

    let playRecordingButton = document.createElement('button');
    playRecordingButton.innerHTML = 'RADIO v2.3';
    playRecordingButton.style.backgroundColor = 'grey';
    playRecordingButton.onclick = () => {
        if (playedRecording) return;
        playRecordingButton.style.backgroundColor = 'green';
        playRecordingButton.innerHTML = 'Playing..';
        sounds.pgnRadio.play();
        playedRecording = true;
        setTimeout(() => {
            playedRecording = false;
            playRecordingButton.style.backgroundColor = 'grey';
            playRecordingButton.innerHTML = 'RADIO v2.3';
        }, 28e3);
    }

    let buttonsHolder69 = document.createElement('div');

    let clicked69 = false;
    let activateImaginaryCardButton = document.createElement('button');
    activateImaginaryCardButton.innerHTML = localStorage.getItem('imaginaryCardActive') != null ? JSON.parse(localStorage.getItem('imaginaryCardActive')) == true ? 'DISABLE' : 'ENABLE' : 'ENABLE';
    activateImaginaryCardButton.style.width = 'auto';
    activateImaginaryCardButton.style.color = 'white';
    activateImaginaryCardButton.style.background = 'linear-gradient(to left top, black, #1e0c21)';
    activateImaginaryCardButton.onclick = () => {
        if (clicked69) return;
        clicked69 = true;
        sounds.machineActivate1.play();
        setTimeout(() => {
            sounds.machineActivate2.play();
            localStorage.setItem('imaginaryCardActive', localStorage.getItem('imaginaryCardActive') != null ? JSON.stringify(!JSON.parse(localStorage.getItem('imaginaryCardActive'))) : 'false');
            activateImaginaryCardButton.innerHTML = localStorage.getItem('imaginaryCardActive') != null ? JSON.parse(localStorage.getItem('imaginaryCardActive')) == true ? 'DISABLE' : 'ENABLE' : 'ENABLE';
            clicked69 = false;
        }, 2e3);
    }

    let cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.style.pointerEvents = 'none';
    cardDiv.style.background = 'linear-gradient(to left top, black, #1e0c21)';
    cardDiv.appendChild(document.createTextNode('ⅈ'));

    cardWrapper.appendChild(title_);
    cardWrapper.appendChild(cardDiv);
    mainWrapper.appendChild(cardWrapper);
    // --------------------------------------------------------------

    // ------------------------------------------------------

    let button = document.createElement('button');
    button.appendChild(document.createTextNode('ENTER'));
    button.onclick = () => {
        button.style.display = 'none';
        sounds.wind.play();

        const passwordDivHolder = document.createElement('div');

        passwordDivHolder.style.position = 'absolute';
        passwordDivHolder.style.transform = 'translate(-50%, -50%)';
        passwordDivHolder.style.top = '50%';
        passwordDivHolder.style.left = '50%';
        passwordDivHolder.id = 'thing';
        passwordDivHolder.style.display = 'flex';
        passwordDivHolder.style.flexWrap = 'wrap';
        passwordDivHolder.style.alignItems = 'center';
        passwordDivHolder.style.justifyContent = 'center';
        passwordDivHolder.style.backgroundColor = 'rgba(20, 20, 20, .8)';
        passwordDivHolder.style.width = '50%';
        passwordDivHolder.style.height = '50%';

        const cardsToMake = ['Pgn', 'Κ', '++', '--', '>>'];

        for (var index = 0; index < cardsToMake.length; index++) {
            const cardDiv2 = document.createElement('div');
            cardDiv2.className = 'card';
            cardDiv2.style.background = 'linear-gradient(#696763, rgba(20, 20, 20, .5))';
            cardDiv2.classList.toggle('buttonCard');
            cardDiv2.appendChild(document.createTextNode(cardsToMake[index]));
            cardDiv2.onclick = () => {
                sounds.button.play();
                cardDiv2.style.pointerEvents = 'none';
                cardDiv2.style.background = 'black';
                codeProcess(cardDiv2);
            }

            passwordDivHolder.appendChild(cardDiv2);
        }

        document.body.appendChild(passwordDivHolder);
    }
    mainWrapper.appendChild(button);
    // ------------------------------------------------------

    mainDiv.appendChild(mainWrapper);
    document.body.appendChild(mainDiv);

    // DOM selectors
    const stars = document.getElementById('stars');
    const starsCtx = stars.getContext('2d');

    // global variables
    let screen, starsElements, starsParams = { speed: 2, number: 300, extinction: 4 };

    // run stars
    setupStars();
    updateStars();

    // update stars on resize to keep them centered
    window.onresize = function () {
        setupStars();
    };

    // star constructor
    function Star() {
        this.x = Math.random() * stars.width;
        this.y = Math.random() * stars.height;
        this.z = Math.random() * stars.width;

        this.move = function () {
            this.z -= starsParams.speed;
            if (this.z <= 0) {
                this.z = stars.width;
            }
        };

        this.show = function () {
            let x, y, rad, opacity;
            x = (this.x - screen.c[0]) * (stars.width / this.z);
            x = x + screen.c[0];
            y = (this.y - screen.c[1]) * (stars.width / this.z);
            y = y + screen.c[1];
            rad = stars.width / this.z;
            opacity = (rad > starsParams.extinction) ? 1.5 * (2 - rad / starsParams.extinction) : 1;

            starsCtx.beginPath();
            starsCtx.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
            starsCtx.arc(x, y, rad, 0, Math.PI * 2);
            starsCtx.fill();
        }
    }

    // setup <canvas>, create all the starts
    function setupStars() {
        screen = {
            w: window.innerWidth,
            h: window.innerHeight,
            c: [window.innerWidth * 0.5, window.innerHeight * 0.5]
        };
        window.cancelAnimationFrame(updateStars);
        stars.width = screen.w;
        stars.height = screen.h;
        starsElements = [];
        for (let i = 0; i < starsParams.number; i++) {
            starsElements[i] = new Star();
        }
    }

    // redraw the frame
    function updateStars() {
        starsCtx.fillStyle = "black";
        starsCtx.fillRect(0, 0, stars.width, stars.height);
        starsElements.forEach(function (s) {
            s.show();
            s.move();
        });
        window.requestAnimationFrame(updateStars);
    }
})();
