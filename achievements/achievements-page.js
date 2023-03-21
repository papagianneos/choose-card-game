import { achievementsConfig, unlockAchievement, FETCHED_ACHIEVEMENT_DATA } from "./achievenent-functions.js";

(() => {
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
        achievementDescription.innerHTML = achievement.unlocked ? achievement.desc : '???';

        achievementDivHolder.appendChild(achievementTitle);
        achievementDivHolder.appendChild(achievementDescription);
        achievementsMainHolder.appendChild(achievementDivHolder);
    });

    mainDivHolder.appendChild(achievementsMainHolder);
    document.body.appendChild(mainDivHolder);
})();
