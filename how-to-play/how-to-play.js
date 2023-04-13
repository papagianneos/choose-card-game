import { specialCardsConfig } from "../modules/specialCardsConfig.js";
import { sounds } from "../modules/sounds.js";

(() => {

    // -----------------------------------------------------------------------
    // Διάβασε τα εφέ που επέλεξε ο χρήστης.
    // ------------------------------------------------------------------------
    const playersEffect = JSON.parse(localStorage.getItem('customizeEffect'));
    // ------------------------------------------------------------------------

    let mainHTPDiv = document.createElement('div');
    mainHTPDiv.id = 'cardsHolder';
    mainHTPDiv.style.display = 'block';

    // Για να φαίνεται καλύτερα βγάλε την εικόνα του φόντου της ιστοσελίδας.
    document.getElementsByTagName('body')[0].style.backgroundImage = 'none';

    // Τίτλος Ιστοσελίδας.
    let specialCardsHTPTitle = document.createElement('h1');
    specialCardsHTPTitle.appendChild(document.createTextNode('How to play?'));
    mainHTPDiv.appendChild(specialCardsHTPTitle);

    // ---------------------------------------------------------------------
    // Φτιάξε κουμπί για να επιστρέψει ο χρήστης στο παιχνίδι.
    // ---------------------------------------------------------------------
    let goBackBtnWrapper = document.createElement('div');
    goBackBtnWrapper.style.marginBottom = '100px';

    let goBackBtn = document.createElement('button');
    goBackBtn.appendChild(document.createTextNode('Πίσω στο παιχνίδι!'));
    goBackBtn.onclick = () => {
        sounds.buttonClick.play();
        setTimeout(() => {
            window.location.href = '/';
        }, 5e2);
    }
    goBackBtnWrapper.appendChild(goBackBtn);
    mainHTPDiv.appendChild(goBackBtnWrapper);
    // ---------------------------------------------------------------------

    // Πληροφορία για το πώς να κερδίσεις κ.λπ.
    let specialCardsHTPTitle2 = document.createElement('h1');
    specialCardsHTPTitle2.appendChild(document.createTextNode('Για να κερδίσεις πρέπει να βρείς όλα τα ζευγάρια καρτών, χωρίς τις σπεσιαλ κάρτες.'));
    specialCardsHTPTitle2.style.fontSize = '20px';
    mainHTPDiv.appendChild(specialCardsHTPTitle2);

    // Σπεσιαλ Κάρτες Τίτλος.
    let specialCardsHTPWrapper = document.createElement('div');
    specialCardsHTPWrapper.style.border = '2px dotted green';
    specialCardsHTPWrapper.style.width = '100%';
    specialCardsHTPWrapper.style.height = 'auto';


    // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ΣΠΕΣΙΑΛ ΚΑΡΤΕΣ ΠΛΗΡΟΦΟΡΙΕΣ
    // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    let specialCardsHTPSpecialCardsTitle = document.createElement('h1');
    specialCardsHTPSpecialCardsTitle.appendChild(document.createTextNode('ΣΠΕΣΙΑΛ ΚΑΡΤΕΣ'));
    specialCardsHTPWrapper.appendChild(specialCardsHTPSpecialCardsTitle);

    // Λίγες πληροφορίες ακόμα.
    let specialCardsHTPSmallInfo = document.createElement('h1');
    specialCardsHTPSmallInfo.appendChild(document.createTextNode('Μόνο 1 από τις παρακάτω υπάρχει σε κάθε παιχνίδι! Δεν μετράνε στο σύνολο και δεν χρειάζεται να τις βρεις μαζί με τις άλλες απλές κάρτες για να κερδίσεις. Πρέπει να βρεις το ζευγάρι τις καθεμιάς για να τις λειτουργήσεις.'));
    specialCardsHTPSmallInfo.style.fontSize = '16px';
    specialCardsHTPWrapper.appendChild(specialCardsHTPSmallInfo);

    for (var card of specialCardsConfig) {
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
        cardDiv.style.background = card.color;

        // Η "Σ" κάρτα είναι πολύχρωμη.
        if (card.shape == specialCardsConfig[16].shape) {
            cardDiv.style.animation = 'rainbowSigmaCard 2.5s linear infinite';
        }

        cardDiv.style.cursor = 'help';

        // Βάλε τα εφέ που διάλεξε ο χρήστης/παίχτης στην κάρτα.
        if (playersEffect != null) {
            cardDiv.style.borderRadius = playersEffect.borderRadius;
            cardDiv.style.fontSize = playersEffect.fontSize;
            cardDiv.style.fontFamily = playersEffect.fontFamily;
            cardDiv.style.textDecorationThickness = playersEffect.textDecorationThickness;
            cardDiv.style.textDecorationLine = playersEffect.textDecorationLine;
            cardDiv.style.textDecorationStyle = playersEffect.textDecorationStyle;

            if (playersEffect.neonMode) {
                cardDiv.style.border = cardDiv.style.background;
                cardDiv.style.borderStyle = 'solid';
                cardDiv.style.background = 'none';
            }
        }

        // ------------------------------------------------------------
        // Κείμενο για τις πληροφορίες της σπεσιαλ κάρτας
        // ------------------------------------------------------------
        cardDiv.appendChild(document.createTextNode(card.shape));

        let hiddenInfoTxTWrapper = document.createElement('div');
        hiddenInfoTxTWrapper.className = 'hidden';
        hiddenInfoTxTWrapper.style.fontSize = '20px';
        hiddenInfoTxTWrapper.style.width = '150px'; // το μέγεθος κάθε κάρτας
        hiddenInfoTxTWrapper.style.marginLeft = '10px';
        hiddenInfoTxTWrapper.appendChild(document.createTextNode(card.info));
        // ------------------------------------------------------------

        cardDivWrapper.appendChild(cardDiv);
        cardDivWrapper.appendChild(hiddenInfoTxTWrapper);
        specialCardsHTPWrapper.appendChild(cardDivWrapper);
    }

    specialCardsHTPWrapper.style.marginBottom = '100px';
    mainHTPDiv.appendChild(specialCardsHTPWrapper);
    // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    // -------------------------------------------------------------------------------
    // GAMEMODES Πληροφορίες
    // -------------------------------------------------------------------------------
    let gameModesSmallInfo = document.createElement('h1');
    gameModesSmallInfo.appendChild(document.createTextNode('Μπορείς να παίξεις επίσης και με διαφορετικά gamemodes!'));
    gameModesSmallInfo.style.fontSize = '20px';
    mainHTPDiv.appendChild(gameModesSmallInfo);

    let gamemodesInfoBox = document.createElement('div');
    gamemodesInfoBox.style.border = '2px dotted green';
    gamemodesInfoBox.style.width = '100%';
    gamemodesInfoBox.style.height = 'auto';

    // ΤΙΤΛΟΣ
    let gamemodesBoxTitle = document.createElement('h1');
    gamemodesBoxTitle.appendChild(document.createTextNode('GAMEMODES'));
    gamemodesInfoBox.appendChild(gamemodesBoxTitle);

    const gamemodesInfoConfig = [
        {
            label: 'Απλό',
            color: 'green',
            info: 'Απλό και εύκολο.'
        },

        {
            label: 'Δύσκολο',
            color: 'red',
            info: 'Κάνε λάθος και.. αλλάζουν όλες οι κάρτες θέση!'
        },

        {
            label: 'Challenge',
            color: 'purple',
            info: 'Κάνε λάθος και.. νέο εφέ!'
        },

        {
            label: 'EXTREME',
            color: 'radial-gradient(maroon, black)',
            info: 'Μπορείς να κερδίσεις με συγκεκριμένες προσπάθειες;'
        },

        {
            label: 'TIMED',
            color: 'radial-gradient(yellow, gold)',
            info: 'Ταχύτητα = Νίκη'
        },

        {
            label: 'Papagianneos FINALE',
            color: 'radial-gradient(green, black)',
            info: '? ? ?'
        }
    ];

    for (var gameModeObj of gamemodesInfoConfig) {
        let gameModeBoxWrapper = document.createElement('div');
        gameModeBoxWrapper.style.display = 'inline-block';
        gameModeBoxWrapper.style.verticalAlign = 'top';
        gameModeBoxWrapper.style.alignItems = 'center';
        gameModeBoxWrapper.style.justifyContent = 'center';
        gameModeBoxWrapper.style.textAlign = 'center';

        let gameModeBox = document.createElement('button');
        gameModeBox.appendChild(document.createTextNode(gameModeObj.label));
        gameModeBox.style.background = gameModeObj.color;
        gameModeBox.style.margin = '10px';
        gameModeBox.style.cursor = 'help';
        gameModeBox.className = 'gameModeBoxForHowToPlay';

        // lol
        if (gameModeObj.label == 'Papagianneos FINALE') {
            gameModeBox.style.fontSize = '40px';
        }

        let hiddenGameModeInfoTxT = document.createElement('div');
        hiddenGameModeInfoTxT.className = 'hidden';
        hiddenGameModeInfoTxT.style.fontSize = '20px';
        hiddenGameModeInfoTxT.style.width = gameModeObj.label == 'Papagianneos FINALE' ? '500px' : '300px'; // το μέγεθος
        hiddenGameModeInfoTxT.style.marginLeft = '10px';
        hiddenGameModeInfoTxT.appendChild(document.createTextNode(gameModeObj.info));

        gameModeBoxWrapper.appendChild(gameModeBox);
        gameModeBoxWrapper.appendChild(hiddenGameModeInfoTxT);
        gamemodesInfoBox.appendChild(gameModeBoxWrapper);
    }

    mainHTPDiv.appendChild(gamemodesInfoBox);
    // -------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------
    // Ευχαριστώ.
    // ------------------------------------------------------------------------------
    let thanksText = document.createElement('h1');
    thanksText.appendChild(document.createTextNode('Επιμέλεια: Σωτήριος Παπαγιάννης'));
    thanksText.style.fontSize = '20px';
    mainHTPDiv.appendChild(thanksText);
    // ------------------------------------------------------------------------------

    document.body.appendChild(mainHTPDiv);
})();
