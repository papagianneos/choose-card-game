(() => {
    document.getElementsByTagName('body')[0].style.backgroundImage = 'none';

    let ambientSound = new Audio('../audio/wind.mp3');

    ambientSound.loop = true;

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

    let cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.style.pointerEvents = 'none';
    cardDiv.style.background = 'radial-gradient(black, black, maroon)';
    cardDiv.appendChild(document.createTextNode(':_'));

    cardWrapper.appendChild(title_);
    cardWrapper.appendChild(cardDiv);
    mainWrapper.appendChild(cardWrapper);
    // --------------------------------------------------------------

    // ------------------------------------------------------
    let button = document.createElement('button');
    button.appendChild(document.createTextNode('ENTER'));
    button.onclick = () => {
        button.style.display = 'none';
        ambientSound.play();
        cardWrapper.style.display = 'block';
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