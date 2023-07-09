export const generateRandomHexColor = () => {
    const HEX_DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];

    let hexColor = "#"

    // ---------------------------------------------------------------------------
    // Επειδή υπάρχει περίπτωση να μην γίνει σωστά το generation χρώματος.
    // ---------------------------------------------------------------------------
    while (hexColor.length < 7) {
        hexColor += HEX_DIGITS[Math.round(Math.random() * HEX_DIGITS.length)]
    }
    // ---------------------------------------------------------------------------

    return hexColor;
}