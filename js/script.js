document.addEventListener('DOMContentLoaded', () => {

    const cardsList = [
        {
            name: "cat",
            icon: "fa-solid fa-cat"
        },
        {
            name: "cat",
            icon: "fa-solid fa-cat"
        },
        {
            name: "dog",
            icon: "fa-solid fa-dog"
        },
        {
            name: "dog",
            icon: "fa-solid fa-dog"
        },
        {
            name: "crow",
            icon: "fa-solid fa-crow"
        },
        {
            name: "crow",
            icon: "fa-solid fa-crow"
        },
        {
            name: "fish",
            icon: "fa-solid fa-fish-fins"
        },
        {
            name: "fish",
            icon: "fa-solid fa-fish-fins"
        },
        {
            name: "frog",
            icon: "fa-solid fa-frog"
        },
        {
            name: "frog",
            icon: "fa-solid fa-frog"
        },
        {
            name: "cow",
            icon: "fa-solid fa-cow"
        },
        {
            name: "cow",
            icon: "fa-solid fa-cow"
        },
        {
            name: "shrimp",
            icon: "fa-solid fa-shrimp"
        },
        {
            name: "shrimp",
            icon: "fa-solid fa-shrimp"
        },
        {
            name: "horse",
            icon: "fa-solid fa-horse"
        },
        {
            name: "horse",
            icon: "fa-solid fa-horse"
        },
        {
            name: "spider",
            icon: "fa-solid fa-spider"
        },
        {
            name: "spider",
            icon: "fa-solid fa-spider"
        },
        {
            name: "worm",
            icon: "fa-solid fa-worm"
        },
        {
            name: "worm",
            icon: "fa-solid fa-worm"
        },
        {
            name: "locust",
            icon: "fa-solid fa-locust"
        },
        {
            name: "locust",
            icon: "fa-solid fa-locust"
        },
        {
            name: "dragon",
            icon: "fa-solid fa-dragon"
        },
        {
            name: "dragon",
            icon: "fa-solid fa-dragon"
        },
        {
            name: "otter",
            icon: "fa-solid fa-otter"
        },
        {
            name: "otter",
            icon: "fa-solid fa-otter"
        },
        {
            name: "hippo",
            icon: "fa-solid fa-hippo"
        },
        {
            name: "hippo",
            icon: "fa-solid fa-hippo"
        },
        {
            name: "mosquito",
            icon: "fa-solid fa-mosquito"
        },
        {
            name: "mosquito",
            icon: "fa-solid fa-mosquito"
        },
    ];

    cardsList.sort( () => 0.5 - Math.random() );

    const grid = document.getElementById('cardGrid');
    const attCounter = document.querySelector('.attemptCounter');
    const ptCounter = document.querySelector('.pointCounter');
    const cardsInGame = 30;

    let attempts = 0;
    let points = 0;

    attCounter.textContent = attempts;
    ptCounter.textContent = points;

    let chosenCards = [];
    let chosenCardIds = [];

    function createBoard() {
        for (let i = 0; i < cardsList.length; i++) {
            let card = document.createElement('i');
            card.setAttribute('class', 'fa-solid fa-question');
            card.setAttribute('card-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
            
        } 
    }

    function flipCard() {

        // Controllo per impedire di cliccare durante il check delle carte
        if (chosenCards.length != 2) {
            
            // effetto sonoro del click della carta
            let sound = new Audio("audio/selected.mp3");
            sound.play();

            let cardId = this.getAttribute('card-id');
            if (this.getAttribute('') != 'fa-solid fa-check') {
                // il nome della carta cliccata viene mandato in un'array pronto appositamente per confrontare se 2 carte al suo interno sono uguali
                chosenCards.push(cardsList[cardId].name);
                // idem per il suo id
                chosenCardIds.push(cardId);
                // alla carta viene dato il suo valore cosi da mostrare il contenuto
                this.setAttribute('class', cardsList[cardId].icon);

                // la classe selected impedisce all'utente di cliccare nuovamente la carta già selezionata
                this.classList.add('selected');

                // nel momento in cui 2 elementi sono nell'array di controllo inizia la verifica dell'ugualianza
                if (chosenCards.length == 2) {
                    setTimeout(checkForMatch, 400);
                }
            } 
        }
    };

    function checkForMatch() {
        // segno il tentativo appena eseguito
        attempts++;
        
        let cards = document.querySelectorAll('i');
        // assegno a delle variabili le 2 carte nell'array di controllo
        let firstCard = chosenCardIds[0];
        let secondCard = chosenCardIds[1];
        // controllo se ci sia o meno una corrispondenza tra le carte...
        if (chosenCards[0] == chosenCards[1]) {
            // nel caso ci fosse: incremento il punteggio e assegno alle carte indovinate l'attributo per mostrare che sono giuste
            points++;

            // effetto sonoro del match delle carte
            let sound = new Audio("audio/guessed.mp3");
            sound.play();

            cards[firstCard].setAttribute('class', 'fa-solid fa-check');
            // la classe guessed impedisce all'utente di cliccare nuovamente le carte già indovinate
            cards[firstCard].classList.add('guessed');
            cards[secondCard].setAttribute('class', 'fa-solid fa-check');
            cards[secondCard].classList.add('guessed');
        } else {
            // nel caso NON ci fosse: non incremento il punteggio e assegno alle carte indovinate l'attributo per mostrare che sono ancora da indovinare
            cards[firstCard].setAttribute('class', 'fa-solid fa-question');
            cards[secondCard].setAttribute('class', 'fa-solid fa-question');
        };

        chosenCards = [];
        chosenCardIds = [];

        // aggiornamento dei counter
        attCounter.textContent = attempts;
        ptCounter.textContent = points;

        // condizione di vittoria
        if (points == cardsInGame / 2) {
            // effetto sonoro di vittoria
            let sound = new Audio("audio/victory.mp3");
            sound.play();
            let victory = document.getElementById("victory").classList.remove("hidden");
        }
    };

    createBoard();
});