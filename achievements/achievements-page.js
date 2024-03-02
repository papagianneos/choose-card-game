import { checkForMemoryRead, achievementsConfig, FETCHED_ACHIEVEMENT_DATA, searchForAchievement } from "../modules/achievenent-functions.js";
import { LANGUAGE_INDEX, LANGUAGE_DATA } from "../modules/languages.js";
import { christmasDecorationsEnabled, idkSomeFunctionSoItRuns } from "../modules/events.js";

(() => {

    const makePercentage = (partialValue, totalValue) => {
        return (100 * partialValue) / totalValue;
    }

    checkForMemoryRead();

    // Συνάρτηση ελέγχου ξεκλειδώματος επιτεύγματος
    const checkUnlock = achievementID => {
        if (FETCHED_ACHIEVEMENT_DATA.length != 0) { // Αν υπάρχει υλικό από τη μνήμη.
            // Αναζήτησε το επίτευγμα στη λίστα με βάση τη ταυτότητά του.
            for (var achievementData of FETCHED_ACHIEVEMENT_DATA) {
                if (achievementID == achievementData.id) {
                    return achievementData.unlocked;
                }
            }
        }

        return false;
    }


    let mainDivHolder = document.createElement('div');
    mainDivHolder.className = 'mainBox';
    mainDivHolder.style.display = 'block';
    mainDivHolder.style.height = 'auto';

    let achievementsMainHolder = document.createElement('div');
    achievementsMainHolder.className = 'achievementsHolder'; // CSS

    // ΤΡΟΠΑΙΑ
    let trophiesMainHolder = document.createElement('div');
    trophiesMainHolder.className = 'achievementsHolder'; // CSS
    trophiesMainHolder.style.display = 'none';

    // Δημιούργησε το κάθε επίτευγμα
    achievementsConfig.forEach(achievement => {
        // Δες αν το έχει ξεκλειδώσει ο παίχτης.
        achievement.unlocked = checkUnlock(achievement.id);
        achievementsConfig[achievementsConfig.indexOf(achievement)].unlocked = achievement.unlocked; // ανανέωσε τη λίστα

        let achievementDivHolder = document.createElement('div');
        achievementDivHolder.id = achievement.id; // ταυτότητα επιτεύγματος
        achievementDivHolder.className = 'achievement'; // CSS

        if (christmasDecorationsEnabled) achievementDivHolder.style.boxShadow = 'rgba(255, 255, 255, 1) 0px 50px 50px inset, rgba(255, 255, 255, 1) 0px -8px 3px inset';

        // Μόνο αν ξεκλειδώθηκε, αλλιώς θα είναι γκρι.
        if (achievement.unlocked) {
            achievementDivHolder.style.background = achievement.color;
        }

        let achievenentWrapper = document.createElement('div');
        achievenentWrapper.style.display = 'flex';
        achievenentWrapper.style.alignItems = 'center';
        achievenentWrapper.style.justifyContent = 'center';
        achievenentWrapper.style.flexDirection = 'column';

        // Τίτλος επιτεύγματος
        let achievementTitle = document.createElement('h1');
        achievementTitle.style.fontSize = '20px';
        achievementTitle.appendChild(document.createTextNode(achievement.name));

        // Πληροφορίες επιτεύγματος
        let achievementDescription = document.createElement('h1');
        achievementDescription.style.fontSize = '15px';
        achievementDescription.innerHTML = achievement.desc;

        const achievementFromStorage = searchForAchievement(achievement);

        // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        // Progress Bar.
        // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        const progressBarGreySide = document.createElement('div');
        progressBarGreySide.className = 'progress';

        const progressBarFiller = document.createElement('div');
        progressBarFiller.className = 'progress';

        progressBarGreySide.appendChild(progressBarFiller);
        // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        if (!achievement.dontShowProgress) {
            if (achievement.requiredProgress) {
                achievementDescription.innerHTML += `<br>`;
                //achievementDescription.innerHTML += `<br><keimeno style="font-size:25px;">[${achievementFromStorage.progress}/${achievementFromStorage.requiredProgress}]</keimeno>`;
            }
            else achievementDescription.innerHTML += `<br><keimeno style="font-size:25px;">​</keimeno>`; // ειδικός κενός χαρακτήρας
        }

        achievenentWrapper.appendChild(achievementTitle);
        achievenentWrapper.appendChild(achievementDescription);
        if (achievement.requiredProgress && !achievement.dontShowProgress) achievenentWrapper.appendChild(progressBarGreySide);
        achievementDivHolder.appendChild(achievenentWrapper);

        // Αν δεν είναι τρόπαιο, βάλτο στα επιτεύγματα, αλλιώς στα τρόπαια.
        if (!achievement.trophy) {
            achievementsMainHolder.appendChild(achievementDivHolder);
        }
        else trophiesMainHolder.appendChild(achievementDivHolder);
    });

    mainDivHolder.appendChild(achievementsMainHolder);
    mainDivHolder.appendChild(trophiesMainHolder);

    // ------------------------------------------------------------------
    // Κουμπί για εναλλαγή τροπαίων - επιτευγμάτων
    // ------------------------------------------------------------------
    let openedTrophies = false; // flag

    let trophiesBtnWrapper = document.createElement('div');
    trophiesBtnWrapper.style.display = 'inline';

    let trophiesBtn = document.createElement('button');
    trophiesBtn.appendChild(document.createTextNode(LANGUAGE_DATA[LANGUAGE_INDEX].label_trophies));
    trophiesBtn.style.width = 'auto';
    trophiesBtn.onclick = () => {
        if (!openedTrophies) {
            trophiesBtn.innerHTML = LANGUAGE_DATA[LANGUAGE_INDEX].label_achievements;
            achievementsMainHolder.style.display = 'none';
            trophiesMainHolder.style.display = '';
            openedTrophies = true;
        }
        else {
            trophiesBtn.innerHTML = LANGUAGE_DATA[LANGUAGE_INDEX].label_trophies;
            achievementsMainHolder.style.display = '';
            trophiesMainHolder.style.display = 'none';
            openedTrophies = false;
        }
    }
    trophiesBtnWrapper.appendChild(trophiesBtn);
    // ------------------------------------------------------------------

    let anotherDivHolderForPositionsLol = document.createElement('div');
    anotherDivHolderForPositionsLol.style.width = '100%';

    // Κουμπί για επιστροφή στο παιχνίδι
    let goBackBtnWrapper = document.createElement('div');
    goBackBtnWrapper.style.width = '50%';
    goBackBtnWrapper.style.display = 'inline';

    let goBackBtn = document.createElement('button');
    goBackBtn.appendChild(document.createTextNode(LANGUAGE_DATA[LANGUAGE_INDEX].label_button_go_back));
    goBackBtn.style.width = 'auto';
    goBackBtn.onclick = () => window.location.href = '/';

    goBackBtnWrapper.appendChild(goBackBtn);
    anotherDivHolderForPositionsLol.appendChild(goBackBtnWrapper);
    anotherDivHolderForPositionsLol.appendChild(trophiesBtnWrapper);
    mainDivHolder.appendChild(anotherDivHolderForPositionsLol);

    document.body.appendChild(mainDivHolder);
})();
