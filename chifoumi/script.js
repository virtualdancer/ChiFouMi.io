/*
document c'est le DOM, c'est la structure interne dans le navigateur
querySelector() : c'est une fonction qui permet de sélectionner un élément dans le DOM à partir d'une identification
    Cette identification (dans des guillemets) peut se faire de plusieurs manières :
     - "div" : le nom de la balise dans le DOM (exemple : <div>)
     - "#identifiant" : un élément qui porte un unique identifiant (exemple : <div id="identifiant">)
     - ".rouge" : un élément qui porte une classe (exemple : <div class="rouge">)
*/
var lesMainsGauches = document.querySelectorAll(".main");

//Initialisation des scores des participants : l'utilisateur et l'ordinateur à 0.
var scoreUtilisateur = 0;
var scoreOrdinateur = 0;

/* Sélection des DIV pour manipulation : 
 - div gauche = utilisateur
 - div droite = ordinateur
 - div résultat = résultat et score
*/
var mainDroiteDiv = document.querySelector("#droite");
var resultatDiv = document.querySelector("#resultat");

/* La variable "lesMainsGauches" est un tableau (array) qui contient toutes les DIV des 
 mains de l'utilisateur :
 - pierre
 - feuille 
 - ciseau
 la fonction "forEach(element => {code})" permet d'executer le "code" pour 
 chacun des "element" du tableau "lesMainsGauches".
 */
lesMainsGauches.forEach(element => {
    /* la fonction "addEventListener()" permet de rattacher un 
     évènement "click" à une fonction "function (event) {code}". Le "code" sera donc exécuté à chaque fois 
     que l'évènement "click" se sera produit sur l'élément "element".
     */
    element.addEventListener("click", function (event) {

        // on parcourt toutes les cases main de l'utilisateur pour blanchir le fond
        lesMainsGauches.forEach(caseABlanchir => {
            // Changement du fond de la case "caseABlanchir" pour y mettre du blanc
            caseABlanchir.style.backgroundColor = "white";
        })

        // mainGaucheDiv contient la main sélectionnée par l'utilisateur (la cible de l'évènement)
        var mainGaucheDiv = event.target.parentNode;

        // nettoyage de la DIV résultat (on enlève le texte pour le remplacer par un texte vide)
        resultatDiv.innerText = "";
        
        // mainGauche et mainDroite contiennent chacune une valeur 
        // (sélectionnée pour l'utilisateur, au hasard pour l'ordinateur)
        var mainGauche = mainGaucheDiv.id;
        var mainDroite = aleatoire();

        // la DIV droite affiche la valeur de l'ordinateur
        mainDroiteDiv.innerHTML = '<img src="pierre-feuille-ciseau/droite-' + mainDroite + '.png" width=100%>'

        // test : est-ce-qu'il y a match nul ?
        if (mainGauche == mainDroite) {
            resultatDiv.innerText = "Match nul";
        }

        if (mainGauche == "pierre") {
            if (mainDroite == "feuille") {
                perdre(mainGaucheDiv);
            }
            if (mainDroite == "ciseau") {
                gagner(mainGaucheDiv);
            }
        }

        if (mainGauche == "feuille") {
            if (mainDroite == "pierre") {
                gagner(mainGaucheDiv);
            }
            if (mainDroite == "ciseau") {
                perdre(mainGaucheDiv);
            }
        }

        if (mainGauche == "ciseau") {
            if (mainDroite == "feuille") {
                gagner(mainGaucheDiv);
            }
            if (mainDroite == "pierre") {
                perdre(mainGaucheDiv);
            }
        }

        // mise en mémoire du texte résultat
        var texte = resultatDiv.innerText ;

        // concaténation du résultat et des scores utilisateur et ordinateur
        texte = texte + " - Utilisateur : " + scoreUtilisateur + " - Ordinateur : " + scoreOrdinateur;

        // le texte concaténé est affiché dans la DIV résultat
        resultatDiv.innerText = texte;

    });
});

/**
 * cette fonction choisit une valeur au hasard entre "pierre", "feuille" et "ciseau" 
 * et retourne cette valeur.
 */
function aleatoire () {
    // Math.floor(nombreAVirgule) arrondi le nombreAVirgule en nombre entier
    alea = Math.floor(
        // Math.random() génère un nombreAVirgule aléatoire entre 0 et 1
        Math.random() * 3
    );

    if (alea == 0) {
        return "pierre";
    }

    if (alea == 1) {
        return "feuille";
    }

    if (alea == 2) {
        return "ciseau";
    }
}

/**
 * fonction commune à chaque fois que l'utilisateur gagne une manche
 * @param {DIV} mainSelectionnee 
 */
function gagner (mainSelectionnee) {
    resultatDiv.innerText = "Gagné";
    mainSelectionnee.style.backgroundColor = "lightgreen";
    scoreUtilisateur++ ;
}

/**
 * fonction commune à chaque fois que l'utilisateur perd une manche
 * @param {DIV} mainSelectionnee 
 */
function perdre (mainSelectionnee) {
    resultatDiv.innerText = "Perdu";
    mainSelectionnee.style.backgroundColor = "red";
    scoreOrdinateur++ ;
}


// Différentes façons de compter +1 pour une variable : 
// scoreOrdinateur = scoreOrdinateur + 1;
// scoreOrdinateur += 1;
// scoreOrdinateur++ ;