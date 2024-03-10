//ajoute une la classe responsive au elements  de myTopnav
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const btnFermer = document.querySelector(".close");
const btnValider = document.getElementById("btn-valider");
const modalContent = document.getElementById("modal-content");
const modalFinFormulaire = document.querySelector(".modal-fin-formulaire");
const inputFermerFormulaire = document.getElementById("input-fermer-formulaire");
const body = document.querySelector("body");



// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
showModal(true)

}
//launch modal btn fermer
btnFermer.addEventListener("click", () => {
showModal(false)
});

// input fermer formulaire
inputFermerFormulaire.addEventListener("click", () => {
 showModal(false)
});

function showModal(bool) {
  if (bool) {
    modalbg.style.display = "block";
    body.style.overflow = "hidden";
  } else {
    modalbg.style.display = "none";
    body.style.overflow = "auto";
  }
}


//launch modal btn formulaire valide

// Soumission formulaire
document
  .querySelector('form[name="reserve"]')
  .addEventListener("submit", (event) => {
    event.preventDefault();
    validate();
  });

//function avec 2 arguments creer span et ne pas afficher plusieurs fois msg erreur
function createSpan(errorMessage, id) {
  const parentElement = document.getElementById(id);
  document.getElementById(id).innerHTML = "";
  const span = document.createElement("span");
  span.textContent = errorMessage;
  //creation de la classe pour les elements span
  span.classList.add("error-message");
  parentElement.appendChild(span);
}

//validation email
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}


//function validation formulaire
function validate() {
  //recuperation des ID du formulaire
  const firstName = document.getElementById("first").value;
  const lastName = document.getElementById("last").value;
  const email = document.getElementById("email").value;
  const birthdate = document.getElementById("birthdate").value;
  const quantity = document.getElementById("quantity").value;
  const villes = document.querySelectorAll(".verification-ville");
const condition = document.getElementById("checkbox1");



  //verification validation de tous les elements avc valeur true qui passe a fals si un element non valide
  let correct = true;

  //condition de validation individuel
  if (firstName.length < 2) {
    //appel de la function creatSpan pour creer des span quand erreur + ajout de la valeur fals si non valide
    createSpan(
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
      "boxSpanPrenom"
    );
    correct = false;
    //si validation ok vider le span
  } else {
    document.getElementById("boxSpanPrenom").innerHTML = "";
  }
  if (lastName.length < 2) {
    createSpan(
      "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
      "boxSpanNom"
    );
    correct = false;
  } else {
    document.getElementById("boxSpanNom").innerHTML = "";
  }

  if (!validateEmail(email)) {
    createSpan("Veuillez entrer une adresse e-mail valide.", "boxSpanEmail");
    correct = false;
  } else {
    document.getElementById("boxSpanEmail").innerHTML = "";
  }
  if (/^\d+$/.test(birthdate)) {
    createSpan("Entrez une date d'anniversaire.", "boxSpanNaissance");
    correct = false;
  } else {
    document.getElementById("boxSpanNaissance").innerHTML = "";
  }
  if (quantity === "") {
    createSpan("Veuillez remplir le champ.", "boxSpanNbTournoi");
    correct = false;
  } else {
    document.getElementById("boxSpanNbTournoi").innerHTML = "";
  }


  //verification pour checkbox ville 
  //recherche dans tous les inputs villes si une et coché, si une est coché anychecked deviens true
  let anyChecked = false;
  villes.forEach(function(input) {
      if (input.checked){
          anyChecked = true;
      }
  });
  // si anycheck est toujours fals, je creer un span error
  if (!anyChecked) {
      createSpan("Veuillez choisir une ville.", "boxSpanVilles");
      correct = false;
  } else {
      document.getElementById("boxSpanVilles").innerHTML = "";
  }

  if (!condition.checked){
    createSpan("Veuillez accepter les conditions d'utilisation.", "boxSpanCondition");
      correct = false; 
  } else {
    document.getElementById("boxSpanCondition").innerHTML = "";
}

  
  
  if (correct === true) {
      modalContent.style.display = "none";
      modalFinFormulaire.style.display = "block";
    };
  }
 
  btnValider.addEventListener("click", validate);
