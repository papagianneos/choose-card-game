import { sounds } from "./sounds.js";
import { LANGUAGE_INDEX, LANGUAGE_DATA } from "./languages.js";

// Διάβασε πληροφορίες αρχικά
export let FETCHED_ACHIEVEMENT_DATA = localStorage.getItem('achievementData') != null ? JSON.parse(localStorage.getItem('achievementData')) : [];

// Αν δεν διάβασε τίποτα στη μνήμη βάλε δικές σου πληροφορίες (default)
export const checkForMemoryRead = () => {
    if (FETCHED_ACHIEVEMENT_DATA.length == 0) {
        achievementsConfig.forEach(achievement => {
            FETCHED_ACHIEVEMENT_DATA.push(achievement);
        })
    }

    // ===================================================================================================================
    // https://stackoverflow.com/questions/62918608/unable-to-update-an-array-of-objects-with-another-array-of-objects
    // ===================================================================================================================
    if (FETCHED_ACHIEVEMENT_DATA.length < achievementsConfig.length) {
        const res = achievementsConfig.reduce((acc, curr) => {
            const stored = FETCHED_ACHIEVEMENT_DATA.find(({ name }) => name === curr.name);
            if (stored) {
                acc.push(stored);
            } else {
                acc.push(curr);
            }
            return acc;
        }, []);
        FETCHED_ACHIEVEMENT_DATA = res;
        localStorage.setItem('achievementData', JSON.stringify(FETCHED_ACHIEVEMENT_DATA));
    }
    // ===================================================================================================================
}

export const searchForAchievement = (achievementSearchTerm) => {
    for (var achievementData of FETCHED_ACHIEVEMENT_DATA) {
        if (achievementSearchTerm.id == achievementData.id) {
            return achievementData;
        }
    }
}

