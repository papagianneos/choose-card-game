(() => {
    try {

        // -----------------------------------------------------------------------
        // Διάβασε τα εφέ που επέλεξε ο χρήστης.
        // ------------------------------------------------------------------------
        const playersEffect = JSON.parse(localStorage.getItem('customizeEffect'));
        // ------------------------------------------------------------------------

        // -----------------------------------------------------------------------
        // lol
        // ----------------------------------------------------------------------
        let papagianneosFinaleEnabled = false,
            startedAngryEffect = false,
            papagianneosFinaleMusic = new Audio('./audio/papagianneos_finale.mp3');

        //papagianneosFinaleMusic.loop = true;
        // ------------------------------------------------------------------------

        // ----------------------------------------------------------
        // Σπέσιαλ Κάρτες.
        // ----------------------------------------------------------
        let specialCardsEnabled = true,
            specialCards = ['++', 'x2', '¹/₂', 'T - 2', '--', '†', 'Pgn', 'Κ'],
            currentSpecialCards = [],
            lostByDeathCard = false,
            wonBySpecialCard = false,
            removedSpecialCardsFromFullCount = [];
        // -----------------------------------------------------------

        // ------------------------------------
        // Ήχος.
        // ------------------------------------
        const playSound = src => {
            new Audio(src).play();
        }

        // -----------------------------------------------------------------------------------------
        // Μουσική για το παιχνίδι
        // -----------------------------------------------------------------------------------------
        let gameMusic = new Audio('./audio/μουσική.mp3');
        gameMusic.loop = true;

        // Extreme mode μουσικη
        let startedExtremeModeMusic = false,
            gameStarted = false,
            extremeModeGameMusic = new Audio('./audio/extreme_mode_music.mp3');

        extremeModeGameMusic.loop = true;
        // -----------------------------------------------------------------------------------------

        // ---------------------------------------
        // Extreme Gamemode
        // ---------------------------------------
        let extremeModeEnabled = false,
            lostExtremeModeEnabled = false;
        // ----------------------------------------

        // ------------------------------------------------------------------------
        // Επιτεύγματα (TO DO)
        // ------------------------------------------------------------------------
        /*let achievementsLocalDefault = [
            false, false, false, false, false,
            false, false, false, false, false,
            false, false, false, false, false,
            false, false, false, false, false,
            false, false, false, false, false,
            false, false, false, false, false,
            false, false
        ];

        let fetchedAchievementsData = [
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[0] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[1] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[2] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[3] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[4] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[5] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[6] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[7] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[8] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[9] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[10] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[11] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[12] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[13] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[14] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[15] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[16] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[17] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[18] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[19] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[20] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[21] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[22] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[23] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[24] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[25] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[26] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[27] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[28] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[29] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[30] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[31] : false,
            localStorage.getItem("επιτεύγματα") != null ? JSON.parse(localStorage.getItem("επιτεύγματα"))[32] : false,
        ];*/
        // ------------------------------------------------------------------------

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

        // ----------------------------------------
        // Extreme Gamemode
        // ----------------------------------------
        let MAX_TRIES = (AMOUNT_OF_CARDS / 2);
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
                    let randomlyChosenSpecialCard = randomChoice(specialCards);
                    cardShapes[cardShapes.length - 1] = randomlyChosenSpecialCard;
                }

                // ΟΛΕΣ ΑΝ ΠΑΙΖΕΙ ΤΟ FINALE
                else {
                    for (var specialCard_ of specialCards) {
                        cardShapes.push(specialCard_);
                        AMOUNT_OF_CARDS += 2;
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

            // check cards length
            if (cardShapes.length != AMOUNT_OF_CARDS || cardColors.length != AMOUNT_OF_CARDS) {
                throw Error('Το πλήθος/μέγεθος των λιστών cardShapes ή cardColors δεν είναι σωστό με το AMOUNT_OF_CARDS.')
            }

            for (var j = 0; j < AMOUNT_OF_CARDS; j++) {
                const card = {
                    shape: cardShapes[j],
                    color: cardColors[j],
                    specialCard: false,
                    specialCardEffect: () => { }
                }

                // --------------------------------------------------------
                // Οι σπέσιαλ κάρτες έχουν συγκεκριμένο σταθερό χρώμα.
                // --------------------------------------------------------
                if (specialCardsEnabled) {
                    // SOS συνάρτηση
                    const addToSpecialCardsArray = (shape) => {
                        currentSpecialCards.push(shape);
                        removedSpecialCardsFromFullCount.push(false);
                    }

                    switch (card.shape) {
                        case specialCards[0]: // 10 Score (++)
                            addToSpecialCardsArray(specialCards[0]);
                            card.specialCard = true;
                            card.color = 'radial-gradient(darkgreen, white)';
                            card.specialCardEffect = () => {
                                playSound('./audio/special_score.mp3');
                                score += 10;
                            }
                            break;

                        case specialCards[1]: // x2 Score
                            addToSpecialCardsArray(specialCards[1]);
                            card.specialCard = true;
                            card.color = 'radial-gradient(#8a8c16, #8a8c16, gold)';
                            card.specialCardEffect = () => {
                                playSound('./audio/special_score.mp3');
                                score *= 2;
                            }
                            break;

                        case specialCards[2]: // Half Score
                            addToSpecialCardsArray(specialCards[2]);
                            card.specialCard = true;
                            card.color = 'radial-gradient(cyan, red)';
                            card.specialCardEffect = () => {
                                playSound('./audio/κακό_λάθος.mp3');
                                score /= 2;
                            }
                            break;

                        case specialCards[3]: // 2 λιγότερες προσπάθειες
                            addToSpecialCardsArray(specialCards[3]);
                            card.specialCard = true;
                            card.color = 'radial-gradient(#00fc82, #84b89f)';
                            card.specialCardEffect = () => {
                                playSound('./audio/special_score.mp3');
                                tries -= 2;
                                updateTries();
                            }
                            break;

                        case specialCards[4]: // 10 λιγότερο score
                            addToSpecialCardsArray(specialCards[4]);
                            card.specialCard = true;
                            card.color = 'radial-gradient(black, #4a1313)';
                            card.specialCardEffect = () => {
                                playSound('./audio/κακό_λάθος.mp3');
                                score -= 10;
                            }
                            break;

                        case specialCards[5]: // Πάει χάθηκε το παιχνίδι
                            addToSpecialCardsArray(specialCards[5]);
                            card.specialCard = true;
                            card.color = 'radial-gradient(#1c0b0e, #b8707d)';
                            card.specialCardEffect = () => {
                                if (!papagianneosFinaleEnabled) {
                                    playSound('./audio/κακό_λάθος.mp3');
                                }
                                lostByDeathCard = true;
                            }
                            break;

                        case specialCards[6]: // PAPAGIANNEOS SPEECH
                            addToSpecialCardsArray(specialCards[6]);
                            card.specialCard = true;
                            card.color = 'radial-gradient(#adfff1, #265175)';
                            card.specialCardEffect = () => {
                                if (startedExtremeModeMusic) {
                                    extremeModeGameMusic.pause();
                                }
                                else {
                                    if (papagianneosFinaleEnabled) {
                                        papagianneosFinaleMusic.pause();
                                    }
                                    else gameMusic.pause();
                                }
                                playSound('./audio/papagianneos_wow.mp3');
                                setTimeout(() => {
                                    if (startedExtremeModeMusic) {
                                        extremeModeGameMusic.play();
                                    }
                                    else {
                                        if (papagianneosFinaleEnabled) {
                                            papagianneosFinaleMusic.play();
                                        }
                                        else gameMusic.play();
                                    }
                                }, 3e3);
                            }
                            break;

                        case specialCards[7]: // for my friend :)
                            addToSpecialCardsArray(specialCards[7]);
                            card.specialCard = true;
                            card.color = 'radial-gradient(#ac86b0, #781f82)';
                            card.specialCardEffect = () => {
                                // να μην επιτρέπεται στο papagianneos finale
                                if (!papagianneosFinaleEnabled) { // αν δεν είναι finale
                                    playSound('./audio/special_score.mp3');
                                    wonBySpecialCard = true;
                                }
                                else { // αλλιώς, αν ΕΙΝΑΙ finale
                                    papagianneosFinaleMusic.pause();
                                    playSound('./audio/papagianneos_troll.mp3');
                                    setTimeout(() => {
                                        papagianneosFinaleMusic.play();
                                        document.getElementById('cardsHolder').style.animation = 'seismos 1s linear infinite';
                                    }, 4e3);
                                }
                            }
                            break;
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
        const resetCards = () => {
            tries += 1; // προσπάθειες του παίχτη
            updateTries();
            for (var card of document.getElementsByClassName('card')) {
                // card.innerHTML είναι το σχέδιο/κείμενο κάθε κάρτας

                // Αν ΔΕΝ έχει βρεθεί η συγκεκριμένη κάρτα από τον παίχτη
                if (!card.getAttribute('anoixthcarta')) {
                    card.style.background = 'grey';
                    card.innerHTML = '​'; // κενό/whitespace
                    card.style.transform = 'none';
                    card.removeAttribute('egineclick');
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

            // Βάλε τα εφέ που διάλεξε ο χρήστης/παίχτης στην κάρτα.
            if (playersEffect != null) {
                div.style.borderRadius = playersEffect.borderRadius;
                div.style.fontSize = playersEffect.fontSize;
                div.style.fontFamily = playersEffect.fontFamily;
                div.style.textDecorationThickness = playersEffect.textDecorationThickness;
                div.style.textDecorationLine = playersEffect.textDecorationLine;
                div.style.textDecorationStyle = playersEffect.textDecorationStyle;
            }

            if (card.specialCard) {
                div.specialCard = true;
                div.specialCardEffect = card.specialCardEffect;
            }

            // αποθήκευσε το χρώμα της κάρτας..
            div.savedBackgroundColor = card.color;

            // κείμενο για το σχέδιο/σχήμα της κάρτας
            div.savedText = card.shape; // αποθήκευσε και το κείμενο
            div.appendChild(document.createTextNode(card.shape)); // βάλε το κείμενο στη κάρτα

            // =======================================================
            // Mouse event listeners setup & game setup
            // =======================================================

            // Όταν γίνει click σε αυτό.
            div.onclick = () => {

                // -------------------------------------------------------------------------------------------------------
                // BUG FIX: Αν έγινε click στην ίδια κάρτα..
                // -------------------------------------------------------------------------------------------------------
                if (div.getAttribute('anoixthcarta') || blockClicks || div.getAttribute('egineclick')) return;
                div.setAttribute('egineclick', 'nai');
                // -------------------------------------------------------------------------------------------------------

                // ----------------------------------
                // Ήχος κάρτας.
                // ----------------------------------
                playSound('./audio/κλικ_κάρτας.mp3');
                // ----------------------------------

                // ------------------------------------------
                // ANIMATION.
                // ------------------------------------------
                div.style.transform = 'rotateY(360deg)';
                // -------------------------------------------

                // Εμφάνισε την κάρτα στον παίχτη
                if (currentSelected.length <= 1) {
                    div.style.background = div.savedBackgroundColor;
                    div.innerHTML = div.savedText;
                    currentSelected.push(div);
                }

                // Αν άνοιξε 2 κάρτες ο παίχτης
                if (currentSelected.length >= 2) {
                    let firstCard = currentSelected[0],
                        secondCard = currentSelected[1];

                    // αν είναι διαφορετικές οι κάρτες, επαναφορά
                    if (firstCard.savedText !== secondCard.savedText) {

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
                            playSound('./audio/δύσκολο_κλικ_κάρτας.mp3');

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
                            playSound('./audio/λάθος.mp3');
                        }

                        blockClicks = true;
                        setTimeout(() => {
                            resetCards();
                            blockClicks = false;
                        }, 5e2);
                    }

                    // αν είναι ίδιες οι κάρτες, δώσε score
                    else if (firstCard.savedText == secondCard.savedText) {
                        if (firstCard.specialCard && secondCard.specialCard) {
                            firstCard.specialCardEffect();
                        }

                        // Αν είναι μία απλή κάρτα
                        else {
                            const scoreReceived = Math.round(1 * ((score == 0 ? 10 : score) / (tries == 0 ? 1 : tries)));
                            score += (scoreReceived != 0 ? scoreReceived : 1);

                            // Παίξε ήχο ΜΟΝΟ αν δεν είναι σπεσιαλ κάρτα.
                            if (!firstCard.specialCard && !secondCard.specialCard) {
                                playSound(hardModeEnabled || extremeModeEnabled ? './audio/δύσκολο_score.mp3' : './audio/score.mp3');
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
            if (!papagianneosFinaleEnabled) {
                gameMusic.play();
            }
            else {
                papagianneosFinaleMusic.play();
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

            // λολ
            let developerNameLol = document.createElement('h1');
            developerNameLol.style.fontSize = '20px';
            developerNameLol.appendChild(document.createTextNode('Προγραμματιστής: Σωτήριος Παπαγιάννης'));

            // Μουσική Credits (Soundimage.org)
            let musicCredit = document.createElement('h1');
            musicCredit.style.fontSize = '20px';
            musicCredit.innerHTML = `Μουσική από: <a href="https://soundimage.org/">Soundimage.org</a> και <a href="https://www.soundhelix.com/">Soundhelix.com</a>.`;

            // For my friends :)
            let friendsWebsite = document.createElement('h1');
            friendsWebsite.style.fontSize = '20px';
            friendsWebsite.innerHTML = `Επίσης τσέκαρε: <a href="https://2x05.surge.sh/">2x05</a>`;

            // Τελευταία Τροποποίηση
            let howToPlayTxtt = document.createElement('h1');
            howToPlayTxtt.style.fontSize = '25px';
            howToPlayTxtt.innerHTML = `Δες <a href="/how-to-play">εδώ</a> αν δεν ξέρεις πώς να παίξεις`;

            let customizePageLink = document.createElement('h1');
            customizePageLink.style.fontSize = '40px';
            customizePageLink.innerHTML = `<a href="/customize">Προσάρμοσε το εφέ του παιχνιδιού σου εδώ!</a>`;

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
                button.style.margin = '5px';
                button.style.background = bgColor;
                if (mode == 'papagianneosFinale') {
                    /* button.setAttribute('disabled', 'true');
                     button.style.background = 'grey';
                     button.style.cursor = 'not-allowed';*/
                    button.style.fontSize = '40px';
                }

                // Κείμενο στο κουμπί
                button.appendChild(document.createTextNode(label));

                // Event-Listener. (για τα κλικ)
                button.onclick = () => {
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

                        case 'papagianneosFinale': // LOL WHY I MADE THIS
                            MAX_TRIES = 69;
                            AMOUNT_OF_CARDS = 26;
                            challengeModeEnabled = true;
                            extremeModeEnabled = true;
                            papagianneosFinaleEnabled = true;
                            document.getElementsByTagName('body')[0].style.backgroundImage = 'radial-gradient(cyan, black)';
                            break;
                    }

                    startGame();
                    createCards();
                    playSound('./audio/click.mp3');

                    if (mode != 'papagianneosFinale') {
                        document.getElementsByTagName('body')[0].style.backgroundImage = 'none';
                    }

                    // βάλε το parentDiv στο σώμα της ιστοσελίδας.
                    document.body.appendChild(parentDiv);

                    resetCards();
                    gameStarted = true;
                    // εξαφάνισε την οθόνη με το κουμπί μαζί
                    document.body.removeChild(startScreen);
                }

                // special for extreme mode
                if (mode == 'extreme') {
                    button.style.animation = 'seismos 1s linear infinite';
                }

                return button;
            }

            // Κουμπί για να παίξει ο παίχτης
            let buttonsWrapper = document.createElement('div');

            let playButton = createButton('Παίξε Απλό', 'green'), // Κουμπί για να παίξει ο παίχτης "απλό" mode
                playButtonHard = createButton('Παίξε Δύσκολο', 'maroon', 'hard'), // Κουμπί για να παίξει ο παίχτης "δύσκολο" mode
                playButtonChallenge = createButton('Παίξε Challenge', 'purple', 'challenge'), // Κουμπί για να παίξει ο παίχτης "challenge" mode
                playButtonExtreme = createButton('Πάιξε EXTREME', 'radial-gradient(maroon, black)', 'extreme'), // Κουμπί για να παίξει ο παίχτης "extreme" mode
                playButtonPapagianneosFinale = createButton('Papagianneos FINALE', 'radial-gradient(green, black)', 'papagianneosFinale'); // Κουμπί για να παίξει ο παίχτης "finale" mode

            // ---------------------------------------------------
            // Κουμπιά
            // ---------------------------------------------------
            buttonsWrapper.appendChild(playButton);
            buttonsWrapper.appendChild(playButtonHard);
            buttonsWrapper.appendChild(playButtonChallenge);
            buttonsWrapper.appendChild(playButtonExtreme);
            buttonsWrapper.appendChild(playButtonPapagianneosFinale);
            // ----------------------------------------------------

            startScreen.appendChild(screenLogo); // Logo
            startScreen.appendChild(startScreenText); // Τίτλος
            startScreen.appendChild(developerNameLol); // λολ
            startScreen.appendChild(friendsWebsite); // for my friends :)
            startScreen.appendChild(musicCredit); // για credit στο Soundimage.org για την μουσική του παιχνιδιού
            startScreen.appendChild(customizePageLink);
            startScreen.appendChild(howToPlayTxtt); // How to play link
            startScreen.appendChild(buttonsWrapper); // Κουμπιά
            document.body.appendChild(startScreen); // Βάλε την οθόνη στο σώμα της ιστοσελίδας

            // game loop
            const gameLoop = setInterval(() => {
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

                    openedCards = openedCards.filter(_card => { return _card.innerHTML != currentSpecialCards[specialCardShapeIndex] });
                    if (!removedSpecialCardsFromFullCount[specialCardShapeIndex]) {
                        AMOUNT_OF_CARDS -= 1;
                        removedSpecialCardsFromFullCount[specialCardShapeIndex] = true;
                    }
                }
                // --------------------------------------------------------------------------------------------------------------------

                // ---------------------------------------------------------------------------------------
                // Σεισμικό Effect για το "δύσκολο" και για το "papagianneos finale" mode
                // ---------------------------------------------------------------------------------------
                if (!startedAngryEffect && (papagianneosFinaleEnabled || hardModeEnabled)) {
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
                                papagianneosFinaleMusic.pause();
                            }
                            else {
                                extremeModeGameMusic.pause();
                            }
                            playSound('./audio/papagianneos_final_moment.mp3');

                            // Φτιάξε "death" κάρτες
                            setTimeout(() => {
                                for (var index = 0; index < 5; index++) {
                                    createCard({
                                        shape: specialCards[5],
                                        color: 'radial-gradient(#1c0b0e, #b8707d)',
                                        specialCard: true,
                                        specialCardEffect: () => {
                                            if (!papagianneosFinaleEnabled) {
                                                playSound('./audio/κακό_λάθος.mp3');
                                            }
                                            lostByDeathCard = true;
                                        }
                                    });
                                    resetCards();
                                }

                                document.getElementById('cardsHolder').style.animation = 'none';
                                document.getElementById('cardsHolder').style.transition = '1s';
                                document.getElementById('cardsHolder').style.transform = 'rotate(360deg)';

                                // ξαναάρχισε την μουσική
                                if (!startedExtremeModeMusic) {
                                    papagianneosFinaleMusic.play();
                                }
                                else {
                                    extremeModeGameMusic.play();
                                }

                                playSound('./audio/δύσκολο_κλικ_κάρτας.mp3');
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
                                tries -= 5; // χρειάζεται
                                updateTries();
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
                                papagianneosFinaleMusic.pause();
                                document.getElementsByTagName('body')[0].style.backgroundImage = 'radial-gradient(maroon, black)';
                            }
                            gameMusic.pause();
                            extremeModeGameMusic.play();
                        }
                    }

                    // Δες αν έχασε ο παίχτης
                    if ((!lostExtremeModeEnabled && lostByDeathCard) || (tries >= MAX_TRIES && !lostExtremeModeEnabled)) {
                        gameStarted = false;
                        if (lostByDeathCard) {
                            gameMusic.pause();
                        }

                        if (papagianneosFinaleEnabled) {
                            papagianneosFinaleMusic.pause();
                            // Παίξε έναν τυχαίο ήχο..
                            playSound('./audio/' + randomChoice(['papagianneos_laugh.mp3', 'papagianneos_laugh.mp3', 'papagianneos_laugh_2.mp3']));
                        }

                        extremeModeGameMusic.pause();

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
                            playSound('./audio/click.mp3');
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
                if (wonBySpecialCard || (openedCards.length / 2) >= (AMOUNT_OF_CARDS / 2)) {

                    // ---------------------------------
                    // Μουσική
                    // ---------------------------------
                    gameMusic.pause();

                    // Αν άρχισε η extreme μουσική
                    if (startedExtremeModeMusic) {
                        extremeModeGameMusic.pause();
                    }

                    // Αν papagianneos finale
                    if (papagianneosFinaleEnabled) {
                        papagianneosFinaleMusic.pause();
                    }
                    // -----------------------------------

                    clearInterval(gameLoop);
                    playSound('./audio/νίκη.mp3');

                    document.getElementsByTagName('body')[0].style.backgroundImage = 'url(./img/game_bg.png)';

                    // Εμφάνισε "Κέρδισες!" οθόνη.
                    let winScreen = document.createElement('div');
                    winScreen.id = 'screen';

                    let winScreenText = document.createElement('h1');
                    winScreenText.appendChild(document.createTextNode(papagianneosFinaleEnabled ? 'Κέρδισες... το.. FINALE ΜΟΥ!! Συγχαρητήρια!!! Ελπίζω να σου άρεσε το παιχνίδι!' : wonBySpecialCard ? 'Σε έσωσα!' : extremeModeEnabled ? 'Wow.. κέρδισες το extreme. Papagianneos is impressed now' : challengeModeEnabled ? 'ΚΕΡΔΙΣΕΣ ΤΟ CHALLENGE!!!' : hardModeEnabled ? 'ΚΕΡΔΙΣΕΣ ΤΟ ΔΥΣΚΟΛΟ!!!' : 'ΚΕΡΔΙΣΕΣ!'));

                    // αν papagianneos finale, σπεσιαλ μήνυμα
                    if (papagianneosFinaleEnabled) {
                        playSound('./audio/papagianneos_msg.mp3')
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
                        playSound('./audio/click.mp3');
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
