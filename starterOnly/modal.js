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
const btnSumbit = document.getElementById("lol");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//launch modal btn fermer
btnFermer.addEventListener("click", () => {
  modalbg.style.display = "none";
});

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
  if (birthdate === "") {
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

  if (correct === true) {
    document.getElementById("modal-content").innerHTML = "";
  }
}
