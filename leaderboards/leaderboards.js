import { LANGUAGE_DATA, LANGUAGE_INDEX } from "../modules/languages.js";
import { SERVER_ADDRESS } from "../modules/SERVER.js";

(() => {
    document.getElementsByTagName('body')[0].style.background = 'black';

    let loader = document.createElement('div');
    loader.className = 'loader';
    document.body.appendChild(loader);

    (async () => {
        let FETCHED_DATA = [], serverDown = false;

        try {
            await fetch(SERVER_ADDRESS)
                .then(response => response.text())
                .then(text => FETCHED_DATA = JSON.parse(text)); // ο σερβερ επιστρέφει string
        }

        catch (error) {
            serverDown = true;
        }

        document.body.removeChild(loader);

        let leaderboardHolder = document.createElement('div');
        leaderboardHolder.style.width = '100%';
        leaderboardHolder.style.height = 'auto'; // fix
        leaderboardHolder.style.backgroundColor = 'black';
        leaderboardHolder.style.textAlign = 'center';
        leaderboardHolder.style.alignItems = 'center';
        leaderboardHolder.style.justifyContent = 'center';

        let leaderboardBoxTitle = document.createElement('h1');
        leaderboardBoxTitle.appendChild(document.createTextNode(LANGUAGE_DATA[LANGUAGE_INDEX].todaysGames));
        leaderboardBoxTitle.style.textAlign = 'center';

        let leaderboardBox = document.createElement('table');
        leaderboardBox.id = 'leaderboard';

        if (serverDown) { // Δεν λειτουργεί ο server;
            leaderboardBox.appendChild(document.createTextNode(LANGUAGE_DATA[LANGUAGE_INDEX].serverDownMsg));
        }

        else if (FETCHED_DATA.length == 0) { // Κανένα παιχνίδι δεν βρέθηκε.
            leaderboardBox.appendChild(document.createTextNode(LANGUAGE_DATA[LANGUAGE_INDEX].noGamesMsg));
        }

        else {
            // -----------------------------------------------------------------------------------------------------------------
            // Header of table
            // -----------------------------------------------------------------------------------------------------------------
            let tableTopTrElem = document.createElement('tr'),
                tableTopThElemName = document.createElement('th'),
                tableTopThElemScore = document.createElement('th'),
                tableTopThElemTries = document.createElement('th'),
                tableTopThElemCardsAmount = document.createElement('th'),
                tableTopThElemModePlayed = document.createElement('th');

            tableTopThElemName.innerHTML = LANGUAGE_DATA[LANGUAGE_INDEX].nickname; // name
            tableTopThElemScore.innerHTML = 'Score'; // score
            tableTopThElemTries.innerHTML = LANGUAGE_DATA[LANGUAGE_INDEX].tries; // tries
            tableTopThElemCardsAmount.innerHTML = LANGUAGE_DATA[LANGUAGE_INDEX].amount_of_cards; // cards played
            tableTopThElemModePlayed.innerHTML = 'Mode'; // mode played

            for (var child of [tableTopThElemName, tableTopThElemScore, tableTopThElemTries, tableTopThElemCardsAmount, tableTopThElemModePlayed]) {
                tableTopTrElem.appendChild(child);
            }

            leaderboardBox.appendChild(tableTopTrElem);
            // -----------------------------------------------------------------------------------------------------------------

            for (var data of FETCHED_DATA) {
                let dataTrElem = document.createElement('tr'),
                    dataTdElemName = document.createElement('td'),
                    dataTdElemScore = document.createElement('td'),
                    dataTdElemTries = document.createElement('td'),
                    dataTdElemCardsAmount = document.createElement('td'),
                    dataTdElemMode = document.createElement('td');

                dataTdElemName.innerHTML = data.name; // name
                dataTdElemScore.innerHTML = data.score; // score
                dataTdElemTries.innerHTML = data.tries; // tries
                dataTdElemCardsAmount.innerHTML = data.cardsAmount; // cards played
                dataTdElemMode.innerHTML = data.mode; // mode played

                for (var child of [dataTdElemName, dataTdElemScore, dataTdElemTries, dataTdElemCardsAmount, dataTdElemMode]) {
                    dataTrElem.appendChild(child);
                }

                leaderboardBox.appendChild(dataTrElem);
            }
        }

        leaderboardHolder.appendChild(leaderboardBoxTitle);
        leaderboardHolder.appendChild(leaderboardBox);
        document.body.appendChild(leaderboardHolder);
    })();
})();
