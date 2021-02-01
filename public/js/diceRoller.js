var game = {

  // pas obligatoire
  nbDices: null,

  // propriétés
  victory: 0,
  defeat: 0,

  // pour éviter de lancer plusieurs parties simulatannées
  ingame: false,


  // méthodes
  init: function() {
    var playBtn = document.getElementById('play');

    // on peut associer une fonction anonyme à un événement
    // playBtn.addEventListener('click', function() {
    //   document.getElementById('welcome').classList.add('hidden');
    //   document.getElementById('app').classList.remove('hidden');
    // });

    // on peut également associer une fonction nommée, ça permettra de la réutiliser
    // on associe une définition de fonction à un événement
    // attention on ne souhaite pas executer la fonction tout de suite
    playBtn.addEventListener('click', game.start);

    // on peut également écouter des événements du clavier
    // on peut également écouteur des évenements sur tout le document
    // on peut récupérer un paramètre ici nommé event (parfois evt, e, toto...)
    // le paramètre récuperé représente l'événement déclenché et contient des infos utiles
    // on préférera keyup à keypress ici -> relaché qu'une fois
    document.addEventListener('keyup', function(event) {
      // console.log(event);
      // si la touche relachée est l'espace on lance la partie en executant play
      if (event.code === 'Space') {
        game.start();
      }
    });

    // on peut stocker l'élement en propriété puisqu'on veut s'en servir ailleurs
    // la propriété n'a pas besoin d'avoir été déclarée auparavant
    game.boards = document.querySelectorAll('.board');

    game.diceNumberInput = document.getElementById('dice-number-input');
    // change => quand on relache le curseur
    // input => pendant qu'on glisse le curseur
    game.diceNumberInput.addEventListener('input', game.changeNumber);

    var gameForm = document.getElementById('game-form');
    // on souhaite bien ajouter nos écouteurs tout de suite
    // la fonction "s'activera"/sera executés uniquement quand l'événement sera déclenché à partir de là
    gameForm.addEventListener('submit', game.play);
    
    // on peut executer une première fois la fonction pour récuperer la valeur initiale
    game.changeNumber();
  },

  // méthode pour change le div affiché
  start: function() {
    // on masque la page d'intro en lui ajoutant une classe avec le style display none
    document.getElementById('welcome').classList.add('hidden');
    // on affiche le jeu en lui retirant cette classe
    document.getElementById('app').classList.remove('hidden');
  },

  changeNumber: function() {
    var diceNumberElement = document.getElementById('dice-number');
    // on fait référence aux propriétés de l'objet
    game.nbDices = game.diceNumberInput.value;
    diceNumberElement.textContent = game.nbDices;
  },

  play: function(event) {
    // on empeche la soumission du formulaire
    event.preventDefault();

    // on peut montrer pour faire référence à l'élement qui a déclenché l'event
    // console.log(event.target);

    // si on est pas déjà en cours de partie
    if(!game.ingame) {
      // dorénavant on y est
      game.ingame = true;

      // on vide l'interface
      game.reset();

      // on crée les dés pour le joueur et on récupère son score
      // on le stocke en propriété l'objet game on en aura besoin plus tard
      game.playerScore = game.createAllDices('player');

      // on déclenchera le lancer du dealer dans 3 secondes
      setTimeout(game.dealerPlay, 3000);

      // on crée le compteur
      game.createCounter();
    }
  },

  // méthode pour supprimer les dés et réinitialiser les scores
  reset: function() {
    // on parcours chaque board
    for (var boardIndex = 0; boardIndex < game.boards.length; boardIndex++) {
      // on cible le board et on le vide
      game.boards[boardIndex].innerHTML = '';
    }
  },

  // méthode retournant un nombre aléatoire dans une plage donnée
  getRandom: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  // méthode pour le lancer le bon nombre dés et retourner le score total
  createAllDices: function(player) {
    // on initialise le score
    var score = 0;
    // on crée le nombre voulu de dé
    for (var nbDice = 0; nbDice < Number(game.nbDices); nbDice++) {
      // on crée un dé et on récupère sa valeur
      var diceScore = game.createDice(player);
      // on ajoute la valeur au score
      score += diceScore;
    }
    // on retourne le score
    return score;
  },

  // on récupère l'index du joueur en paramètre pour incrémenter son score
  createDice: function(player) {
    // on crée un div
    var dice = document.createElement('div');
    // on récupère un nombre aléatoire
    var diceValue = game.getRandom(1, 6);
    // on définit le décalage à appliquer sur l'image
    var imageOffset = (diceValue - 1) * 100;
    // on ajoute une classe
    dice.className = 'dice';
    // on n'écrit rien dans le div
    dice.textContent = '';
    // on change le style de la position de l'arrière plan
    dice.style.backgroundPosition = '-'+ imageOffset + 'px 0';
    // on ajoute le div créé dans le board du joueur en fonction de son id
    document.getElementById(player).appendChild(dice);
    // on retourne la valeur du dé
    return diceValue;
  },

  // méthode pour le lancer de l'adversaire
  dealerPlay: function() {
    // on crée les dés pour l'adversaire et on recupère son score
    var dealerScore = game.createAllDices('dealer');

    // si le score de l'adversaire est plus élevé on a perdu
    if(dealerScore > game.playerScore) {
      game.defeat++;
    }
    // si notre score est plus élevé on a gagné
    else if(dealerScore < game.playerScore) {
      game.victory++;
    }
    // en cas de match nul on ne change rien

    // on met à jour l'interface avec les résultats
    game.displayResult('player', game.victory);
    game.displayResult('dealer', game.defeat);

    // la partie est finie on peut ensuite en lancer une autre
    game.ingame = false;
  },

  // méthode pour ajouter un div avec le nombre de victoires pour chaque joueur
  displayResult: function(board, counter) {
    // on crée un div
    var result = document.createElement('div');
    // on lui met une classe
    result.className = 'result';
    // on écrit le nombre de victoire du joueur récuperé en paramètre
    result.textContent = counter;
    // on ajoute le div créé dans le board qui a l'id passé en paramètre
    document.getElementById(board).appendChild(result);
  },

  // méthode pour initialiser le compteur
  createCounter: function() {
    // on itinitialise un compteur
    game.counter = 3;

    // on crée et on ajoute un élément au DOM
    game.counterElement = document.createElement('div');
    game.counterElement.textContent = game.counter;
    game.counterElement.className = 'counter';
    document.getElementById('app').appendChild(game.counterElement);

    // on stocke la référence à l'interval pour pouvoir l'annuler plus tard
    // à chaque seconde on veux mettre à jour l'interval
    game.counterInterval = setInterval(game.countdown, 1000);
  },

  // méthode pour décrémenter le compteur
  countdown: function() {
    // on décrémente le compteur
    game.counter--;

    // on met à jour l'élement dans le DOM
    game.counterElement.textContent = game.counter;

    // si on arrive à 0
    if (game.counter === 0) {
      game.deleteCounter();
    }
  },

  // méthode pour stopper et supprimer le compteur du DOM
  deleteCounter: function() {
    // on stoppe l'interval
    clearInterval(game.counterInterval);

    // on supprime le compteur du DOM
    // on doit cibler le parent de l'élement et lui supprimer l'enfant qui nous interesse
    game.counterElement.remove();
  },
};

// game.init();
// on execute init seulement quand on est sûr que le document est prêt
document.addEventListener('DOMContentLoaded', game.init);
