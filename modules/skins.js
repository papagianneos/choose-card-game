import { sounds } from "./sounds.js";
import { LANGUAGE_DATA, LANGUAGE_INDEX } from "./languages.js";
import { setTimeoutWithRAF } from "./useful-functions.js";

export const SKINS_CONFIG = {
    'no_skin': {
        name: LANGUAGE_DATA[LANGUAGE_INDEX].label_skin_no_skin,
        id: 'no_skin',
        bg: 'grey',
        pageBg: 'none',
    },

    'woody': {
        name: LANGUAGE_DATA[LANGUAGE_INDEX].label_skin_woody,
        id: 'woody',
        bg: 'url(/img/wood.png)',
        pageBg: 'url(/img/wood_bg.png)',
        progress: 0,
        requiredProgress: 25,
        locked: true
    },

    'metal': {
        name: LANGUAGE_DATA[LANGUAGE_INDEX].label_skin_metal,
        id: 'metal',
        bg: 'url(/img/metal.png)',
        pageBg: 'url(/img/metal_bg.png)',
        progress: 0,
        requiredProgress: 50,
        locked: true
    },

    'gradient': {
        name: LANGUAGE_DATA[LANGUAGE_INDEX].label_skin_gradient,
        id: 'gradient',
        bg: 'linear-gradient(to left top, grey, white)',
        displayBg: 'linear-gradient(to left top, red, blue)',
        pageBg: 'conic-gradient(black, grey, black)',
        progress: 0,
        requiredProgress: 25,
        locked: true
    },

    'window': {
        name: LANGUAGE_DATA[LANGUAGE_INDEX].label_skin_window,
        id: 'window',
        bg: 'url(/img/window.png)',
        displayBg: 'url(/img/window.png) center',
        pageBg: 'none',
        progress: 0,
        requiredProgress: 60,
        locked: true
    },

    'crystal': {
        name: LANGUAGE_DATA[LANGUAGE_INDEX].label_skin_crystal,
        id: 'crystal',
        bg: 'conic-gradient(from 60deg, blue, #68a0b1, #7fdffa, blue)',
        pageBg: 'url(/img/crystal_bg.png)',
        displayBg: 'url(/img/crystal_bg.png)',
        locked: true
    },

    'radian': {
        name: LANGUAGE_DATA[LANGUAGE_INDEX].label_skin_radian,
        id: 'radian',
        bg: 'repeating-linear-gradient(45deg, red, transparent 20px)',
        displayBg: 'repeating-linear-gradient(45deg, red, transparent 20px)',
        pageBg: 'none',
        locked: true
    },

    'target': {
        name: LANGUAGE_DATA[LANGUAGE_INDEX].label_skin_target,
        id: 'target',
        bg: 'repeating-radial-gradient(grey, transparent 40px)',
        displayBg: 'repeating-radial-gradient(grey, transparent 40px)',
        pageBg: 'none',
        locked: true
    },
};

export const skin__ = localStorage.getItem('selectedSkin') != null && localStorage.getItem('selectedSkin') in SKINS_CONFIG ? localStorage.getItem('selectedSkin') : 'no_skin';

let SKINS_CONFIG_ARRAY = [];
for (var skinObj of Object.values(SKINS_CONFIG)) SKINS_CONFIG_ARRAY.push(skinObj);

// Διάβασε πληροφορίες αρχικά
export let FETCHED_SKIN_DATA = localStorage.getItem('skinsData') != null ? JSON.parse(localStorage.getItem('skinsData')) : [];

// Αν δεν διάβασε τίποτα στη μνήμη βάλε δικές σου πληροφορίες (default)
if (FETCHED_SKIN_DATA.length == 0) {
    SKINS_CONFIG_ARRAY.forEach(skin => {
        FETCHED_SKIN_DATA.push(skin);
    })
    localStorage.setItem('skinsData', JSON.stringify(FETCHED_SKIN_DATA));
}

// ===================================================================================================================
// https://stackoverflow.com/questions/62918608/unable-to-update-an-array-of-objects-with-another-array-of-objects
// ===================================================================================================================
if (FETCHED_SKIN_DATA.length != Object.values(SKINS_CONFIG).length) {
    const res = SKINS_CONFIG_ARRAY.reduce((acc, curr) => {
        const stored = FETCHED_SKIN_DATA.find(({ name }) => name === curr.name);
        if (stored) {
            acc.push(stored);
        } else {
            acc.push(curr);
        }
        return acc;
    }, []);
    FETCHED_SKIN_DATA = res;
    localStorage.setItem('skinsData', JSON.stringify(FETCHED_SKIN_DATA));
}
// ===================================================================================================================

