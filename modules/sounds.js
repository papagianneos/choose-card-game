// ---------------------------------------------------------------
// Ήχοι
// --------------------------------------------------------------

// Μουσικές
export const music = {
    menuMusic: new Howl({
        src: ['./audio/Main_Menu.mp3'],
        loop: false,
    }),

    menuMusicOG: new Howl({
        src: ['./audio/gameMenuMusic.mp3'],
        loop: true,
    }),

    gameMusic: new Howl({
        src: ['./audio/music.mp3'],
        loop: true
    }),

    gameMusicOG: new Howl({
        src: ['./audio/μουσική.mp3'],
        loop: true
    }),

    extremeModeGameMusic: new Howl({
        src: ['./audio/extreme_mode_music.mp3'],
        loop: true
    }),

    papagianneosFinaleMusic: new Howl({
        src: ['./audio/papagianneos_finale_music_v2.mp3'],
        loop: true
    }),

    timeLevelMusic: new Howl({
        src: ['./audio/time_level_music.mp3'],
        loop: true,
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
    }),

    null: new Howl({
        src: ['./audio/null.mp3']
    }),

    timeCardEffect: new Howl({
        src: ['./audio/time_card_effect.mp3']
    }),

    timeSlower: new Howl({
        src: ['./audio/time_slower.mp3']
    })
}

// --------------------------------------------------------------