// ------------------------------------------------------------------------------------------------------------------
// Επιτεύγματα Setup.
// ------------------------------------------------------------------------------------------------------------------
export let achievementsConfig = [
    {
        id: 'ach_new_player',
        color: 'maroon',
        unlocked: false
    },

    {
        id: 'ach_first_combination',
        color: 'green',
        unlocked: false
    },

    {
        id: 'ach_first_special_card',
        color: 'blue',
        unlocked: false
    },

    {
        id: 'ach_normal_mode_win',
        color: 'lime',
        unlocked: false
    },

    {
        id: 'ach_hard_mode_win',
        color: 'maroon',
        unlocked: false
    },

    {
        id: 'ach_challenge_mode_win',
        color: '#2f173b',
        unlocked: false
    },

    {
        id: 'ach_extreme_mode_win',
        color: '#290202',
        unlocked: false
    },

    {
        id: 'ach_pgn_finale_win',
        color: 'cyan',
        unlocked: false
    },

    {
        id: 'ach_beginner',
        progress: 0,
        requiredProgress: 10,
        color: 'purple',
        unlocked: false
    },

    {
        id: 'ach_10_tries',
        progress: 0,
        requiredProgress: 10,
        color: '#a83262',
        unlocked: false
    },

    {
        id: 'ach_50_tries',
        progress: 0,
        requiredProgress: 50,
        color: '#c79d63',
        unlocked: false
    },

    {
        id: 'ach_100_tries',
        progress: 0,
        requiredProgress: 100,
        color: '#6b98c7',
        unlocked: false
    },

    {
        id: 'ach_special_K_card',
        color: 'radial-gradient(#ac86b0, #781f82)',
        unlocked: false
    },

    {
        id: 'ach_win_any_20',
        progress: 0,
        requiredProgress: 20,
        color: '#cfa5bf',
        unlocked: false
    },

    {
        id: 'ach_score_100',
        progress: 0,
        requiredProgress: 100,
        color: '#a5cfca',
        unlocked: false
    },

    {
        id: 'ach_somewhat_experienced',
        progress: 0,
        requiredProgress: 50,
        color: '#211026',
        unlocked: false
    },

    {
        id: 'ach_2x05',
        color: 'linear-gradient(to right top, #7c6280, #6d4d72, #5e3964, #502457, #410d49)',
        unlocked: false
    },

    {
        id: 'ach_expert',
        progress: 0,
        requiredProgress: 100,
        color: '#88a690',
        unlocked: false
    },

    {
        id: 'ach_cross_card_found',
        color: 'radial-gradient(#1c0b0e, #b8707d)',
        unlocked: false
    },

    {
        id: "ach_pgn_card_found",
        color: 'radial-gradient(#adfff1, #265175)',
        unlocked: false
    },

    {
        id: "ach_skill_issue",
        progress: 0,
        requiredProgress: 3,
        color: '#1c2e2a',
        unlocked: false
    },

    {
        id: "ach_boom_card_found",
        color: 'radial-gradient(orange, red)',
        unlocked: false
    },

    {
        id: "ach_xray_card_found",
        color: 'radial-gradient(gold, gold, gold, brown, brown)',
        unlocked: false
    },

    {
        id: "ach_score_1k",
        progress: 0,
        requiredProgress: 1e3,
        color: 'firebrick',
        unlocked: false
    },

    {
        name: 'bals?!?!?',
        desc: 'b a l',
        id: "ach_bals",
        progress: 0,
        requiredProgress: 69,
        color: '#1b4035',
        unlocked: false,
        dontShowProgress: true,
        alreadyTranslated: true
    },

    {
        id: "ach_pgn_finale_twice",
        progress: 0,
        requiredProgress: 2,
        color: 'radial-gradient(maroon, #1b4035)',
        unlocked: false,
        dontShowProgress: true
    },

    {
        id: "ach_impostor_card_found",
        color: 'radial-gradient(lime, green, cyan)',
        unlocked: false
    },

    {
        id: 'ach_peter',
        color: 'cyan',
        unlocked: false
    },

    {
        id: 'ach_timed_mode_win',
        color: 'radial-gradient(gold, yellow)',
        unlocked: false
    },

    {
        id: 'ach_timed_mode_slow_card',
        color: 'radial-gradient(#0800ff, #00ff77)'
    },

    {
        id: 'ach_timed_special_card',
        color: 'radial-gradient(#3d1406, #8ca7cf)',
        unlocked: false
    },

    {
        name: '[REDACTED]',
        desc: '???',
        id: 'ach_redacted',
        color: 'radial-gradient(#ac86b0, #781f82)',
        unlocked: false,
        alreadyTranslated: true
    },

    {
        id: 'ach_memory_loss',
        color: 'radial-gradient(#98AFC7, #0C090A)',
        unlocked: false
    },

    {
        id: 'ach_hunter',
        progress: 0,
        requiredProgress: 15,
        color: 'radial-gradient(red, magenta)',
        unlocked: false
    },

    {
        id: 'ach_sigma_card',
        color: 'radial-gradient(brown, black)',
        unlocked: false
    },

    {
        id: 'ach_deceiver',
        progress: 0,
        requiredProgress: 50,
        color: '#82edc6',
        unlocked: false
    },

    {
        id: 'ach_win_any_50',
        progress: 0,
        requiredProgress: 50,
        color: '#2a2b15',
        unlocked: false
    },

    {
        id: 'ach_lose_10',
        progress: 0,
        requiredProgress: 10,
        color: '#000738',
        unlocked: false
    },

    {
        id: 'ach_lose_50',
        progress: 0,
        requiredProgress: 50,
        color: '#381600',
        unlocked: false
    },

    {
        id: 'ach_win_virus',
        color: 'radial-gradient(red, black)',
        unlocked: false
    },

    {
        id: 'ach_fantastic',
        color: 'linear-gradient(to left top, black, #1e0c21)',
        unlocked: false
    },

    {
        name: 'π',
        desc: '3 . 1 4',
        id: 'ach_PI',
        color: 'url(/img/PI.jpg)',
        unlocked: false,
        alreadyTranslated: true
    },

    {
        id: 'ach_win_hell',
        color: 'conic-gradient(red, orange, black, maroon, red)',
        unlocked: false
    },

    // ----------------------------------------------
    // ΤΡΟΠΑΙΑ
    // ----------------------------------------------
    {
        id: 'tr_master_of_cards',
        progress: 0,
        requiredProgress: 1e4,
        color: 'radial-gradient(#f5d505, #d67400)',
        trophy: true,
        unlocked: false
    },

    {
        id: 'tr_million_score',
        progress: 0,
        requiredProgress: 1e6,
        color: 'radial-gradient(#f5d505, #d67400)',
        trophy: true,
        unlocked: false
    },

    {
        id: 'tr_10k_tries',
        progress: 0,
        requiredProgress: 1e4,
        color: 'radial-gradient(#f5d505, #d67400)',
        trophy: true,
        unlocked: false
    },

    {
        id: 'tr_win_any_1k',
        progress: 0,
        requiredProgress: 1e3,
        color: 'radial-gradient(#f5d505, #d67400)',
        trophy: true,
        unlocked: false
    },
    // -----------------------------------------------
];
// ------------------------------------------------------------------------------------------------------------------

// Translation Setup.
achievementsConfig.forEach(achievement => {
    if (!achievement.alreadyTranslated) {
        achievement.name = LANGUAGE_DATA[LANGUAGE_INDEX][achievement.id].name;
        achievement.desc = LANGUAGE_DATA[LANGUAGE_INDEX][achievement.id].desc;
    }
});

