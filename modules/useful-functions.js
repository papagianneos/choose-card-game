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

export const getFPS = () => {
    let prevTime = Date.now(),
        frames = 0;

    requestAnimationFrame(function loop() {
        const time = Date.now();
        frames++;
        if (time > prevTime + 1000) {
            let fps = Math.round((frames * 1000) / (time - prevTime));
            prevTime = time;
            frames = 0;

            return fps;
        }

        requestAnimationFrame(loop);
    });
}
