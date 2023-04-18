import { sounds } from "./sounds.js";

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
        name: 'Νέος Παίχτης',
        desc: 'Καλωσόρισες στο παιχνίδι!',
        id: 'ach_new_player',
        color: 'maroon',
        unlocked: false
    },

    {
        name: 'Τα κατάφερα;',
        desc: 'Βρες το πρώτο ζευγάρι καρτών',
        id: 'ach_first_combination',
        color: 'green',
        unlocked: false
    },

    {
        name: 'Τι ήταν αυτό;',
        desc: 'Βρες μία σπεσιαλ κάρτα',
        id: 'ach_first_special_card',
        color: 'blue',
        unlocked: false
    },

    {
        name: 'Ευκολάκης',
        desc: 'Νίκησε το "απλό" mode.',
        id: 'ach_normal_mode_win',
        color: 'lime',
        unlocked: false
    },

    {
        name: 'Δύσκολος',
        desc: 'Νίκησε το "δύσκολο" mode.',
        id: 'ach_hard_mode_win',
        color: 'maroon',
        unlocked: false
    },

    {
        name: 'Challenger',
        desc: 'Νίκησε το "challege" mode.',
        id: 'ach_challenge_mode_win',
        color: '#2f173b',
        unlocked: false
    },

    {
        name: 'Εκδικητής',
        desc: 'Νίκησε το "extreme" mode.',
        id: 'ach_extreme_mode_win',
        color: '#290202',
        unlocked: false
    },

    {
        name: 'Το λάπτοπ του Pgn',
        desc: 'Νίκησε το "finale" mode.',
        id: 'ach_pgn_finale_win',
        color: 'cyan',
        unlocked: false
    },

    {
        name: 'Αρχάριος',
        desc: 'Βρες 10 κάρτες',
        id: 'ach_beginner',
        progress: 0,
        requiredProgress: 10,
        color: 'purple',
        unlocked: false
    },

    {
        name: 'Το μοιραίο λάθος',
        desc: 'Παίξε 10 Προσπάθειες',
        id: 'ach_10_tries',
        progress: 0,
        requiredProgress: 10,
        color: '#a83262',
        unlocked: false
    },

    {
        name: 'Λίγο ακόμα και θα..',
        desc: 'Παίξε 50 Προσπάθειες',
        id: 'ach_50_tries',
        progress: 0,
        requiredProgress: 50,
        color: '#c79d63',
        unlocked: false
    },

    {
        name: 'ΑΑΑΑΑ',
        desc: 'Παίξε 100 Προσπάθειες',
        id: 'ach_100_tries',
        progress: 0,
        requiredProgress: 100,
        color: '#6b98c7',
        unlocked: false
    },

    {
        name: ':)',
        desc: 'Βρες την σπεσιαλ "Κ" κάρτα.',
        id: 'ach_special_K_card',
        color: 'radial-gradient(#ac86b0, #781f82)',
        unlocked: false
    },

    {
        name: 'Τέρμα η μνήμη RAM',
        desc: 'Κέρδισε 20 φορές',
        id: 'ach_win_any_20',
        progress: 0,
        requiredProgress: 20,
        color: '#cfa5bf',
        unlocked: false
    },

    {
        name: 'Εκατοστάρα στη μάπα',
        desc: 'Κάνε 100 score',
        id: 'ach_score_100',
        progress: 0,
        requiredProgress: 100,
        color: '#a5cfca',
        unlocked: false
    },

    {
        name: "Έμπειρος",
        desc: 'Βρες 50 κάρτες',
        id: 'ach_somewhat_experienced',
        progress: 0,
        requiredProgress: 50,
        color: '#211026',
        unlocked: false
    },

    {
        name: "Κάπου το θυμάμαι αυτό..",
        desc: '???',
        id: 'ach_2x05',
        color: 'linear-gradient(to right top, #7c6280, #6d4d72, #5e3964, #502457, #410d49)',
        unlocked: false
    },

    {
        name: "Ειδικός",
        desc: 'Βρες 100 κάρτες',
        id: 'ach_expert',
        progress: 0,
        requiredProgress: 100,
        color: '#88a690',
        unlocked: false
    },

    {
        name: "Rest in pepperoni",
        desc: "Βρες την κάρτα με τον σταυρό",
        id: 'ach_cross_card_found',
        color: 'radial-gradient(#1c0b0e, #b8707d)',
        unlocked: false
    },

    {
        name: "Ουάου",
        desc: "Ο τίτλος το εξηγεί όλο",
        id: "ach_pgn_card_found",
        color: 'radial-gradient(#adfff1, #265175)',
        unlocked: false
    },

    {
        name: "Skill Issue",
        desc: "Κέρδισε 3 φορές με λιγότερο από 10 προσπάθειες.",
        id: "ach_skill_issue",
        progress: 0,
        requiredProgress: 3,
        color: '#1c2e2a',
        unlocked: false
    },

    {
        name: "T r i a n g l e",
        desc: "Και νομίζεις ότι δεν υπάρχει 'δύσκολο' mode..",
        id: "ach_boom_card_found",
        color: 'radial-gradient(orange, red)',
        unlocked: false
    },

    {
        name: 'Χάκερ!!11',
        desc: "ΓΙΑΤΙΙΙ ΧΑΚΑΡΕΣ ΤΟ GAME ΜΟΥΥΥΥΥ!!11",
        id: "ach_xray_card_found",
        color: 'radial-gradient(gold, gold, gold, brown, brown)',
        unlocked: false
    },

    {
        name: 'Δεν με ξέρεις καλά..',
        desc: "Κάνε 1000 score.",
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
        dontShowProgress: true
    },

    {
        name: 'Η Επιστροφή του Pgn',
        desc: 'Νίκησε το "finale" mode για δεύτερη φορά.',
        id: "ach_pgn_finale_twice",
        progress: 0,
        requiredProgress: 2,
        color: 'radial-gradient(maroon, #1b4035)',
        unlocked: false,
        dontShowProgress: true
    },

    {
        name: 'SkinWalker',
        desc: 'ΤΙ ΦΑΣΗ ΜΕ ΑΥΤΗ ΤΗ ΚΑΡΤΑ',
        id: "ach_impostor_card_found",
        color: 'radial-gradient(lime, green, cyan)',
        unlocked: false
    },

    {
        name: 'Σαν τον Πέτρο',
        desc: 'Βρες 3 σωστές κάρτες στη σειρά',
        id: 'ach_peter',
        color: 'cyan',
        unlocked: false
    },

    {
        name: 'SREEEEEEED',
        desc: 'Κέρδισε το "timed" mode.',
        id: 'ach_timed_mode_win',
        color: 'radial-gradient(gold, yellow)',
        unlocked: false
    },

    {
        name: 'Χελωνάρας',
        desc: 'Βρες την σπέσιαλ κάρτα που κάνει τον χρόνο αργότερο',
        id: 'ach_timed_mode_slow_card',
        color: 'radial-gradient(#0800ff, #00ff77)'
    },

    {
        name: 'Τι ρολόι είναι αυτό ρε;',
        desc: 'Βρες τη χρονική σπέσιαλ κάρτα',
        id: 'ach_timed_special_card',
        color: 'radial-gradient(#3d1406, #8ca7cf)',
        unlocked: false
    },

    {
        name: '[REDACTED]',
        desc: 'She is the best',
        id: 'ach_redacted',
        color: 'radial-gradient(#ac86b0, #781f82)',
        unlocked: false
    },

    {
        name: 'Απώλεια Μνήμης',
        desc: 'Σφάλμα 404',
        id: 'ach_memory_loss',
        color: 'radial-gradient(#98AFC7, #0C090A)',
        unlocked: false
    },

    {
        name: 'Κυνηγός',
        desc: 'Βρες 15 σπέσιαλ κάρτες',
        id: 'ach_hunter',
        progress: 0,
        requiredProgress: 15,
        color: 'radial-gradient(red, magenta)',
        unlocked: false
    },

    {
        name: 'Σ.. από.. Σωτήρης;',
        desc: 'Βρες το σπάνιο Σ.',
        id: 'ach_sigma_card',
        color: 'radial-gradient(brown, black)',
        unlocked: false
    },

    {
        name: 'Απατεών',
        desc: 'Βρες 50 σπέσιαλ κάρτες',
        id: 'ach_deceiver',
        progress: 0,
        requiredProgress: 50,
        color: '#82edc6',
        unlocked: false
    },

    {
        name: 'Παίχτης από Κουρδιστάν',
        desc: 'Κέρδισε 50 φορές',
        id: 'ach_win_any_50',
        progress: 0,
        requiredProgress: 50,
        color: '#2a2b15',
        unlocked: false
    },

    {
        name: 'Τι σκατά ρε',
        desc: 'Χάσε 10 φορές',
        id: 'ach_lose_10',
        progress: 0,
        requiredProgress: 10,
        color: '#000738',
        unlocked: false
    },

    {
        name: 'Ξέρω την αλφάβητο!',
        desc: 'Χάσε 50 φορές',
        id: 'ach_lose_50',
        progress: 0,
        requiredProgress: 50,
        color: '#381600',
        unlocked: false
    },

    {
        name: 'Λίγη κολλητική ταινία δε βλάπτει',
        desc: 'Νίκησε το "virus" mode.',
        id: 'ach_win_virus',
        color: 'radial-gradient(red, black)',
        unlocked: false
    },

    // ----------------------------------------------
    // ΤΡΟΠΑΙΑ
    // ----------------------------------------------
    {
        name: 'Δάσκαλος των Καρτών',
        desc: 'Βρες 10000 Κάρτες',
        id: 'tr_master_of_cards',
        progress: 0,
        requiredProgress: 1e4,
        color: 'radial-gradient(#f5d505, #d67400)',
        trophy: true,
        unlocked: false
    },

    {
        name: 'Εκατομμυριούχος',
        desc: 'Κάνε 1000000 Score',
        id: 'tr_million_score',
        progress: 0,
        requiredProgress: 1e6,
        color: 'radial-gradient(#f5d505, #d67400)',
        trophy: true,
        unlocked: false
    },

    {
        name: 'Τσαλαπετεινός',
        desc: 'Παίξε 10000 προσπάθειες',
        id: 'tr_10k_tries',
        progress: 0,
        requiredProgress: 1e4,
        color: 'radial-gradient(#f5d505, #d67400)',
        trophy: true,
        unlocked: false
    },

    {
        name: 'Βρες τον σωστό δάσκαλο',
        desc: 'Κέρδισε 1000 φορές',
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
    achievementNotifTitle.appendChild(document.createTextNode(`ΝΕΟ ${achievementThatWasUnlocked.trophy ? 'ΤΡΟΠΑΙΟ' : 'ΕΠΙΤΕΥΓΜΑ'}!`));
    achievementNotifTitle.style.fontSize = '25px';

    // Δείξε ποιό επίτευγμα ξεκλειδώθηκε.
    let achievementNotifDesc = document.createElement('h3');
    achievementNotifDesc.appendChild(document.createTextNode(achievementThatWasUnlocked.name));
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
