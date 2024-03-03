export const quests = [
    {
        id: 1,
        description: "Find 10 card pairs in a single game.",
        reward: 10,
        completed: false,
    },
    {
        id: 2,
        description: "Win 3 games in a row.",
        reward: 20,
        completed: false,
    },
];
(() => {
    // Display quests
    const questsContainer = document.querySelector('.quests');
    quests.forEach((quest) => {
        const questElement = document.createElement('div');
        questElement.classList.add('quest');
        questElement.innerHTML = `
    <span class="quest-description">${quest.description}</span>
    <div class="quest-progress">
      <div class="quest-progress-bar" style="width: 0%;"></div>
    </div>
  `;
        questsContainer.appendChild(questElement);

        questElement.addEventListener('click', () => {
            if (!quest.completed) {
                // Start quest completion progress animation
                const progressBar = questElement.querySelector('.quest-progress-bar');
                progressBar.style.width = '100%';

                // Award XP and mark quest as completed
                player.xp += quest.reward;
                quest.completed = true;

                // Update UI elements
                updatePlayerProgress();
            }
        });
    });

    const player = {
        username: localStorage.getItem('playerName') ? localStorage.getItem('playerName') : 'Player',
        xp: 0,
    };

    // Update player progress UI
    function updatePlayerProgress() {
        document.querySelector('#total-xp').textContent = player.xp;
    }
})();