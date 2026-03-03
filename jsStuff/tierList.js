const HEROES = [
    'black-panther', 'black-widow', 'captain-america',
    'cloak-and-dagger', 'doctor-strange', 'groot', 'hawkeye',
    'hela', 'hulk', 'iron-fist', 'iron-man', 'jeff',
    'loki', 'luna-snow', 'magik', 'magneto', 'mantis',
    'mister-fantastic', 'moon-knight', 'namor', 'peni-parker',
    'psylocke', 'punisher', 'rocket', 'scarlet-witch',
    'spider-man', 'squirrel-girl', 'star-lord', 'storm',
    'thor', 'venom', 'winter-soldier', 'wolverine'
];

const SAVE_KEY = 'tierlist-save';

let draggedCard = null;

function createCard(hero) {
    const card = document.createElement('div');
    card.classList.add('tier-card');
    card.setAttribute('draggable', true);
    card.dataset.hero = hero;

    const img = document.createElement('img');
    img.src = `pics/heros/${hero}.png`;
    img.alt = hero;
    img.draggable = false;

    const label = document.createElement('span');
    label.textContent = hero.replace(/-/g, ' ');

    card.appendChild(img);
    card.appendChild(label);

    card.addEventListener('dragstart', (e) => {
        draggedCard = card;
        setTimeout(() => card.classList.add('dragging'), 0);
    });

    card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
        draggedCard = null;
        saveTierList();
    });

    return card;
}

function setupDropZones() {
    document.querySelectorAll('.tier-slots').forEach(slot => {
        slot.addEventListener('dragover', (e) => {
            e.preventDefault();
            slot.classList.add('drag-over');
        });

        slot.addEventListener('dragleave', () => {
            slot.classList.remove('drag-over');
        });

        slot.addEventListener('drop', (e) => {
            e.preventDefault();
            slot.classList.remove('drag-over');
            if (draggedCard) {
                slot.appendChild(draggedCard);
                saveTierList();
            }
        });
    });
}

function saveTierList() {
    const save = {};
    document.querySelectorAll('.tier-slots').forEach(slot => {
        const tier = slot.dataset.tier;
        save[tier] = [...slot.querySelectorAll('.tier-card')].map(c => c.dataset.hero);
    });
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
}

function loadTierList() {
    const saved = localStorage.getItem(SAVE_KEY);
    const unranked = document.querySelector('.tier-slots[data-tier="unranked"]');

    if (saved) {
        const data = JSON.parse(saved);
        Object.entries(data).forEach(([tier, heroes]) => {
            const slot = document.querySelector(`.tier-slots[data-tier="${tier}"]`);
            if (slot) {
                heroes.forEach(hero => slot.appendChild(createCard(hero)));
            }
        });
        // put any missing heroes in unranked
        const placed = Object.values(data).flat();
        HEROES.forEach(hero => {
            if (!placed.includes(hero)) unranked.appendChild(createCard(hero));
        });
    } else {
        HEROES.forEach(hero => unranked.appendChild(createCard(hero)));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadTierList();
    setupDropZones();
});

function resetTierList() {
    localStorage.removeItem(SAVE_KEY);
    document.querySelectorAll('.tier-slots').forEach(slot => slot.innerHTML = '');
    const unranked = document.querySelector('.tier-slots[data-tier="unranked"]');
    HEROES.forEach(hero => unranked.appendChild(createCard(hero)));
}