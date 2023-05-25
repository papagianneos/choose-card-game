import { LANGUAGE_INDEX, LANGUAGE_DATA } from "./languages.js";

// Για τις σπεσιαλ κάρτες (πληροφορίες για setup)
export const specialCardsConfig = [
    { // +10 Score
        shape: '++',
        color: 'radial-gradient(darkgreen, white)',
        info: '+10 Score'
    },

    { // Διπλό Score
        shape: 'x2',
        color: 'radial-gradient(#8a8c16, #8a8c16, gold)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX].info_special_card_x2
    },

    { // Μισό Score
        shape: '½',
        color: 'radial-gradient(cyan, red)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX]['info_special_card_1/2']
    },

    { // 2 λιγότερες προσπάθειες
        shape: 'T-2',
        color: 'radial-gradient(#00fc82, #84b89f)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX]['info_special_card_T-2']
    },

    { // -10 Score
        shape: '--',
        color: 'radial-gradient(black, #4a1313)',
        info: '-10 Score'
    },

    { // Πάει χάθηκε το παιχνίδι
        shape: '†',
        color: 'radial-gradient(#1c0b0e, #b8707d)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX].info_special_card_cross
    },

    { // Ουάου
        shape: 'Pgn',
        color: 'radial-gradient(#adfff1, #265175)',
        info: 'PAPAGIANNEOS SPEECH'
    },

    { // friend :)
        shape: 'Κ',
        color: 'radial-gradient(#ac86b0, #781f82)',
        info: '???'
    },

    { // kaboom
        shape: '▲',
        color: 'radial-gradient(orange, red)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX].info_special_card_triangle,
    },

    {
        shape: 'Ω',
        color: 'radial-gradient(gold, gold, gold, brown, brown)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX].info_special_card_omega,
    },

    {
        shape: '👁',
        color: 'radial-gradient(black, black, white)',
        info: 'The eye sees..'
    },


    {// NULL
        shape: 'Ø',
        color: 'radial-gradient(black, green, black)',
        info: 'null'
    },

    {
        shape: '[?]',
        color: 'transparent',
        info: LANGUAGE_DATA[LANGUAGE_INDEX].info_special_card_troll
    },

    // time card
    {
        shape: '◕',
        color: 'radial-gradient(#3d1406, #8ca7cf)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX].info_special_card_clock,
        noSpawnInFinale: true,
        exclusiveMode: 'timed'
    },

    // slow down time
    {
        shape: '<<',
        color: 'radial-gradient(#0800ff, #00ff77)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX].info_special_card_slow,
        noSpawnInFinale: true,
        exclusiveMode: 'timed'
    },

    {
        shape: 'Λ',
        color: 'radial-gradient(#98AFC7, #0C090A)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX].info_special_card_lamda,
    },

    {
        shape: '∑',
        color: 'animation color lol',
        info: LANGUAGE_DATA[LANGUAGE_INDEX].info_special_card_sigma,
        noSpawnInFinale: true
    },

    {
        shape: 'Eng',
        color: 'url(/img/engood-avatar.png) no-repeat',
        info: 'I am a gamer. I play geometry dash, age of civilizations and minecraft.',
        noSpawnInFinale: true
    },

    {
        shape: 'Ⅽ₆₉',
        color: 'linear-gradient(to left top, purple, blue, cyan, green, lime)',
        info: 'The mighty Carbon 69, only the chosen one can unlock it\'s identity.',
        noSpawnInFinale: true,
        exclusiveMode: 'cobalt',
    },

    {
        shape: '∞',
        color: 'linear-gradient(to left top, red, blue, green, yellow, purple)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX]['info_special_card_wild_card'],
        exclusiveMode: 'cobalt',
        noSpawnInFinale: true
    },

    { // 6 λιγότερες προσπάθειες
        shape: 'T-6',
        color: 'radial-gradient(purple, red)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX]['info_special_card_T-6'],
        exclusiveMode: 'cobalt',
        noSpawnInFinale: true
    },

    { // Πενταπλό Score
        shape: 'x4',
        color: 'radial-gradient(black, darkblue)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX].info_special_card_x4,
        exclusiveMode: 'cobalt',
        noSpawnInFinale: true
    },

    { // PI
        shape: '∏',
        color: 'linear-gradient(-45deg, red, orange, yellow, green, blue, indigo, violet)',
        info: '3 . 1 4 ...',
        exclusiveMode: 'cobalt',
        noSpawnInFinale: true
    },

    { // Universe-Swap
        shape: ']×[',
        color: 'linear-gradient(to left top, black, #1e0c21)',
        info: 'Universe Swap',
        noSpawnInFinale: true
    },
    
    { // Δ
        shape: 'Δ',
        color: 'radial-gradient(#0ee2ed, #1483ba)',
        info: 'Think smart, not hard!',
        noSpawnInFinale: true,
        neverSpawn: true
    }
];
