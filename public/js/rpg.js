const app = {
    // une variable pour gérer le joueur (position et orientation)
    player: {
      x: 0,
      y: 0,
      direction: 'right'
    },
  
    // une variable pour gérer la case ciblée
    targetCell : {
      x: 5,
      y: 3
    },
  
    // une variable pour savoir si la partie est terminée ou non
    gameOver : false,
  
    // La fonction qui desssine toute la grille
    drawBoard: () => {
      let board = document.getElementById('board');
  
      // on fait 4 lignes :
      for (let currentLine = 0; currentLine < 4; currentLine++) {
        let line = document.createElement('div');
        line.className = 'line';
  
        // ... dans chacune de ces lignes, on fait 6 cellules
        for (let currentColumn = 0; currentColumn < 6; currentColumn++) {
          let cell = document.createElement('div');
          cell.className = 'cell';
  
          /** TESTS joueur et case d'arrivée */
          // case d'arrivée
          if (currentColumn == app.targetCell.x && currentLine == app.targetCell.y) {
            // si c'est la bonne case, on ajoute une classe CSS
            cell.className += " targetCell";
          }
  
          // joueur
          if (currentColumn == app.player.x && currentLine == app.player.y) {
            // on crée une nouvelle div
            let playerCell = document.createElement('div');
            // on lui ajoute une classe CSS
            playerCell.className = 'player';
            // puis une autre pour gérer la direction
            playerCell.className += ' '+app.player.direction;
            // et on l'ajoute à l'intérieur de la cellule courante
            cell.appendChild(playerCell);
          }
  
          // ... on ajoute la cellule à la ligne courante...
          line.appendChild(cell);
        }
        // ... puis on ajoute la ligne remplie à la div "board"
        
        board.appendChild(line);
      }
  
      // A chaque fois qu'on dessine la grille, on check si la partie est finie
      app.isGameOver();
    },
  
    // une méthode pour vider la div "board"
    clearBoard: () => {
      // version propre
      let board = document.getElementById('board');
      while(board.firstChild) {
        board.firstChild.remove();
      }
      
      // version moins clean en terme d'algo, mais qui marche tout aussi bien !
      // board.innerHTML = '';
    },
  
    redrawBoard: () => {
      app.clearBoard();
      app.drawBoard();
    },
  
    // Méthode pour faire tourner le personnage vers sa droite
    turnRight: () => {
      // si la partie est finie, on ne fait rien !
      if (app.gameOver) {
        return;
      }
  
      // on teste la direction courante du joueur, et on réagit en conséquence
      switch ( app.player.direction) {
        case 'right':
          app.player.direction = 'down';
          break;
        case 'down':
          app.player.direction = 'left';
          break;
        case 'left':
          app.player.direction = 'up';
          break;
        case 'up':
          app.player.direction = 'right';
          break;
        default:
          console.log('Impossible de faire tourner le joueur.');
          return;
      }
      // on redessine la grille
      app.redrawBoard();
    },
  
    // Méthode pour faire tourner le personnage vers sa gauche
    turnLeft: () => {
      // si la partie est finie, on ne fait rien !
      if (app.gameOver) {
        return;
      }
  
      // on teste la direction courante du joueur, et on réagit en conséquence
      switch ( app.player.direction) {
        case 'right':
          app.player.direction = 'up';
          break;
        case 'down':
          app.player.direction = 'right';
          break;
        case 'left':
          app.player.direction = 'down';
          break;
        case 'up':
          app.player.direction = 'left';
          break;
        default:
          console.log('Impossible de faire tourner le joueur.');
          return;
      }
      // on redessine la grille
      app.redrawBoard();
    },
  
    // une méthode pour faire avancer le joueur dans la bonne direction
    moveForward: () => {
      // si la partie est finie, on ne fait rien !
      if (app.gameOver) {
        return;
      }
  
      switch (app.player.direction) {
        case 'right':
          // si le joueur a atteint la limite du plateau, on affiche une erreur et on ne fait rien.
          if (app.player.x >= 5) {
            console.log("Impossible d'avancer. Limite de la grille atteinte.");
          } else {
            // sinon, on modifie les coordonées du joueur
            app.player.x += 1;
          }
          break;
        // on répète le même principe pour les 4 directions
        case 'down':
          if (app.player.y >= 3) {
            console.log("Impossible d'avancer. Limite de la grille atteinte.");
          } else {
            app.player.y += 1;
          }
          break;
        case 'left':
          if (app.player.x <= 0) {
            console.log("Impossible d'avancer. Limite de la grille atteinte.");
          } else {
            app.player.x -= 1;
          }
          break;
        case 'up':
          if (app.player.y <= 0) {
            console.log("Impossible d'avancer. Limite de la grille atteinte.");
          } else {
            app.player.y -= 1;
          }
          break;
        default:
          console.log('Impossible de faire avancer le joueur.');
          return;
      }
      // on redessine la grille
      app.redrawBoard();
    },
  
    // une méthode qui accroche un eventListener à l'objet document, pour gérer les touches directionnelles
    listenKeyboardEvents: () => {
      document.addEventListener('keyup', (event) => {
        switch( event.keyCode ) {
          case 37: // left
            app.turnLeft();
            break;
          case 38: // up
            app.moveForward();
            break;
          case 39: // right
            app.turnRight();
            break;
        }
      });
    },
  
    // une méthode qui teste si la partie est finie.
    isGameOver: () => {
      // si le joueur est sur la case cible...
      if (app.player.x == app.targetCell.x && app.player.y == app.targetCell.y) {
        //... on affiche un message
        alert('Victoire !');
        // et on change la valeur de app.gameOver
        app.gameOver = true;
      }
    },
  
    init: function () {
      //console.log('init !');
  
      // dessiner la grille 
      app.drawBoard();
  
      // accrocher les évènements clavier
      app.listenKeyboardEvents();
    }
  };
  
  document.addEventListener('DOMContentLoaded', app.init);