import { unlockAchievement } from "./modules/achievenent-functions.js";
import { specialCardsConfig } from "./modules/specialCardsConfig.js";
import { music, sounds } from "./modules/sounds.js";
import { FEATURED_YOUTUBERS } from "./modules/featured-youtuber.js";
import { LANGUAGE_INDEX, LANGUAGE_DATA } from "./modules/languages.js";
import { unlockSkin, SKINS_CONFIG } from "./modules/skins.js";
import { skinsDisabled, pgnBirthday, christmasDecorationsEnabled, aprilFools, halloweenTime } from "./modules/events.js";
import { SERVER_ADDRESS, sendToServer } from "./modules/SERVER.js";
import { randomChoice, getRandomInt, generateRandomHexColor, createLoader, shuffle, setTimeoutWithRAF } from "./modules/useful-functions.js";

(() => {
    const pageBody = document.getElementsByTagName('body')[0];

    pageBody.style.background = 'black';
    pageBody.style.backgroundSize = 'cover';
    pageBody.style.backgroundRepeat = 'no-repeat';

    let loader = createLoader();

    (async () => {

        // Περίμενε να φορτώσει ο σερβερ πρώτα.
        await fetch(SERVER_ADDRESS).then(response => response.text())

        document.body.removeChild(loader); // remove loader

        // Skin που επέλεξε ο παίχτης.
        const skin = !skinsDisabled && localStorage.getItem('selectedSkin') != null && localStorage.getItem('selectedSkin') in SKINS_CONFIG ? SKINS_CONFIG[localStorage.getItem('selectedSkin')] : SKINS_CONFIG['no_skin'];

        //if (!aprilFools) {
        //pageBody.style.animation = 'displace 2s linear infinite';
        //pageBody.style.backgroundSize = '200%';
        //}

        pageBody.style.backgroundImage = aprilFools ? 'url(./img/game_bg_old.png)' : 'url(./img/game_bg.png)';

        try {

            // ----------------------------------------------------------------------------------------------------------------------------------------------------------
            // Universe-Swap Special Card
            // -------------------------------------------------------------------------------------------------------------------------------------------------------
            const universeSpecialCardEnabled = localStorage.getItem('imaginaryCardActive') != null ? JSON.parse(localStorage.getItem('imaginaryCardActive')) : false;
            // -------------------------------------------------------------------------------------------------------------------------------------------------------

            let AMOUNT_OF_CARDS = randomChoice([10, 12, 16, 20, 24, 26]); // μέγιστο είναι 36 κάρτες.

            const CARDS_DELAY_MS = 2e3;

            const BROKEN_CARD_POLYGONS = [
                'none',
                'polygon(0px 150px, 0% 0%, 150px 0px, 0px 200px)',
                'polygon(0% 50%, 50% 0%, 60% 100%, -10% 100%)',
                'polygon(100% 100%, -100% -50%, 0% 0%, 100% 0%)',
                'polygon(0 -100px, 100% 100%, -1000px 0%, 100px 40%)',
                'polygon(200px 70px, 0% 0%, 0px 0px, 0px 120px)'
            ];

            const testServer = window.location.href.includes('-test');

            // Events
            const eventModeRotationEnabled = !testServer;

            // OG Mode
            let OG_modeEnabled = false,
                appliedOGModeEffect = aprilFools ? false : true;

            // ------------------------------------------------
            // Hide & Seek
            // ------------------------------------------------
            let hideAndSeekModeEnabled = false,
                hideAndSeekWin = false,
                hideAndSeekFoundCount = 0;
            // ------------------------------------------------

            // -------------------------------------------------
            // ΚΟΒΑΛΤΙΟ Μοde
            // -------------------------------------------------
            let cobaltModeEnabled = false,
                selectedSpecialCardShape,
                cobaltModeCards = [];
            // -------------------------------------------------

            // -----------------------------------------------------
            // "VOID" mode
            // -----------------------------------------------------
            let voidModeEnabled = false,
                voidModeOver = true,
                voidModeLevelsBeaten = 0,
                savedTries_voidMode = 0,
                musicStarted = false;
            // -----------------------------------------------------

            // ------------------------------------------------------
            // "HELL" mode
            // ------------------------------------------------------
            let hellModeEnabled = false,
                choseCard = false;
            // ------------------------------------------------------

            // -----------------------------------------------------
            // TIMED mode
            // -----------------------------------------------------
            let timedModeEnabled = false,
                timedModeStyleTagMade = false,
                decreaseTimeBy = AMOUNT_OF_CARDS > 12 ? .5 : 1;

            const makePercentage = (partialValue, totalValue) => {
                return (100 * partialValue) / totalValue;
            }
            // -----------------------------------------------------

            let streak = 0;

            // NULL κάρτα
            let underNullEffect = false,
                turnsToRemoveNullEffect = 0,
                nullEffectOver = false,
                nullEffectLoop;

            // bug fix για το αν υπάρχει troll κάρτα
            let nonPairCardExists = false;

            // ----------------------------------------------------------------------
            // Συνάρτηση που μετράει πόσες troll κάρτες υπάρχουν (αν υπάρχουν)
            // ----------------------------------------------------------------------
            function countTrollCards(cardShapes) {
                let cardShapes_revived = cardShapes != undefined ? cardShapes : [];

                if (cardShapes_revived.length == 0) {
                    cardShapes_revived = [];

                    // Για κάθε "παιδί" που έχει το cardsHolder/parentDiv
                    for (var e = 0; e < parentDiv.children.length; e++) {
                        let child = parentDiv.children[e];
                        // Για να βρούμε ποιο είναι κάρτα και ποιο κείμενο, διαβάζουμε το class του.
                        cardShapes_revived.push(child.realShape);
                    }
                }

                let countedTrolls = 0;

                for (let searchShape of cardShapes_revived) {
                    if (searchShape == '[?]' || searchShape == '∞') countedTrolls++;
                }

                return countedTrolls;
            }
            // ----------------------------------------------------------------------

            //secretSettingEnabled = false,
            let rot_ = 360;

            // ----------------------------------------------------------------------------------------------------------------------------------------------
            // Διάβασε τα εφέ που επέλεξε ο χρήστης.
            // -----------------------------------------------------------------------------------------------------------------------------------------------
            const playersEffect = JSON.parse(localStorage.getItem('customizeEffect')) == null ? null : JSON.parse(localStorage.getItem('customizeEffect'))[0];
            // -----------------------------------------------------------------------------------------------------------------------------------------------

            // -------------------------------------------------------------
            // Καλύτερα Γραφικά (Light Mode)
            // ---------------------------------------------------------------
            let extremeModeTriesTextColor = 'red',
                warningColorOfBodyTag = 'rgb(25, 0, 0)';

            // Χρώματα γραμματοσειράς και φόντου του extreme mode.
            if (playersEffect) if (playersEffect.improvedGraphics) {
                extremeModeTriesTextColor = '#ba0909';
                warningColorOfBodyTag = '#b85858';
            }

            if (skin.id == 'gradient') warningColorOfBodyTag = 'conic-gradient(maroon, black, maroon, black, maroon)';
            // -------------------------------------------------------------

            // -----------------------------------------------------------------------
            // lol
            // ----------------------------------------------------------------------
            let papagianneosFinaleEnabled = false,
                papagianneosFinaleAngryRun = false,
                pgnFinaleEffectsLoop;
            // ------------------------------------------------------------------------

            // ----------------------------------------------------------
            // Σπέσιαλ Κάρτες.
            // ----------------------------------------------------------
            let specialCardsEnabled = aprilFools ? false : true,
                currentSpecialCards = [],
                lostByDeathCard = false,
                wonBySpecialCard = false,
                removedSpecialCardsFromFullCount = [];
            // -----------------------------------------------------------

            // ------------------------------------
            // Ήχος.
            // ------------------------------------

            // Λάθος κάρτα
            let wrongSound = halloweenTime ? sounds.wrongHalloween : playersEffect ? playersEffect.musicType == 'OG' ? sounds.wrongOG : sounds.wrong : sounds.wrongOG;

            // TIMED mode music
            let timedModeMusic = halloweenTime ? music.timeLevelMusicHalloween : pgnBirthday ? music.timeLevelMusicBirthday : playersEffect ? playersEffect.musicType == 'OG' ? music.timeLevelMusicOG : music.timeLevelMusic : music.timeLevelMusicOG;

            // ------------------------------------------------------------------------------------------------------------------------
            // Μουσική για το παιχνίδι
            // ------------------------------------------------------------------------------------------------------------------------
            let menuMusic =
                christmasDecorationsEnabled ? music.menuMusicChristmas :
                    halloweenTime ? music.menuMusicHalloween :
                        playersEffect ? playersEffect.musicType == 'OG' ? music.menuMusicOG : music.menuMusic : music.menuMusicOG,

                gameMusic =
                    halloweenTime ? music.gameMusicHalloween :
                        pgnBirthday ? music.birthdayMusic :
                            playersEffect ? playersEffect.musicType == 'OG' ? music.gameMusicOG : music.gameMusic : music.gameMusicOG;

            menuMusic.play();

            // Extreme mode μουσικη
            let startedExtremeModeMusic = false,
                gameStarted = false;
            // ------------------------------------------------------------------------------------------------------------------------

            // ---------------------------------------
            // Extreme Gamemode
            // ---------------------------------------
            let extremeModeEnabled = false,
                lostExtremeModeEnabled = false,
                extremeModeMusic = halloweenTime ? music.extremeModeGameMusicHalloween : pgnBirthday ? music.extremeModeGameMusicBirthday : music.extremeModeGameMusic;
            // ----------------------------------------

            // -----------------------------------

            // global μεταβλητές
            let cardsData = [],
                imaginaryCardsData = [],
                hardModeEnabled = false, // "δύσκολο" mode απενεργοποιημένο από την αρχή
                challengeModeEnabled = false,
                virusModeEnabled = false,
                penaltyModeEnabled = false,
                challengeModeEffectTurn = 0,
                currentSelected = [],
                score = 0,
                penalties = 0,
                tries = -1, // ξεκινάμε με -1 διότι αυτόματα κάνει resetCards (άρα tries -= 1)
                blockClicks = false,
                PI_EFFECT_LOL = false,
                mazeWallsEnabled = false,
                brokenCardsEnabled = false,
                MAZE_WALLS_AMOUNT = 5,
                BROKEN_CARDS_AMOUNT = 5,
                deltaEffect = false,
                enabledImaginaryUniverse = false,
                modePlayed,
                preventLose = false, // for lifesaver
                gameEnded = false,
                CHARACTERS_SET_PENALTY_MODE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789[]{}#@!%&()><?/=€^£×÷+-—¦¿¡§•‗±ツ★✵❆".split('');

            // ========================================================================
            // 1 - Σχήμα/σχέδιο και χρώμα των καρτών setup
            // ========================================================================
            const STANDARD_AMOUNT_OF_CARDS = (AMOUNT_OF_CARDS + 6);

            // ----------------------------------------------------
            // TIMED Gamemode
            // -----------------------------------------------------
            let standardTimeLeft = AMOUNT_OF_CARDS > 16 ? 850 : 750,
                timeLeft = standardTimeLeft;
            // ------------------------------------------------------

            // ----------------------------------------
            // Extreme Gamemode
            // ----------------------------------------
            let MAX_TRIES = (AMOUNT_OF_CARDS / 2);

            if (specialCardsEnabled) MAX_TRIES += 2;
            // ----------------------------------------

            // ================================================================================
            // Ψ Υ Χ Ο Β Γ Α Λ Τ Η Σ
            // ================================================================================

            // ΤΥΧΑΙΑ Σχήματα/σχέδια καρτών (2 κάρτες από καθεμιά άρα αντιγραφή τα στοιχεία)
            const startGame = () => {

                // Όταν γίνει click σε κάρτα.
                document.addEventListener('click', (event) => {
                    if (event.target.classList.contains('card')) {
                        const card = event.target;

                        // ---------------------------------------------------------------------------------------------------------------
                        // BUG FIX: Αν έγινε click στην ίδια κάρτα..
                        // ----------------------------------------------------------------------------------------------------------------
                        if (card.getAttribute('anoixthcarta') || blockClicks || card.getAttribute('egineclick') || card.mazeWall) return;
                        card.setAttribute('egineclick', 'nai');
                        // ----------------------------------------------------------------------------------------------------------------

                        if (!hideAndSeekModeEnabled) {
                            // --------------------------------------------------------
                            // NULL Effect
                            // --------------------------------------------------------
                            if (underNullEffect) {
                                turnsToRemoveNullEffect += 1;

                                if (turnsToRemoveNullEffect > 10) {
                                    underNullEffect = false;
                                    sounds.null.play();
                                    nullEffectOver = true;
                                    for (var cardElem of document.getElementsByClassName('card')) {
                                        if (cardElem.getAttribute('infectedWithVirus')) {
                                            cardElem.removeAttribute('style');
                                        }
                                    }
                                    document.getElementById('cardsHolder').removeAttribute('style');
                                }
                            }
                            // --------------------------------------------------------

                            if (appliedOGModeEffect) {

                                // ----------------------------------------------------------------------
                                // Ήχος κάρτας.
                                // ----------------------------------------------------------------------
                                sounds.cardOpen.play();
                                // ----------------------------------------------------------------------

                                // -------------------------------------------------------------------------------------------------------------------------------
                                // ANIMATION. (Να μην υπάρχει στο OG mode)
                                // --------------------------------------------------------------------------------------------------------------------------------
                                card.classList.toggle('opened');
                                if (enabledImaginaryUniverse) {
                                    card.style.transform = `rotateZ(${card.imaginaryRotationType}deg) rotateY(360deg)`;
                                }
                                // --------------------------------------------------------------------------------------------------------------------------------
                            }

                            // Εμφάνισε την κάρτα στον παίχτη
                            if (currentSelected.length <= 1) {
                                // Δες αν ο παίχτης χρησιμοποιεί νέον
                                card.style.background = card.savedBackgroundColor;
                                card.innerHTML = card.savedText;

                                // Ειδική περίπτωση του "π".
                                card.style.backgroundSize = pgnBirthday && !card.specialCard ? '250%' : card.savedText == specialCardsConfig.pi.shape ? '400% 400%' : 'cover';
                                card.style.backgroundBlendMode = ['crystal', 'radian', 'target'].includes(skin.id) ? 'multiply' : 'darken';

                                // Ειδική περίπτωση: "Σ" κάρτα.
                                if (card.savedText == specialCardsConfig.sigma.shape) {
                                    card.style.animation = card.savedAnimation;
                                }

                                currentSelected.push(card);
                            }

                            // Αν άνοιξε 2 κάρτες ο παίχτης
                            if (currentSelected.length >= 2) {
                                let firstCard = currentSelected[0],
                                    secondCard = currentSelected[1];

                                const giveScore = () => {
                                    // Επίτευγμα: "Just Like Peter"
                                    streak += 1;
                                    if (streak == 3) unlockAchievement('ach_peter');

                                    // --------------------------------------------------------------------------------------------------
                                    // Άλλαξε το σχήμα της troll κάρτας αν βρέθηκε το ζευγάρι καρτών που το σχήμα το είχε η troll
                                    // --------------------------------------------------------------------------------------------------
                                    if (nonPairCardExists) {
                                        let cardShapes_revived = [],
                                            cardsList = [];

                                        // Για κάθε "παιδί" που έχει το cardsHolder/parentDiv
                                        for (var e = 0; e < parentDiv.children.length; e++) {
                                            let child = parentDiv.children[e];
                                            // Για να βρούμε ποιο είναι κάρτα και ποιο κείμενο, διαβάζουμε το class του.
                                            cardShapes_revived.push(child.savedText);
                                            cardsList.push(child);
                                        }

                                        for (var cardElem of cardsList) {
                                            if (cardElem.savedText == firstCard.savedText && cardElem.impostorCard) {
                                                let fakeCardShapes = cardShapes_revived;

                                                // Να μην χρησημοποιηθεί το ίδιο σχήμα
                                                fakeCardShapes = fakeCardShapes.filter(item => {
                                                    return item != cardElem.savedText && item != undefined;
                                                });

                                                // Επέλεξε τυχαίο σχήμα.
                                                cardElem.savedText = randomChoice(fakeCardShapes);
                                            }
                                        }
                                    }
                                    // --------------------------------------------------------------------------------------------------

                                    // Αν είναι σπέσιαλ κάρτα..
                                    if (firstCard.specialCard && secondCard.specialCard) {
                                        if (!deltaEffect) firstCard.specialCardEffect();

                                        // Επίτευγμα: "Τι ήταν αυτό;"
                                        unlockAchievement('ach_first_special_card');

                                        // Επίτευγμα: "Κυνηγός"
                                        unlockAchievement('ach_hunter');

                                        // Επίτευγμα: "Απατεών"
                                        unlockAchievement('ach_deceiver');
                                    }

                                    // Αν είναι μία απλή κάρτα
                                    else {
                                        // Επίτευγμα: "Τα κατάφερα;"
                                        unlockAchievement('ach_first_combination');

                                        // Επίτευγμα: "Αρχάριος"
                                        unlockAchievement('ach_beginner');

                                        // Επίτευγμα: "Έμπειρος"
                                        unlockAchievement('ach_somewhat_experienced');

                                        // Επίτευγμα: "Ειδικός"
                                        unlockAchievement('ach_expert');

                                        // Τρόπαιο: "Δάσκαλος των Καρτών"
                                        unlockAchievement('tr_master_of_cards');

                                        // Skin: "Woody"
                                        unlockSkin('woody');

                                        const scoreReceived = Math.round(1 * ((score == 0 ? 10 : score) / (tries == 0 ? 1 : tries)));
                                        score += (scoreReceived != 0 ? scoreReceived : 1);

                                        // Επίτευγμα: "Εκατοστάρα στη μάπα"
                                        unlockAchievement('ach_score_100', score);

                                        // Επίτευγμα: "Δεν με ξέρεις καλά.."
                                        unlockAchievement('ach_score_1k', score);

                                        // Τρόπαιο: "Εκατομμυριούχος"
                                        unlockAchievement('tr_million_score', score);

                                        // Παίξε ήχο ΜΟΝΟ αν δεν είναι σπεσιαλ κάρτα.
                                        if (!firstCard.specialCard && !secondCard.specialCard) {
                                            halloweenTime ? sounds.scoreHalloween.play() : (hardModeEnabled || extremeModeEnabled) ? sounds.scoreHardMode.play() : sounds.score.play();
                                        }

                                        // TIMED MODE: Δώσε χρόνο.
                                        if (timedModeEnabled) {
                                            timeLeft += AMOUNT_OF_CARDS > 12 ? 25 : 50;
                                        }
                                    }

                                    currentSelected = [];
                                    updateScore();

                                    // --------------------------------------------
                                    // εφόσον είναι το ίδιο κείμενο/σχήμα η κάρτα
                                    // δεν χρειάζεται έλεγχος.
                                    // --------------------------------------------
                                    firstCard.setAttribute('anoixthcarta', 'nai');
                                    secondCard.setAttribute('anoixthcarta', 'nai');
                                    // --------------------------------------------
                                }

                                // αν είναι διαφορετικές οι κάρτες, επαναφορά
                                if (firstCard.savedText !== secondCard.savedText && (firstCard.savedText != '∞' && secondCard.savedText != '∞')) {
                                    if (streak != 0) streak = 0;

                                    // Επίτευγμα: "Το μοιραίο λάθος"
                                    unlockAchievement('ach_10_tries');

                                    // Επίτευγμα: "Λίγο ακόμα και.."
                                    unlockAchievement('ach_50_tries');

                                    // Επίτευγμα: "AAAAAAAAAAAAA"
                                    unlockAchievement('ach_100_tries');

                                    // Τρόπαιο: "Τσαλαπετεινός"
                                    unlockAchievement('tr_10k_tries');

                                    // Skin: "Metallic"
                                    unlockSkin('metal');

                                    // ------------------------------------------------------------------------------------------------------
                                    // "Virus" mode setup (made by Petercraft)
                                    // Κάθε φορά που γίνεται λάθος κλείνουν όλες οι ανοιχτές κάρτες.
                                    // ------------------------------------------------------------------------------------------------------
                                    if (virusModeEnabled) {
                                        // μην παίξεις τον ήχο αν δεν υπάρχουν ανοιχτές κάρτες
                                        let countedOpenedCards = 0;

                                        for (var cardDivElem of document.getElementsByClassName('card')) {
                                            if (cardDivElem.getAttribute('anoixthcarta')) countedOpenedCards++;
                                        }

                                        if (countedOpenedCards > 0) sounds.loss.play();

                                        for (var cardDivElem of document.getElementsByClassName('card')) cardDivElem.removeAttribute('anoixthcarta');

                                        setTimeoutWithRAF(() => {
                                            resetCards(false);
                                        }, CARDS_DELAY_MS);
                                    }

                                    //-------------------------------------------------------------------------------------------------------
                                    // Penalty Mode
                                    // ------------------------------------------------------------------------------------------------------
                                    if (penaltyModeEnabled) {
                                        currentSelected = [];
                                        penalties++;

                                        if (penalties == 5) {
                                            penalties = 0;

                                            // Επέλεξε τυχαίο χαρακτήρα/σύμβολο για το νέο ζευγάρι καρτών
                                            let chosenCharacter = randomChoice(CHARACTERS_SET_PENALTY_MODE),
                                                randomColor = generateRandomHexColor(); // τυχαίο χρώμα σε hexadecimal (HEX)

                                            let previousSavedIndex = 0,
                                                turn = 0;

                                            for (var i = 0; i < 2; i++) {
                                                turn++;

                                                // Πρόσθεσε δύο κάρτες
                                                let cardsChildrenList = [],
                                                    cardShapesList = [],
                                                    scoreAndTriesTextHolderChild_ = parentDiv.children[0];

                                                createCard({
                                                    shape: chosenCharacter,
                                                    color: randomColor,
                                                    specialCard: false,
                                                    specialCardEffect: () => { }
                                                });

                                                AMOUNT_OF_CARDS++;
                                                resetCards(false);

                                                // Για κάθε "παιδί" που έχει το cardsHolder/parentDiv
                                                for (var e = 0; e < parentDiv.children.length; e++) {
                                                    let child = parentDiv.children[e];
                                                    // Για να βρούμε ποιο είναι κάρτα και ποιο κείμενο, διαβάζουμε το class του.
                                                    if (child.className.includes('card')) {
                                                        cardsChildrenList.push(child);
                                                        cardShapesList.push(child.savedText);
                                                    }
                                                }

                                                // Για να μην χρησιμοποιούνται οι ίδιοι χαρακτήρες
                                                CHARACTERS_SET_PENALTY_MODE = CHARACTERS_SET_PENALTY_MODE.filter(character => { return !(character in cardShapesList) });

                                                if (turn > 0) {
                                                    previousSavedIndex = cardShapesList.indexOf(chosenCharacter);
                                                    cardShapesList[previousSavedIndex] = 'no shape for u';
                                                    cardsChildrenList.splice(previousSavedIndex, 1, cardsChildrenList[previousSavedIndex]);
                                                }

                                                // Σε τυχαία σημεία βάλε το νέο ζευγάρι καρτών
                                                cardShapesList.splice(getRandomInt(0, cardShapesList.length - 1), 0, chosenCharacter);
                                                cardsChildrenList.splice(getRandomInt(0, cardShapesList.length - 1), 0, cardsChildrenList[cardShapesList.indexOf(chosenCharacter)]);

                                                if (turn > 0) cardsChildrenList.splice(getRandomInt(0, cardShapesList.length - 1), 0, cardsChildrenList[previousSavedIndex]);
                                                cardsChildrenList[(cardsChildrenList.length)] = cardsChildrenList[0]; // για το score και τις προσπάθειες
                                                cardsChildrenList[0] = scoreAndTriesTextHolderChild_;
                                                parentDiv.replaceChildren(...cardsChildrenList);
                                            }
                                            sounds.cardOpenHardMode.play();
                                        }
                                    }
                                    //-------------------------------------------------------------------------------------------------------

                                    // ----------------------------------------------------------------------------------------
                                    // "Challenge" mode setup.
                                    // Τυχαίο "effect" κάθε φορά που γίνεται λάθος.
                                    // -----------------------------------------------------------------------------------------
                                    if (challengeModeEnabled) {
                                        //const SEISMOS_SETUP_STRING = `animation: seismos ${tries == 0 ? .5 : (tries / 10)}s linear infinite;`

                                        // -------------------------------------------------------------------
                                        // Κάθε 2 γύρους, νέο effect. (3 γιατί ξεκινάμε από το 1 άρα 2)
                                        // -------------------------------------------------------------------
                                        challengeModeEffectTurn++; // challengeModeEffectTurn += 1;

                                        if (challengeModeEffectTurn == 3) {
                                            document.getElementById('cardsHolder').removeAttribute('style');
                                            challengeModeEffectTurn = 0;
                                        }
                                        // -------------------------------------------------------------------

                                        if (challengeModeEffectTurn == 1) {
                                            const EFFECT_IDs = [
                                                'ROTATION',
                                                'NO_COLORS',
                                                'SCALE',
                                                'BLUR',
                                                'BLIND',
                                                'NO_TEXT',
                                                'SEISMOS'
                                            ];

                                            let chosenEffect = randomChoice(EFFECT_IDs),
                                                CSS_ATTRIBUTE_CONTENTS = '';

                                            switch (chosenEffect) {

                                                // Τυχαία περιστροφή της ιστοσελίδας.
                                                case 'ROTATION':
                                                    CSS_ATTRIBUTE_CONTENTS += `transform:rotate(180deg);`;
                                                    break;

                                                // Αφαίρεση Χρωμάτων
                                                case 'NO_COLORS':
                                                    CSS_ATTRIBUTE_CONTENTS += `filter:grayscale(100%);`;
                                                    break;

                                                // Αφαίρεση Κειμένου.
                                                case 'NO_TEXT':
                                                    CSS_ATTRIBUTE_CONTENTS += `filter:invert(50%);`;
                                                    break;

                                                // Αλλαγή Μέγεθους σε τυχαίο
                                                case 'SCALE':
                                                    const chosenScale = randomChoice([.5, .2, .15, .05]);
                                                    CSS_ATTRIBUTE_CONTENTS += `transform:scale(${chosenScale});`
                                                    break;

                                                // Φωτεινότητα.
                                                case 'BLIND':
                                                    CSS_ATTRIBUTE_CONTENTS += `filter:opacity(6%);`;
                                                    break;

                                                // Θόλωμα.
                                                case 'BLUR':
                                                    const chosenBlur = randomChoice([2, 3, 5, 6]);
                                                    CSS_ATTRIBUTE_CONTENTS += `filter:blur(${chosenBlur}px);`
                                                    break;

                                                // Σεισμός.
                                                case 'SEISMOS':
                                                    CSS_ATTRIBUTE_CONTENTS += 'animation: seismos .02s linear infinite';
                                                    break;
                                            }

                                            document.getElementById('cardsHolder').setAttribute('style', CSS_ATTRIBUTE_CONTENTS);
                                        }
                                    }
                                    // ----------------------------------------------------------------------------------------

                                    // ----------------------------------------------------------------------------------------
                                    // "Δύσκολο" mode setup
                                    // Ανακάτεμα των καρτών κάθε φορά που κάνει λάθος ο παίχτης.
                                    // ----------------------------------------------------------------------------------------
                                    if (hardModeEnabled) {

                                        // if (secretSettingEnabled) {
                                        //     rot_ += 360;
                                        //     document.getElementById('cardsHolder').style.animation = 'none';
                                        //     document.getElementById('cardsHolder').style.transition = '1s';
                                        //     document.getElementById('cardsHolder').style.transform = `rotate(${rot_}deg)`;
                                        // }

                                        if (appliedOGModeEffect) sounds.cardOpenHardMode.play();

                                        // ανακάτεψε τις κάρτες ΞΑΝΑ στο "δύσκολο" mode
                                        let cardsListToShuffle = [],
                                            scoreAndTriesTextHolderChild = parentDiv.children[0];

                                        // Για κάθε "παιδί" που έχει το cardsHolder/parentDiv
                                        for (var e = 0; e < parentDiv.children.length; e++) {
                                            let child = parentDiv.children[e];
                                            // Για να βρούμε ποιο είναι κάρτα και ποιο κείμενο, διαβάζουμε το class του.
                                            if (child.className.includes('card')) {
                                                cardsListToShuffle.push(child);
                                            }
                                        }

                                        shuffle(cardsListToShuffle);

                                        cardsListToShuffle[(cardsListToShuffle.length)] = cardsListToShuffle[0];
                                        cardsListToShuffle[0] = scoreAndTriesTextHolderChild;
                                        parentDiv.replaceChildren(...cardsListToShuffle);
                                    }
                                    // ----------------------------------------------------------------------------------------

                                    if (!penaltyModeEnabled) currentSelected = [];

                                    if (!hardModeEnabled) {
                                        wrongSound.play();
                                    }

                                    blockClicks = true;
                                    setTimeoutWithRAF(() => {
                                        resetCards();
                                        blockClicks = false;
                                    }, CARDS_DELAY_MS);
                                }

                                // Αν είναι μπαλαντέρ (Infinity Card Balader)
                                else if (firstCard.savedText == '∞' || secondCard.savedText == '∞') {
                                    hardModeEnabled || extremeModeEnabled ? sounds.scoreHardMode.play() : sounds.score.play();
                                    giveScore();

                                    let cardElemsList = [],
                                        cardShapesList = [],
                                        scoreAndTriesTextHolderChild = parentDiv.children[0];

                                    // Για κάθε "παιδί" που έχει το cardsHolder/parentDiv
                                    for (var e = 0; e < parentDiv.children.length; e++) {
                                        let child = parentDiv.children[e];
                                        // Για να βρούμε ποιο είναι κάρτα και ποιο κείμενο, διαβάζουμε το class του.
                                        if (child.className.includes('card')) {
                                            cardElemsList.push(child);
                                            cardShapesList.push(child.savedText);
                                        }
                                    }

                                    let nonInfinityCard = firstCard.savedText == '∞' ? secondCard : firstCard,
                                        infityCard = firstCard == nonInfinityCard ? secondCard : firstCard;

                                    cardElemsList.splice(cardShapesList.indexOf(nonInfinityCard.savedText), 1);

                                    // Αν βρέθηκε, μην την έχεις ως σπέσιαλ κάρτα για να μετράει στις ανοιχτές κάρτες.
                                    infityCard.specialCard = false;
                                    currentSpecialCards.splice(currentSpecialCards.indexOf('∞'), 1);

                                    cardElemsList[(cardElemsList.length)] = cardElemsList[0];
                                    cardElemsList[0] = scoreAndTriesTextHolderChild;
                                    parentDiv.replaceChildren(...cardElemsList);
                                    AMOUNT_OF_CARDS -= 1;

                                    // Άλλαξε τη μορφή του μπαλαντέρ με την κάρτα που χρησιμοποιήθηκε
                                    infityCard.style.background = nonInfinityCard.savedBackgroundColor;
                                    infityCard.innerHTML = nonInfinityCard.innerHTML;
                                    infityCard.savedText = nonInfinityCard.savedText;

                                    // bug fix
                                    for (var card_ of document.getElementsByClassName('card')) {
                                        if (card_.savedText == nonInfinityCard.savedText) {
                                            if (!card_.getAttribute('anoixthcarta') && !card_.mazeWall) {
                                                card_.style.background = card_.savedBackgroundColor;
                                                card_.innerHTML = card_.savedText;
                                                card_.setAttribute('anoixthcarta', 'nai');
                                            }
                                        }
                                    }
                                }

                                // Αν είναι η troll κάρτα
                                else if (firstCard.impostorCard || secondCard.impostorCard) {
                                    // Επίτευγμα: "SkinWalker"
                                    unlockAchievement('ach_impostor_card_found');

                                    // Αφαίρεσε την troll κάρτα από το παιχνίδι αν βρέθηκε
                                    let cardsList = [];

                                    // Για κάθε "παιδί" που έχει το cardsHolder/parentDiv
                                    for (var e = 0; e < parentDiv.children.length; e++) {
                                        let child = parentDiv.children[e];
                                        // Για να βρούμε ποιο είναι κάρτα και ποιο κείμενο, διαβάζουμε το class του.
                                        cardsList.push(child);
                                    }

                                    cardsList = cardsList.filter(elem => {
                                        return !elem.impostorCard;
                                    });

                                    parentDiv.replaceChildren(...cardsList);
                                    currentSelected = [];
                                    blockClicks = true;
                                    sounds.cardOpenHardMode.play();
                                    setTimeoutWithRAF(() => {
                                        resetCards(false);
                                        blockClicks = false;
                                    }, 5e2);
                                }

                                // αν είναι ίδιες οι κάρτες, δώσε score
                                else if (firstCard.savedText == secondCard.savedText) {
                                    giveScore();
                                }
                            }
                        }
                        else { // Hide & Seek Setup
                            tries--; // bug fix
                            card.style.background = card.savedBackgroundColor;
                            card.innerHTML = card.savedText;

                            // Ειδική περίπτωση του "π".
                            card.style.backgroundSize = pgnBirthday && !card.specialCard ? '250%' : card.savedText == specialCardsConfig.pi.shape ? '400% 400%' : 'cover';
                            card.style.backgroundBlendMode = ['crystal', 'radian', 'target'].includes(skin.id) ? 'multiply' : 'darken';

                            // ----------------------------------
                            // Ήχος κάρτας.
                            // ----------------------------------
                            sounds.cardOpen.play();
                            // ----------------------------------

                            card.classList.toggle('hideAndSeekHint');
                            card.classList.toggle('openedHideAndSeek');
                            hideAndSeekFoundCount++;
                            updateFound();
                        }

                    }
                });

                let CHARACTERS_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789[]{}#@!%&()><?/=€^£×÷+-—¦¿¡§•‗±ツ★✵❆".split(''),
                    IMAGINARY_CHARACTERS_SET = "πΣ∆∝⋂⋃≥≤φ⋊⊤⊥⊉⊈≣∟∧∐≙⊊⊯⊏≲≃≂∽∼∾∿≀∳∦∥∔∀∉∋∈∅ℯ∁∆∇∎−∤∣∺∷⊀⊁⊌⊍⊎⋔⋠⋡⋣⋢⋛⋚⋫⋪⋘⋙".split(''),
                    generatedPalette = [],
                    generatedImaginaryPalette = [],
                    SHAPE_PALETTES = [],
                    IMAGINARY_SHAPE_PALETTES = [],
                    chosenImaginaryCombination = '',
                    chosenCombination = '';

                // φτιάξε τυχαία λίστα με τυχαία σχήματα/κείμενο/αριθμούς
                for (var k = 0; k < 4; k++) {
                    generatedPalette = [];
                    for (var l = 0; l < (AMOUNT_OF_CARDS / 2); l++) {
                        chosenCombination = randomChoice(CHARACTERS_SET);
                        CHARACTERS_SET.splice(CHARACTERS_SET.indexOf(chosenCombination), 1);
                        CHARACTERS_SET_PENALTY_MODE.splice(CHARACTERS_SET.indexOf(chosenCombination), 1);
                        generatedPalette.push(chosenCombination);

                        // bug fix
                        /* if (generatedPalette.includes(undefined)) {
                             const buggedCharacterIndex = generatedPalette.indexOf(undefined);
         
                             chosenCombination = randomChoice(CHARACTERS_SET);
                             CHARACTERS_SET.splice(CHARACTERS_SET.indexOf(chosenCombination), 1);
                             generatedPalette[buggedCharacterIndex] = chosenCombination;
                         }*/
                    }
                    SHAPE_PALETTES.push(generatedPalette);
                }
                /* const SHAPE_PALETTES = [
                     ['A', 'B', 'C', 'D', 'E', 'F'],
                     ['0', '1', '2', '3', '4', '5'],
                     ['G', 'H', 'I', 'J', 'K', 'L'],
                     ['M', 'N', 'O', 'P', 'Q', 'R'],
                     ['S', 'T', 'U', 'V', 'W', 'X'],
                     ['Y', 'Z', '6', '7', '8', '9'],
                     ['?', '{', '$', '#', '@', ']']
                 ];*/
                // ================================================================================

                let cardShapes = randomChoice(SHAPE_PALETTES);


                // φτιάξε τυχαία λίστα με τυχαία σχήματα/κείμενο/αριθμούς για τα φανταστικά πράγματα
                for (var k = 0; k < 4; k++) {
                    generatedImaginaryPalette = [];
                    for (var l = 0; l < (STANDARD_AMOUNT_OF_CARDS / 2); l++) {
                        chosenImaginaryCombination = randomChoice(IMAGINARY_CHARACTERS_SET);
                        IMAGINARY_CHARACTERS_SET.splice(IMAGINARY_CHARACTERS_SET.indexOf(chosenImaginaryCombination), 1);
                        generatedImaginaryPalette.push(chosenImaginaryCombination);
                    }
                    IMAGINARY_SHAPE_PALETTES.push(generatedImaginaryPalette);
                }

                let imaginaryCardShapes = randomChoice(IMAGINARY_SHAPE_PALETTES);

                // Walls.
                if (mazeWallsEnabled) {
                    for (var mazeWallCount = 0; mazeWallCount < MAZE_WALLS_AMOUNT; mazeWallCount++) {
                        cardShapes.push('mazeWall');
                        AMOUNT_OF_CARDS += 2;
                    }
                }

                // Broken Cards.
                if (brokenCardsEnabled) {
                    for (var brokenCardsCount = 0; brokenCardsCount < BROKEN_CARDS_AMOUNT; brokenCardsCount++) {
                        cardShapes.push('brokenCard');
                        AMOUNT_OF_CARDS += 2;
                    }
                }

                // ----------------------------------------------------------------------------------------------
                // Σπεσιαλ Κάρτες: Βάλτες στην λίστα αντικαταστώντας το τελευταίο γράμμα
                // ----------------------------------------------------------------------------------------------
                if (specialCardsEnabled) {
                    // Εμφάνισε τουλάχιστον μία σπεσιαλ κάρτα, παίρνοντας μία τυχαία.
                    // αν δεν παίζει ο παίχτης το FINALE.
                    if (!papagianneosFinaleEnabled) {

                        if (!cobaltModeEnabled && !hellModeEnabled) {
                            const filteredSpecialCards_ = Object.filter(specialCardsConfig, carde => { return !carde.exclusiveMode && !carde.neverSpawn });

                            let randomlyChosenSpecialCard = randomChoice(Object.keys(filteredSpecialCards_));
                            //cardShapes[cardShapes.length - 1] = randomlyChosenSpecialCard.shape; - OLD mechanic (replaces a card)
                            cardShapes.push(specialCardsConfig[randomlyChosenSpecialCard].shape);
                            AMOUNT_OF_CARDS += 2;

                            // 1 in 19 chance, spawn Δ card in game.
                            if (getRandomInt(0, 19) == 19) {
                                cardShapes.push(specialCardsConfig.redacted_D.shape);
                                AMOUNT_OF_CARDS += 2;
                            }

                            if (universeSpecialCardEnabled) {
                                cardShapes.push(specialCardsConfig.imaginary_unit.shape);
                                AMOUNT_OF_CARDS += 2;
                            }

                            // Δες αν υπάρχει troll κάρτα..
                            if (cardShapes.includes('[?]')) {
                                nonPairCardExists = true;
                            }
                        }

                        // Cobalt Mode: H special card του παίχτη (ο οποίος διάλεξε).
                        else {
                            // Επέλεξε μία τυχαία σπέσιαλ κάρτα που είναι μόνο για το "TIMED" mode.
                            cobaltModeCards = Object.filter(cobaltModeCards, carde1 => { return carde1.shape == selectedSpecialCardShape })

                            cardShapes.push(specialCardsConfig[Object.keys(cobaltModeCards)[0]].shape);
                            AMOUNT_OF_CARDS += 2;

                            // Δες αν υπάρχει troll κάρτα..
                            if (cardShapes.includes('∞')) {
                                nonPairCardExists = true;
                            }
                        }

                        // Χρειάζεται timed card στο TIMED mode
                        if (timedModeEnabled) {
                            // Επέλεξε μία τυχαία σπέσιαλ κάρτα που είναι μόνο για το "TIMED" mode.
                            const timeModeCards = Object.filter(specialCardsConfig, carde1 => { return carde1.exclusiveMode == 'timed' })

                            cardShapes.push(specialCardsConfig[randomChoice(Object.keys(timeModeCards))].shape);
                            AMOUNT_OF_CARDS += 2;
                        }
                    }

                    // ΟΛΕΣ ΑΝ ΠΑΙΖΕΙ ΤΟ FINALE (εκτός αν είναι noSpawnInFinale)
                    /*else {
                        for (var specialCard_ of specialCardsConfig) {
                            if (!specialCard_.noSpawnInFinale) {
                                cardShapes.push(specialCard_.shape);
                                AMOUNT_OF_CARDS += 2;
                            }
                        }
    
                        // Δες αν υπάρχει troll κάρτα..
                        if (cardShapes.includes('[?]')) {
                            nonPairCardExists = true;
                        }
                    }*/
                }
                // ----------------------------------------------------------------------------------------------

                if (!hideAndSeekModeEnabled) {
                    cardShapes.push(...cardShapes); // duplicate
                    imaginaryCardShapes.push(...imaginaryCardShapes);
                }
                else AMOUNT_OF_CARDS /= 2; // ΔΕΝ υπάρχουν ζευγάρια καρτών σε αυτό το mode.

                // ΤΥΧΑΙΑ Χρώματα καρτών (2 κάρτες από καθεμιά άρα αντιγραφή)
                let COLOR_PALETTES = [],
                    generatedColorPalette = [];

                for (var n = 0; n < 4; n++) {
                    generatedColorPalette = [];
                    for (var l = 0; l < (AMOUNT_OF_CARDS / 2); l++) {
                        const randomColor = generateRandomHexColor(); // τυχαίο χρώμα σε hexadecimal (HEX)
                        generatedColorPalette.push(randomColor);

                    }
                    COLOR_PALETTES.push(generatedColorPalette);
                }

                let cardColors = randomChoice(COLOR_PALETTES);

                let IMAGINARY_COLOR_PALETTES = [],
                    imaginaryGeneratedColorPalette = [];

                for (var n = 0; n < 4; n++) {
                    imaginaryGeneratedColorPalette = [];
                    for (var l = 0; l < (STANDARD_AMOUNT_OF_CARDS / 2); l++) {

                        var color = '#';
                        for (var i = 0; i < 6; i++) {
                            color += Math.floor(Math.random() * 10);
                        }
                        imaginaryGeneratedColorPalette.push(color);

                    }
                    IMAGINARY_COLOR_PALETTES.push(imaginaryGeneratedColorPalette);
                }

                let imaginaryCardColors = randomChoice(IMAGINARY_COLOR_PALETTES);

                switch (skin.id) {
                    // Gradient Skin Special Effect
                    case 'gradient': {
                        for (var cardColorIndex = 0; cardColorIndex < cardColors.length; cardColorIndex++) {
                            cardColors[cardColorIndex] = `conic-gradient(${cardColors[cardColorIndex]}, ${'#' + Math.floor(Math.random() * 16777215).toString(16)}, ${cardColors[cardColorIndex]})`;
                        }

                        for (var imaginaryCardColorIndex = 0; imaginaryCardColorIndex < imaginaryCardColors.length; imaginaryCardColorIndex++) {
                            var color = '#';
                            for (var i = 0; i < 6; i++) {
                                color += Math.floor(Math.random() * 10);
                            }
                            imaginaryCardColors[imaginaryCardColorIndex] = `conic-gradient(${imaginaryCardColors[imaginaryCardColorIndex]}, ${color}, ${imaginaryCardColors[imaginaryCardColorIndex]})`;
                        }
                    }
                        break;

                    // Radian Skin Special Effect
                    case 'radian': {
                        for (var cardColorIndex = 0; cardColorIndex < cardColors.length; cardColorIndex++) {
                            cardColors[cardColorIndex] = `repeating-linear-gradient(${getRandomInt(1, 360)}deg, ${cardColors[cardColorIndex]}, transparent 20px)`;
                        }

                        for (var imaginaryCardColorIndex = 0; imaginaryCardColorIndex < imaginaryCardColors.length; imaginaryCardColorIndex++) {
                            imaginaryCardColors[imaginaryCardColorIndex] = `repeating-linear-gradient(${getRandomInt(1, 360)}deg, ${imaginaryCardColors[imaginaryCardColorIndex]}, transparent 20px)`;
                        }
                    }
                        break;

                    // Target Skin Special Effect
                    case 'target': {
                        for (var cardColorIndex = 0; cardColorIndex < cardColors.length; cardColorIndex++) {
                            cardColors[cardColorIndex] = `repeating-radial-gradient(${cardColors[cardColorIndex]}, transparent 40px)`;
                        }

                        for (var imaginaryCardColorIndex = 0; imaginaryCardColorIndex < imaginaryCardColors.length; imaginaryCardColorIndex++) {
                            imaginaryCardColors[imaginaryCardColorIndex] = `repeating-radial-gradient(${imaginaryCardColors[imaginaryCardColorIndex]}, transparent 40px)`;
                        }
                    }
                        break;
                }

                cardColors.push(...cardColors); // duplicate
                imaginaryCardColors.push(...imaginaryCardColors); // duplicate

                // ----------------------------------------------------------------------
                // Δεν πρέπει να έχει ζευγάρι η troll card
                // ---------------------------------------------------------------------
                // Σβήσε το ένα από το ζευγάρι
                if (nonPairCardExists) {
                    let index = cardShapes.indexOf('[?]') == -1 ? cardShapes.indexOf('∞') : cardShapes.indexOf('[?]');
                    cardShapes.splice(index, 1);
                    cardColors.splice(index, 1);
                }
                // -----------------------------------------------------------------------

                // check cards length
                if (!hideAndSeekModeEnabled) if ((nonPairCardExists ? (cardShapes.length + 1) : cardShapes.length) != AMOUNT_OF_CARDS || (nonPairCardExists ? (cardColors.length + 1) : cardColors.length) != AMOUNT_OF_CARDS) {
                    console.log(countTrollCards(cardShapes));
                    console.log(`AMOUNT_OF_CARDS = ${AMOUNT_OF_CARDS}`);
                    console.log(`cardShapes = ${cardShapes.length}`);
                    console.log(`cardColors = ${cardColors.length}`);
                    throw Error('Το πλήθος/μέγεθος των λιστών cardShapes ή cardColors δεν είναι σωστό με το AMOUNT_OF_CARDS.');
                }

                for (var j = 0; j < (countTrollCards(cardShapes) != 0 ? (AMOUNT_OF_CARDS - 1) : AMOUNT_OF_CARDS); j++) {
                    const card = {
                        shape: cardShapes[j],
                        realShape: cardShapes[j],
                        color: ['no_skin', 'gradient', 'radian', 'target'].includes(skin.id) ? cardColors[j] : skin.bg,
                        specialCard: false,
                        specialCardEffect: () => { }
                    }

                    // Ψάξε για walls.
                    if (card.shape == 'mazeWall') {
                        card.mazeWall = true;
                        card.color = 'transparent';
                        currentSpecialCards.push('mazeWall');
                        removedSpecialCardsFromFullCount.push(false);
                    }

                    // Ψάξε για σπασμένες κάρτες.
                    if (card.shape == 'brokenCard') {
                        card.brokenCard = true;
                        card.color = 'transparent';
                        currentSpecialCards.push('brokenCard');
                        removedSpecialCardsFromFullCount.push(false);
                    }

                    // --------------------------------------------------------
                    // Οι σπέσιαλ κάρτες έχουν συγκεκριμένο σταθερό χρώμα.
                    // --------------------------------------------------------
                    if (specialCardsEnabled) {
                        let specialCardDetected = false;

                        // SOS συνάρτηση
                        const addToSpecialCardsArray = (shape) => {
                            currentSpecialCards.push(shape);
                            removedSpecialCardsFromFullCount.push(false);
                        }

                        // Ψάξε για σπεσιαλ κάρτες
                        for (var specialCardData of Object.keys(specialCardsConfig)) {
                            if (specialCardsConfig[specialCardData].shape == card.shape) {
                                specialCardDetected = true;
                                break;
                            }
                        }

                        // Όρισε το εφέ με βάση το σύμβολο της σπεσιαλ κάρτας.
                        switch (card.shape) {
                            case specialCardsConfig.plus_plus.shape: // 10 Score (++)
                                card.specialCardEffect = () => {
                                    sounds.specialScore.play()
                                    score += 10;
                                    // Επίτευγμα: "Εκατοστάρα στη μάπα"
                                    unlockAchievement('ach_score_100', 10);
                                }
                                break;

                            case specialCardsConfig.doubler.shape: // x2 Score
                                card.specialCardEffect = () => {
                                    sounds.specialScore.play()
                                    score *= 2;
                                }
                                break;

                            case specialCardsConfig.halfer.shape: // Half Score
                                card.specialCardEffect = () => {
                                    sounds.loss.play()
                                    score /= 2;
                                }
                                break;

                            case specialCardsConfig.tries_boost_2.shape: // 2 λιγότερες προσπάθειες
                                card.specialCardEffect = () => {
                                    sounds.specialScore.play()
                                    tries -= 2;
                                    updateTries();
                                }
                                break;

                            case specialCardsConfig.minus_minus.shape: // 10 λιγότερο score
                                card.specialCardEffect = () => {
                                    sounds.loss.play()
                                    score -= 10;
                                }
                                break;

                            case specialCardsConfig.death.shape: // Πάει χάθηκε το παιχνίδι
                                card.specialCardEffect = () => {
                                    // Επίτευγμα: 'Rest in pepperoni'
                                    unlockAchievement('ach_cross_card_found');
                                    if (!papagianneosFinaleEnabled) {
                                        sounds.loss.play()
                                    }
                                    lostByDeathCard = true;
                                }
                                break;

                            case specialCardsConfig.pgn.shape: // PAPAGIANNEOS SPEECH
                                card.specialCardEffect = () => {
                                    // Επίτευγμα: "Ουάου"
                                    unlockAchievement('ach_pgn_card_found');

                                    // (SCRAPPED) Για 20 δευτερόλεπτα.. ένα cool εφέ :D
                                    /*if (!papagianneosFinaleEnabled && !voidModeEnabled) {
                                        $('#cardsHolder')
                                            .fadeOut(300)
                                            .fadeIn(300);
                                        extremeModeTriesTextColor = '#ba0909';
                                        warningColorOfBodyTag = '#b85858';
                                        pageBody.style.backgroundColor = '#c7c7c7';
                                        document.getElementById('cardsHolder').children[0].style.color = 'black';
                                        for (var card of document.getElementsByClassName('card')) card.style.boxShadow = 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px';
                                        setTimeoutWithRAF(() => {
                                            $('#cardsHolder')
                                                .fadeIn(300)
                                                .fadeOut(300)
                                            .fadeIn(300);
                                            extremeModeTriesTextColor = 'red';
                                            warningColorOfBodyTag = 'rgb(25, 0, 0)';
                                            pageBody.style.backgroundColor = 'black';
                                            document.getElementById('cardsHolder').children[0].style.color = 'white';
                                            for (var card of document.getElementsByClassName('card')) card.style.boxShadow = 'none';
                                        }, 20e3);
                                    }*/

                                    if (startedExtremeModeMusic) {
                                        extremeModeMusic.pause();
                                    }
                                    else if (papagianneosFinaleEnabled) {
                                        music.papagianneosFinaleMusic.pause();
                                        gameMusic.pause();
                                    }
                                    else gameMusic.pause();

                                    sounds.wow.play();
                                    setTimeoutWithRAF(() => {
                                        if (startedExtremeModeMusic) {
                                            extremeModeMusic.play();
                                        }
                                        else if (papagianneosFinaleEnabled) {
                                            if (!voidModeEnabled) {
                                                gameMusic.play();
                                            }
                                            else music.papagianneosFinaleMusic.play();
                                        }
                                        else gameMusic.play();
                                    }, 3e3);
                                }
                                break;

                            case specialCardsConfig.redacted_K.shape: // for my friend :)
                                card.specialCardEffect = () => {
                                    // Επίτευγμα: ":)"
                                    unlockAchievement('ach_special_K_card');

                                    // να μην επιτρέπεται στο papagianneos finale
                                    if (papagianneosFinaleEnabled || voidModeEnabled) { // αν ΕΙΝΑΙ finale
                                        if (papagianneosFinaleEnabled) music.papagianneosFinaleMusic.pause();
                                        sounds.pgnFinaleKCardEffect.play();
                                        if (papagianneosFinaleEnabled) {
                                            setTimeoutWithRAF(() => {
                                                music.papagianneosFinaleMusic.play();
                                                document.getElementById('cardsHolder').style.animation = 'seismos 1s linear infinite';
                                            }, 4e3);
                                        }
                                    }
                                    else { // αλλιώς, αν δεν είναι finale
                                        sounds.specialScore.play()
                                        wonBySpecialCard = true;
                                    }
                                }
                                break;

                            case specialCardsConfig.triangle.shape: // KABOOOM
                                card.specialCardEffect = () => {
                                    // Επίτευγμα: 'T r i a n g l e'
                                    unlockAchievement('ach_boom_card_found');

                                    sounds.cardOpenHardMode.play();
                                    // ανακάτεψε τις κάρτες
                                    let cardsListToShuffle = [],
                                        scoreAndTriesTextHolderChild = parentDiv.children[0];

                                    // Για κάθε "παιδί" που έχει το cardsHolder/parentDiv
                                    for (var e = 0; e < parentDiv.children.length; e++) {
                                        let child = parentDiv.children[e];
                                        // Για να βρούμε ποιο είναι κάρτα και ποιο κείμενο, διαβάζουμε το class του.
                                        if (child.className.includes('card')) {
                                            cardsListToShuffle.push(child);
                                        }
                                    }

                                    shuffle(cardsListToShuffle);

                                    cardsListToShuffle = cardsListToShuffle.filter(elem => {
                                        return elem.innerHTML != specialCardsConfig.triangle.shape;
                                    });

                                    cardsListToShuffle[(cardsListToShuffle.length)] = cardsListToShuffle[0];
                                    cardsListToShuffle[0] = scoreAndTriesTextHolderChild;
                                    parentDiv.replaceChildren(...cardsListToShuffle);
                                }
                                break;

                            case specialCardsConfig.omega.shape: // X-Ray

                                // Εμφάνισε τις κάρτες για 1.8 δευτερόλεπτα.
                                card.specialCardEffect = () => {
                                    blockClicks = true;

                                    // Επίτευγμα: "Χάκερ!!11"
                                    unlockAchievement('ach_xray_card_found');

                                    for (var card_ of document.getElementsByClassName('card')) {
                                        if (!card_.getAttribute('anoixthcarta')) {
                                            card_.innerHTML = card_.savedText;
                                            card_.style.background = card_.savedBackgroundColor;
                                        }
                                    }

                                    setTimeout(() => {
                                        resetCards(false);
                                        blockClicks = false;
                                        document.getElementById('cardsHolder').style.transition = '.5s';
                                        document.getElementById('cardsHolder').style.transform = 'rotate(360deg)';
                                    }, 1800);
                                }
                                break;

                            case specialCardsConfig.eye.shape: // The Eye
                                card.specialCardEffect = () => {
                                    let question = confirm('The Eye wants to know your location.');

                                    if (question) {
                                        window.location.href = '/specific';
                                    }

                                    else {
                                        alert('T H E  E Y E  W A N T S  T O  K N O W  Y O U R  L O C A T I O N .');
                                    }
                                }
                                break;

                            case specialCardsConfig.null.shape: // NULL
                                card.specialCardEffect = () => {
                                    underNullEffect = true;
                                    sounds.null.play();

                                    nullEffectLoop = () => {
                                        document.getElementById('cardsHolder').style.filter = 'blur(5px)';

                                        for (var cardElem of document.getElementsByClassName('card')) {
                                            cardElem.style.backgroundColor = 'black';
                                            cardElem.style.color = 'green';
                                            cardElem.setAttribute('infectedWithVirus', 'yes');
                                        }

                                        if (!nullEffectOver) {
                                            window.requestAnimationFrame(() => {
                                                nullEffectLoop();
                                            });
                                        }
                                        else {
                                            window.cancelAnimationFrame(nullEffectLoop);
                                        }
                                    };
                                    window.requestAnimationFrame(nullEffectLoop);
                                }
                                break;

                            case specialCardsConfig.shapeshifter.shape: // The Fake Card
                                // δεν κάνει τίποτα λολ
                                break;

                            case specialCardsConfig.aleph.shape: // ALEPH.
                                card.specialCardEffect = () => {
                                    gameMusic.pause();
                                    extremeModeMusic.pause();
                                    sounds.alephEffect.play();
                                    setTimeout(() => {
                                        open(location, '_self').close();
                                    }, 3e3);
                                }
                                break;

                            case specialCardsConfig.clock.shape: // +60sec TIME Card
                                card.specialCardEffect = () => {
                                    // Επίτευγμα: "Τι ρολόι είναι αυτό ρε;"
                                    unlockAchievement('ach_timed_special_card');

                                    timeLeft += 120;
                                    sounds.timeCardEffect.play();
                                }
                                break;

                            case specialCardsConfig.freezer.shape: // Time Freezer
                                card.specialCardEffect = () => {
                                    const temp = decreaseTimeBy;
                                    decreaseTimeBy = 0;
                                    sounds.freeze.play();
                                    pageBody.classList.toggle('frozen');
                                    document.getElementsByTagName('style')[1].innerHTML = `::-webkit-progress-value { background: ${specialCardsConfig.freezer.color}; }`;

                                    setTimeout(() => {
                                        decreaseTimeBy = temp;
                                        sounds.freeze.play();
                                        const cards = document.querySelectorAll('.card');
                                        cards.forEach(cardElem => {
                                            if (cardElem.savedText == specialCardsConfig.freezer.shape) {
                                                cardElem.style.transition = '.5s';
                                                cardElem.classList.toggle('dead');
                                            }
                                        });
                                        pageBody.classList.toggle('frozen');
                                    }, 5e3);
                                }
                                break;

                            case specialCardsConfig.clock_gold.shape: // OP CLOCK
                                card.specialCardEffect = () => {
                                    timeLeft = standardTimeLeft;
                                    sounds.timeCardGoldEffect.play();
                                }
                                break;

                            case specialCardsConfig.time_slower.shape: // Αργότερος Χρόνος
                                card.specialCardEffect = () => {
                                    // Επίτευγμα: "Χελωνάρας"
                                    unlockAchievement('ach_timed_mode_slow_card');

                                    sounds.timeSlower.play();
                                    decreaseTimeBy = .25;
                                }
                                break;

                            case specialCardsConfig.lamda.shape: // Κρύβει τις κάρτες
                                card.specialCardEffect = () => {
                                    sounds.loss.play();

                                    // Επίτευγμα: "Απώλεια Μνήμης"
                                    unlockAchievement('ach_memory_loss');

                                    for (var cardDivElem of document.getElementsByClassName('card')) {
                                        cardDivElem.removeAttribute('anoixthcarta');
                                    }

                                    setTimeoutWithRAF(() => {
                                        resetCards(false);
                                    }, CARDS_DELAY_MS);
                                }
                                break;

                            case specialCardsConfig.sigma.shape: // Σ (sigma)
                                card.specialCardEffect = () => {
                                    // Επίτευγμα: "Σ.. από.. Σωτήρης;"
                                    unlockAchievement('ach_sigma_card');

                                    for (var cardChildElem of document.getElementsByClassName('card')) {
                                        if (cardChildElem.savedText != specialCardsConfig.sigma.shape) {
                                            cardChildElem.classList.toggle('sigmaEffectEnabled');
                                        }
                                        else cardChildElem.classList.toggle('sigmaEffectEnabled');
                                    }
                                }
                                break;

                            case specialCardsConfig.engood.shape: // Engood's Card
                                break;

                            case specialCardsConfig.lifesaver.shape: // Lifesaver
                                card.specialCardEffect = () => {
                                    // Επίτευγμα: "ΖΩΩ!!"
                                    unlockAchievement('ach_lifesaver');

                                    preventLose = true;
                                    sounds.specialScore.play();
                                }
                                break;

                            // ---------------------------------------------------------
                            // COBALT MODE SPECIAL CARDS
                            // ----------------------------------------------------------
                            case specialCardsConfig.carbon69.shape: // Carbon 69
                                card.specialCardEffect = () => {
                                    sounds.specialScore.play();

                                    const cards = document.querySelectorAll('.card');

                                    cards.forEach(cardElem => {
                                        let color = 10;

                                        var chance = Math.random();
                                        if (chance < 0.7) { // 20% πιθανότητα να είναι το σωστό χρώμα της κάρτας
                                            color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                                        }
                                        else {
                                            color = card.savedBackgroundColor;
                                        }

                                        cardElem.style.boxShadow = `${color} 0px 0px 60px`;
                                    });
                                }
                                break;


                            case specialCardsConfig.infinity.shape: // Infinity
                                break;

                            case specialCardsConfig.tries_boost_6.shape: // 6 λιγότερες προσπάθειες
                                card.specialCardEffect = () => {
                                    sounds.specialScore.play()
                                    tries -= 6;
                                    updateTries();
                                }
                                break;

                            case specialCardsConfig.quadupler.shape: // Τετραπλό Score
                                card.specialCardEffect = () => {
                                    sounds.specialScore.play()
                                    score *= 4;
                                }
                                break;


                            case specialCardsConfig.pi.shape: // PI
                                card.specialCardEffect = () => {
                                    // Επίτευγμα: 'π'
                                    unlockAchievement('ach_PI');

                                    PI_EFFECT_LOL = true;
                                    extremeModeEnabled = true;
                                    MAX_TRIES = Math.PI * 10;
                                    pageBody.style.backgroundImage = 'url(./img/PI.jpg)';
                                    sounds.specialScore.play()
                                    score += Math.PI;
                                    tries += Math.PI;
                                    updateTries();

                                    for (var cardElem of document.getElementsByClassName('card')) {
                                        if (cardElem.savedText != '∏' && !card.mazeWall) cardElem.innerHTML = Math.PI;
                                    }
                                }
                                break;
                            // -----------------------------------------------------------

                            case specialCardsConfig.imaginary_unit.shape: // Universe Swap
                                card.specialCardEffect = () => {
                                    if (extremeModeEnabled || voidModeEnabled) return;
                                    gameMusic.pause();
                                    sounds.universeSwap.play();
                                    document.getElementById('cardsHolder').style.animation = 'seismos .25s linear infinite';
                                    $('#cardsHolder').fadeOut(2e3);
                                    setTimeoutWithRAF(() => {
                                        enabledImaginaryUniverse = true;
                                        document.body.removeChild(parentDiv);
                                        document.body.appendChild(imaginaryParentDiv);
                                        $('#cardsHolder').fadeOut(1);
                                        $('#cardsHolder').fadeIn(5e3);

                                        pageBody.style.background = '#c8c8c8';

                                        imaginaryParentDiv.appendChild(scoreAndTriesHolder);
                                        for (var j = 0; j < imaginaryCardsData.length; j++) {
                                            let imaginaryCard = imaginaryCardsData[j];
                                            createCard(imaginaryCard, 'imaginary');
                                        }
                                        resetCards(false);
                                        gameMusic.play();
                                    }, 5e5);
                                }
                                break;

                            case specialCardsConfig.redacted_D.shape: // Petercraft [REDACTED]
                                card.specialCardEffect = () => deltaEffect = true;
                                break;
                        }

                        // Δημιούργησε την σπεσιαλ κάρτα. (Αν βρέθηκε για να μην κάνει τις κανονικές σπεσιαλ)
                        if (specialCardDetected) {

                            // Ψάξε για το ποια είναι η τυχαία επιλεγμένη σπέσιαλ κάρτα.
                            let currentSpecialCard;

                            for (var objectName of Object.keys(specialCardsConfig)) {
                                if (specialCardsConfig[objectName].shape == card.shape) {
                                    currentSpecialCard = specialCardsConfig[objectName];
                                    break;
                                }
                            }

                            addToSpecialCardsArray(currentSpecialCard.shape);
                            card.color = pgnBirthday ? `${currentSpecialCard.color}, url(/img/confeti.png)` : ['gradient', 'no_skin'].includes(skin.id) ? currentSpecialCard.color : `${currentSpecialCard.color}, ${skin.bg}`;
                            card.specialCard = true;

                            // Σε περίπτωση που είναι η troll card
                            if (currentSpecialCard.shape == '[?]') {
                                let fakeCardShapes = cardShapes;

                                // Δημιούργησε μία ψεύτικη λίστα με τα σχήματα όλων των καρτών εκτός από το troll
                                fakeCardShapes = fakeCardShapes.filter(card2lShape => {
                                    return card2lShape != '[?]'
                                });

                                // Επέλεξε τυχαίο σχήμα.
                                card.shape = randomChoice(fakeCardShapes);
                                card.impostorCard = true;
                                nonPairCardExists = true;
                            }
                        }
                    }
                    // --------------------------------------------------------

                    cardsData.push(card);
                }

                // ανακάτεψε τις κάρτες
                shuffle(cardsData);

                for (var j = 0; j < STANDARD_AMOUNT_OF_CARDS; j++) {
                    const imcard = {
                        shape: imaginaryCardShapes[j],
                        realShape: imaginaryCardShapes[j],
                        color: ['no_skin', 'gradient', 'radian', 'target'].includes(skin.id) ? imaginaryCardColors[j] : skin.bg,
                        specialCard: false,
                        specialCardEffect: () => { }
                    }
                    // --------------------------------------------------------

                    imaginaryCardsData.push(imcard);
                }

                // ανακάτεψε και τις φανταστικές κάρτες
                shuffle(imaginaryCardsData);
            }
            // ========================================================================

            // =====================================================================
            // 2 - Το παιχνίδι και η δημιουργία καρτών
            // =====================================================================
            // ένα <div> για να κρατάει τις κάρτες.
            let parentDiv = document.createElement('div');
            parentDiv.id = 'cardsHolder'; // ταυτότητα για να διαβάσει CSS

            let imaginaryParentDiv = document.createElement('div');
            imaginaryParentDiv.id = 'cardsHolder';

            // Κείμενο που γράφει τις προσπάθειες και το score του παίχτη.
            let scoreAndTriesHolder = document.createElement('div');

            // -----------------------------------------------------------------
            // TIMED Mode
            // -----------------------------------------------------------------
            let timeBar;

            timeBar = document.createElement('progress');

            timeBar.id = 'timeBar';
            timeBar.setAttribute("max", standardTimeLeft);
            timeBar.setAttribute("value", timeLeft.toFixed(2));
            // -----------------------------------------------------------------

            let scoreText = document.createElement('h1'),
                triesText = document.createElement('h1'),
                fpsText = document.createElement('h1'),
                hideAndSeekText = document.createElement('h1'),
                hideAndSeekHintButton = document.createElement('button');

            fpsText.id = 'FPS';

            // Φτιάξε το κείμενο για score και προσπάθειες
            scoreText.appendChild(document.createTextNode(`Score: ${score}`));
            triesText.appendChild(document.createTextNode(`${LANGUAGE_DATA[LANGUAGE_INDEX].tries}: ${tries}`));
            fpsText.appendChild(document.createTextNode(`FPS: -`));
            hideAndSeekText.appendChild(document.createTextNode(`${LANGUAGE_DATA[LANGUAGE_INDEX].found}: ${hideAndSeekFoundCount} / ${AMOUNT_OF_CARDS}`));

            // Άλλαξε το μέγεθος της γραμματοσειράς.
            scoreText.style.fontSize = halloweenTime ? '30px' : '20px';
            triesText.style.fontSize = halloweenTime ? '30px' : '20px';
            fpsText.style.fontSize = halloweenTime ? '30px' : '20px';
            hideAndSeekText.style.fontSize = halloweenTime ? '30px' : '20px';
            hideAndSeekText.style.display = 'none'; // bug fix

            // -------------------------------------------------------
            // BUG FIX: Αν μία κάρτα βρίσκεται πάνω στο HINT κουμπί.
            // -------------------------------------------------------
            hideAndSeekHintButton.style.position = 'relative';
            hideAndSeekHintButton.style.zIndex = '999';
            // -------------------------------------------------------

            hideAndSeekHintButton.style.display = 'none'; // bug fix
            hideAndSeekHintButton.appendChild(document.createTextNode('HINT'));

            // -----------------------------------------------------------------------------------------------------------
            // Ένα "ΗΙΝΤ" κουμπί που κοστίζει 5 προσπάθειες αλλά λέει στον παίχτη την τοποθεσία μίας τυχαία κάρτας που
            // δεν έχει βρεθεί στο "Hide & Seek" mode.
            // -----------------------------------------------------------------------------------------------------------
            hideAndSeekHintButton.onclick = () => {
                let closedCardElems = [];

                for (var cardElem of document.getElementsByClassName('card')) {
                    if (!cardElem.getAttribute('egineclick')) closedCardElems.push(cardElem);
                }

                if (closedCardElems.length == 0) return;

                tries--; // bug fix
                tries += 5;
                updateTries();

                let randomlyChosenClosedCardElem = randomChoice(closedCardElems);
                randomlyChosenClosedCardElem.classList.toggle('hideAndSeekHint');
            }

            hideAndSeekHintButton.style.fontSize = '20px';
            hideAndSeekHintButton.style.width = 'auto';
            hideAndSeekHintButton.style.height = 'auto';
            // -----------------------------------------------------------------------------------------------------------

            // Αν είναι hide and seek mode, μην βάλεις score αλλά πόσες κάρτες βρέθηκαν.
            scoreAndTriesHolder.appendChild(scoreText);
            scoreAndTriesHolder.appendChild(hideAndSeekText);
            scoreAndTriesHolder.appendChild(fpsText);
            scoreAndTriesHolder.appendChild(triesText);
            scoreAndTriesHolder.appendChild(timeBar);
            scoreAndTriesHolder.appendChild(hideAndSeekHintButton);
            parentDiv.appendChild(scoreAndTriesHolder);

            // ----------------------------------------------------------------------
            // Μέτρα τα FPS.
            // ----------------------------------------------------------------------
            let prevTime = Date.now(),
                frames = 0;

            requestAnimationFrame(function loop() {
                const time = Date.now();
                frames++;
                if (time > prevTime + 1000) {
                    let fps = Math.round((frames * 1000) / (time - prevTime));
                    prevTime = time;
                    frames = 0;

                    fpsText.innerText = `FPS: ${fps}`;
                }

                requestAnimationFrame(loop);
            });
            // ----------------------------------------------------------------------

            // Συναρτήσεις που ενημερώνουν το score και τις προσπάθειες του παίχτη
            const updateScore = () => scoreText.innerHTML = `Score: ${score}`;
            const updateFound = () => hideAndSeekText.innerHTML = `${LANGUAGE_DATA[LANGUAGE_INDEX].found}: ${hideAndSeekFoundCount} / ${AMOUNT_OF_CARDS}`;
            const updateTries = () => {
                triesText.innerHTML = (extremeModeEnabled || hellModeEnabled) ? `${LANGUAGE_DATA[LANGUAGE_INDEX].tries}: ${tries} / ${MAX_TRIES}` : `${LANGUAGE_DATA[LANGUAGE_INDEX].tries}: ${tries}`;

                // -------------------------------------------------------------------
                // ANIMATION: Εφέ όταν ο παίχτης χάνει προσπάθεια
                // -------------------------------------------------------------------
                if (gameStarted && (extremeModeEnabled && !startedExtremeModeMusic) || hellModeEnabled) {
                    triesText.classList.toggle('warningTries');

                    setTimeoutWithRAF(() => {
                        triesText.classList.toggle('warningTries');
                    }, 1e5);
                }
                // --------------------------------------------------------------------

            }

            // Συνάρτηση που επαναφέρει όσες κάρτες δεν έχουν βρεθεί
            const resetCards = (addTries = true) => {
                const resetColor = PI_EFFECT_LOL ? 'url(./img/PI.jpg)' : hideAndSeekModeEnabled ? 'transparent' : pgnBirthday ? 'grey url(/img/confeti.png) no-repeat' : skin.bg;

                if (addTries) {
                    tries += 1; // προσπάθειες του παίχτη
                    updateTries();
                }

                const cardElements = document.querySelectorAll('.card');
                cardElements.forEach((card) => {
                    // card.innerHTML είναι το σχέδιο/κείμενο κάθε κάρτας
                    if (!card.getAttribute('anoixthcarta') && card.savedText != '∞' && !card.mazeWall) {
                        card.style.background = resetColor;
                        card.innerHTML = PI_EFFECT_LOL ? Math.PI : '​'; // κενό/whitespace
                        card.style.backgroundSize = 'cover';

                        if (card.classList.contains('opened')) {
                            if (enabledImaginaryUniverse) card.style.transform = 'none';
                            card.classList.toggle('opened');
                        }

                        card.removeAttribute('egineclick');
                        if (pgnBirthday) card.style.backgroundSize = '250%';

                        // Ειδική περίπτωση: "Σ" κάρτα.
                        if (card.savedText == specialCardsConfig.sigma.shape) {
                            card.style.animation = 'none';
                        }
                    }
                });
            }

            // Δημιουργία καρτών

            // Συνάρτηση που δημιουργεί κάρτα
            const createCard = (data, type = 'normal') => {
                let card = data;

                // <div> για κάθε κάρτα
                let div = document.createElement('div');
                div.className = 'card';
                div.style.background = card.color;
                div.style.backgroundSize = pgnBirthday && card.shape != 'Eng' ? '250%' : 'cover';
                div.style.backgroundBlendMode = ['crystal', 'radian', 'target'].includes(skin.id) ? 'multiply' : 'darken';

                if (hideAndSeekModeEnabled) {
                    div.style.position = 'absolute';
                    div.style.top = `${getRandomInt(0, window.innerHeight)}px`;
                    div.style.left = `${getRandomInt(0, window.innerWidth)}px`;
                    div.style.cursor = 'default';
                }

                // Η "Σ" κάρτα είναι πολύχρωμη.
                if (card.shape == specialCardsConfig.sigma.shape) {
                    div.classList.toggle('sigmaEffectEnabled');
                }

                // Το "π" έχει animation.
                else if (card.shape == specialCardsConfig.pi.shape) {
                    div.style.animation = 'gradient 15s ease infinite';
                    div.style.backgroundSize = '400% 400%';
                }

                // Βάλε τα εφέ που διάλεξε ο χρήστης/παίχτης στην κάρτα.
                if (playersEffect != null && !OG_modeEnabled) {
                    div.style.borderRadius = playersEffect.borderRadius;
                    div.style.fontSize = playersEffect.fontSize;
                    div.style.fontFamily = playersEffect.fontFamily;
                    div.style.textDecorationThickness = playersEffect.textDecorationThickness;
                    div.style.textDecorationLine = playersEffect.textDecorationLine;
                    div.style.textDecorationStyle = playersEffect.textDecorationStyle;
                    div.style.width = JSON.parse(playersEffect.widthAndHeight)[0];
                    div.style.height = JSON.parse(playersEffect.widthAndHeight)[1];

                    if (playersEffect.improvedGraphics && !papagianneosFinaleEnabled && !voidModeEnabled) div.style.boxShadow = 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px';
                }

                if (halloweenTime) {
                    div.style.font = 'bold 95px halloween';
                    div.style.color = '#520707';
                }

                // Χιόνι Εφέ για τις κάρτες.
                if (christmasDecorationsEnabled && !hideAndSeekModeEnabled) {
                    div.style.boxShadow = 'rgba(255, 255, 255, 1) 0px 50px 50px inset, rgba(255, 255, 255, 1) 0px -8px 3px inset';
                }

                if (card.specialCard) {
                    div.specialCard = true;
                    div.specialCardEffect = card.specialCardEffect;
                }

                if (card.impostorCard) div.impostorCard = true;

                // αποθήκευσε το χρώμα της κάρτας..
                div.savedBackgroundColor = card.color;

                // Ειδική περίπτωση για τα γεννέθλια του Pgn.
                if (pgnBirthday && !div.savedBackgroundColor.includes('gradient')) {
                    div.savedBackgroundColor += ' url(/img/confeti.png) no-repeat';
                }

                // Ειδική περίπτωση: "Σ" κάρτα.
                if (card.shape == specialCardsConfig.sigma.shape) {
                    div.savedAnimation = div.style.animation;
                }

                // κείμενο για το σχέδιο/σχήμα της κάρτας
                div.savedText = card.shape; // αποθήκευσε και το κείμενο
                div.realShape = card.realShape;
                div.appendChild(document.createTextNode(card.shape)); // βάλε το κείμενο στη κάρτα

                // Για τις φανταστικές κάρτες μόνο
                if (type == 'imaginary') {
                    div.imaginaryRotationType = getRandomInt(1, 345);
                }

                // Walls.
                if (card.mazeWall) {
                    div.classList.toggle('mazeWall');
                    div.mazeWall = true;
                }

                if (card.brokenCard) {
                    let chosenDisplay = randomChoice(BROKEN_CARD_POLYGONS);

                    div.style.clipPath = chosenDisplay;
                    div.style.cursor = 'default';
                    div.style.visibility = chosenDisplay != 'none' ? 'visible' : 'hidden';
                    div.mazeWall = true;

                    if (chosenDisplay != 'none') {
                        div.savedText = randomChoice(CHARACTERS_SET_PENALTY_MODE);
                        div.innerHTML = div.savedText;
                        div.style.background = 'grey';
                    }
                }
                // βάλε την κάρτα στο parentDiv ή στο imaginaryParentDiv
                type == 'normal' ? parentDiv.appendChild(div) : imaginaryParentDiv.appendChild(div);
            }
            const createCards = () => {

                // ---------------------------------
                // Μουσική
                // ----------------------------------
                if (!musicStarted) {
                    menuMusic.pause();

                    switch (true) {
                        case timedModeEnabled:
                            gameMusic = timedModeMusic;
                            break;

                        case papagianneosFinaleEnabled:
                            gameMusic = music.papagianneosFinaleMusic;
                            break;

                        case hellModeEnabled:
                            gameMusic = music.hellModeMusic;
                            break;
                    }

                    gameMusic.play();
                    musicStarted = true;
                }
                // ----------------------------------

                for (var i = 0; i < cardsData.length; i++) {
                    let card = cardsData[i];

                    // στείλε τις πληροφορίες στην συνάρτηση
                    createCard(card);
                }
            }

            // ξεκίνα το παιχνίδι
            (() => {

                // Εμφάνισε αρχική οθόνη (μενού).
                let startScreen = document.createElement('div');
                startScreen.id = 'screen';

                // ---------------------------------------------------------------------------------------------------------
                // Όνομα Παίχτη.
                // ---------------------------------------------------------------------------------------------------------
                let playerNameInputHolder = document.createElement('div');

                let playerNameInput = document.createElement('input');
                playerNameInput.placeholder = LANGUAGE_DATA[LANGUAGE_INDEX].nickname;
                playerNameInput.id = 'playerNameInput';
                playerNameInput.addEventListener('input', () => {
                    localStorage.setItem('playerName', playerNameInput.value);
                });
                playerNameInput.setAttribute('maxlength', '12');

                if (localStorage.getItem('playerName') != null) playerNameInput.value = localStorage.getItem('playerName');
                playerNameInputHolder.appendChild(playerNameInput);
                // ---------------------------------------------------------------------------------------------------------

                // Τίτλος
                let startScreenText = document.createElement('h1');
                startScreenText.appendChild(document.createTextNode(LANGUAGE_DATA[LANGUAGE_INDEX].title_game_name));
                startScreenText.style.margin = '0';

                const modifiedFontSize = halloweenTime ? '30px' : '20px';

                // λολ
                let developerNameLol = document.createElement('h1');
                developerNameLol.style.fontSize = modifiedFontSize;
                developerNameLol.appendChild(document.createTextNode(LANGUAGE_DATA[LANGUAGE_INDEX].developer));

                // Μουσική Credits (Soundimage.org)
                let musicCredit = document.createElement('h1');
                musicCredit.style.fontSize = modifiedFontSize;
                musicCredit.innerHTML = `${LANGUAGE_DATA[LANGUAGE_INDEX].label_music_credit} Petercraft#7530, <a href="https://pixabay.com/">Pixabay.com</a>, <a href="https://soundimage.org/">Soundimage.org</a> & <a href="https://www.soundhelix.com/">Soundhelix.com</a>.`;

                // For my friends :)
                let friendsWebsite = document.createElement('h1');
                friendsWebsite.style.fontSize = modifiedFontSize;
                friendsWebsite.innerHTML = `${LANGUAGE_DATA[LANGUAGE_INDEX].label_friends_project} <a href="https://2x05.surge.sh/">2x05</a>`;
                // Επίτευγμα: "Κάπου το θυμάμαι αυτό.."
                friendsWebsite.onclick = () => unlockAchievement('ach_2x05');

                // Τελευταία Τροποποίηση
                let howToPlayBtn = document.createElement('button');
                howToPlayBtn.style.fontSize = '25px';
                howToPlayBtn.appendChild(document.createTextNode('How To Play'));
                howToPlayBtn.onclick = () => {
                    sounds.buttonClick.play();
                    setTimeoutWithRAF(() => {
                        window.location.href = '/how-to-play';
                    }, 5e2);
                }

                // Επιτεύγματα
                let achievementsMenuBtn = document.createElement('button');
                achievementsMenuBtn.style.fontSize = '25px';
                achievementsMenuBtn.appendChild(document.createTextNode(LANGUAGE_DATA[LANGUAGE_INDEX].label_achievements));
                achievementsMenuBtn.onclick = () => {
                    sounds.buttonClick.play();
                    setTimeoutWithRAF(() => {
                        window.location.href = '/achievements';
                    }, 5e2);
                }

                // Σημερινά Παιχνίδια
                let leaderboardMenuBtn = document.createElement('button');
                leaderboardMenuBtn.style.fontSize = '25px';
                leaderboardMenuBtn.appendChild(document.createTextNode('Leaderboards'));
                leaderboardMenuBtn.onclick = () => {
                    sounds.buttonClick.play();
                    setTimeoutWithRAF(() => {
                        window.location.href = '/leaderboards';
                    }, 5e2);
                }

                let creditsBtn = document.createElement('button');
                creditsBtn.style.fontSize = '25px';
                creditsBtn.appendChild(document.createTextNode(LANGUAGE_DATA[LANGUAGE_INDEX].title_credits));
                creditsBtn.onclick = () => {
                    sounds.buttonClick.play();
                    document.body.appendChild(infoHolder);
                }

                let customizePageLink = document.createElement('button');
                customizePageLink.style.fontSize = '25px';
                customizePageLink.appendChild(document.createTextNode(LANGUAGE_DATA[LANGUAGE_INDEX].title_settings_page));
                customizePageLink.onclick = () => {
                    sounds.buttonClick.play();
                    setTimeoutWithRAF(() => {
                        window.location.href = '/customize';
                    }, 5e2);
                }

                let screenLogo = document.createElement('img');
                screenLogo.src = aprilFools ? './img/game-logo-old.png' : './img/game-logo.png';

                // Φτιάξε και όρισε τα χαρακτηριστικά της εικόνας
                let imgAtributes = [
                    ['draggable', 'false'],
                    ['width', '252'],
                    ['height', '250']
                ];

                for (var i_ = 0; i_ < imgAtributes.length; i_++) {
                    for (var j_ = 0; j_ < (imgAtributes[i_].length - 1); j_++) {
                        screenLogo.setAttribute(imgAtributes[i_][j_], imgAtributes[i_][j_ + 1]);
                    }
                }

                // ----------------------------------------------------------------------------------------------
                // Ρύθμιση για "Δύσκολο" gamemode.
                // ----------------------------------------------------------------------------------------------
                /*let hardModeCheckBoxWrapper = document.createElement('div');
    
                let hardModeCheckBox = document.createElement('input');
                hardModeCheckBox.id = 'hardModeCheckBox'; // Δώστου ταυτότητα για να επικοινωνεί με το κείμενο
                hardModeCheckBox.type = 'checkbox'; // όχι για κείμενο αλλά για clicks
                hardModeCheckBox.style.width = '18px';
                hardModeCheckBox.style.height = '18px';
                hardModeCheckBox.style.cursor = 'pointer';
                hardModeCheckBox.onclick = () => {
                    hardModeEnabled = !hardModeEnabled;
                }
    
                // Κείμενο για τη ρύθμιση.
                let hardModeCheckBoxLabel = document.createElement('label');
                hardModeCheckBoxLabel.htmlFor = 'hardModeCheckBox'; // Με βάση την ταυτότητα της ρύθμισης.
                hardModeCheckBoxLabel.appendChild(document.createTextNode('Δύσκολο Mode'));
                hardModeCheckBoxLabel.style.fontSize = '25px';
    
                hardModeCheckBoxWrapper.appendChild(hardModeCheckBox);
                hardModeCheckBoxWrapper.appendChild(hardModeCheckBoxLabel);*/
                // ----------------------------------------------------------------------------------------------

                // (Function/Συνάρτηση) Δημιουργία κουμπιού
                const createButton = (label, bgColor, mode = undefined) => {
                    if (label != "Papagianneos FINALE") label = `${LANGUAGE_DATA[LANGUAGE_INDEX].play}<br>${label}`;

                    if (aprilFools) label = LANGUAGE_DATA[LANGUAGE_INDEX].play;

                    let button = document.createElement('button');

                    // CSS.
                    button.style.background = bgColor;
                    if (mode == 'papagianneosFinale') {
                        /* button.setAttribute('disabled', 'true');
                         button.style.background = 'grey';
                         button.style.cursor = 'not-allowed';*/
                        button.style.fontSize = '40px';
                    }

                    // Κείμενο στο κουμπί
                    button.innerHTML = label;

                    // Event-Listener. (για τα κλικ)
                    button.onclick = () => {
                        // Start game loop
                        window.requestAnimationFrame(gameLoop);
                        switch (true) {
                            case playerNameInput.value == '':
                                alert('Name required.');
                                return;

                            case playerNameInput.value.length > 12:
                                alert('Name too long.');
                                return;
                        }



                        // Επίτευγμα: "Νέος Παίχτης"
                        unlockAchievement('ach_new_player');

                        // Επίτευγμα: "bals?!?!?"
                        unlockAchievement('ach_bals');

                        // Skin: "Window"
                        unlockSkin('window');

                        // Special Skin: "Crystal".
                        if (pgnBirthday) unlockSkin('crystal');

                        // Special Skin: "Target"
                        if (halloweenTime) unlockSkin('target');

                        if (mode != 'void') {
                            //pageBody.style.animation = 'none';
                            pageBody.style.backgroundSize = '100%';
                        }
                        //  if (mode == 'papagianneosFinale') return;
                        switch (mode) {
                            case 'virus': // Virus
                                virusModeEnabled = true;
                                specialCardsEnabled = false;
                                break;

                            case 'penalty': // Penalty
                                penaltyModeEnabled = true;
                                break;

                            case 'hard': // Δύσκολο
                                hardModeEnabled = true;
                                break;

                            case 'challenge': // Challenge.
                                challengeModeEnabled = true;
                                break;

                            case 'extreme': // Extreme.
                                extremeModeEnabled = true;
                                // Άλλαξε το χρώμα της γραμματοσειράς σε κόκκινο.
                                triesText.style.color = extremeModeTriesTextColor;
                                break;

                            case 'hell': // Hell.
                                hellModeEnabled = true;
                                triesText.style.color = extremeModeTriesTextColor;
                                pageBody.style.backgroundImage = 'conic-gradient(red, orange, black, maroon, red)';
                                break;

                            case 'timed': // Timed.
                                timedModeEnabled = true;
                                break;

                            case 'papagianneosFinale': // LOL WHY I MADE THIS
                                AMOUNT_OF_CARDS = 30;
                                papagianneosFinaleEnabled = true;
                                pageBody.style.backgroundImage = 'radial-gradient(cyan, black)';
                                break;

                            /*case '???':
                                hardModeEnabled = true;
                                secretSettingEnabled = true;
                                extremeModeEnabled = true;
                                MAX_TRIES += 15;
                                pageBody.style.backgroundImage = 'url(./img/secret_mode_bg.jpg)';
                                break;*/
                            case 'void': // Void.
                                voidModeOver = false;
                                voidModeEnabled = true;
                                pageBody.style.backgroundImage = 'url(/img/secret_mode_bg.jpg)';
                                break;

                            case 'cobalt': // cobalt
                                cobaltModeEnabled = true;
                                mazeWallsEnabled = true;
                                brokenCardsEnabled = true;
                                MAZE_WALLS_AMOUNT = (AMOUNT_OF_CARDS / 2) - 2;
                                BROKEN_CARDS_AMOUNT = (AMOUNT_OF_CARDS / 2) - 6 < 0 ? 3 : (AMOUNT_OF_CARDS / 2) - 6;
                                break;

                            case 'og': // OG mode
                                OG_modeEnabled = true;
                                appliedOGModeEffect = false;
                                specialCardsEnabled = false;
                                break;

                            case 'hideAndSeek':
                                scoreText.style.display = 'none';
                                hideAndSeekText.style.display = '';
                                hideAndSeekHintButton.style.display = '';
                                hideAndSeekModeEnabled = true;
                                specialCardsEnabled = false;
                                window.onclick = () => {
                                    tries++;
                                    updateTries();
                                    updateFound(); // bug fix
                                }
                                tries--; // bug fix
                                break;

                            default:
                                mode = 'simple';
                        }

                        modePlayed = mode;

                        sounds.buttonClick.play();

                        if (!['papagianneosFinale', 'void'].includes(mode)) {
                            pageBody.style.backgroundImage = 'none';

                            // Νέα γραφικά
                            if (!cobaltModeEnabled) if (playersEffect) if (playersEffect.improvedGraphics) {
                                pageBody.style.backgroundColor = '#c7c7c7';
                                scoreAndTriesHolder.style.color = 'black';
                            }
                        }

                        // Όπως ήταν το παιχνίδι παλιά..
                        if (OG_modeEnabled || aprilFools) {
                            setTimeoutWithRAF(() => {
                                $('#cardsHolder')
                                    .fadeOut(300)
                                    .fadeIn(300);
                                for (var card of document.getElementsByClassName('card')) {
                                    card.style.textShadow = 'none';
                                    card.style.display = 'inline-flex';
                                    card.style.fontSize = '80px';
                                    card.style.borderRadius = '0px';
                                    card.style.margin = '5px';
                                    card.style.alignItems = 'flex-end';
                                }
                            }, 500); // delay
                        }

                        // βάλε το parentDiv στο σώμα της ιστοσελίδας.
                        if (cobaltModeEnabled || hellModeEnabled) {
                            menuMusic.pause();
                            cobaltModeCards = Object.filter(specialCardsConfig, card => { return hellModeEnabled ? (card.exclusiveMode == 'cobalt' || card.exclusiveMode == 'timed' || card.shape.startsWith('T') || card.shape == specialCardsConfig.lifesaver.shape) : card.exclusiveMode == 'cobalt' });

                            let cobaltModeSelectMenu = document.createElement('div');
                            cobaltModeSelectMenu.className = 'modalBox';
                            cobaltModeSelectMenu.style.overflow = 'scroll';
                            cobaltModeSelectMenu.style.height = '600px';

                            // Τίτλος μενού πληροφοριών
                            let cobaltModeSelectMenuTitle = document.createElement('h1');
                            cobaltModeSelectMenuTitle.appendChild(document.createTextNode(LANGUAGE_DATA[LANGUAGE_INDEX].choose_special_card_menu_title));
                            cobaltModeSelectMenu.appendChild(cobaltModeSelectMenuTitle);

                            for (var card of Object.keys(cobaltModeCards)) {
                                let cobaltCard = specialCardsConfig[card];

                                // Για τα positions
                                let cardDivWrapper = document.createElement('div');
                                cardDivWrapper.style.display = 'inline-block';
                                cardDivWrapper.style.verticalAlign = 'top';
                                cardDivWrapper.style.alignItems = 'center';
                                cardDivWrapper.style.justifyContent = 'center';
                                cardDivWrapper.style.textAlign = 'center';

                                // Κάρτα PLACEHOLDER
                                let cardDiv = document.createElement('div');
                                cardDiv.className = 'howToPlayInfoCard';
                                cardDiv.style.background = cobaltCard.color;

                                // Η "Σ" κάρτα είναι πολύχρωμη.
                                if (cobaltCard.shape == specialCardsConfig.sigma.shape) {
                                    cardDiv.classList.toggle('sigmaEffectEnabled');
                                }

                                // Το "π" έχει animation.
                                else if (cobaltCard.shape == specialCardsConfig.pi.shape) {
                                    cardDiv.style.animation = 'gradient 15s ease infinite';
                                    cardDiv.style.backgroundSize = '400% 400%';
                                }

                                cardDiv.style.cursor = 'pointer';

                                // ------------------------------------------------------------
                                // Κείμενο για τις πληροφορίες της σπεσιαλ κάρτας
                                // ------------------------------------------------------------
                                cardDiv.appendChild(document.createTextNode(cobaltCard.shape));

                                let hiddenInfoTxTWrapper = document.createElement('div');
                                hiddenInfoTxTWrapper.className = 'hidden';
                                hiddenInfoTxTWrapper.style.fontSize = '20px';
                                hiddenInfoTxTWrapper.style.width = '150px'; // το μέγεθος κάθε κάρτας
                                hiddenInfoTxTWrapper.style.marginLeft = '10px';
                                hiddenInfoTxTWrapper.appendChild(document.createTextNode(cobaltCard.info));
                                // ------------------------------------------------------------

                                cardDivWrapper.appendChild(cardDiv);
                                cardDivWrapper.appendChild(hiddenInfoTxTWrapper);
                                cobaltModeSelectMenu.appendChild(cardDivWrapper);
                                cardDiv.onclick = () => {
                                    if (hellModeEnabled) choseCard = true;
                                    sounds.timeSlower.play();
                                    if (!hellModeEnabled) pageBody.style.backgroundColor = '#080226';
                                    selectedSpecialCardShape = cardDiv.innerText;
                                    document.body.removeChild(cobaltModeSelectMenu);
                                    startGame();
                                    createCards();
                                    document.body.appendChild(parentDiv);
                                    resetCards();
                                }
                            }
                            document.body.appendChild(cobaltModeSelectMenu);
                        }

                        else {
                            startGame();
                            createCards();
                            document.body.appendChild(parentDiv);
                            resetCards();
                        }

                        // PAPAGIANNEOS FINALE - REMASTARED
                        if (papagianneosFinaleEnabled) {

                            // Κάθε 15 δευτερόλεπτα, τυχαίο εφέ.
                            pgnFinaleEffectsLoop = setInterval(() => {
                                document.getElementById('cardsHolder').style.position = 'static';
                                document.getElementById('cardsHolder').style.transition = '1s';
                                document.getElementById('cardsHolder').style.transform = 'rotateX(0deg) rotateY(0deg)';
                                document.getElementById('cardsHolder').style.animation = 'none';
                                const cards = document.querySelectorAll('.card');
                                cards.forEach(cardElem => {
                                    cardElem.style.clipPath = 'none';
                                });

                                setTimeout(() => {
                                    switch (4){//getRandomInt(1, 4)) {
                                        case 1:
                                            document.getElementById('cardsHolder').style.transform = `rotateY(${randomChoice([-180, 180])}deg)`;
                                            break;

                                        case 2:
                                            document.getElementById('cardsHolder').style.transform = 'rotateX(180deg)';
                                            break;

                                        case 3:
                                            for (var card of document.getElementsByClassName('card')) {
                                                card.innerHTML = 'Pgn';
                                                card.style.background = 'radial-gradient(#adfff1, #265175)';
                                            }
                                            break;

                                        case 4:
                                            const cards = document.querySelectorAll('.card');
                                            cards.forEach(cardElem => {
                                                const chosenDisplay = randomChoice(BROKEN_CARD_POLYGONS);
                                                cardElem.style.clipPath = chosenDisplay;
                                            });
                                            break;
                                    } // end of switch
                                }, 2e3);
                            }, 25e3);

                            // Φτιάξε "death" κάρτες
                            for (var index = 0; index < 15; index++) {
                                createCard({
                                    shape: specialCardsConfig.death.shape,
                                    color: pgnBirthday ? `${specialCardsConfig.death.color}, url(/img/confeti.png)` : ['gradient', 'no_skin'].includes(skin.id) ? specialCardsConfig.death.color : `${specialCardsConfig.death.color}, ${skin.bg}`,
                                    specialCard: true,
                                    specialCardEffect: () => {
                                        if (!papagianneosFinaleEnabled) {
                                            sounds.loss.play();
                                        }
                                        lostByDeathCard = true;
                                    }
                                });
                                resetCards(false);
                            }

                            // ανακάτεψε τις κάρτες
                            let cardsListToShuffle = [],
                                scoreAndTriesTextHolderChild = parentDiv.children[0];

                            // Για κάθε "παιδί" που έχει το cardsHolder/parentDiv
                            for (var e = 0; e < parentDiv.children.length; e++) {
                                let child = parentDiv.children[e];
                                // Για να βρούμε ποιο είναι κάρτα και ποιο κείμενο, διαβάζουμε το class του.
                                if (child.className.includes('card')) {
                                    cardsListToShuffle.push(child);
                                }
                            }

                            shuffle(cardsListToShuffle);

                            cardsListToShuffle[(cardsListToShuffle.length)] = cardsListToShuffle[0];
                            cardsListToShuffle[0] = scoreAndTriesTextHolderChild;
                            parentDiv.replaceChildren(...cardsListToShuffle);
                        }
                        gameStarted = true;
                        // εξαφάνισε την οθόνη με το κουμπί μαζί
                        document.body.removeChild(startScreen);

                        if (skin.pageBg != 'none') pageBody.style.backgroundImage = skin.pageBg;
                    }

                    return button;
                }

                // Πληροφορίες του παιχνιδιού
                let infoHolder = document.createElement('div');
                infoHolder.className = 'modalBox';

                // Τίτλος μενού πληροφοριών
                let modalBoxTitle = document.createElement('h1');
                modalBoxTitle.appendChild(document.createTextNode(LANGUAGE_DATA[LANGUAGE_INDEX].title_credits));
                infoHolder.appendChild(modalBoxTitle);

                // Κουμπί για να "σβήνει" το μενού με τις πληροφορίες.
                let closeInfoHolderBtn = document.createElement('button');
                closeInfoHolderBtn.appendChild(document.createTextNode(LANGUAGE_DATA[LANGUAGE_INDEX].label_close_button));
                closeInfoHolderBtn.style.fontSize = '25px';
                closeInfoHolderBtn.onclick = () => {
                    sounds.buttonClick.play();
                    document.body.removeChild(infoHolder);
                }

                // Κουμπί για να παίξει ο παίχτης
                let buttonsWrapper = document.createElement('div');

                let playButton = createButton(LANGUAGE_DATA[LANGUAGE_INDEX].play_mode_easy, 'green'), // Κουμπί για να παίξει ο παίχτης "απλό" mode
                    playButtonHard = createButton(LANGUAGE_DATA[LANGUAGE_INDEX].play_mode_hard, 'maroon', 'hard'), // Κουμπί για να παίξει ο παίχτης "δύσκολο" mode
                    playButtonChallenge = createButton(LANGUAGE_DATA[LANGUAGE_INDEX].play_mode_challenge, 'purple', 'challenge'), // Κουμπί για να παίξει ο παίχτης "challenge" mode
                    playButtonExtreme = createButton(LANGUAGE_DATA[LANGUAGE_INDEX].play_mode_extreme, 'radial-gradient(maroon, black)', 'extreme'), // Κουμπί για να παίξει ο παίχτης "extreme" mode
                    playButtonTimed = createButton(LANGUAGE_DATA[LANGUAGE_INDEX].play_mode_timed, 'radial-gradient(yellow, gold)', 'timed'), // Κουμπί για να παίξει ο παίχτης "timed" mode
                    playButtonSecretMode = createButton(LANGUAGE_DATA[LANGUAGE_INDEX].play_mode_void, 'radial-gradient(#240907, black)', 'void'), // Κουμπί για να παίξει ο παίχτης "void" mode
                    //playButtonOGMode = createButton('OG', 'radial-gradient(purple, white)', 'og'), // Κουμπί για να παίξει ο παίχτης "og" mode
                    // playButtonVirus = createButton(LANGUAGE_DATA[LANGUAGE_INDEX].play_mode_virus, 'radial-gradient(red, black)', 'virus'), // Κουμπί για να παίξει ο παίχτης "virus" mode
                    // playbuttonPenalty = createButton(LANGUAGE_DATA[LANGUAGE_INDEX].play_mode_penalty, 'blue', 'penalty'), // Penalty mode
                    playButtonHideAndSeek = createButton(LANGUAGE_DATA[LANGUAGE_INDEX].play_mode_hideAndSeek, 'cyan', 'hideAndSeek'),
                    playEventModeBtn,
                    //playButtonCobalt = createButton(LANGUAGE_DATA[LANGUAGE_INDEX].play_mode_cobalt, 'radial-gradient(black, darkblue)', 'cobalt'),
                    playButtonPapagianneosFinale = createButton('Papagianneos FINALE', 'radial-gradient(green, black)', 'papagianneosFinale'); // Κουμπί για να παίξει ο παίχτης "finale" mode

                // ---------------------------------------------------------------------------------------------------
                // Βάλε συγκεκριμένο mode με βάση την ημερομηνία (την μέρα)
                // ---------------------------------------------------------------------------------------------------
                if (eventModeRotationEnabled) {
                    let eventModeData = {
                        name: '',
                        color: '',
                        id: ''
                    }
                    switch (new Date().getDay()) {
                        case 1: // Δευτέρα
                            eventModeData = {
                                name: LANGUAGE_DATA[LANGUAGE_INDEX].play_mode_cobalt,
                                color: 'radial-gradient(black, darkblue)',
                                id: 'cobalt'
                            }
                            break;

                        case 2: // Τρίτη
                            eventModeData = {
                                name: LANGUAGE_DATA[LANGUAGE_INDEX].play_mode_virus,
                                color: 'radial-gradient(red, black)',
                                id: 'virus'
                            }
                            break;

                        case 3: // Τετάρτη
                            eventModeData = {
                                name: LANGUAGE_DATA[LANGUAGE_INDEX].play_mode_penalty,
                                color: 'blue',
                                id: 'penalty'
                            }
                            break;

                        case 4: // Πέμπτη
                            eventModeData = {
                                name: 'OG',
                                color: 'radial-gradient(purple, white)',
                                id: 'og'
                            }
                            break;

                        case 5: // Παρασκευή
                            eventModeData = {
                                name: LANGUAGE_DATA[LANGUAGE_INDEX].play_mode_cobalt,
                                color: 'radial-gradient(black, darkblue)',
                                id: 'cobalt'
                            }
                            break;

                        case 6: // Σάββατο
                            eventModeData = {
                                name: LANGUAGE_DATA[LANGUAGE_INDEX].play_mode_penalty,
                                color: 'blue',
                                id: 'penalty'
                            }
                            break;

                        case 0: // Κυριακή
                            eventModeData = {
                                name: LANGUAGE_DATA[LANGUAGE_INDEX].play_mode_hell,
                                color: 'conic-gradient(red, orange, black, maroon, red)',
                                id: 'hell'
                            }
                            break;
                    }
                    playEventModeBtn = createButton(eventModeData.name, eventModeData.color, eventModeData.id);
                }
                // ---------------------------------------------------------------------------------------------------

                // ---------------------------------------------------
                // Κουμπιά
                // ---------------------------------------------------
                buttonsWrapper.appendChild(playButton);
                if (!aprilFools) {
                    buttonsWrapper.appendChild(playButtonHard);
                    buttonsWrapper.appendChild(playButtonChallenge);
                    buttonsWrapper.appendChild(playButtonExtreme);
                    buttonsWrapper.appendChild(playButtonTimed);
                    buttonsWrapper.appendChild(playButtonPapagianneosFinale);
                    buttonsWrapper.appendChild(playButtonSecretMode);
                    buttonsWrapper.appendChild(playButtonHideAndSeek);
                    if (eventModeRotationEnabled) buttonsWrapper.appendChild(playEventModeBtn);
                    if (testServer) {
                        const eventModes = [
                            {
                                name: LANGUAGE_DATA[LANGUAGE_INDEX].play_mode_virus,
                                color: 'radial-gradient(red, black)',
                                id: 'virus'
                            },
                            {
                                name: 'OG',
                                color: 'radial-gradient(purple, white)',
                                id: 'og'
                            },
                            {
                                name: LANGUAGE_DATA[LANGUAGE_INDEX].play_mode_cobalt,
                                color: 'radial-gradient(black, darkblue)',
                                id: 'cobalt'
                            },
                            {
                                name: LANGUAGE_DATA[LANGUAGE_INDEX].play_mode_penalty,
                                color: 'blue',
                                id: 'penalty'
                            },
                            {
                                name: LANGUAGE_DATA[LANGUAGE_INDEX].play_mode_hell,
                                color: 'conic-gradient(red, orange, black, maroon, red)',
                                id: 'hell'
                            },
                        ];
                        eventModes.forEach(event => {
                            buttonsWrapper.appendChild(createButton(event.name, event.color, event.id));
                        });
                    }
                }
                // ----------------------------------------------------

                let settingsHolder = document.createElement('div');
                settingsHolder.style.display = 'block';
                settingsHolder.style.marginBottom = '50px';

                // ---------------------------------------------------------------------
                // Featured Youtuber
                // ---------------------------------------------------------------------
                let featuredYoutuberHolder = document.createElement('div');
                featuredYoutuberHolder.className = 'featuredYoutuber';

                let youtubeIcon = document.createElement('img');
                youtubeIcon.setAttribute('width', '50');
                youtubeIcon.setAttribute('height', '30');
                youtubeIcon.setAttribute('draggable', 'false');
                youtubeIcon.src = './img/youtube-icon.png';
                youtubeIcon.className = 'featuredYoutuberStat';

                let featuredYoutuberText = document.createElement('h1');
                featuredYoutuberText.className = 'featuredYoutuberStat';
                featuredYoutuberText.innerHTML = 'Featured Youtuber: ';

                let featuredYoutuber = randomChoice(FEATURED_YOUTUBERS);
                featuredYoutuberText.innerHTML += featuredYoutuber.name;

                featuredYoutuberHolder.onclick = () => {
                    sounds.buttonClick.play();
                    // για να προλάβει να παίξει ο ήχος..
                    setTimeoutWithRAF(() => {
                        window.open(featuredYoutuber.link);
                    }, 5e2);

                }

                featuredYoutuberHolder.appendChild(youtubeIcon);
                featuredYoutuberHolder.appendChild(featuredYoutuberText);
                // ---------------------------------------------------------------------

                startScreen.appendChild(screenLogo); // Logo
                startScreen.appendChild(startScreenText); // Τίτλος
                infoHolder.appendChild(developerNameLol); // λολ
                infoHolder.appendChild(friendsWebsite); // for my friends :)
                infoHolder.appendChild(musicCredit); // για credit στο Soundimage.org για την μουσική του παιχνιδιού
                infoHolder.appendChild(closeInfoHolderBtn);

                if (aprilFools) {
                    youtubeIcon.style.display = 'none';
                    startScreen.appendChild(featuredYoutuberHolder); // Featured Youtuber
                    startScreen.appendChild(playerNameInputHolder); // Όνομα Παίχτη
                    featuredYoutuberHolder.style.background = 'transparent';
                    featuredYoutuberHolder.style.color = 'white';
                    startScreen.appendChild(developerNameLol); // λολ
                    startScreen.appendChild(friendsWebsite); // for my friends :)
                    startScreen.appendChild(musicCredit); // για credit στο Soundimage.org για την μουσική του παιχνιδιού
                }

                else {
                    settingsHolder.appendChild(customizePageLink);
                    settingsHolder.appendChild(creditsBtn); // Credits
                    settingsHolder.appendChild(howToPlayBtn); // How to play link
                    settingsHolder.appendChild(achievementsMenuBtn); // Επιτεύγματα
                    settingsHolder.appendChild(leaderboardMenuBtn); // Leaderboards
                    startScreen.appendChild(featuredYoutuberHolder); // Featured Youtuber
                    startScreen.appendChild(playerNameInputHolder); // Όνομα Παίχτη
                    startScreen.appendChild(settingsHolder); // Ρυθμίσεις κ.α.
                }

                startScreen.appendChild(buttonsWrapper); // Κουμπιά
                document.body.appendChild(startScreen); // Βάλε την οθόνη στο σώμα της ιστοσελίδας

                if (halloweenTime) { // fix for buttons
                    for (var buttonIndex = 0; buttonIndex < document.getElementsByTagName('button').length; buttonIndex++) {
                        let button = document.getElementsByTagName('button')[buttonIndex];
                        button.style.font = 'bold 55px halloween';
                        button.style.color = '#520707';
                    }
                }

                // ============================================================================================================
                // GAME LOOPS
                // ============================================================================================================\
                const effectsLoop = () => {
                    // ---------------------------------------------------------------------------------------
                    // Σεισμικό Effect για το "δύσκολο" mode
                    // ---------------------------------------------------------------------------------------
                    if (hardModeEnabled || OG_modeEnabled || (!voidModeEnabled && (papagianneosFinaleEnabled && !papagianneosFinaleAngryRun))/* && !secretSettingEnabled*/) {
                        // Μέτρα τις κλειστές κάρτες.
                        let closedCards = [];
                        for (var card_2 of document.getElementsByClassName('card')) {
                            if (!card_2.getAttribute('anoixthcarta')) {
                                closedCards.push(card_2);
                            }
                        }

                        // -------------------------------------------------------------------------
                        // Αφαίρεσε τις σπεσιαλ κάρτες, ΑΝ υπάρχουν, από το συνολικό σύνολο καρτών
                        // έτσι ώστε ο παίχτης να μην χρειάζεται να την βρει για να κερδίσει μαζί
                        // με τις κανονικές κάρτες.
                        // -------------------------------------------------------------------------
                        closedCards = closedCards.filter(_card => { return !_card.specialCard });
                        // -------------------------------------------------------------------------

                        // ANGRY PGN
                        if (papagianneosFinaleEnabled && (closedCards.length <= 6 && gameStarted)) {
                            gameMusic.pause();
                            blockClicks = true;
                            sounds.angryPgnFinale.play();
                            papagianneosFinaleAngryRun = true;
                            pageBody.style.transition = '1s';
                            setTimeoutWithRAF(() => {
                                pageBody.style.transform = 'rotate(360deg)';
                                for (var index = 0; index < 15; index++) {
                                    createCard({
                                        shape: 'mazeWall',
                                        color: 'transparent',
                                        mazeWall: true,
                                        specialCard: true,
                                        specialCardEffect: () => { }
                                    });
                                    resetCards(false);
                                }

                                // ανακάτεψε τις κάρτες
                                let cardsListToShuffle = [],
                                    scoreAndTriesTextHolderChild = parentDiv.children[0];

                                // Για κάθε "παιδί" που έχει το cardsHolder/parentDiv
                                for (var e = 0; e < parentDiv.children.length; e++) {
                                    let child = parentDiv.children[e];
                                    // Για να βρούμε ποιο είναι κάρτα και ποιο κείμενο, διαβάζουμε το class του.
                                    if (child.className.includes('card')) {
                                        cardsListToShuffle.push(child);
                                    }
                                }

                                shuffle(cardsListToShuffle);

                                cardsListToShuffle[(cardsListToShuffle.length)] = cardsListToShuffle[0];
                                cardsListToShuffle[0] = scoreAndTriesTextHolderChild;
                                parentDiv.replaceChildren(...cardsListToShuffle);

                                currentSpecialCards.push('mazeWall');
                                removedSpecialCardsFromFullCount.push(false);
                                blockClicks = false;
                                gameMusic.play();
                            }, 2e3);
                        }

                        // Αν υπάρχουν λιγότερο από 6 κλειστές κάρτες, βάλε το εφέ
                        else if (closedCards.length <= (OG_modeEnabled ? 4 : 6) && gameStarted) {

                            // Φτάνει με το παρόν, ώρα για το μέλλον.
                            if (OG_modeEnabled && !appliedOGModeEffect) {
                                appliedOGModeEffect = true;
                                $('#cardsHolder')
                                    .fadeOut(300)
                                    .fadeIn(300);
                                for (var card of document.getElementsByClassName('card')) {
                                    card.style.textShadow = 'rgba(0, 0, 0, .5) 2px 2px';
                                    card.style.display = 'inline-flex';
                                    card.style.borderRadius = '2.5px';
                                    card.style.fontSize = '60px';
                                    card.style.margin = '10px';
                                    card.style.alignItems = 'center';
                                }
                            }

                            else if (!OG_modeEnabled) {
                                document.getElementById('cardsHolder').style.animation = 'seismos 1s linear infinite';
                                pageBody.style.backgroundColor = 'rgb(25, 0, 0)';
                            }
                        }
                    }
                    // ---------------------------------------------------------------------------------------
                }

                const timedModeLoop = () => {
                    // ---------------------------------------------------------------
                    // TIMED Mode
                    // ---------------------------------------------------------------
                    if (((choseCard && hellModeEnabled) || timedModeEnabled) && gameStarted && decreaseTimeBy != 0) {
                        // Μείωσε τον χρόνο
                        timeLeft -= decreaseTimeBy;
                        timeBar.setAttribute("value", timeLeft.toFixed(2));

                        let timeLeftPerc = makePercentage(timeLeft, standardTimeLeft);

                        // Μπάρα χρόνου
                        if (document.getElementById('timeBar')) {
                            document.getElementById('timeBar').style.display = 'block';

                            // Χρώμα της μπάρας του χρόνου
                            let color__ = 'green';

                            if (timeLeftPerc > 60) {
                                color__ = 'green';
                            }
                            else if (timeLeftPerc <= 60 && color__ != 'red') {
                                color__ = 'gold';
                            }
                            if (timeLeftPerc <= 35) {
                                color__ = 'red';
                                document.getElementById('cardsHolder').style.animation = 'seismos 1s linear infinite';
                                pageBody.style.background = warningColorOfBodyTag;
                            }

                            // -----------------------------------------------------------------------------------------------------------
                            // Η CSS δεν αφήνει να γίνει αλλαγεί στο χρώμα τύπου "progress", για αυτό δημιούργησε ένα ψεύτικο CSS tag και
                            // τοποθέτησε τις πληροφορίες χρωμάτων εκεί.
                            // -----------------------------------------------------------------------------------------------------------
                            if (!timedModeStyleTagMade) {
                                let tempStyleTag = document.createElement('style');
                                tempStyleTag.appendChild(document.createTextNode(`::-webkit-progress-value { background: ${color__}; }`));
                                document.head.appendChild(tempStyleTag);
                                timedModeStyleTagMade = true;
                            }

                            else {
                                document.getElementsByTagName('style')[1].innerHTML = `::-webkit-progress-value { background: ${color__}; }`;
                            }
                            // -----------------------------------------------------------------------------------------------------------

                        }

                        // Κάνε τον παίχτη να χάσει αν τελείωσε ο χρόνος
                        if (timeLeft <= 0) {
                            if (preventLose) {
                                timeLeft += 400;
                                const cards = document.querySelectorAll('.card');
                                cards.forEach(cardElem => {
                                    if (cardElem.savedText == specialCardsConfig.lifesaver.shape) {
                                        cardElem.style.transition = '.5s';
                                        cardElem.classList.toggle('dead');
                                    }
                                });
                                sounds.saved.play();
                                preventLose = false;
                                return;
                            }
                            lostByDeathCard = true;
                            sounds.loss.play();
                        }
                    }
                    // ---------------------------------------------------------------
                }

                const extremeModeLoop = () => {
                    // -----------------------------------------------------------------
                    // Extreme Gamemode: Όταν περάσει το όριο προσπάθειων ο παίχτης, χάσε.
                    // ------------------------------------------------------------------
                    if (lostByDeathCard || extremeModeEnabled) {

                        // Εφέ για τις προσπάθειες του παίχτη.
                        if (extremeModeEnabled && tries >= (MAX_TRIES - 2)) {
                            triesText.style.animation = 'seismos .3s linear infinite';
                            document.getElementById('cardsHolder').style.animation = 'seismos 1s linear infinite';
                            pageBody.style.background = warningColorOfBodyTag;

                            if (!startedExtremeModeMusic) {
                                startedExtremeModeMusic = true;
                                gameMusic.pause();
                                extremeModeMusic.play();
                            }
                        }
                    }
                    // --------------------------------------------------------------------
                }

                // game loops
                const winCheckLoop = (openedCards) => {
                    // Τσέκαρε για νίκη με διαφορετικές περιπτώσεις.
                    if (
                        hideAndSeekWin || // Hide And Seek all cards found.
                        wonBySpecialCard || // "K" card found
                        (!hideAndSeekModeEnabled && !enabledImaginaryUniverse && ((nonPairCardExists ? (openedCards.length + 1) : openedCards.length) / 2) >= (AMOUNT_OF_CARDS / 2)) ||
                        (enabledImaginaryUniverse && (openedCards.length / 2) == (STANDARD_AMOUNT_OF_CARDS / 2)) // Winning in Imaginary Universe
                    ) {
                        // Αν δεν είναι VOID mode.
                        if (voidModeOver) {

                            // -------------------------------------------------------------------
                            // Επιτεύγματα για κάθε mode. Μην μετράς τις νίκες από την σπεσιαλ Κ
                            // κάρτα.
                            // -------------------------------------------------------------------

                            // Επίτευγμα: Φαντασικός
                            if (enabledImaginaryUniverse) unlockAchievement('ach_fantastic');

                            if (!wonBySpecialCard) { // Αν δεν κέρδισε με την χρήση της "Κ" σπέσιαλ κάρτας :)
                                // Eπίτευγμα: "Skill Issue"
                                if (tries < 10) {
                                    unlockAchievement('ach_skill_issue');
                                }

                                // Επίτευγμα: "Τέρμα η μνήμη RAM"
                                unlockAchievement('ach_win_any_20');

                                // Επίτευγμα: "Παίχτης από Κουρδιστάν"
                                unlockAchievement('ach_win_any_50');

                                // Τρόπαιο: "Βρες τον σωστό δάσκαλο"
                                unlockAchievement('tr_win_any_1k');

                                // Skin: "Super Gradient"
                                unlockSkin('gradient');

                                let achievementIDToCheckForUnlock = '';
                                switch (true) {
                                    // Δύσκολο
                                    case hardModeEnabled:
                                        achievementIDToCheckForUnlock = 'ach_hard_mode_win';
                                        break;

                                    // Challenge
                                    case (challengeModeEnabled && !papagianneosFinaleEnabled):
                                        achievementIDToCheckForUnlock = 'ach_challenge_mode_win';
                                        break;

                                    // Extreme
                                    case (extremeModeEnabled && !papagianneosFinaleEnabled):
                                        achievementIDToCheckForUnlock = 'ach_extreme_mode_win';
                                        break;

                                    // Papagianneos Finale
                                    case papagianneosFinaleEnabled:
                                        achievementIDToCheckForUnlock = 'ach_pgn_finale_win';
                                        break;

                                    // Timed
                                    case timedModeEnabled:
                                        achievementIDToCheckForUnlock = 'ach_timed_mode_win';
                                        break;

                                    // Void.
                                    case voidModeEnabled:
                                        achievementIDToCheckForUnlock = 'ach_redacted';
                                        break;

                                    // Virus (made by Petercraft)
                                    case virusModeEnabled:
                                        achievementIDToCheckForUnlock = 'ach_win_virus';
                                        break;

                                    case hellModeEnabled:
                                        achievementIDToCheckForUnlock = 'ach_win_hell';
                                        break;

                                    case penaltyModeEnabled:
                                    case cobaltModeEnabled:
                                    case OG_modeEnabled:
                                    case hideAndSeekModeEnabled:
                                        achievementIDToCheckForUnlock = 'no achievement';
                                        break;

                                    // Απλό
                                    default:
                                        achievementIDToCheckForUnlock = 'ach_normal_mode_win';
                                        break;
                                }

                                if (achievementIDToCheckForUnlock != 'no achievement') unlockAchievement(achievementIDToCheckForUnlock);

                                if (timedModeEnabled) unlockAchievement('ach_timed_mode_win_10');

                                // Επίτευγμα.
                                if (papagianneosFinaleEnabled) {
                                    unlockAchievement('ach_pgn_finale_twice');
                                    if (pgnBirthday) unlockSkin('radian'); // Special Skin: Ακτίνια.
                                }
                            }
                            // -------------------------------------------------------------------

                            // -------------------------------------------------------
                            // Μουσική
                            // -------------------------------------------------------
                            switch (true) {
                                case voidModeEnabled:
                                    music.papagianneosFinaleMusic.pause();

                                case timedModeEnabled:
                                    timedModeMusic.pause();

                                case startedExtremeModeMusic:
                                    extremeModeMusic.pause();

                                case papagianneosFinaleEnabled:
                                    music.papagianneosFinaleMusic.pause();

                                case hellModeEnabled:
                                    gameMusic.pause();
                                    music.hellModeMusic.pause();

                                default:
                                    gameMusic.pause();
                            }
                            // --------------------------------------------------------

                            halloweenTime ? sounds.winHalloween.play() : sounds.win.play();

                            // --------------------------------------------------------------
                            // Στείλε στον server..
                            // --------------------------------------------------------------
                            const playerObject = {
                                name: playerNameInput.value,
                                score: score,
                                tries: tries,
                                cardsAmount: AMOUNT_OF_CARDS,
                                mode: modePlayed
                            }
                            sendToServer(playerObject);
                            // --------------------------------------------------------------

                            pageBody.style.backgroundImage = aprilFools ? 'url(./img/game_bg_old.png)' : 'url(./img/game_bg.png)';
                            pageBody.style.backgroundColor = 'black';

                            // Εμφάνισε "Κέρδισες!" οθόνη.
                            let winScreen = document.createElement('div');
                            winScreen.id = 'screen';

                            let winScreenText = document.createElement('h1');
                            winScreenText.appendChild(
                                document.createTextNode(
                                    wonBySpecialCard ? LANGUAGE_DATA[LANGUAGE_INDEX].win_K_card :
                                        hideAndSeekModeEnabled ? LANGUAGE_DATA[LANGUAGE_INDEX].win_mode_hideAndSeek :
                                            cobaltModeEnabled ? LANGUAGE_DATA[LANGUAGE_INDEX].win_mode_cobalt :
                                                penaltyModeEnabled ? LANGUAGE_DATA[LANGUAGE_INDEX].win_mode_penalty :
                                                    virusModeEnabled ? LANGUAGE_DATA[LANGUAGE_INDEX].win_mode_virus :
                                                        voidModeEnabled ? LANGUAGE_DATA[LANGUAGE_INDEX].win_mode_void :
                                                            timedModeEnabled ? LANGUAGE_DATA[LANGUAGE_INDEX].win_mode_timed :
                                                                papagianneosFinaleEnabled ? LANGUAGE_DATA[LANGUAGE_INDEX].win_mode_finale :
                                                                    extremeModeEnabled ? LANGUAGE_DATA[LANGUAGE_INDEX].win_mode_extreme :
                                                                        challengeModeEnabled ? LANGUAGE_DATA[LANGUAGE_INDEX].win_mode_challenge :
                                                                            hardModeEnabled ? LANGUAGE_DATA[LANGUAGE_INDEX].win_mode_hard :
                                                                                LANGUAGE_DATA[LANGUAGE_INDEX].win
                                )
                            );

                            // αν papagianneos finale, σπεσιαλ μήνυμα
                            //pageBody.style.animation = 'none';
                            pageBody.style.backgroundSize = 'cover';
                            if (papagianneosFinaleEnabled) {
                                sounds.pgnFinaleWin.play();
                                clearInterval(pgnFinaleEffectsLoop);
                            }

                            // Κείμενο στην οθόνη (κέρδισες!) για score και προσπάθειες
                            let scoreTextWinScreen = document.createElement('h1'),
                                triesTextWinScreen = document.createElement('h1'),
                                totalCardsPlayed = document.createElement('h1');

                            // Φτιάξε το κείμενο για score και προσπάθειες
                            scoreTextWinScreen.appendChild(document.createTextNode(`Score: ${score}`));
                            triesTextWinScreen.appendChild(document.createTextNode(`${LANGUAGE_DATA[LANGUAGE_INDEX].tries}: ${tries}`));

                            // Με πόσες κάρτες έπαιξε ο παίχτης;
                            totalCardsPlayed.appendChild(document.createTextNode(`${LANGUAGE_DATA[LANGUAGE_INDEX].amount_of_cards}: ${AMOUNT_OF_CARDS}`));

                            // Άλλαξε το μέγεθος της γραμματοσειράς.
                            scoreTextWinScreen.style.fontSize = '25px';
                            triesTextWinScreen.style.fontSize = '25px';
                            totalCardsPlayed.style.fontSize = '25px';

                            // Κουμπί για να παίξει ξανά ο παίχτης
                            let playAgainButton = document.createElement('button');
                            playAgainButton.innerHTML = LANGUAGE_DATA[LANGUAGE_INDEX].play_again;
                            if (halloweenTime) {
                                playAgainButton.style.font = 'bold 55px halloween';
                                playAgainButton.style.color = '#520707';
                            }
                            playAgainButton.onclick = () => {
                                sounds.buttonClick.play();
                                // για να προλάβει να παίξει ο ήχος..
                                setTimeoutWithRAF(() => {
                                    location.replace(location.href.split('#')[0]);
                                }, 5e2);
                            }

                            winScreen.appendChild(screenLogo);
                            winScreen.appendChild(winScreenText);
                            if (!hideAndSeekFoundCount) {
                                winScreen.appendChild(scoreTextWinScreen);
                            }
                            winScreen.appendChild(triesTextWinScreen);
                            winScreen.appendChild(totalCardsPlayed);
                            winScreen.appendChild(playAgainButton);
                            document.body.removeChild(enabledImaginaryUniverse ? imaginaryParentDiv : parentDiv);
                            document.body.appendChild(winScreen);
                            wonBySpecialCard = false;

                            if (halloweenTime) {
                                for (var header1Index = 0; header1Index < document.getElementsByTagName('h1').length; header1Index++) {
                                    let header1 = document.getElementsByTagName('h1')[header1Index];
                                    header1.style.color = '#520707';
                                }
                            }
                            gameEnded = true;
                        }
                        else {

                            // Void Mode Setup

                            // Κάνε reset τα πάντα
                            hardModeEnabled = false;
                            challengeModeEnabled = false;
                            timedModeEnabled = false;
                            papagianneosFinaleEnabled = false;
                            deltaEffect = false;

                            // Στο void mode, ο παίχτης πρέπει να κερδίσει ΟΛΑ τα modes στη σειρά (εκτός απο Finale)
                            if (voidModeLevelsBeaten < 6) {
                                voidModeLevelsBeaten++;

                                // Animation. (Void mode)
                                rot_ += 360;
                                document.getElementById('cardsHolder').style.animation = 'none';
                                document.getElementById('cardsHolder').style.transition = '1s';
                                document.getElementById('cardsHolder').style.transform = `rotate(${rot_}deg)`;

                                let cardsListToShuffle = [],
                                    scoreAndTriesTextHolderChild = parentDiv.children[0];

                                cardsListToShuffle[0] = scoreAndTriesTextHolderChild;
                                parentDiv.replaceChildren(...cardsListToShuffle);

                                switch (voidModeLevelsBeaten) {
                                    case 1: // Hard Mode
                                        hardModeEnabled = true;
                                        break;

                                    case 2: // Challenge Mode.
                                        challengeModeEnabled = true;
                                        break;

                                    case 3: // TIMED mode.
                                        timeLeft = 750;
                                        document.getElementById('cardsHolder').removeAttribute('style');
                                        timedModeEnabled = true;
                                        gameMusic.pause();
                                        timedModeMusic.play();
                                        break;

                                    case 4: // Extreme mode.
                                        document.getElementById('timeBar').style.display = 'none';
                                        timedModeMusic.pause();
                                        gameMusic.play();
                                        savedTries_voidMode = tries;
                                        tries = 0;
                                        updateTries();
                                        extremeModeEnabled = true;
                                        triesText.style.color = extremeModeTriesTextColor;
                                        break;

                                    case 5: // Papagianneos FINALE (Easy edition)
                                        triesText.style.color = 'white'; // βγάλε τα εφέ από το extreme
                                        triesText.style.animation = 'none';
                                        tries = savedTries_voidMode;
                                        papagianneosFinaleEnabled = true;
                                        extremeModeEnabled = false;
                                        //pageBody.style.animation = 'none';
                                        pageBody.style.backgroundImage = 'radial-gradient(cyan, black)';
                                        if (startedExtremeModeMusic) {
                                            extremeModeMusic.pause();
                                        }
                                        else gameMusic.pause();
                                        music.papagianneosFinaleMusic.play();
                                        break;
                                }

                                cardsData = [];
                                currentSelected = [];
                                AMOUNT_OF_CARDS = randomChoice([10, 12, 16, 20, 24, 26]);
                                if (extremeModeEnabled) MAX_TRIES = (AMOUNT_OF_CARDS / 2) + 2;
                                if (timedModeEnabled) decreaseTimeBy = AMOUNT_OF_CARDS > 12 ? .5 : 1;

                                nonPairCardExists = false; // PLEASE WORK
                                startGame();
                                createCards();
                                resetCards(false);
                            }

                            else voidModeOver = true;
                        }
                    }

                    if (!gameEnded) {
                        window.requestAnimationFrame(gameLoop); // Performance Improvement.
                    }
                    else {
                        window.cancelAnimationFrame(gameLoop); // Stop game loop.
                    }
                } // end of winCheckLoop
                const checkLoseLoop = () => {

                    // Δες αν έχασε ο παίχτης
                    if ((!lostExtremeModeEnabled && lostByDeathCard) || ((extremeModeEnabled || hellModeEnabled) && tries >= MAX_TRIES && !lostExtremeModeEnabled)) {

                        // Αν έχει ενεργοποιήσει ο παίχτης το Lifesaver..
                        if (preventLose) {

                            if (tries >= MAX_TRIES) {
                                tries = MAX_TRIES - 1;
                                updateTries();
                            }

                            const cards = document.querySelectorAll('.card');
                            cards.forEach(cardElem => {
                                if (cardElem.savedText == specialCardsConfig.lifesaver.shape) {
                                    cardElem.style.transition = '1s';
                                    cardElem.classList.toggle('dead');
                                }
                            });
                            sounds.saved.play();
                            preventLose = false;
                            return;
                        }

                        gameStarted = false;

                        // Επίτευγμα: "Τι σκατά"
                        unlockAchievement('ach_lose_10');

                        // Επίτευγμα: "Ξέρω την αλφάβητο!"
                        unlockAchievement('ach_lose_50');

                        if (hellModeEnabled) {
                            gameMusic.pause();
                            music.hellModeMusic.pause();
                        }// bug fix

                        if (lostByDeathCard) {
                            gameMusic.pause();
                            timedModeMusic.pause();
                        }

                        if (papagianneosFinaleEnabled) {
                            //pageBody.style.animation = 'none';
                            pageBody.style.backgroundSize = 'cover';
                            clearInterval(pgnFinaleEffectsLoop);
                            music.papagianneosFinaleMusic.pause();
                            // Παίξε έναν τυχαίο ήχο..
                            let which = randomChoice([1, 1, 2]);
                            which == 1 ? sounds.pgnLaugh1.play() : sounds.pgnLaugh2.play();
                        }

                        extremeModeMusic.pause();

                        // Εμφάνισε "Κέρδισες!" οθόνη.
                        let loseScreen = document.createElement('div');
                        loseScreen.id = 'screen';

                        let loseScreenText = document.createElement('h1');
                        loseScreenText.appendChild(document.createTextNode(papagianneosFinaleEnabled ? `${LANGUAGE_DATA[LANGUAGE_INDEX].haha}!` : '. . .'));

                        // Με πόσες κάρτες έπαιξε ο παίχτης;
                        let totalCardsPlayed = document.createElement('h1');
                        totalCardsPlayed.appendChild(document.createTextNode(`${LANGUAGE_DATA[LANGUAGE_INDEX].amount_of_cards}: ${AMOUNT_OF_CARDS}`));

                        // Άλλαξε το μέγεθος της γραμματοσειράς.
                        totalCardsPlayed.style.fontSize = '25px';

                        // Κουμπί για να παίξει ξανά ο παίχτης
                        let playAgainButton = document.createElement('button');
                        playAgainButton.innerHTML = LANGUAGE_DATA[LANGUAGE_INDEX].play_again;

                        if (halloweenTime) {
                            playAgainButton.style.font = 'bold 55px halloween';
                            playAgainButton.style.color = '#520707';
                        }

                        playAgainButton.style.backgroundColor = 'maroon';
                        playAgainButton.onclick = () => {
                            sounds.buttonClick.play();
                            // για να προλάβει να παίξει ο ήχος..
                            setTimeoutWithRAF(() => {
                                window.location.reload();
                            }, 5e2);
                        }

                        loseScreen.appendChild(screenLogo);
                        loseScreen.appendChild(loseScreenText);
                        loseScreen.appendChild(totalCardsPlayed);
                        loseScreen.appendChild(playAgainButton);
                        document.body.removeChild(enabledImaginaryUniverse ? imaginaryParentDiv : parentDiv);
                        document.body.appendChild(loseScreen);

                        lostExtremeModeEnabled = true;
                        extremeModeEnabled = false; // σπάσε την επανάληψη
                    }
                } // end of checkLoseLoop
                const gameLoop = () => {
                    let openedCards = [];
                    if (!hideAndSeekModeEnabled) {
                        // --------------------------------------------------------
                        // Μέτρα πόσες ανοιχτές κάρτες υπάρχουν/έχουν βρεθεί
                        // και τέλειωσε το παιχνίδι αν έχουν βρεθεί όλες.
                        // --------------------------------------------------------

                        for (var card_ of document.getElementsByClassName('card')) {
                            if (card_.getAttribute('anoixthcarta')) {
                                openedCards.push(card_);
                            }
                        }
                        // --------------------------------------------------------

                        // --------------------------------------------------------------------------------------------------------------------
                        // Αφαίρεσε τις σπεσιαλ κάρτες, ΑΝ υπάρχουν, από το συνολικό σύνολο καρτών
                        // έτσι ώστε ο παίχτης να μην χρειάζεται να την βρει για να κερδίσει μαζί
                        // με τις κανονικές κάρτες.
                        // --------------------------------------------------------------------------------------------------------------------
                        for (var specialCardShapeIndex = 0; specialCardShapeIndex < currentSpecialCards.length; specialCardShapeIndex++) {

                            openedCards = openedCards.filter(_card => { return _card.realShape != currentSpecialCards[specialCardShapeIndex] });
                            if (!removedSpecialCardsFromFullCount[specialCardShapeIndex]) {
                                AMOUNT_OF_CARDS -= 1;
                                removedSpecialCardsFromFullCount[specialCardShapeIndex] = true;
                            }
                        }
                        // --------------------------------------------------------------------------------------------------------------------

                        checkLoseLoop();
                    }

                    else {
                        if (hideAndSeekFoundCount == AMOUNT_OF_CARDS) {
                            hideAndSeekFoundCount
                            hideAndSeekWin = true;
                        }
                    }

                    switch (true) {
                        case hardModeEnabled || papagianneosFinaleEnabled || OG_modeEnabled:
                            effectsLoop();

                        case timedModeEnabled || hellModeEnabled:
                            timedModeLoop();

                        case extremeModeEnabled:
                            extremeModeLoop();
                    }

                    winCheckLoop(openedCards);
                    // --------------------------------------------------------
                } // end of gameloop function
            })();
            // =====================================================================

        } // end of try {}
        catch (error) {
            alert(error);
            console.error(error);
        }
    })();
})();
