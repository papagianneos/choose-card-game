/* CSS */


/* ------------------------------------ */
/* BUG FIX: για τις γραμματοσειρές */
/* που δεν υπάρχουν στα κινητά τηλέφωνα */
/* ------------------------------------ */
@font-face {
    font-family: αρχαίο;
    src: url(fonts/αρχαίο.ttf);
}

@font-face {
    font-family: φανταστικό;
    src: url(fonts/φανταστικό.ttf);
}

@font-face {
    font-family: cartoon;
    src: url(fonts/cartoon.ttf);
}

@font-face {
    font-family: παράξενο;
    src: url(fonts/παράξενο.ttf);
}

@font-face {
    font-family: halloween;
    src: url(fonts/halloween.ttf);
}

/* ------------------------------------ */

html {
    width: 100%;
    height: 100%;
}

@keyframes grow {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.5);
    }

    100% {
        transform: scale(1);
    }
}

.warningTries {
    animation: grow 1s linear;
}

body {
    background-image: url(./img/game_bg.png);
    background-color: black;
    background-size: cover;
    color: white;
    font: bold 5vh Montserrat, sans-serif;
}

@-webkit-keyframes displace {
    from {
        background-position: left center;
    }

    to {
        background-position: 200% center;
    }
}

@keyframes displace {
    from {
        background-position: left center;
    }

    to {
        background-position: 200% center;
    }
}

#cardsHolder,
.mainBox {
    width: 100%;
    height: 100%;
    background-color: transparent;
    text-align: center;
    align-items: center;
    justify-content: center;
    /*border: 2.5px double darkgreen;
 border-radius: 2.5px;*/
}

.hidden {
    visibility: hidden;
}

.card,
.mazeWall,
.howToPlayInfoCard {
    transition: .25s;
    display: inline-flex;
    width: 150px;
    height: 150px;
    color: white;
    margin: 10px;
    cursor: pointer;
    text-align: center;
    align-items: center;
    justify-content: center;
    border-radius: 2.5px;
    text-shadow: rgba(0, 0, 0, .5) 2px 2px;
    font-size: 60px;
    vertical-align: top;
    transform: none;
}

.mazeWall {
    visibility: hidden;
    cursor: default;
}

.sigmaEffectEnabled {
    animation: rainbowSigmaCard 2.5s linear infinite;
}

.openedHideAndSeek {
    transform: rotateY(360deg);
    pointer-events: none;
    box-shadow: none;
}

.hideAndSeekHint {
    box-shadow: cyan 0px 0px 60px;
}

.opened {
    transform: rotateZ(0deg) rotateY(360deg);
}

.howToPlayInfoCard:hover+.hidden,
.gameModeBoxForHowToPlay:hover+.hidden {
    visibility: visible;
}

h1 {
    font-size: 76px;
}

h1,
img,
.card,
.howToPlayInfoCard,
button {
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

#screen {
    z-index: 999;
    width: 100%;
    height: 100%;
    text-align: center;
    align-items: center;
    background: transparent;
    color: white;
}

button {
    filter: none;
    opacity: 1;
    cursor: pointer;
    border: none;
    border-radius: 2.5px;
    color: white;
    font-size: 60px;
    margin: 5px;
    width: 300px;
    height: auto;
    background-color: green;
}

button:hover {
    filter: brightness(125%);
}

@keyframes seismos {
    0% {
        transform: translate(1px, 1px) rotate(0deg);
    }

    10% {
        transform: translate(-1px, -2px) rotate(-1deg);
    }

    20% {
        transform: translate(-3px, 0px) rotate(1deg);
    }

    30% {
        transform: translate(3px, 2px) rotate(0deg);
    }

    40% {
        transform: translate(1px, -1px) rotate(1deg);
    }

    50% {
        transform: translate(-1px, 2px) rotate(-1deg);
    }

    60% {
        transform: translate(-3px, 1px) rotate(0deg);
    }

    70% {
        transform: translate(3px, 1px) rotate(-1deg);
    }

    80% {
        transform: translate(-1px, -1px) rotate(1deg);
    }

    90% {
        transform: translate(1px, 2px) rotate(0deg);
    }

    100% {
        transform: translate(1px, -2px) rotate(-1deg);
    }
}

