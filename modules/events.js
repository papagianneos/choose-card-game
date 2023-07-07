import { createSnow } from './snow.js';

export const christmasDecorationsEnabled = new Date().getDate() > 10 && new Date().getMonth() == 11; // December 10th+
export const pgnBirthday = (new Date().getDate() == 15 && new Date().getMonth() == 5) || (new Date().getDate() == 6 && new Date().getMonth() == 7) || (new Date().getDate() == 21 && new Date().getMonth() == 7); // June 15th, August 6th & August 21st (Redacted's Birthday)
export const aprilFools = new Date().getDate() == 1 && new Date().getMonth() == 3; // April 1st
export let skinsDisabled = false;

export const idkSomeFunctionSoItRuns = (() => {
    // April Fools!
    if (aprilFools) {
        document.getElementsByTagName('link')[0].href = './img/game-logo-old.png';
    }

    // ------------------------------------------------------------------------------------
    // Για τα γεννέθλια του developer Pgn, βάλε κονφετί στην σελίδα.
    // ------------------------------------------------------------------------------------
    if (pgnBirthday) {
        skinsDisabled = true;
        const irandom = i => {
            let max = Math.floor(i);
            return Math.floor(Math.random() * (max + 1));
        };

        const randomChoice = arr => {
            return arr[irandom(arr.length - 1)];
        };

        document.getElementsByClassName('confetti')[0].style.visibility = 'visible';
        document.getElementsByClassName('confetti-container')[0].style.visibility = 'visible';

        let confetti = document.getElementsByClassName('confetti')[0];

        const CONFETTI_SHAPES = [
            'square',
            'hexagram',
            'rectangle',
            'pentagram',
            'dodecagram',
            'wavy-line',
        ];

        for (var i = 0; i < confetti.children.length; i++) {
            let child = confetti.children[i];
            child.className = randomChoice(CONFETTI_SHAPES);
        }
    }
    // ------------------------------------------------------------------------------------

    // Christmas Decorations
    if (christmasDecorationsEnabled) {
        window.onload = createSnow;
        document.getElementById('snow').style.visibility = 'visible';

        setTimeout(() => {
            for (var button of document.getElementsByTagName('button')) {
                button.style.boxShadow = 'rgba(255, 255, 255, 1) 0px 50px 50px inset, rgba(255, 255, 255, 1) 0px -8px 3px inset';
                button.style.color = '#c8c8c8';
            }
        }, 1e3);
    }
})();
