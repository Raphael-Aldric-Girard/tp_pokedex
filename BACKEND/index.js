Math.random();
/**
* Serveur Backend Pokedex
*/
//console.log ("Hello World!");
// Définir l'emplacement des fichiers bases de données
const POKEDEX_SRC = "./DATA/pokedex.json";
// Définir l'emplacement des images
const IMAGES_SRC = "./FILES/images";
// Définir un port
const PORT = 8095;
// ************************************************
// Lancer un serveur express sur un port défini
const fs = require('fs');
// npm install express
const express = require('express');
const app = express();
// Lancement du serveur et attendre
app.listen(
 PORT,
 '192.168.1.61',
 () => {
 console.log('Server Pokedex is listening on ' + PORT);
 }
)



//afficher le contenu de l'api pokedex DATA
app.get('/', (req, res) => {

	//lecture du fichier api
	fs.open(POKEDEX_SRC, 'r', (err, data) => {
		if (err) {
		console.error(err);
			return;
		}
		//lecture du fichier api
		const pokedex = fs.readFileSync(POKEDEX_SRC, 'utf8');
		res.end(pokedex);
		
	});
});


//route qui affiche un pokémon au hasard
app.get('/hasard', (req, res) => {
	
	fs.open(POKEDEX_SRC, 'r', (err, data) => {
		if (err) {
		console.error(err);
			return;
		}
		//lecture du fichier api
		const donneeeeeees = fs.readFileSync(POKEDEX_SRC, 'utf8')
		//on transforme l'api en liste
		const pokedex = JSON.parse(donneeeeeees);
		var random = Math.floor(Math.random() * 809);
		res.json(pokedex[random]);
	});
});

app.get('/pokemon/id/:id', (req, res) => {
	const id = parseInt(req.params.id);
	
	console.log(id);
	
	fs.open(POKEDEX_SRC, 'r', (err, data) => {
		if (err) {
		console.error(err);
			return;
		}
		//lecture du fichier api
		const donneeeeeees = fs.readFileSync(POKEDEX_SRC, 'utf8');
		//on transforme l'api en liste
		const pokedex = JSON.parse(donneeeeeees);

		//on recherche le pokemon dans la liste avec le bon id
		const pokemon_id_chercher = pokedex.filter(pokemon => pokemon.id === id)
		res.json(pokemon_id_chercher);
	});
});
	
//recherche par nom
app.get('/pokemon/name/:name', (req, res) => {
	console.log(req.params.name);
	const name = req.params.name;
	
	//lecture du fichier api
	fs.readFile(POKEDEX_SRC, 'utf8', (err, data) => {
		if (err) {
		  console.error(err);
		  return;
		}

		//on transforme l'api en liste
		const pokedex = JSON.parse(data);
		//on ramene le nom en majuscule de la recherche et des listes
		//on recherche parmi les éléments
		const pokemon_name_chercher = pokedex.find(
		  (pokemon) => pokemon.name.french.toLowerCase() === name.toLowerCase()
		);
	
		res.json(pokemon_name_chercher);
	  });
});