@keyframes testAnimation {
    0% {
        transform: rotateY(0deg);
    }

    100% {
        transform: rotateY(45deg);
    }
}

.modalBox {
    transition: .5s;
    position: fixed;
    top: 50%;
    padding: 20px;
    left: 50%;
    transform: translate(-50%, -50%);
    background: black;
    border-radius: 2.5px;
    align-items: center;
    text-align: center;
    width: 100%;
    height: auto;
}

.achievement {
    width: 25%;
    height: 126px;
    margin: 5px;
    display: inline-block;
    text-align: center;
    align-items: center;
    justify-content: center;
    background: grey;
    border-radius: 5px;
    vertical-align: middle;
    box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
}

.achievementsHolder {
    width: 100%;
    height: 600px;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow-y: scroll;
}

.achievementUnlockedNotification,
.skinUnlockedNotification {
    transition: 1s;
    position: fixed;
    top: 50%;
    z-index: 9;
    pointer-events: none;
    left: -2500px;
    transform: translate(-50%, -50%);
    color: white;
    background: rgba(0, 0, 0, .5);
    width: 50%;
    border-radius: 2.9px;
    height: auto;
    display: block;
    text-align: center;
    align-items: center;
    border: 2px solid black;
}

.achievementUnlockedNotification h3,
.achievementUnlockedNotification h4,
.achievementUnlockedNotification h1,
.skinUnlockedNotification h3,
.skinUnlockedNotification h4,
.skinUnlockedNotification h1 {
    color: white;
    font-style: normal;
}

.achievementUnlockedNotification .tempDiv,
.skinUnlockedNotification .tempDiv {
    width: 100%;
    text-align: center;
    color: white;
    border-bottom: 2px solid black;
}

.dead {
    filter: grayscale(1);
}

progress {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 325px;
    height: 30px;
    margin: 0 auto;
    border-radius: 2.5px;
    transform: skew(30deg);
    display: none;
}

.frozen {
    filter: contrast(1000%);
}

@keyframes rainbowSigmaCard {

    100%,
    0% {
        background: rgb(255, 0, 0);
    }

    8% {
        background: rgb(255, 127, 0);
    }

    16% {
        background: rgb(255, 255, 0);
    }

    25% {
        background: rgb(127, 255, 0);
    }

    33% {
        background: rgb(0, 255, 0);
    }

    41% {
        background: rgb(0, 255, 127);
    }

    50% {
        background: rgb(0, 255, 255);
    }

    58% {
        background: rgb(0, 127, 255);
    }

    66% {
        background: rgb(0, 0, 255);
    }

    75% {
        background: rgb(127, 0, 255);
    }

    83% {
        background: rgb(255, 0, 255);
    }

    91% {
        background: rgb(255, 0, 127);
    }
}

input,
select {
    background: white;
}

input[type=checkbox] {
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.featuredYoutuber {
    transition: .5s;
    background-color: white;
    color: black;
    width: auto;
    border-radius: 5px;
    cursor: pointer;
    display: inline-block;
    padding-inline: 15px;
    padding-block: 2px;
    box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
}

.featuredYoutuber:hover {
    background-color: #ba4e4e;
    color: white;
}

.featuredYoutuberStat {
    vertical-align: middle;
    margin: 5px;
    display: inline;
    font-size: 15px;
}

.warntip {
    position: relative;
    bottom: 1px;
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    text-align: center;
    background: #e90;
    font: bold 10px/15px Montserrat, sans-serif;
    color: #fff;
    margin: 0 4px;
}

.warntip::before {
    content: '!';
}

.warntip span {
    position: absolute;
    width: 160px;
    background: #e90;
    color: #fff;
    font: bold 11px Montserrat, sans-serif;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    z-index: 1;
    margin-left: -80px;
    left: 50%;
    transition: opacity 200ms, bottom 200ms;
    pointer-events: none;
    opacity: 0;
    bottom: 200%;
}

.warntip span::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #e90 transparent transparent transparent;
}

