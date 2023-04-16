import { unlockAchievement } from "./modules/achievenent-functions.js";
import { specialCardsConfig } from "./modules/specialCardsConfig.js";
import { music, sounds } from "./modules/sounds.js";

// TO DO: NULL CARD

(() => {
    document.getElementsByTagName('body')[0].style.animation = 'displace 2s linear infinite';
    document.getElementsByTagName('body')[0].style.backgroundSize = '200%';
    document.getElementsByTagName('body')[0].style.backgroundImage = 'url(./img/game_bg.png)';
    try {

        // -----------------------------------------------------
        // "VOID" mode
        // -----------------------------------------------------
        let voidModeEnabled = false,
            voidModeOver = true,
            voidModeLevelsBeaten = 0,
            savedTries_voidMode = 0,
            musicStarted = false;
        // -----------------------------------------------------

        // -----------------------------------------------------
        // TIMED mode
        // -----------------------------------------------------
        let timedModeEnabled = false,
            timedModeStyleTagMade = false,
            decreaseTimeBy = 1;

        const makePercentage = (partialValue, totalValue) => {
            return (100 * partialValue) / totalValue;
        }
        // -----------------------------------------------------

        let streak = 0;

        // NULL κάρτα
        let underNullEffect = false,
            turnsToRemoveNullEffect = 0,
            nullEffectLoop;

        // bug fix για το αν υπάρχει troll κάρτα
        let trollCardExists = false;

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
                if (searchShape == '[?]') countedTrolls++;
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

        // -----------------------------------------------------------------------
        // lol
        // ----------------------------------------------------------------------
        let papagianneosFinaleEnabled = false,
            startedAngryEffect = false;
        // ------------------------------------------------------------------------

        // ----------------------------------------------------------
        // Σπέσιαλ Κάρτες.
        // ----------------------------------------------------------
        let specialCardsEnabled = true,
            currentSpecialCards = [],
            lostByDeathCard = false,
            wonBySpecialCard = false,
            removedSpecialCardsFromFullCount = [];
        // -----------------------------------------------------------

        // ------------------------------------
        // Ήχος.
        // ------------------------------------

        // ------------------------------------------------------------------------------------------------------------------------
        // Μουσική για το παιχνίδι
        // ------------------------------------------------------------------------------------------------------------------------
        let menuMusic = playersEffect ? playersEffect.musicType == 'OG' ? music.menuMusicOG : music.menuMusic : music.menuMusicOG,
            gameMusic = playersEffect ? playersEffect.musicType == 'OG' ? music.gameMusicOG : music.gameMusic : music.gameMusicOG;

        menuMusic.play();

        // Extreme mode μουσικη
        let startedExtremeModeMusic = false,
            gameStarted = false;
        // ------------------------------------------------------------------------------------------------------------------------

        // ---------------------------------------
        // Extreme Gamemode
        // ---------------------------------------
        let extremeModeEnabled = false,
            lostExtremeModeEnabled = false;
        // ----------------------------------------

        // -----------------------------------
        const irandom = i => {
            let max = Math.floor(i);
            return Math.floor(Math.random() * (max + 1));
        };

        const randomChoice = arr => {
            return arr[irandom(arr.length - 1)];
        };

        // global μεταβλητές
        let cardsData = [],
            hardModeEnabled = false, // "δύσκολο" mode απενεργοποιημένο από την αρχή
            challengeModeEnabled = false,
            challengeModeEffectTurn = 0,
            currentSelected = [],
            score = 0,
            tries = -1, // ξεκινάμε με -1 διότι αυτόματα κάνει resetCards (άρα tries -= 1)
            blockClicks = false;

        // ========================================================================
        // 1 - Σχήμα/σχέδιο και χρώμα των καρτών setup
        // ========================================================================
        let AMOUNT_OF_CARDS = randomChoice([10, 12, 16, 20, 24, 26]); // μέγιστο είναι 36 κάρτες.

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
            let CHARACTERS_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789[]{}#@!%&()><?/=€^£".split(''),
                generatedPalette = [],
                SHAPE_PALETTES = [],
                chosenCombination = '';

            // φτιάξε τυχαία λίστα με τυχαία σχήματα/κείμενο/αριθμούς
            for (var k = 0; k < 4; k++) {
                generatedPalette = [];
                for (var l = 0; l < (AMOUNT_OF_CARDS / 2); l++) {
                    chosenCombination = randomChoice(CHARACTERS_SET);
                    CHARACTERS_SET.splice(CHARACTERS_SET.indexOf(chosenCombination), 1);
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

            // ----------------------------------------------------------------------------------------------
            // Σπεσιαλ Κάρτες: Βάλτες στην λίστα αντικαταστώντας το τελευταίο γράμμα
            // ----------------------------------------------------------------------------------------------
            if (specialCardsEnabled) {
                // Εμφάνισε τουλάχιστον μία σπεσιαλ κάρτα, παίρνοντας μία τυχαία.
                // αν δεν παίζει ο παίχτης το FINALE.
                if (!papagianneosFinaleEnabled) {
                    const filteredSpecialCards_ = specialCardsConfig.filter(carde => { return !carde.timeCard })

                    let randomlyChosenSpecialCard = randomChoice(filteredSpecialCards_);

                    //cardShapes[cardShapes.length - 1] = randomlyChosenSpecialCard.shape; - OLD mechanic (replaces a card)
                    cardShapes.push(randomlyChosenSpecialCard.shape);
                    AMOUNT_OF_CARDS += 2;

                    // Δες αν υπάρχει troll κάρτα..
                    if (cardShapes.includes('[?]')) {
                        trollCardExists = true;
                    }

                    // Χρειάζεται timed card στο TIMED mode
                    if (timedModeEnabled) {
                        // Επέλεξε μία τυχαία σπέσιαλ κάρτα που είναι μόνο για το "TIMED" mode.
                        const timeModeCards = specialCardsConfig.filter(carde1 => { return carde1.timeCard })

                        cardShapes.push(randomChoice(timeModeCards).shape);
                        AMOUNT_OF_CARDS += 2;
                    }
                }

                // ΟΛΕΣ ΑΝ ΠΑΙΖΕΙ ΤΟ FINALE (εκτός αν είναι noSpawnInFinale)
                else {
                    for (var specialCard_ of specialCardsConfig) {
                        if (!specialCard_.noSpawnInFinale) {
                            cardShapes.push(specialCard_.shape);
                            AMOUNT_OF_CARDS += 2;
                        }
                    }
                }
            }
            // ----------------------------------------------------------------------------------------------

            cardShapes.push(...cardShapes); // duplicate

            // ΤΥΧΑΙΑ Χρώματα καρτών (2 κάρτες από καθεμιά άρα αντιγραφή)
            let COLOR_PALETTES = [],
                generatedColorPalette = [];

            for (var n = 0; n < 4; n++) {
                generatedColorPalette = [];
                for (var l = 0; l < (AMOUNT_OF_CARDS / 2); l++) {
                    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16); // τυχαίο χρώμα σε hexadecimal (HEX)
                    generatedColorPalette.push(randomColor);

                    // -------------------------------------------------------------
                    // BUG FIX: Διαγραφή αντιγράφων
                    // -------------------------------------------------------------
                    generatedColorPalette = [...new Set(generatedColorPalette)];

                    let checkDuplicateColorInterval = setInterval(() => {
                        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16); // τυχαίο χρώμα σε hexadecimal (HEX)
                        generatedColorPalette.push(randomColor);
                        generatedColorPalette = [...new Set(generatedColorPalette)];

                        if (generatedColorPalette.length == 6) {
                            clearInterval(checkDuplicateColorInterval);
                        }
                    }, 10);
                    // -------------------------------------------------------------

                }
                COLOR_PALETTES.push(generatedColorPalette);
            }

            let cardColors = randomChoice(COLOR_PALETTES);
            cardColors.push(...cardColors); // duplicate

            // ----------------------------------------------------------------------
            // Δεν πρέπει να έχει ζευγάρι η troll card
            // ---------------------------------------------------------------------
            // Σβήσε το ένα από το ζευγάρι
            if (trollCardExists) {
                let index = cardShapes.indexOf('[?]');
                cardShapes.splice(index, 1);
                cardColors.splice(index, 1);
            }
            // -----------------------------------------------------------------------

            // check cards length
            if ((trollCardExists ? (cardShapes.length + 1) : cardShapes.length) != AMOUNT_OF_CARDS || (trollCardExists ? (cardColors.length + 1) : cardColors.length) != AMOUNT_OF_CARDS) {
                throw Error('Το πλήθος/μέγεθος των λιστών cardShapes ή cardColors δεν είναι σωστό με το AMOUNT_OF_CARDS.')
            }

            for (var j = 0; j < (countTrollCards(cardShapes) != 0 ? (AMOUNT_OF_CARDS - 1) : AMOUNT_OF_CARDS); j++) {
                const card = {
                    shape: cardShapes[j],
                    realShape: cardShapes[j],
                    color: cardColors[j],
                    specialCard: false,
                    specialCardEffect: () => { }
                }

                // --------------------------------------------------------
                // Οι σπέσιαλ κάρτες έχουν συγκεκριμένο σταθερό χρώμα.
                // --------------------------------------------------------
                if (specialCardsEnabled) {
                    let specialCardDetected = false,
                        specialCardIndex = undefined;

                    // SOS συνάρτηση
                    const addToSpecialCardsArray = (shape) => {
                        currentSpecialCards.push(shape);
                        removedSpecialCardsFromFullCount.push(false);
                    }

                    // Ψάξε για σπεσιαλ κάρτες
                    for (var specialCardData of specialCardsConfig) {
                        if (specialCardData.shape == card.shape) {
                            specialCardDetected = true;
                            break;
                        }
                    }

                    // Όρισε το εφέ με βάση το σύμβολο της σπεσιαλ κάρτας.
                    switch (card.shape) {
                        case specialCardsConfig[0].shape: // 10 Score (++)
                            specialCardIndex = 0;
                            card.specialCardEffect = () => {
                                sounds.specialScore.play()
                                score += 10;
                                // Επίτευγμα: "Εκατοστάρα στη μάπα"
                                unlockAchievement('ach_score_100', 10);
                            }
                            break;

                        case specialCardsConfig[1].shape: // x2 Score
                            specialCardIndex = 1;
                            card.specialCardEffect = () => {
                                sounds.specialScore.play()
                                score *= 2;
                            }
                            break;

                        case specialCardsConfig[2].shape: // Half Score
                            specialCardIndex = 2;
                            card.specialCardEffect = () => {
                                sounds.loss.play()
                                score /= 2;
                            }
                            break;

                        case specialCardsConfig[3].shape: // 2 λιγότερες προσπάθειες
                            specialCardIndex = 3;
                            card.specialCardEffect = () => {
                                sounds.specialScore.play()
                                tries -= 2;
                                updateTries();
                            }
                            break;

                        case specialCardsConfig[4].shape: // 10 λιγότερο score
                            specialCardIndex = 4;
                            card.specialCardEffect = () => {
                                sounds.loss.play()
                                score -= 10;
                            }
                            break;

                        case specialCardsConfig[5].shape: // Πάει χάθηκε το παιχνίδι
                            specialCardIndex = 5;
                            card.specialCardEffect = () => {
                                // Επίτευγμα: 'Rest in pepperoni'
                                unlockAchievement('ach_cross_card_found');
                                if (!papagianneosFinaleEnabled) {
                                    sounds.loss.play()
                                }
                                lostByDeathCard = true;
                            }
                            break;

                        case specialCardsConfig[6].shape: // PAPAGIANNEOS SPEECH
                            specialCardIndex = 6;
                            card.specialCardEffect = () => {
                                // Επίτευγμα: "Ουάου"
                                unlockAchievement('ach_pgn_card_found');
                                if (startedExtremeModeMusic) {
                                    music.extremeModeGameMusic.pause();
                                }
                                else gameMusic.pause();

                                sounds.wow.play();
                                setTimeout(() => {
                                    if (startedExtremeModeMusic) {
                                        music.extremeModeGameMusic.pause();
                                    }
                                    else gameMusic.play();
                                }, 3e3);
                            }
                            break;

                        case specialCardsConfig[7].shape: // for my friend :)
                            specialCardIndex = 7;
                            card.specialCardEffect = () => {
                                // Επίτευγμα: ":)"
                                unlockAchievement('ach_special_K_card');

                                // να μην επιτρέπεται στο papagianneos finale
                                if (papagianneosFinaleEnabled || voidModeEnabled) { // αν ΕΙΝΑΙ finale
                                    if (papagianneosFinaleEnabled) music.papagianneosFinaleMusic.pause();
                                    sounds.pgnFinaleKCardEffect.play();
                                    if (papagianneosFinaleEnabled) {
                                        setTimeout(() => {
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

                        case specialCardsConfig[8].shape: // KABOOOM
                            specialCardIndex = 8;
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
                                    if (child.className == 'card') {
                                        cardsListToShuffle.push(child);
                                    }
                                }

                                cardsListToShuffle.sort(() => {
                                    return Math.random() - 0.5;
                                });

                                cardsListToShuffle = cardsListToShuffle.filter(elem => {
                                    return elem.innerHTML != specialCardsConfig[8].shape;
                                });

                                cardsListToShuffle[(cardsListToShuffle.length)] = cardsListToShuffle[0];
                                cardsListToShuffle[0] = scoreAndTriesTextHolderChild;
                                parentDiv.replaceChildren(...cardsListToShuffle);
                            }
                            break;

                        case specialCardsConfig[9].shape: // X-Ray
                            specialCardIndex = 9;

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
                                    document.getElementById('cardsHolder').style.transition = '1s';
                                    document.getElementById('cardsHolder').style.transform = 'rotate(360deg)';
                                }, 1800);
                            }
                            break;

                        case specialCardsConfig[10].shape: // The Eye
                            specialCardIndex = 10;
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

                        case specialCardsConfig[11].shape: // NULL
                            specialCardIndex = 11;
                            card.specialCardEffect = () => {
                                underNullEffect = true;
                                sounds.null.play();

                                nullEffectLoop = setInterval(() => {
                                    document.getElementById('cardsHolder').style.filter = 'blur(5px)';

                                    for (var cardElem of document.getElementsByClassName('card')) {
                                        cardElem.style.backgroundColor = 'black';
                                        cardElem.style.color = 'green';
                                        cardElem.setAttribute('infectedWithVirus', 'yes');
                                    }
                                }, 10);
                            }
                            break;

                        case specialCardsConfig[12].shape: // The Fake Card
                            // δεν κάνει τίποτα λολ
                            specialCardIndex = 12;
                            break;

                        case specialCardsConfig[13].shape: // +60sec TIME Card
                            specialCardIndex = 13;
                            card.specialCardEffect = () => {
                                // Επίτευγμα: "Τι ρολόι είναι αυτό ρε;"
                                unlockAchievement('ach_timed_special_card');

                                timeLeft += 60;
                                sounds.timeCardEffect.play();
                            }
                            break;

                        case specialCardsConfig[14].shape: // Αργότερος Χρόνος
                            specialCardIndex = 14;

                            card.specialCardEffect = () => {
                                // Επίτευγμα: "Χελωνάρας"
                                unlockAchievement('ach_timed_mode_slow_card');

                                sounds.timeSlower.play();
                                decreaseTimeBy = .33;
                            }
                            break;

                        case specialCardsConfig[15].shape: // Κρύβει τις κάρτες
                            specialCardIndex = 15;

                            card.specialCardEffect = () => {
                                sounds.loss.play();

                                // Επίτευγμα: "Απώλεια Μνήμης"
                                unlockAchievement('ach_memory_loss');

                                for (var cardDivElem of document.getElementsByClassName('card')) {
                                    cardDivElem.removeAttribute('anoixthcarta');
                                }

                                setTimeout(() => {
                                    resetCards(false);
                                }, 420);
                            }
                            break;

                        case specialCardsConfig[16].shape: // Σ (sigma)
                            specialCardIndex = 16;
                            card.specialCardEffect = () => {
                                for (var cardChildElem of document.getElementsByClassName('card')) {
                                    if (cardChildElem.savedText != specialCardsConfig[16].shape) {
                                        cardChildElem.style.animation = 'rainbowSigmaCard 2.5s linear infinite';
                                    }
                                    else cardChildElem.style.animation = 'none';
                                }
                            }
                            break;
                    }

                    // Δημιούργησε την σπεσιαλ κάρτα. (Αν βρέθηκε για να μην κάνει τις κανονικές σπεσιαλ)
                    if (specialCardDetected) {
                        addToSpecialCardsArray(specialCardsConfig[specialCardIndex].shape);
                        card.color = specialCardsConfig[specialCardIndex].color;
                        card.specialCard = true;

                        // Σε περίπτωση που είναι η troll card
                        if (specialCardsConfig[specialCardIndex].shape == '[?]') {
                            let fakeCardShapes = cardShapes;

                            // Δημιούργησε μία ψεύτικη λίστα με τα σχήματα όλων των καρτών εκτός από το troll
                            fakeCardShapes = fakeCardShapes.filter(card2lShape => {
                                return card2lShape != '[?]'
                            });

                            // Επέλεξε τυχαίο σχήμα.
                            card.shape = randomChoice(fakeCardShapes);
                            card.impostorCard = true;
                            trollCardExists = true;
                        }
                    }
                }
                // --------------------------------------------------------

                cardsData.push(card);
            }

            // ανακάτεψε τις κάρτες
            cardsData.sort(() => {
                return Math.random() - 0.5;
            });
        }
        // ========================================================================

        // =====================================================================
        // 2 - Το παιχνίδι και η δημιουργία καρτών
        // =====================================================================
        // ένα <div> για να κρατάει τις κάρτες.
        let parentDiv = document.createElement('div');
        parentDiv.id = 'cardsHolder'; // ταυτότητα για να διαβάσει CSS

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
            triesText = document.createElement('h1');

        // Φτιάξε το κείμενο για score και προσπάθειες
        scoreText.appendChild(document.createTextNode(`Score: ${score}`));
        triesText.appendChild(document.createTextNode(`Προσπάθειες: ${tries}`));

        // Άλλαξε το μέγεθος της γραμματοσειράς.
        scoreText.style.fontSize = '20px';
        triesText.style.fontSize = '20px';

        scoreAndTriesHolder.appendChild(scoreText);
        scoreAndTriesHolder.appendChild(triesText);
        scoreAndTriesHolder.appendChild(timeBar);
        parentDiv.appendChild(scoreAndTriesHolder);

        // Συναρτήσεις που ενημερώνουν το score και τις προσπάθειες του παίχτη
        const updateScore = () => scoreText.innerHTML = `Score: ${score}`;
        const updateTries = () => {
            triesText.innerHTML = extremeModeEnabled ? `Προσπάθειες: ${tries} / ${MAX_TRIES}` : `Προσπάθειες: ${tries}`;

            // -------------------------------------------------------------------
            // ANIMATION: Εφέ όταν ο παίχτης χάνει προσπάθεια
            // -------------------------------------------------------------------
            if (gameStarted && extremeModeEnabled && !startedExtremeModeMusic) {
                triesText.style.transition = '1s';
                triesText.style.transform = 'scale(1.5)';

                setTimeout(() => {
                    triesText.style.transform = 'scale(1)';
                }, 5e2);
            }
            // --------------------------------------------------------------------

        }

        // Συνάρτηση που επαναφέρει όσες κάρτες δεν έχουν βρεθεί
        const resetCards = (addTries = true) => {
            if (addTries) {
                tries += 1; // προσπάθειες του παίχτη
                updateTries();
            }
            for (var card of document.getElementsByClassName('card')) {
                // card.innerHTML είναι το σχέδιο/κείμενο κάθε κάρτας

                // Αν ΔΕΝ έχει βρεθεί η συγκεκριμένη κάρτα από τον παίχτη
                if (!card.getAttribute('anoixthcarta')) {
                    // Δες αν ο παίχτης χρησιμοποιεί νέον
                    //if (!secretSettingEnabled) {
                    playersEffect ? playersEffect.neonMode ? card.style.borderColor = 'grey' : card.style.background = 'grey' : card.style.background = 'grey';
                    //}
                    //else {
                    //    card.style.background = 'radial-gradient(#240907, black)';
                    //}
                    card.innerHTML = '​'; // κενό/whitespace
                    card.style.transform = 'none';
                    card.removeAttribute('egineclick');

                    // Ειδική περίπτωση: "Σ" κάρτα.
                    if (card.savedText == specialCardsConfig[16].shape) {
                        card.style.animation = 'none';
                    }
                }
            }
        }

        // Δημιουργία καρτών

        // Συνάρτηση που δημιουργεί κάρτα
        const createCard = (data) => {
            let card = data;

            // <div> για κάθε κάρτα
            let div = document.createElement('div');
            div.className = 'card';
            div.style.background = card.color;

            // Η "Σ" κάρτα είναι πολύχρωμη.
            if (card.shape == specialCardsConfig[16].shape) {
                div.style.animation = 'rainbowSigmaCard 2.5s linear infinite';
            }

            // Βάλε τα εφέ που διάλεξε ο χρήστης/παίχτης στην κάρτα.
            if (playersEffect != null) {
                div.style.borderRadius = playersEffect.borderRadius;
                div.style.fontSize = playersEffect.fontSize;
                div.style.fontFamily = playersEffect.fontFamily;
                div.style.textDecorationThickness = playersEffect.textDecorationThickness;
                div.style.textDecorationLine = playersEffect.textDecorationLine;
                div.style.textDecorationStyle = playersEffect.textDecorationStyle;
                div.style.width = JSON.parse(playersEffect.widthAndHeight)[0];
                div.style.height = JSON.parse(playersEffect.widthAndHeight)[1];

                if (playersEffect.neonMode) {
                    div.style.borderWidth = '5px';
                    div.style.borderColor = div.style.background;
                    div.style.borderStyle = 'solid';
                    div.style.background = 'none';
                }
            }

            if (card.specialCard) {
                div.specialCard = true;
                div.specialCardEffect = card.specialCardEffect;
            }

            if (card.impostorCard) div.impostorCard = true;

            // αποθήκευσε το χρώμα της κάρτας..
            div.savedBackgroundColor = card.color;

            // Ειδική περίπτωση: "Σ" κάρτα.
            if (card.shape == specialCardsConfig[16].shape) {
                div.savedAnimation = div.style.animation;
            }

            // κείμενο για το σχέδιο/σχήμα της κάρτας
            div.savedText = card.shape; // αποθήκευσε και το κείμενο
            div.realShape = card.realShape;
            div.appendChild(document.createTextNode(card.shape)); // βάλε το κείμενο στη κάρτα

            // =======================================================
            // Mouse event listeners setup & game setup
            // =======================================================

            // Όταν γίνει click σε αυτό.
            div.onclick = () => {

                // --------------------------------------------------------
                // NULL Effect
                // --------------------------------------------------------
                if (underNullEffect) {
                    turnsToRemoveNullEffect += 1;

                    if (turnsToRemoveNullEffect > 10) {
                        underNullEffect = false;
                        sounds.null.play();
                        clearInterval(nullEffectLoop);
                        for (var cardElem of document.getElementsByClassName('card')) {
                            if (cardElem.getAttribute('infectedWithVirus')) {
                                cardElem.removeAttribute('style');
                            }
                        }
                        document.getElementById('cardsHolder').removeAttribute('style');
                    }
                }
                // --------------------------------------------------------

                // -------------------------------------------------------------------------------------------------------
                // BUG FIX: Αν έγινε click στην ίδια κάρτα..
                // -------------------------------------------------------------------------------------------------------
                if (div.getAttribute('anoixthcarta') || blockClicks || div.getAttribute('egineclick')) return;
                div.setAttribute('egineclick', 'nai');
                // -------------------------------------------------------------------------------------------------------

                // ----------------------------------
                // Ήχος κάρτας.
                // ----------------------------------
                sounds.cardOpen.play();
                // ----------------------------------

                // ------------------------------------------
                // ANIMATION.
                // ------------------------------------------
                div.style.transform = 'rotateY(360deg)';
                // -------------------------------------------

                // Εμφάνισε την κάρτα στον παίχτη
                if (currentSelected.length <= 1) {
                    // Δες αν ο παίχτης χρησιμοποιεί νέον
                    playersEffect ? playersEffect.neonMode ? div.style.borderColor = div.savedBackgroundColor : div.style.background = div.savedBackgroundColor : div.style.background = div.savedBackgroundColor;
                    div.innerHTML = div.savedText;

                    // Ειδική περίπτωση: "Σ" κάρτα.
                    if (div.savedText == specialCardsConfig[16].shape) {
                        div.style.animation = div.savedAnimation;
                    }

                    currentSelected.push(div);
                }

                // Αν άνοιξε 2 κάρτες ο παίχτης
                if (currentSelected.length >= 2) {
                    let firstCard = currentSelected[0],
                        secondCard = currentSelected[1];

                    // αν είναι διαφορετικές οι κάρτες, επαναφορά
                    if (firstCard.savedText !== secondCard.savedText) {
                        if (streak != 0) streak = 0;

                        // Επίτευγμα: "Το μοιραίο λάθος"
                        unlockAchievement('ach_10_tries');

                        // Επίτευγμα: "Λίγο ακόμα και.."
                        unlockAchievement('ach_50_tries');

                        // Επίτευγμα: "AAAAAAAAAAAAA"
                        unlockAchievement('ach_100_tries');

                        // Τρόπαιο: "Τσαλαπετεινός"
                        unlockAchievement('tr_10k_tries');

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

                            sounds.cardOpenHardMode.play();

                            // ανακάτεψε τις κάρτες ΞΑΝΑ στο "δύσκολο" mode
                            let cardsListToShuffle = [],
                                scoreAndTriesTextHolderChild = parentDiv.children[0];

                            // Για κάθε "παιδί" που έχει το cardsHolder/parentDiv
                            for (var e = 0; e < parentDiv.children.length; e++) {
                                let child = parentDiv.children[e];
                                // Για να βρούμε ποιο είναι κάρτα και ποιο κείμενο, διαβάζουμε το class του.
                                if (child.className == 'card') {
                                    cardsListToShuffle.push(child);
                                }
                            }

                            cardsListToShuffle.sort(() => {
                                return Math.random() - 0.5;
                            });

                            cardsListToShuffle[(cardsListToShuffle.length)] = cardsListToShuffle[0];
                            cardsListToShuffle[0] = scoreAndTriesTextHolderChild;
                            parentDiv.replaceChildren(...cardsListToShuffle);
                        }
                        // ----------------------------------------------------------------------------------------

                        currentSelected = [];

                        if (!hardModeEnabled) {
                            sounds.wrong.play();
                        }

                        blockClicks = true;
                        setTimeout(() => {
                            resetCards();
                            blockClicks = false;
                        }, 420);
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
                        setTimeout(() => {
                            resetCards(false);
                            blockClicks = false;
                        }, 5e2);
                    }

                    // αν είναι ίδιες οι κάρτες, δώσε score
                    else if (firstCard.savedText == secondCard.savedText) {

                        // Επίτευγμα: "Just Like Peter"
                        streak += 1;
                        if (streak == 3) unlockAchievement('ach_peter');

                        // --------------------------------------------------------------------------------------------------
                        // Άλλαξε το σχήμα της troll κάρτας αν βρέθηκε το ζευγάρι καρτών που το σχήμα το είχε η troll
                        // --------------------------------------------------------------------------------------------------
                        if (trollCardExists) {
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
                            firstCard.specialCardEffect();

                            // Επίτευγμα: "Τι ήταν αυτό;"
                            unlockAchievement('ach_first_special_card');
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
                                hardModeEnabled || extremeModeEnabled ? sounds.scoreHardMode.play() : sounds.score.play();
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
                }
            }
            // =======================================================

            // βάλε την κάρτα στο parentDiv
            parentDiv.appendChild(div);
        }
        const createCards = () => {

            // ---------------------------------
            // Μουσική
            // ----------------------------------
            if (!musicStarted) {
                menuMusic.pause();

                if (timedModeEnabled) {
                    gameMusic = music.timeLevelMusic;
                }
                else if (papagianneosFinaleEnabled) {
                    gameMusic = music.papagianneosFinaleMusic;
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
        const beginGame = (() => {

            // Εμφάνισε "Κέρδισες!" οθόνη.
            let startScreen = document.createElement('div');
            startScreen.id = 'screen';

            // Τίτλος
            let startScreenText = document.createElement('h1');
            startScreenText.appendChild(document.createTextNode('ΒΡΕΣ ΤΗΝ ΣΩΣΤΗ ΚΑΡΤΑ'));
            startScreenText.style.margin = '0';

            // λολ
            let developerNameLol = document.createElement('h1');
            developerNameLol.style.fontSize = '20px';
            developerNameLol.appendChild(document.createTextNode('Προγραμματιστής: Σωτήριος Παπαγιάννης'));

            // Μουσική Credits (Soundimage.org)
            let musicCredit = document.createElement('h1');
            musicCredit.style.fontSize = '20px';
            musicCredit.innerHTML = `Μουσική από: Petercraft#7530, <a href="https://soundimage.org/">Soundimage.org</a> και <a href="https://www.soundhelix.com/">Soundhelix.com</a>.`;

            // For my friends :)
            let friendsWebsite = document.createElement('h1');
            friendsWebsite.style.fontSize = '20px';
            friendsWebsite.innerHTML = `Επίσης τσέκαρε: <a href="https://2x05.surge.sh/">2x05</a>`;
            // Επίτευγμα: "Κάπου το θυμάμαι αυτό.."
            friendsWebsite.onclick = () => unlockAchievement('ach_2x05');

            // Τελευταία Τροποποίηση
            let howToPlayBtn = document.createElement('button');
            howToPlayBtn.style.fontSize = '25px';
            howToPlayBtn.appendChild(document.createTextNode('How To Play'));
            howToPlayBtn.onclick = () => {
                sounds.buttonClick.play();
                setTimeout(() => {
                    window.location.href = '/how-to-play';
                }, 5e2);
            }

            // Επιτεύγματα
            let achievementsMenuBtn = document.createElement('button');
            achievementsMenuBtn.style.fontSize = '25px';
            achievementsMenuBtn.appendChild(document.createTextNode('Επιτεύγματα'));
            achievementsMenuBtn.onclick = () => {
                sounds.buttonClick.play();
                setTimeout(() => {
                    window.location.href = '/achievements';
                }, 5e2);
            }

            let creditsBtn = document.createElement('button');
            creditsBtn.style.fontSize = '25px';
            creditsBtn.appendChild(document.createTextNode('Πληροφορίες'));
            creditsBtn.onclick = () => {
                sounds.buttonClick.play();
                document.body.appendChild(infoHolder);
            }

            let customizePageLink = document.createElement('button');
            customizePageLink.style.fontSize = '25px';
            customizePageLink.appendChild(document.createTextNode('Ρυθμίσεις'));
            customizePageLink.onclick = () => {
                sounds.buttonClick.play();
                setTimeout(() => {
                    window.location.href = '/customize';
                }, 5e2);
            }

            let screenLogo = document.createElement('img');
            screenLogo.src = './img/game-logo.png';

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
                    // Επίτευγμα: "Νέος Παίχτης"
                    unlockAchievement('ach_new_player');

                    // Επίτευγμα: "bals?!?!?"
                    unlockAchievement('ach_bals');

                    if (mode != 'void') {
                        document.getElementsByTagName('body')[0].style.animation = 'none';
                        document.getElementsByTagName('body')[0].style.backgroundSize = '100%';
                    }
                    //  if (mode == 'papagianneosFinale') return;
                    switch (mode) {
                        case 'hard': // Δύσκολο
                            hardModeEnabled = true;
                            break;

                        case 'challenge': // Challenge.
                            challengeModeEnabled = true;
                            break;

                        case 'extreme': // Extreme.
                            extremeModeEnabled = true;
                            break;

                        case 'timed': // Timed.
                            timedModeEnabled = true;
                            break;

                        case 'papagianneosFinale': // LOL WHY I MADE THIS
                            MAX_TRIES = 69;
                            AMOUNT_OF_CARDS = 26;
                            challengeModeEnabled = true;
                            extremeModeEnabled = true;
                            papagianneosFinaleEnabled = true;
                            document.getElementsByTagName('body')[0].style.backgroundImage = 'radial-gradient(cyan, black)';
                            break;

                        /*case '???':
                            hardModeEnabled = true;
                            secretSettingEnabled = true;
                            extremeModeEnabled = true;
                            MAX_TRIES += 15;
                            document.getElementsByTagName('body')[0].style.backgroundImage = 'url(./img/secret_mode_bg.jpg)';
                            break;*/
                        case 'void': // Void.
                            voidModeOver = false;
                            voidModeEnabled = true;
                            document.getElementsByTagName('body')[0].style.backgroundImage = 'url(./img/secret_mode_bg.jpg)';
                            break;
                    }

                    startGame();
                    createCards();
                    sounds.buttonClick.play();

                    if (!['papagianneosFinale', 'void'].includes(mode)) {
                        document.getElementsByTagName('body')[0].style.backgroundImage = 'none';
                    }

                    // βάλε το parentDiv στο σώμα της ιστοσελίδας.
                    document.body.appendChild(parentDiv);

                    resetCards();
                    gameStarted = true;
                    // εξαφάνισε την οθόνη με το κουμπί μαζί
                    document.body.removeChild(startScreen);
                }

                return button;
            }

            // Πληροφορίες του παιχνιδιού
            let infoHolder = document.createElement('div');
            infoHolder.className = 'modalBox';

            // Τίτλος μενού πληροφοριών
            let modalBoxTitle = document.createElement('h1');
            modalBoxTitle.appendChild(document.createTextNode('ΠΛΗΡΟΦΟΡΙΕΣ'));
            infoHolder.appendChild(modalBoxTitle);

            // Κουμπί για να "σβήνει" το μενού με τις πληροφορίες.
            let closeInfoHolderBtn = document.createElement('button');
            closeInfoHolderBtn.appendChild(document.createTextNode('Κλείσιμο'));
            closeInfoHolderBtn.style.fontSize = '25px';
            closeInfoHolderBtn.onclick = () => {
                sounds.buttonClick.play();
                document.body.removeChild(infoHolder);
            }

            // Κουμπί για να παίξει ο παίχτης
            let buttonsWrapper = document.createElement('div');

            let playButton = createButton('Παίξε Απλό', 'green'), // Κουμπί για να παίξει ο παίχτης "απλό" mode
                playButtonHard = createButton('Παίξε Δύσκολο', 'maroon', 'hard'), // Κουμπί για να παίξει ο παίχτης "δύσκολο" mode
                playButtonChallenge = createButton('Παίξε Challenge', 'purple', 'challenge'), // Κουμπί για να παίξει ο παίχτης "challenge" mode
                playButtonExtreme = createButton('Παίξε EXTREME', 'radial-gradient(maroon, black)', 'extreme'), // Κουμπί για να παίξει ο παίχτης "extreme" mode
                playButtonTimed = createButton('Παίξε TIMED', 'radial-gradient(yellow, gold)', 'timed'), // Κουμπί για να παίξει ο παίχτης "timed" mode
                playButtonSecretMode = createButton('Παίξε VOID', 'radial-gradient(#240907, black)', 'void'), // Κουμπί για να παίξει ο παίχτης "void" mode
                playButtonPapagianneosFinale = createButton('Papagianneos FINALE', 'radial-gradient(green, black)', 'papagianneosFinale'); // Κουμπί για να παίξει ο παίχτης "finale" mode

            // ---------------------------------------------------
            // Κουμπιά
            // ---------------------------------------------------
            buttonsWrapper.appendChild(playButton);
            buttonsWrapper.appendChild(playButtonHard);
            buttonsWrapper.appendChild(playButtonChallenge);
            buttonsWrapper.appendChild(playButtonExtreme);
            buttonsWrapper.appendChild(playButtonTimed);
            buttonsWrapper.appendChild(playButtonPapagianneosFinale);
            buttonsWrapper.appendChild(playButtonSecretMode);
            // ----------------------------------------------------

            let settingsHolder = document.createElement('div');
            settingsHolder.style.display = 'block';
            settingsHolder.style.marginBottom = '50px';

            startScreen.appendChild(screenLogo); // Logo
            startScreen.appendChild(startScreenText); // Τίτλος
            infoHolder.appendChild(developerNameLol); // λολ
            infoHolder.appendChild(friendsWebsite); // for my friends :)
            infoHolder.appendChild(musicCredit); // για credit στο Soundimage.org για την μουσική του παιχνιδιού
            infoHolder.appendChild(closeInfoHolderBtn);
            settingsHolder.appendChild(customizePageLink);
            settingsHolder.appendChild(creditsBtn); // Credits
            settingsHolder.appendChild(howToPlayBtn); // How to play link
            settingsHolder.appendChild(achievementsMenuBtn);
            startScreen.appendChild(settingsHolder); // Ρυθμίσεις κ.α.
            startScreen.appendChild(buttonsWrapper); // Κουμπιά
            document.body.appendChild(startScreen); // Βάλε την οθόνη στο σώμα της ιστοσελίδας

            // game loop
            const gameLoop = setInterval(() => {

                // ---------------------------------------------------------------
                // TIMED Mode
                // ---------------------------------------------------------------
                if (timedModeEnabled && gameStarted) {
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
                            document.getElementsByTagName('body')[0].style.backgroundColor = 'rgb(25, 0, 0)';
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
                        lostByDeathCard = true;
                        sounds.loss.play();
                    }
                }
                // ---------------------------------------------------------------

                // --------------------------------------------------------
                // Μέτρα πόσες ανοιχτές κάρτες υπάρχουν/έχουν βρεθεί
                // και τέλειωσε το παιχνίδι αν έχουν βρεθεί όλες.
                // --------------------------------------------------------
                let openedCards = [];

                for (var card_ of document.getElementsByClassName('card')) {
                    if (card_.getAttribute('anoixthcarta')) {
                        openedCards.push(card_);
                    }
                }

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

                // ---------------------------------------------------------------------------------------
                // Σεισμικό Effect για το "δύσκολο" και για το "papagianneos finale" mode
                // ---------------------------------------------------------------------------------------
                if (!startedAngryEffect && (papagianneosFinaleEnabled || hardModeEnabled)/* && !secretSettingEnabled*/) {
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


                    // Αν υπάρχουν λιγότερο από 6 κλειστές κάρτες, βάλε το εφέ
                    if (closedCards.length <= 6 && gameStarted) {
                        startedAngryEffect = true;
                        if (papagianneosFinaleEnabled) {
                            blockClicks = true;
                        }

                        if (!papagianneosFinaleEnabled) {
                            document.getElementById('cardsHolder').style.animation = 'seismos 1s linear infinite';
                            document.getElementsByTagName('body')[0].style.backgroundColor = 'rgb(25, 0, 0)';
                        }

                        else { // papagianneos is angry
                            // σταμάτα την μουσική για λίγο
                            if (!startedExtremeModeMusic) {
                                music.papagianneosFinaleMusic.pause();
                            }
                            else {
                                music.extremeModeGameMusic.pause();
                            }
                            sounds.angryPgn.play();

                            // Φτιάξε "death" κάρτες
                            setTimeout(() => {
                                for (var index = 0; index < 5; index++) {
                                    createCard({
                                        shape: specialCardsConfig[5].shape,
                                        color: specialCardsConfig[5].color,
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

                                document.getElementById('cardsHolder').style.animation = 'none';
                                document.getElementById('cardsHolder').style.transition = '1s';
                                document.getElementById('cardsHolder').style.transform = 'rotate(360deg)';

                                // ξαναάρχισε την μουσική
                                if (!startedExtremeModeMusic) {
                                    music.papagianneosFinaleMusic.play();
                                }
                                else {
                                    music.extremeModeGameMusic.play();
                                }

                                sounds.cardOpenHardMode.play();
                                // ανακάτεψε τις κάρτες
                                let cardsListToShuffle = [],
                                    scoreAndTriesTextHolderChild = parentDiv.children[0];

                                // Για κάθε "παιδί" που έχει το cardsHolder/parentDiv
                                for (var e = 0; e < parentDiv.children.length; e++) {
                                    let child = parentDiv.children[e];
                                    // Για να βρούμε ποιο είναι κάρτα και ποιο κείμενο, διαβάζουμε το class του.
                                    if (child.className == 'card') {
                                        cardsListToShuffle.push(child);
                                    }
                                }

                                cardsListToShuffle.sort(() => {
                                    return Math.random() - 0.5;
                                });

                                cardsListToShuffle[(cardsListToShuffle.length)] = cardsListToShuffle[0];
                                cardsListToShuffle[0] = scoreAndTriesTextHolderChild;
                                parentDiv.replaceChildren(...cardsListToShuffle);
                                blockClicks = false;
                            }, 12e3);
                        }
                    }
                }
                // ---------------------------------------------------------------------------------------

                // -----------------------------------------------------------------
                // Extreme Gamemode: Όταν περάσει το όριο προσπάθειων ο παίχτης, χάσε.
                // ------------------------------------------------------------------
                if (lostByDeathCard || extremeModeEnabled) {
                    // Άλλαξε το χρώμα της γραμματοσειράς σε κόκκινο.
                    triesText.style.color = 'red';

                    // Εφέ για τις προσπάθειες του παίχτη.
                    if (extremeModeEnabled && tries >= (MAX_TRIES - 2)) {
                        triesText.style.animation = 'seismos .3s linear infinite';
                        document.getElementById('cardsHolder').style.animation = 'seismos 1s linear infinite';
                        document.getElementsByTagName('body')[0].style.backgroundColor = 'rgb(25, 0, 0)';

                        if (!startedExtremeModeMusic) {
                            startedExtremeModeMusic = true;
                            // papagianneos mad mode
                            if (papagianneosFinaleEnabled) {
                                music.papagianneosFinaleMusic.pause();
                                document.getElementsByTagName('body')[0].style.backgroundImage = 'radial-gradient(maroon, black)';
                            }
                            gameMusic.pause();
                            music.extremeModeGameMusic.play();
                        }
                    }

                    // Δες αν έχασε ο παίχτης
                    if ((!lostExtremeModeEnabled && lostByDeathCard) || (tries >= MAX_TRIES && !lostExtremeModeEnabled)) {
                        gameStarted = false;
                        if (lostByDeathCard) {
                            gameMusic.pause();
                        }

                        if (papagianneosFinaleEnabled) {
                            music.papagianneosFinaleMusic.pause();
                            // Παίξε έναν τυχαίο ήχο..
                            let which = randomChoice([1, 1, 2]);
                            which == 1 ? sounds.pgnLaugh1.play() : sounds.pgnLaugh2.play();
                        }

                        music.extremeModeGameMusic.pause();

                        // Εμφάνισε "Κέρδισες!" οθόνη.
                        let loseScreen = document.createElement('div');
                        loseScreen.id = 'screen';

                        let loseScreenText = document.createElement('h1');
                        loseScreenText.appendChild(document.createTextNode(papagianneosFinaleEnabled ? 'Χάχα!' : '. . .'));

                        // Με πόσες κάρτες έπαιξε ο παίχτης;
                        let totalCardsPlayed = document.createElement('h1');
                        totalCardsPlayed.appendChild(document.createTextNode(`Σύνολο Καρτών: ${AMOUNT_OF_CARDS}`));

                        // Άλλαξε το μέγεθος της γραμματοσειράς.
                        totalCardsPlayed.style.fontSize = '25px';

                        // Κουμπί για να παίξει ξανά ο παίχτης
                        let playAgainButton = document.createElement('button');
                        playAgainButton.appendChild(document.createTextNode('Παίξε Ξανά'));
                        playAgainButton.style.backgroundColor = 'maroon';
                        playAgainButton.onclick = () => {
                            sounds.buttonClick.play();
                            // για να προλάβει να παίξει ο ήχος..
                            setTimeout(() => {
                                window.location.reload();
                            }, 5e2);
                        }

                        loseScreen.appendChild(screenLogo);
                        loseScreen.appendChild(loseScreenText);
                        loseScreen.appendChild(totalCardsPlayed);
                        loseScreen.appendChild(playAgainButton);
                        document.body.removeChild(parentDiv);
                        document.body.appendChild(loseScreen);

                        lostExtremeModeEnabled = true;
                        extremeModeEnabled = false; // σπάσε την επανάληψη
                    }
                }
                // --------------------------------------------------------------------

                // Τσέκαρε αν όλες οι κάρτες βρέθηκαν
                if (wonBySpecialCard || ((trollCardExists ? (openedCards.length + 1) : openedCards.length) / 2) >= (AMOUNT_OF_CARDS / 2)) {

                    // Αν δεν είναι VOID mode.
                    if (voidModeOver) {

                        // -------------------------------------------------------------------
                        // Επιτεύγματα για κάθε mode. Μην μετράς τις νίκες από την σπεσιαλ Κ
                        // κάρτα.
                        // -------------------------------------------------------------------
                        if (!wonBySpecialCard) {
                            // Eπίτευγμα: "Skill Issue"
                            if (tries < 10) {
                                unlockAchievement('ach_skill_issue');
                            }

                            // Επίτευγμα: "Τέρμα η μνήμη RAM"
                            unlockAchievement('ach_win_any_20');

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

                                // Απλό
                                default:
                                    achievementIDToCheckForUnlock = 'ach_normal_mode_win';
                                    break;
                            }
                            unlockAchievement(achievementIDToCheckForUnlock);

                            // Επίτευγμα.
                            if (papagianneosFinaleEnabled) {
                                unlockAchievement('ach_pgn_finale_twice');
                            }
                        }
                        // -------------------------------------------------------------------

                        // ---------------------------------
                        // Μουσική
                        // ---------------------------------
                        gameMusic.pause();

                        if (voidModeEnabled) {
                            music.papagianneosFinaleMusic.pause();
                        }

                        // Timed mode
                        if (timedModeEnabled) {
                            music.timeLevelMusic.pause();
                        }

                        // Αν άρχισε η extreme μουσική
                        if (startedExtremeModeMusic) {
                            music.extremeModeGameMusic.pause();
                        }

                        // Αν papagianneos finale
                        if (papagianneosFinaleEnabled) {
                            music.papagianneosFinaleMusic.pause();
                        }
                        // -----------------------------------

                        clearInterval(gameLoop);
                        sounds.win.play();

                        document.getElementsByTagName('body')[0].style.backgroundImage = 'url(./img/game_bg.png)';

                        // Εμφάνισε "Κέρδισες!" οθόνη.
                        let winScreen = document.createElement('div');
                        winScreen.id = 'screen';

                        let winScreenText = document.createElement('h1');
                        winScreenText.appendChild(document.createTextNode(wonBySpecialCard ? 'Σε έσωσα!' : voidModeEnabled ? 'Το void; ΜΑ ΠΩΣ; ΠΩΣ ΚΕΡΔΙΣΕΣ;' : timedModeEnabled ? 'Είσαι γρήγορος..' : papagianneosFinaleEnabled ? 'Κέρδισες... το.. FINALE ΜΟΥ!! Συγχαρητήρια!!! Ελπίζω να σου άρεσε το παιχνίδι!' : extremeModeEnabled ? 'Wow.. κέρδισες το extreme. Papagianneos is impressed now' : challengeModeEnabled ? 'ΚΕΡΔΙΣΕΣ ΤΟ CHALLENGE!!!' : hardModeEnabled ? 'ΚΕΡΔΙΣΕΣ ΤΟ ΔΥΣΚΟΛΟ!!!' : 'ΚΕΡΔΙΣΕΣ!'));

                        // αν papagianneos finale, σπεσιαλ μήνυμα
                        if (papagianneosFinaleEnabled) {
                            sounds.pgnFinaleWin.play();
                        }

                        // Κείμενο στην οθόνη (κέρδισες!) για score και προσπάθειες
                        let scoreTextWinScreen = document.createElement('h1'),
                            triesTextWinScreen = document.createElement('h1'),
                            totalCardsPlayed = document.createElement('h1');

                        // Φτιάξε το κείμενο για score και προσπάθειες
                        scoreTextWinScreen.appendChild(document.createTextNode(`Score: ${score}`));
                        triesTextWinScreen.appendChild(document.createTextNode(`Προσπάθειες: ${tries}`));

                        // Με πόσες κάρτες έπαιξε ο παίχτης;
                        totalCardsPlayed.appendChild(document.createTextNode(`Σύνολο Καρτών: ${AMOUNT_OF_CARDS}`));

                        // Άλλαξε το μέγεθος της γραμματοσειράς.
                        scoreTextWinScreen.style.fontSize = '25px';
                        triesTextWinScreen.style.fontSize = '25px';
                        totalCardsPlayed.style.fontSize = '25px';

                        // Κουμπί για να παίξει ξανά ο παίχτης
                        let playAgainButton = document.createElement('button');
                        playAgainButton.appendChild(document.createTextNode('Παίξε Ξανά'));
                        playAgainButton.onclick = () => {
                            sounds.buttonClick.play();
                            // για να προλάβει να παίξει ο ήχος..
                            setTimeout(() => {
                                window.location.reload();
                            }, 5e2);
                        }

                        winScreen.appendChild(screenLogo);
                        winScreen.appendChild(winScreenText);
                        winScreen.appendChild(scoreTextWinScreen);
                        winScreen.appendChild(triesTextWinScreen);
                        winScreen.appendChild(totalCardsPlayed);
                        winScreen.appendChild(playAgainButton);
                        document.body.removeChild(parentDiv);
                        document.body.appendChild(winScreen);
                        wonBySpecialCard = false;
                    }
                    else {

                        // Κάνε reset τα πάντα
                        hardModeEnabled = false;
                        challengeModeEnabled = false;
                        timedModeEnabled = false;
                        papagianneosFinaleEnabled = false;

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
                                    document.getElementById('cardsHolder').removeAttribute('style');
                                    timedModeEnabled = true;
                                    gameMusic.pause();
                                    music.timeLevelMusic.play();
                                    break;

                                case 4: // Extreme mode.
                                    document.getElementById('timeBar').style.display = 'none';
                                    music.timeLevelMusic.pause();
                                    gameMusic.play();
                                    savedTries_voidMode = tries;
                                    tries = 0;
                                    updateTries();
                                    extremeModeEnabled = true;
                                    break;

                                case 5: // Papagianneos FINALE (Easy edition)
                                    triesText.style.color = 'white'; // βγάλε τα εφέ από το extreme
                                    triesText.style.animation = 'none';
                                    tries = savedTries_voidMode;
                                    papagianneosFinaleEnabled = true;
                                    extremeModeEnabled = false;
                                    document.getElementsByTagName('body')[0].style.animation = 'none';
                                    document.getElementsByTagName('body')[0].style.backgroundImage = 'radial-gradient(cyan, black)';
                                    if (startedExtremeModeMusic) {
                                        music.extremeModeGameMusic.pause();
                                    }
                                    else gameMusic.pause();
                                    music.papagianneosFinaleMusic.play();
                                    break;
                            }

                            cardsData = [];
                            currentSelected = [];
                            AMOUNT_OF_CARDS = randomChoice([10, 12, 16, 20, 24, 26]);
                            if (extremeModeEnabled) MAX_TRIES = (AMOUNT_OF_CARDS / 2) + 2;
                            if (timedModeEnabled) { // Ξαναόρισε τον χρόνο στο TIMED διότι αλλάζει ο αριθμός καρτών
                                timeLeft = AMOUNT_OF_CARDS > 16 ? 850 : 750;
                            }

                            trollCardExists = false; // PLEASE WORK
                            startGame();
                            createCards();
                            resetCards(false);
                        }

                        else voidModeOver = true;
                    }
                }
                // --------------------------------------------------------
            }, 10);
        })();
        // =====================================================================

    } // end of try {}
    catch (error) {
        alert(error);
        console.error(error);
    }
})();
