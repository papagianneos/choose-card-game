// ---------------------------------------------------------------
// Ήχοι
// --------------------------------------------------------------

// Μουσικές
export const music = {
    menuMusic: new Howl({
        src: ['./audio/gameMenuMusic.mp3'],
        loop: true,
        autoplay: true
    }),

    gameMusic: new Howl({
        src: ['./audio/μουσική.mp3'],
        loop: true
    }),

    extremeModeGameMusic: new Howl({
        src: ['./audio/extreme_mode_music.mp3'],
        loop: true
    }),

    papagianneosFinaleMusic: new Howl({
        src: ['./audio/papagianneos_finale.mp3'],
        loop: true
    })
}

// Ήχοι Παιχνιδιού
export const sounds = {
    achievement: new Howl({
        src: ['./audio/achievement.mp3']
    }),

    cardOpen: new Howl({
        src: ['./audio/κλικ_κάρτας.mp3']
    }),

    cardOpenHardMode: new Howl({
        src: ['./audio/δύσκολο_κλικ_κάρτας.mp3']
    }),

    buttonClick: new Howl({
        src: ['./audio/click.mp3'],
    }),

    score: new Howl({
        src: ['./audio/score.mp3']
    }),

    scoreHardMode: new Howl({
        src: ['./audio/δύσκολο_score.mp3']
    }),

    win: new Howl({
        src: ['./audio/νίκη.mp3']
    }),

    loss: new Howl({
        src: ['./audio/κακό_λάθος.mp3']
    }),

    wrong: new Howl({
        src: ['./audio/λάθος.mp3']
    }),

    specialScore: new Howl({
        src: ['./audio/special_score.mp3']
    }),

    wow: new Howl({
        src: ['./audio/papagianneos_wow.mp3']
    }),

    pgnFinaleKCardEffect: new Howl({
        src: ['./audio/papagianneos_troll.mp3']
    }),

    angryPgn: new Howl({
        src: ['./audio/papagianneos_final_moment.mp3']
    }),

    pgnFinaleWin: new Howl({
        src: ['./audio/papagianneos_msg.mp3'],
    }),

    pgnLaugh1: new Howl({
        src: ['./audio/papagianneos_laugh.mp3'],
    }),

    pgnLaugh2: new Howl({
        src: ['./audio/papagianneos_laugh_2.mp3'],
    })
}

// --------------------------------------------------------------