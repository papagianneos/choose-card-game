import { LANGUAGE_INDEX, LANGUAGE_DATA } from "./languages.js";

// Για τις σπεσιαλ κάρτες (πληροφορίες για setup)
export const specialCardsConfig = {
    plus_plus: { // +10 Score
        shape: '++',
        color: 'radial-gradient(darkgreen, white)',
        info: '+10 Score'
    },

    doubler: { // Διπλό Score
        shape: 'x2',
        color: 'radial-gradient(#8a8c16, #8a8c16, gold)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX].info_special_card_x2
    },

    halfer: { // Μισό Score
        shape: '½',
        color: 'radial-gradient(cyan, red)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX]['info_special_card_1/2']
    },

    tries_boost_2: { // 2 λιγότερες προσπάθειες
        shape: 'T-2',
        color: 'radial-gradient(#00fc82, #84b89f)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX]['info_special_card_T-2']
    },

    minus_minus: { // -10 Score
        shape: '--',
        color: 'radial-gradient(black, #4a1313)',
        info: '-10 Score'
    },

    death: { // Πάει χάθηκε το παιχνίδι
        shape: '†',
        color: 'radial-gradient(#1c0b0e, #b8707d)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX].info_special_card_cross
    },

    pgn: { // Ουάου
        shape: 'Pgn',
        color: 'radial-gradient(#adfff1, #265175)',
        info: 'PAPAGIANNEOS SPEECH'
    },

    redacted_K: { // friend :)
        shape: 'Κ',
        color: 'radial-gradient(#ac86b0, #781f82)',
        info: '???'
    },

    triangle: { // kaboom
        shape: '▲',
        color: 'radial-gradient(orange, red)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX].info_special_card_triangle,
    },

    omega: {
        shape: 'Ω',
        color: 'radial-gradient(gold, gold, gold, brown, brown)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX].info_special_card_omega,
    },

    eye: {
        shape: '👁',
        color: 'radial-gradient(black, black, white)',
        info: 'The eye sees..'
    },


    null: {// NULL
        shape: 'Ø',
        color: 'radial-gradient(black, green, black)',
        info: 'null'
    },

    shapeshifter: {
        shape: '[?]',
        color: 'transparent',
        info: LANGUAGE_DATA[LANGUAGE_INDEX].info_special_card_troll
    },

    // ------------------------------------------------------------------------
    // TIMED Mode Cards.
    // ------------------------------------------------------------------------
    clock: {
        shape: '◕',
        color: 'radial-gradient(#3d1406, #8ca7cf)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX].info_special_card_clock,
        noSpawnInFinale: true,
        exclusiveMode: 'timed'
    },

    // slow down time
    time_slower: {
        shape: '<<',
        color: 'radial-gradient(#0800ff, #00ff77)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX].info_special_card_slow,
        noSpawnInFinale: true,
        exclusiveMode: 'timed'
    },

    
    clock_gold: {
        shape: '◔',
        color: 'conic-gradient(rgb(54, 0, 69), gold, rgb(54, 0, 69)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX].info_special_card_clock_gold,
        exclusiveMode: 'timed'
    },

    freezer: {
        shape: '⨍',
        color: 'conic-gradient(#465c8f, #92edf0, #465c8f, #92edf0, #465c8f, #92edf0, #465c8f)',
        info: 'TODO',
        exclusiveMode: 'timed'
    },
    // ------------------------------------------------------------------------

    lamda: {
        shape: 'Λ',
        color: 'radial-gradient(#98AFC7, #0C090A)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX].info_special_card_lamda,
    },

    sigma: {
        shape: '∑',
        color: 'animation color lol',
        info: LANGUAGE_DATA[LANGUAGE_INDEX].info_special_card_sigma,
        noSpawnInFinale: true
    },

    engood: {
        shape: 'Eng',
        color: 'url(/img/engood-avatar.png) no-repeat',
        info: 'I am a gamer. I play geometry dash, age of civilizations and minecraft.',
        noSpawnInFinale: true
    },

    carbon69: {
        shape: 'Ⅽ₆₉',
        color: 'linear-gradient(to left top, purple, blue, cyan, green, lime)',
        info: 'The mighty Carbon 69, only the chosen one can unlock it\'s identity.',
        noSpawnInFinale: true,
        exclusiveMode: 'cobalt',
    },

    infinity: {
        shape: '∞',
        color: 'conic-gradient(red, blue, green, yellow, purple, red)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX]['info_special_card_wild_card'],
        exclusiveMode: 'cobalt',
        noSpawnInFinale: true
    },

    tries_boost_6: { // 6 λιγότερες προσπάθειες
        shape: 'T-6',
        color: 'radial-gradient(purple, red)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX]['info_special_card_T-6'],
        exclusiveMode: 'cobalt',
        noSpawnInFinale: true
    },

    quadupler: { // Πενταπλό Score
        shape: 'x4',
        color: 'radial-gradient(black, darkblue)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX].info_special_card_x4,
        exclusiveMode: 'cobalt',
        noSpawnInFinale: true
    },

    pi: { // PI
        shape: '∏',
        color: 'linear-gradient(-45deg, red, orange, yellow, green, blue, indigo, violet)',
        info: '3 . 1 4 ...',
        exclusiveMode: 'cobalt',
        noSpawnInFinale: true
    },

    imaginary_unit: { // Universe-Swap
        shape: 'ⅈ',
        color: 'linear-gradient(to left top, black, #1e0c21)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX].info_special_card_universe_swap,
        noSpawnInFinale: true,
        neverSpawn: true
    },
    
    redacted_D: { // Δ
        shape: 'Δ',
        color: 'radial-gradient(#0ee2ed, #1483ba)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX].info_special_card_delta,
        noSpawnInFinale: true,
        neverSpawn: true
    },

    aleph: { // ALEPH
        shape: 'ℵ',
        color: 'radial-gradient(#292929, black)',
        info: 'TypeError: Aleph can\'t be described.',
        noSpawnInFinale: true,
    },

    lifesaver: {
        shape: '♡',
        color: 'conic-gradient(maroon, magenta, maroon)',
        info: LANGUAGE_DATA[LANGUAGE_INDEX].info_special_card_lifesaver,
    },
};
