// ---------------------------------------------------------------------------------------------------
// ΕΠΙΚΟΙΝΩΝΙΑ ΜΕ ΤΟΝ SERVER
// ---------------------------------------------------------------------------------------------------
import { SERVER_ADDRESS } from "../modules/SERVER.js";
// ---------------------------------------------------------------------------------------------------

(async () => {
    let FETCHED_DATA;

    await fetch('http://localhost:3000')
        .then(response => response.text())
        .then(text => FETCHED_DATA = JSON.parse(text)); // ο σερβερ επιστρέφει string

    let leaderboardHolder = document.createElement('div');
    leaderboardHolder.style.width = '100%';
    leaderboardHolder.style.height = 'auto'; // fix;
    leaderboardHolder.style.backgroundColor = 'black';
    leaderboardHolder.style.textAlign = 'center';
    leaderboardHolder.style.alignItems = 'center';
    leaderboardHolder.style.justifyContent = 'center';

    let leaderboardBoxTitle = document.createElement('h1');
    leaderboardBoxTitle.appendChild(document.createTextNode('TODAY\'S GAMES'));
    leaderboardBoxTitle.style.textAlign = 'center';

    let leaderboardBox = document.createElement('table');
    leaderboardBox.id = 'leaderboard';

    if (FETCHED_DATA.length == 0) {
        leaderboardBox.appendChild(document.createTextNode('No games were played today.'));
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

        tableTopThElemName.innerHTML = 'Name'; // name
        tableTopThElemScore.innerHTML = 'Score'; // score
        tableTopThElemTries.innerHTML = 'Tries'; // tries
        tableTopThElemCardsAmount.innerHTML = 'Cards Played'; // cards played
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