.warntip:hover span {
    pointer-events: unset;
    opacity: 1;
    bottom: 150%;
}

#snow {
    visibility: hidden;
}

.snowflake {
    position: absolute;
    width: 10px;
    height: 10px;
    background: linear-gradient(white, white);
    border-radius: 50%;
    filter: drop-shadow(0 0 10px white);
}

@keyframes gradient {
    0% {
        background-position: 0% 100%;
    }

    25% {
        background-position: 100% 30%;
    }

    50% {
        background-position: 100% 55%;
    }

    75% {
        background-position: 100% 75%;
    }

    87% {
        background-position: 100% 80%;
    }

    100% {
        background-position: 0% 100%;
    }
}

/*.achievementsBox {
    display: none;
    width: 100%;
    height: 85%;
    overflow: scroll;
    justify-content: center;
    align-items: center;
    background: transparent;
}

.achievement {
    display: block;
    color: white;
    width: 98%;
    height: auto;
    border-radius: 4px;
    text-align: center;
    border: none;
    background-color: black;
}

.achievement p,
.achievement h3 {
    display: block;
    color: white;
}

.locked {
    background-color: grey;
    opacity: .5;
}*/

.skin {
    transition: 0.5s;
    width: 25%;
    display: inline-flex;
    height: 250px;
    margin: 5px;
    cursor: pointer;
    text-align: center;
    justify-content: center;
    align-items: center;
}

.equipped {
    pointer-events: none;
    background-color: green;
}

.locked {
    pointer-events: none;
    cursor: not-allowed;
    background-color: green;
    opacity: .35;
}

lockedtxt {
    color: red;
}

.skin:hover {
    opacity: .5;
}

.skin span {
    user-select: none;
    transform: rotate(15deg);
}

.confetti-container {
    user-select: none;
    z-index: 10;
    visibility: hidden;
}

.confetti {
    position: fixed;
    left: 0;
    right: 0;
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    visibility: hidden;
}

.confetti .square {
    width: 1rem;
    height: 1rem;
    background-color: var(--bg);
    transform: rotate(-140deg);
}

.confetti .rectangle {
    width: 1rem;
    height: 0.5rem;
    background-color: var(--bg);
}

.confetti .hexagram {
    width: 0;
    height: 0;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    border-bottom: 1rem solid var(--bg);
    position: relative;
}

.confetti .hexagram:after {
    content: "";
    width: 0;
    height: 0;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    border-top: 1rem solid var(--bg);
    position: absolute;
    top: 0.33rem;
    left: -0.5rem;
}

.confetti .pentagram {
    width: 0rem;
    height: 0rem;
    display: block;
    margin: 0.5rem 0;
    border-right: 1rem solid transparent;
    border-bottom: 0.7rem solid var(--bg);
    border-left: 1rem solid transparent;
    transform: rotate(35deg);
    position: relative;
}

.confetti .pentagram:before {
    content: "";
    width: 0;
    height: 0;
    display: block;
    border-bottom: 0.8rem solid var(--bg);
    border-left: 0.3rem solid transparent;
    border-right: 0.3rem solid transparent;
    transform: rotate(-35deg);
    position: absolute;
    top: -0.45rem;
    left: -0.65rem;
}

.confetti .pentagram:after {
    content: "";
    width: 0rem;
    height: 0rem;
    display: block;
    border-right: 1rem solid transparent;
    border-bottom: 0.7rem solid var(--bg);
    border-left: 1rem solid transparent;
    transform: rotate(-70deg);
    position: absolute;
    top: 0.03rem;
    left: -1.05rem;
}

.confetti .dodecagram {
    background: var(--bg);
    width: 0.8rem;
    height: 0.8rem;
    position: relative;
}

.confetti .dodecagram:before {
    content: "";
    height: 0.8rem;
    width: 0.8rem;
    background: var(--bg);
    transform: rotate(30deg);
    position: absolute;
    top: 0;
    left: 0;
}

