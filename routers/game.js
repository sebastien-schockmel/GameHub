const express = require('express');

const router = express.Router();

const ettehcruof = require('../modules/ettehcruof');

ettehcruof.newGame();

// importons nos données
const games = require('../games.json');
const { response } = require('express');

router.get('/author/:author', (req, res, next) => {
    // vérifier si l'auteur existe

    // s'il existe, on affiche sa page

    // sinon, on next
    next();
});

// route spécifique pour CE jeu, ignorée pour tous les autres jeux
router.get('/game/ettehcruof', (req, res) => {

    const answer = req.query.answer;

    let message, won;

    switch (answer) {
        case 'bravo':

            message = `Je suis trop fort ! On rejoue ?`;

            won = true;

            break;
        case 'plus':
            ettehcruof.more();

            // on propose un nouveau nombre
            message = `C'est ${ettehcruof.getProposition()} ?`;

            break;
        case 'moins':
            ettehcruof.less();

            // on propose un nouveau nombre
            message = `Hmm, ${ettehcruof.getProposition()} alors ?`;

            break;
        case 'new':

            ettehcruof.newGame();

            // plus de break !
            // du coup, le code continue de s'exécuter dans le case suivant, jusqu'à rencontrer un break
        default:

            message = `Je suis censé trouver un nombre entre ${ettehcruof.minBoundary} et ${ettehcruof.maxBoundary}. Est-ce que c'est ${ettehcruof.getProposition()} ?`;
            
            break;
    }

    const theRightGame = games[1];


    res.render('ettehcruof', { theRightGame, message, won });
});

router.get('/game/:game', (req, res, next) => {
    // theGame contient la partie après le dernier slash dans l'url
    const theGame = req.params.game;

    // ressortons find de notre valide de notions
    // NB : find ne marche que pour les arrays
    // on va parcourir notre array de jeux à la recherche de celui qu'on a demandé
    const theRightGame = games.find(game => {
        return game.name === theGame;
    });

    // ici, on distingue les cas d'un jeu trouvé et d'un jeu non trouvé
    if (!theRightGame) {
        // pas de jeu portant ce nom => 404
        next();
    } else {
        // un render
        res.render(theGame, { theRightGame });
    }
});

module.exports = router;