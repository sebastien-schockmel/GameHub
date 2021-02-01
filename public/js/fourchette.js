// Objectif : identifier un nombre aléatoire comme au juste prix

// 1. On peut définir la fourchette max
var max = 500; 

// 2. On génère un nombre aléatoire entre 0 et la fourchette max
// on génère déjà un nombre décimal de 0 à 1
// var randomBase = Math.random();
// on le multiplie par le max pour transposer notre nombre de 0 à max
// var randomNumber = randomBase * max;
// on l'arrondit pour conserver un entier
// var roundedRandomNumber = Math.round(randomNumber);
var searchedNumber = Math.round(Math.random() * max);

// var enteredNumber = Number(prompt('Quel est le nombre à trouver ?'));
// 3. On demande à l'utilisateur d'essayer de trouver, on veille à bien récupérer un nombre
var enteredNumber = parseInt(prompt('trouver le nombre entre 1 et 500 ?'));

// 4. On initialise un compteur pour compter les essais
var attempt = 1;

// 5. Tant que l'utilisateur n'a pas saisi le nombre exact on lui redemande
while (enteredNumber !== searchedNumber) {
    // si le joueur ne rentre rien ou clique sur "Annuler",
    // parseInt va renvoyer NaN (not a number)
    // => on quitte la boucle (abandon)
    if ( isNaN(enteredNumber) ) {
        break;
    }

    
    // S'il a saisi un nombre plus petit on lui indique que c'est plus
    if (enteredNumber < searchedNumber) {
        enteredNumber = parseInt(prompt('C\'est plus'));
    }
    // S'il a saisi un nombre plus petit on lui indique que c'est moins
    else {
        enteredNumber = parseInt(prompt('C\'est moins'));
    }
    // On incrémente le nombre d'essais 
    attempt += 1;
}

// 6. On sort de la boucle, c'est donc que le nombre entré est le bon, ou que le joueur a abandonné.
if (enteredNumber == searchedNumber) {
    // on prévient l'utilisateur qu'il a gagné
    alert('Bravo ! C\'était bien ' + searchedNumber + ' - Nombre d\'essais : ' + attempt);
} else {
    // on prévient l'utilisateur qu'il a abandonné
    alert('Abandon après ' + attempt + ' essais. Dommage !');
}
