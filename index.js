/*
Comment ajouter un jeu ?
1) l'ajouter au "catalogue" (games.json) et s'assurer qu'il a les bonnes propriétés
2) lui créer une vue EJS à partir de son "name" (cf. catalogue)
2b) dans la vue, s'assurer d'include le header et le footer
3) mettre à disposition les fichiers statiques
*/

const express = require('express');

// initialisation
const app = express();

// j'informe mon application de l'endroit où se trouvent les vues
app.set('views', './views');
// je l'informe aussi du moteur qu'elle va utiliser
app.set('view engine', 'ejs');
// et j'indique que le dossier public est "statique"
app.use(express.static('./public'));

const port = 3000;

app.use(express.urlencoded({ extended: true }));

const games = require('./games.json');

const users = require('./users.json');

let currentUser = null;

const gameRouter = require('./routers/game');


app.use((req, res, next) => {

    const now = new Date(); 

    console.log(`[${now.toISOString()} ${req.ip}] ${req.url}`);

    next();
});


app.use((req, res, next) => {
    res.locals = { games, promo: "Nemo", currentUser };

    next();
});


// les routes de l'application
app.get('/', (req, res) => {
    res.render('index');
});
// un petit render tout ce qu'il y a de plus classique
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {

    const nom = req.body.username;
    const pass = req.body.password;

    const theUser = users.find(user => user.user === nom && user.pass === pass);

    if (theUser) {
        currentUser = theUser;

        res.send("C'est bon");
    } else {
        res.send("Pas d'utilisateur avec ces infos");
    }
    
});

app.use(gameRouter);

// ici, la 404
app.use((req, res) => {
    res.status(404).render('notfound');
});


app.listen(port, () => console.log(`http://localhost:${port}/`));


