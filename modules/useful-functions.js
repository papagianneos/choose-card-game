import { LANGUAGE_DATA, LANGUAGE_INDEX } from "./languages.js";

const irandom = i => {
    let max = Math.floor(i);
    return Math.floor(Math.random() * (max + 1));
};

export const randomChoice = arr => {
    return arr[irandom(arr.length - 1)];
};

// For Penalty mode.
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateRandomHexColor = () => {
   /* const HEX_DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];

    let hexColor = "#";

    // ---------------------------------------------------------------------------
    // Επειδή υπάρχει περίπτωση να μην γίνει σωστά το generation χρώματος.
    // ---------------------------------------------------------------------------
    while (hexColor.length < 7) {
        hexColor += randomChoice(HEX_DIGITS);
    }
    // ---------------------------------------------------------------------------

    return hexColor;*/
    // NEW
    let r = Math.floor(Math.random() * 256).toString(16); // red
    if (r.length == 1) r = '0' + r;
    let g = Math.floor(Math.random() * 256).toString(16); // green
    if (g.length == 1) g = '0' + g;
    let b = Math.floor(Math.random() * 256).toString(16); // blue
    if (b.length == 1) b = '0' + b;
    return '#' + r + g + b;
}

export const createLoader = () => {
    // Pgn card loader
    let loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerText = 'Pgn';

    // Loading Text
    let loadingText = document.createElement('h3');
    loadingText.appendChild(document.createTextNode(LANGUAGE_DATA[LANGUAGE_INDEX].loading));
    loader.appendChild(loadingText);

    document.body.appendChild(loader);
    return loader;
}

// Performance Handle
(function (window) {

    'use strict';

    var lastTime = 0;
    var prefixes = 'webkit moz ms o'.split(' ');
    // get unprefixed rAF and cAF, if present
    var requestAnimationFrame = window.requestAnimationFrame;
    var cancelAnimationFrame = window.cancelAnimationFrame;
    // loop through vendor prefixes and get prefixed rAF and cAF
    var prefix;
    for (var i = 0; i < prefixes.length; i++) {
        if (requestAnimationFrame && cancelAnimationFrame) {
            break;
        }
        prefix = prefixes[i];
        requestAnimationFrame = requestAnimationFrame || window[prefix + 'RequestAnimationFrame'];
        cancelAnimationFrame = cancelAnimationFrame || window[prefix + 'CancelAnimationFrame'] ||
            window[prefix + 'CancelRequestAnimationFrame'];
    }

    // fallback to setTimeout and clearTimeout if either request/cancel is not supported
    if (!requestAnimationFrame || !cancelAnimationFrame) {
        requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

        cancelAnimationFrame = function (id) {
            window.clearTimeout(id);
        };
    }

    // put in global namespace
    window.requestAnimationFrame = requestAnimationFrame;
    window.cancelAnimationFrame = cancelAnimationFrame;

})(window);

export function setTimeoutWithRAF(callback, ms) {
    let startTime = Date.now();
    let remainingTime = ms;

    function animate() {
        if (remainingTime <= 0) {
            return callback();
        }

        remainingTime -= (Date.now() - startTime);
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

export function shuffle(givenArray) {
    for (let i = givenArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [givenArray[i], givenArray[j]] = [givenArray[j], givenArray[i]];
    }
    return givenArray;
}

Object.filter = (obj, predicate) =>
    Object.keys(obj)
        .filter(key => predicate(obj[key]))
        .reduce((res, key) => (res[key] = obj[key], res), {});