// Συνάρτηση που ξεκλειδώνει ένα συγκεκριμένο επίτευγμα με βάση την ταυτότητά του.
export const unlockAchievement = (achievementID, givenProgressToUpdate = 1) => {
    checkForMemoryRead();
    let achievementThatWasUnlocked = undefined,
        achievementThatWasUnlockedIndex = undefined,
        progressOfAchievementMade = false;

    // Αναζήτησε το επίτευγμα στη λίστα με βάση τη ταυτότητά του.
    for (var achievementDataIndex = 0; achievementDataIndex < FETCHED_ACHIEVEMENT_DATA.length; achievementDataIndex++) {
        if (achievementID == FETCHED_ACHIEVEMENT_DATA[achievementDataIndex].id) {
            achievementThatWasUnlocked = FETCHED_ACHIEVEMENT_DATA[achievementDataIndex];
            achievementThatWasUnlockedIndex = achievementDataIndex;
        }
    }

    // Κάποια επιτεύγματα χρειάζονται παραπάνω πράγματα..
    if (achievementThatWasUnlocked.requiredProgress) {
        if (achievementThatWasUnlocked.requiredProgress > achievementThatWasUnlocked.progress) {
            achievementThatWasUnlocked.progress += givenProgressToUpdate;

            // Ενημέρωσε την μνήμη.
            FETCHED_ACHIEVEMENT_DATA[achievementThatWasUnlockedIndex].progress = achievementThatWasUnlocked.progress;
            localStorage.setItem('achievementData', JSON.stringify(FETCHED_ACHIEVEMENT_DATA));
        }

        // Για τον έλεγχο.
        progressOfAchievementMade = achievementThatWasUnlocked.progress < achievementThatWasUnlocked.requiredProgress;
    }

    // Αν έχει είδη ξεκλειδωθέι ή δεν έχει μαζέψει αρκετά ο παίχτης, μην κάνεις τίποτα.
    if (achievementThatWasUnlocked.unlocked || progressOfAchievementMade) return;

    // Ενημέρωσε την μνήμη.
    achievementThatWasUnlocked.unlocked = true;
    FETCHED_ACHIEVEMENT_DATA[achievementThatWasUnlockedIndex].unlocked = true;
    localStorage.setItem('achievementData', JSON.stringify(FETCHED_ACHIEVEMENT_DATA));

    // Δημιούργησε ένα "κουτί" πληροφοριών και εμφάνισέ το στον παίχτη.
    let achievementNotifBox = document.createElement('div');
    achievementNotifBox.className = "achievementUnlockedNotification";
    achievementNotifBox.style.background = achievementThatWasUnlocked.color;

    let tempDiv = document.createElement('div');
    tempDiv.className = 'tempDiv';

    // Τίτλος (που λέει ότι ξεκλειδώθηκε)
    let achievementNotifTitle = document.createElement('h1');
    achievementNotifTitle.appendChild(document.createTextNode(`${LANGUAGE_DATA[LANGUAGE_INDEX].new} ${achievementThatWasUnlocked.trophy ? LANGUAGE_DATA[LANGUAGE_INDEX].trophy : LANGUAGE_DATA[LANGUAGE_INDEX].achievement}!`));
    achievementNotifTitle.style.fontSize = '25px';

    // Δείξε ποιό επίτευγμα ξεκλειδώθηκε.
    let achievementNotifDesc = document.createElement('h3');

    // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // BUG FIX: Κάποια επιτεύγματα δεν χρειάζονται μετάφραση.
    // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    const text_here_lol = LANGUAGE_DATA[LANGUAGE_INDEX][achievementThatWasUnlocked.id] ? LANGUAGE_DATA[LANGUAGE_INDEX][achievementThatWasUnlocked.id].name : FETCHED_ACHIEVEMENT_DATA[achievementThatWasUnlockedIndex].name;
    // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    achievementNotifDesc.appendChild(document.createTextNode(text_here_lol));
    achievementNotifDesc.style.fontSize = '20px';

    setTimeout(() => {
        sounds.achievement.play();
        tempDiv.appendChild(achievementNotifTitle);
        achievementNotifBox.appendChild(tempDiv);
        achievementNotifBox.appendChild(achievementNotifDesc);
        document.body.appendChild(achievementNotifBox);
        achievementNotifBox.style.left = "50%";

        // Μετά από 9 δευτερόλεπτα, αφαίρεσέ το από την ιστοσελίδα.
        setTimeout(() => {
            achievementNotifBox.style.left = "-2500px";
            setTimeout(() => {
                document.body.removeChild(achievementNotifBox);
            }, 4e3);
        }, 5e3);
    }, document.getElementsByClassName('achievementUnlockedNotification').length > 0 ? 3e3 * document.getElementsByClassName('achievementUnlockedNotification').length : 0);
}