// Check for unlock
if (SKINS_CONFIG[skin__].locked) {
    let temp_obj = {};
    let index = -1;

    for (var skinIndex = 0; skinIndex < FETCHED_SKIN_DATA.length; skinIndex++) if (FETCHED_SKIN_DATA[skinIndex].id == skin__) index = skinIndex;
    for (var i = 0; i < FETCHED_SKIN_DATA.length; i++) temp_obj[skin__] = Object.values(FETCHED_SKIN_DATA)[index];

    if (temp_obj[skin__].locked) {
        localStorage.setItem('selectedSkin', 'no_skin');
    }
}

// Συνάρτηση που ξεκλειδώνει ένα συγκεκριμένο επίτευγμα με βάση την ταυτότητά του.
export const unlockSkin = (skinID, givenProgressToUpdate = 1) => {
    let skinThatWasUnlocked = undefined,
        skinThatWasUnlockedIndex = undefined,
        progressOfSkinMade = false;

    // Αναζήτησε το επίτευγμα στη λίστα με βάση τη ταυτότητά του.
    for (var skinDataIndex = 0; skinDataIndex < FETCHED_SKIN_DATA.length; skinDataIndex++) {
        if (skinID == FETCHED_SKIN_DATA[skinDataIndex].id) {
            skinThatWasUnlocked = FETCHED_SKIN_DATA[skinDataIndex];
            skinThatWasUnlockedIndex = skinDataIndex;
        }
    }

    // Κάποια επιτεύγματα χρειάζονται παραπάνω πράγματα..
    if (skinThatWasUnlocked.requiredProgress) {
        if (skinThatWasUnlocked.requiredProgress > skinThatWasUnlocked.progress) {
            skinThatWasUnlocked.progress += givenProgressToUpdate;

            // Ενημέρωσε την μνήμη.
            FETCHED_SKIN_DATA[skinThatWasUnlockedIndex].progress = skinThatWasUnlocked.progress;
            localStorage.setItem('skinsData', JSON.stringify(FETCHED_SKIN_DATA));
        }

        // Για τον έλεγχο.
        progressOfSkinMade = skinThatWasUnlocked.progress < skinThatWasUnlocked.requiredProgress;
    }

    // Αν έχει είδη ξεκλειδωθέι ή δεν έχει μαζέψει αρκετά ο παίχτης, μην κάνεις τίποτα.
    if (!skinThatWasUnlocked.locked || progressOfSkinMade) return;

    // Ενημέρωσε την μνήμη.
    skinThatWasUnlocked.locked = false;
    FETCHED_SKIN_DATA[skinThatWasUnlockedIndex].locked = false;
    localStorage.setItem('skinsData', JSON.stringify(FETCHED_SKIN_DATA));

    // Δημιούργησε ένα "κουτί" πληροφοριών και εμφάνισέ το στον παίχτη.
    let skinNotifBox = document.createElement('div');
    skinNotifBox.className = "skinUnlockedNotification";
    skinNotifBox.style.background = skinThatWasUnlocked.bg;

    let tempDiv = document.createElement('div');
    tempDiv.className = 'tempDiv';

    // Τίτλος (που λέει ότι ξεκλειδώθηκε)
    let skinNotifTitle = document.createElement('h1');
    skinNotifTitle.appendChild(document.createTextNode(`${LANGUAGE_DATA[LANGUAGE_INDEX].new} SKIN!`));
    skinNotifTitle.style.fontSize = '25px';

    // Δείξε ποιό επίτευγμα ξεκλειδώθηκε.
    let skinNotifDesc = document.createElement('h3');
    skinNotifDesc.appendChild(document.createTextNode(LANGUAGE_DATA[LANGUAGE_INDEX][`label_skin_${skinThatWasUnlocked.id}`] ? LANGUAGE_DATA[LANGUAGE_INDEX][`label_skin_${skinThatWasUnlocked.id}`] : FETCHED_SKIN_DATA[skinThatWasUnlockedIndex].name));
    skinNotifDesc.style.fontSize = '20px';

    sounds.achievement.play();
    tempDiv.appendChild(skinNotifTitle);
    skinNotifBox.appendChild(tempDiv);
    skinNotifBox.appendChild(skinNotifDesc);
    document.body.appendChild(skinNotifBox);
    skinNotifBox.style.left = "50%";

    // Μετά από 9 δευτερόλεπτα, αφαίρεσέ το από την ιστοσελίδα.
    setTimeoutWithRAF(() => {
        skinNotifBox.style.left = "-2500px";
        setTimeoutWithRAF(() => {
            document.body.removeChild(skinNotifBox);
        }, 4e3);
    }, 5e3);
}
