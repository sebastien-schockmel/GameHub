// isolons la logique de choix d'un nombre
// la recherche dichotomique
const updateProposition = (min, max) => {

    // la formule du milieu
    return Math.floor((max + min)/2);
};

let proposition;

const app = {
    // définissons les bornes du jeu
    minBoundary: 1,
    maxBoundary: 100,

    newGame: () => {
        app.minBoundary = 1;
        app.maxBoundary = 100;
        proposition = updateProposition(app.minBoundary, app.maxBoundary);
    },

    getProposition: () => {
        return proposition;
    },

    more: () => {
        app.minBoundary = proposition + 1;

        proposition = updateProposition(app.minBoundary, app.maxBoundary);
    },

    less: () => {
        app.maxBoundary = proposition - 1;

        proposition = updateProposition(app.minBoundary, app.maxBoundary);
    }
};

// export d'un objet
module.exports = app;