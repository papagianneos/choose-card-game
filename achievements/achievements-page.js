import { checkForMemoryRead, achievementsConfig, FETCHED_ACHIEVEMENT_DATA, searchForAchievement } from "../modules/achievenent-functions.js";

(() => {
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
        // Μόνο αν ξεκλειδώθηκε, αλλιώς θα είναι γκρι.
        if (achievement.unlocked) {
            achievementDivHolder.style.background = achievement.color;
        }

        // Τίτλος επιτεύγματος
        let achievementTitle = document.createElement('h1');
        achievementTitle.style.fontSize = '20px';
        achievementTitle.appendChild(document.createTextNode(achievement.name));

        // Πληροφορίες επιτεύγματος
        let achievementDescription = document.createElement('h1');
        achievementDescription.style.fontSize = '15px';
        achievementDescription.innerHTML = achievement.desc;

        if (!achievement.dontShowProgress) {
            if (achievement.requiredProgress) {
                let achievementFromStorage = searchForAchievement(achievement);
                achievementDescription.innerHTML += `<br><keimeno style="font-size:25px;">(${achievementFromStorage.progress}/${achievementFromStorage.requiredProgress})</keimeno>`;
            }
            else achievementDescription.innerHTML += `<br><keimeno style="font-size:25px;">​</keimeno>`; // ειδικός κενός χαρακτήρας
        }

        achievementDivHolder.appendChild(achievementTitle);
        achievementDivHolder.appendChild(achievementDescription);

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
    trophiesBtn.appendChild(document.createTextNode('Τρόπαια'));
    trophiesBtn.style.width = 'auto';
    trophiesBtn.onclick = () => {
        if (!openedTrophies) {
            trophiesBtn.innerHTML = 'Επιτεύγματα';
            achievementsMainHolder.style.display = 'none';
            trophiesMainHolder.style.display = '';
            openedTrophies = true;
        }
        else {
            trophiesBtn.innerHTML = 'Τρόπαια';
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
    goBackBtn.appendChild(document.createTextNode('Πίσω στο παιχνίδι!'));
    goBackBtn.style.width = 'auto';
    goBackBtn.onclick = () => window.location.href = '/';

    goBackBtnWrapper.appendChild(goBackBtn);
    anotherDivHolderForPositionsLol.appendChild(goBackBtnWrapper);
    anotherDivHolderForPositionsLol.appendChild(trophiesBtnWrapper);
    mainDivHolder.appendChild(anotherDivHolderForPositionsLol);

    document.body.appendChild(mainDivHolder);
})();
