/**
 * 
 * Code fourni
 */
const app = {
    // just a utility var to remember all the colors
    colors: ['red','green','blue','yellow'],
  
    // this var will contain the sequence said by Simon
    sequence: [],
  
    drawCells: function () {
      const playground = document.getElementById('playground');
      for (const color of app.colors) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = color;
        cell.style.backgroundColor = color;
        playground.appendChild(cell);
      }
    },
  
    bumpCell: function (color) {
      // let's modify the syle directly
      document.getElementById(color).style.borderWidth = '45px';
      // and reset the same style, after a small pause (150 ms)
      setTimeout( () => {
        document.getElementById(color).style.borderWidth = '0';
      }, 150);
  
    },
  
    newGame: function () {
      // start by reseting the sequence 
      app.sequence = [];
      app.indiceJoueur = 0;
      // make it 3 times :
      for (let index = 0; index < 3; index++) {
        // get a random number between 0 and 3
        let random = Math.floor(Math.random()*4);
        // add the corresponding color to the sequence
        app.sequence.push( app.colors[random] );
      }
  
      // start the "Simon Says" sequence
      app.simonSays(app.sequence);
    },
  
    simonSays: function (sequence) {
      // on stop le timeout tant que Simon parle!
      app.stopTimeout();
  
      if (sequence && sequence.length) {
        app.showMessage('Mémorisez la séquence !');
        // after 500ms, bump the first cell
        setTimeout( app.bumpCell, 500, sequence[0] );
        // plays the rest of the sequence after a longer pause
        setTimeout( app.simonSays, 850, sequence.slice(1));
      } else {
        // toute la séquence a été jouée : on dis au joueur de jouer
        app.showMessage('Reproduisez la séquence !');
        // et on lance le timeout !
        app.startTimeout();
      }
    },
  
    init: function () {
      console.log('init');
      app.drawCells();
  
      // listen click on the "go" button
      document.getElementById('go').addEventListener('click', app.newGame );
      app.listenClickEvents();
    },
  
    /** Fin du code fourni. Après, c'est à toi de jouer! */
  
    /** Etape 2 */
    showMessage: function (message) {
      let messageZone = document.getElementById('message');
      messageZone.style.display = 'block';
      messageZone.innerHTML = message;
      // on cache le bouton en mettant sa propriété CSS "display" à none.
      document.getElementById('go').style.display = 'none';
    },
  
    hideMessage: function () {
      // on cache la zone de message.
      document.getElementById('message').style.display = 'none';
      // on ré-affiche le bouton.
      document.getElementById('go').style.display = 'block';
    },
  
    /** Etape 3 */
    gameOver: function () {
      alert('Partie terminée. Votre score : '+app.sequence.length);
      app.hideMessage();
      // au passage, on vide la séquence 
      app.sequence = [];
      // et on arrete le timeout si besoin
      app.stopTimeout();
    },
  
    /** Etape 4 */
    // une variable pour savoir ou se situe le joueur dans la séquence 
    // on remet cette variable à zéro dans "newGame"
    indiceJoueur: 0,
  
    // on va attacher des event listeners sur chaque case. Cette méthode sera appelée par app.init.
    // on a donc modifié app.init à cette étape
    listenClickEvents: function () {
      let cells = document.getElementsByClassName('cell');
      for (const cell of cells) {
        cell.addEventListener('click', app.handleClickEvent);
      }
    },
  
    // la fonction qui sera déclenchée par les click sur les cases
    handleClickEvent: function (event) {
      // la cellule cliquée est dans event.target
      // et l'id de la cellule contient directement sa couleur ! malin !
      console.log(event.target.id);
      let couleur = event.target.id;
  
      // test au cas ou : si app.sequence est vide, c'est que la partie n'est pas commencée. Dans ce cas, on ne fait rien
      if (!app.sequence.length) { 
        return;
      }
  
      // on reset le timeout
      app.resetTimeout();
  
      // on applique l'effet visuel
      app.bumpCell(couleur);
  
      if (couleur == app.sequence[app.indiceJoueur] ) { // le joueur a cliqué la bonne couleur
  
        if (app.indiceJoueur == app.sequence.length-1) { // ... et la séquence est finie
          app.nextMove();
        } else {
          // sinon (la séquence n'est pas finie) : on incrémente l'indice
          app.indiceJoueur ++;
        }
      } else {
        // le joueur n'a pas cliqué sur la bonne couleur !
        app.gameOver();
      }
    },
  
    /** Etape 5 */
    nextMove: function () {
      // tirer un nombre aléatoire entre 0 et 3
      let random = Math.floor(Math.random()*4);
      // ajouter la couleur correspondante à la séquence
      app.sequence.push( app.colors[random] );
      // on remet l'indice joueur à zéro (il doit refaire toute la séquence !)
      app.indiceJoueur = 0;
      // Simon Says !
      app.simonSays(app.sequence);
    },
  
    /** Etape 6 : on modifie uniquement la fonction simonSays */
  
    /** Etape 7 :
     * On rajoute une propriété à app, pour conserver la référence du timeout.
     * On va aussi rajouter 3 fonctions utilitaires pour lancer, arreter, et reset le timeout.
     * On modifie ensuite :
     * - simonSays pour arreter le timeout quand Simon parle, et le lancer quand la séquence est finie
     * - handleClickEvent pour relancer le timeout à chaque clic du joueur (sans se soucier de la réponse)
     * - gameOver pour arreter le timeout (histoire d'éviter de lancer 2 fois gameOver)
    */
    timeoutRef: null,
  
    startTimeout: function () {
      // game over dans 5 secondes !
      // et on conserve la réf
      app.timeoutRef = setTimeout( app.gameOver, 5000);
    },
    
    stopTimeout: function () {
      clearTimeout(app.timeoutRef);
    },
  
    resetTimeout: function () {
      app.stopTimeout();
      app.startTimeout();
    }
  
  };
  
  
  document.addEventListener('DOMContentLoaded', app.init);