.confetti .dodecagram:after {
    content: "";
    height: 0.8rem;
    width: 0.8rem;
    background: var(--bg);
    transform: rotate(60deg);
    position: absolute;
    top: 0;
    left: 0;
}

.confetti .wavy-line {
    position: relative;
}

.confetti .wavy-line::after,
.confetti .wavy-line::before {
    content: "";
    height: 1rem;
    width: 8rem;
    background-size: 2rem 1rem;
    position: absolute;
    left: -9rem;
    transform: rotate(90deg);
}

.confetti .wavy-line::before {
    background-image: linear-gradient(45deg,
            transparent,
            transparent 50%,
            var(--bg) 50%,
            transparent 60%);
    top: 1rem;
}

.confetti .wavy-line::after {
    background-image: linear-gradient(-45deg,
            transparent,
            transparent 50%,
            var(--bg) 50%,
            transparent 60%);
}

.confetti i {
    width: 3rem;
    height: 3rem;
    margin: 0 0.2rem;
    animation-name: confetti;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-duration: calc(70s / var(--speed));
}

.confetti i:nth-child(even) {
    transform: rotate(90deg);
}

@keyframes confetti {
    0% {
        transform: translateY(-100vh);
    }

    100% {
        transform: translateY(100vh);
    }
}

@keyframes moveLeftAndRight {
    0% {
        position: absolute;
        left: 0;
    }

    50% {
        position: absolute;
        left: calc(100% - 100px);
    }

    100% {
        position: absolute;
        left: 0;
    }
}

#leaderboard {
    width: 100%;
    height: auto;
    background: black;
    text-align: center;
    align-items: center;
    justify-content: center;
    vertical-align: top;
}

.leaderboardRow {
    width: 100%;
    height: auto;
    margin: 5px;
    background-color: #c7c7c7;
    color: black;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

table,
th,
td {
    border: 1px solid;
}

#playerNameInput {
    text-align: center;
    font-size: 25px;
}

.loader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    background: transparent;
    background-image: radial-gradient(rgb(173, 255, 241), rgb(38, 81, 117));
    border-radius: 5.5%;
    text-align: center;
    align-items: center;
    display: flex;
    font-size: 70px;
    justify-content: center;
    animation: loader 2s linear infinite;
}

.loader h3 {
    position: absolute;
    font-size: 20px;
    top: 150px;
}

@keyframes loader {
    25% {
        color: #05ffe6;
        transform: scale(1) translate(-50%, -50%);
    }

    50% {
        color: #1cd4c1;
    }

    75% {
        color: #1f8278;
        transform: scale(1.5) translate(-30%, -50%);
    }

    /*to {
        transform: translate(-50%, -50%) rotate(360deg);
    }*/
}

/* SAVED*/
/* BTN
#btnthing {
    -webkit-animation-name: cobaltPulse;
    border-bottom: 2px solid #1d252e;
    box-shadow: inset 0 -2px #1d252e;
    background: #2e3742;
}
@keyframes cobaltPulse {
    from {
      background-color: #2e3742;
      -webkit-box-shadow: 0 0 9px #2e3742;
    }
    50% {
      background-color: #4d5a68;
      -webkit-box-shadow: 0 0 18px #4d5a68;
    }
    to {
      background-color: #2e3742;
      -webkit-box-shadow: 0 0 9px #2e3742;
    }
  }
*/

.progress {
    background-color: grey;
    margin-top: 10px;
    height: 10px;
    width: 150px;
    border-radius: 2px;
}

.word-making-mode {
    /* Add your desired styling here */
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

.letter-cards {
    /* Add your desired styling here */
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 10px;
}

.letter-card {
    /* Add your desired styling here */
    width: 30px;
    height: 30px;
    font-size: 18px;
    margin: 5px;
    cursor: pointer;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
}

#wordInput {
    /* Add your desired styling here */
    width: 200px;
    margin-bottom: 10px;
}

#submitButton {
    /* Add your desired styling here */
    padding: 5px 10px;
    margin-bottom: 10px;
    cursor: pointer;
}

#feedback {
    /* Add your desired styling here */
    color: red;
}
