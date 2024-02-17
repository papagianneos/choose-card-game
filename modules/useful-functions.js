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
    const HEX_DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];

    let hexColor = "#";

    // ---------------------------------------------------------------------------
    // Επειδή υπάρχει περίπτωση να μην γίνει σωστά το generation χρώματος.
    // ---------------------------------------------------------------------------
    while (hexColor.length < 7) {
        hexColor += randomChoice(HEX_DIGITS);
    }
    // ---------------------------------------------------------------------------

    return hexColor;
}

export const requestAnimationFrame = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : (function() {
    var lastTimestamp = Date.now(),
        now,
        timeout;
    return function(callback) {
        now = Date.now();
        timeout = Math.max(0, timestep - (now - lastTimestamp));
        lastTimestamp = now + timeout;
        return setTimeout(function() {
            callback(now + timeout);
        }, timeout);
    };
})();

export const cancelAnimationFrame = typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame : clearTimeout;
