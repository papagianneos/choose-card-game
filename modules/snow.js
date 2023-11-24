let snowflakesCount = 200;
let baseCss = ``;

let bodyHeightPx = null;
let pageHeightVh = null;

let snowBox = document.createElement('div');
snowBox.id = 'snow';

function setHeightVariables() {
    bodyHeightPx = document.body.offsetHeight;
    pageHeightVh = (100 * bodyHeightPx / window.innerHeight);
}

function getSnowAttributes() {
    const snowWrapper = document.getElementById('snow');
    if (snowWrapper) {
        snowflakesCount = Number(
            snowWrapper.attributes?.count?.value || snowflakesCount
        );
    }
}

// Creating snowflakes
function spawnSnow(snowDensity = 200) {
    snowDensity -= 1;

    for (let i = 0; i < snowDensity; i++) {
        let board = document.createElement('div');
        board.className = "snowflake";

        document.getElementById('snow').appendChild(board);
    }
}

// Append style for each snowflake to the head
function addCss(rule) {
    let css = document.createElement('style');
    css.appendChild(document.createTextNode(rule)); // Support for the rest
    document.getElementsByTagName("head")[0].appendChild(css);
}

// Math
function randomInt(value = 100) {
    return Math.floor(Math.random() * value) + 1;
}

function randomIntRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// Create style for snowflake
function spawnSnowCSS(snowDensity = 200) {
    let snowflakeName = "snowflake";
    let rule = baseCss;

    for (let i = 1; i < snowDensity; i++) {
        let randomX = Math.random() * 100; // vw
        let randomOffset = Math.random() * 10 // vw;
        let randomXEnd = randomX + randomOffset;
        let randomXEndYoyo = randomX + (randomOffset / 2);
        let randomYoyoTime = getRandomArbitrary(0.3, 0.8);
        let randomYoyoY = randomYoyoTime * pageHeightVh; // vh
        let randomScale = Math.random();
        let fallDuration = randomIntRange(10, pageHeightVh / 10 * 3); // s
        let fallDelay = randomInt(pageHeightVh / 10 * 3) * -1; // s
        let opacity = Math.random();

        rule += `
      .${snowflakeName}:nth-child(${i}) {
        opacity: ${opacity};
        transform: translate(${randomX}vw, -10px) scale(${randomScale});
        animation: fall-${i} ${fallDuration}s ${fallDelay}s linear infinite;
      }
      @keyframes fall-${i} {
        ${randomYoyoTime * 100}% {
          transform: translate(${randomXEnd}vw, ${randomYoyoY}vh) scale(${randomScale});
        }
        to {
          transform: translate(${randomXEndYoyo}vw, ${pageHeightVh}vh) scale(${randomScale});
        }
      }
    `
    }
    addCss(rule);
}

// Load the rules and execute after the DOM loads
export const createSnow = () => {
    document.getElementsByTagName('body')[0].appendChild(snowBox);
    setHeightVariables();
    getSnowAttributes();
    spawnSnowCSS(snowflakesCount);
    spawnSnow(snowflakesCount);
};
