// Ajoute la classe "responsive" aux éléments de "myTopnav"
function editNav() {
  const x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Sélection des classes et des ID nécessaires
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const btnFermer = document.querySelector(".close");
const btnValider = document.getElementById("btn-valider");
const modalContent = document.getElementById("modal-content");
const modalFinFormulaire = document.querySelector(".modal-fin-formulaire");
const inputFermerFormulaire = document.getElementById(
  "input-fermer-formulaire"
);
const body = document.querySelector("body");

// Écoute du clic sur les boutons "Je m'inscris" et déclenchement de la fonction "launchModal"
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Fonction qui modifie les styles CSS pour afficher ou masquer la modal
function showModal(bool) {
  if (bool) {
    modalbg.style.display = "block";
  } else {
    modalbg.style.display = "none";
  }
}

// Fonction "launchModal" appelant la fonction "showModal" pour afficher ou masquer la modal
function launchModal() {
  // Modification des styles CSS pour rendre la modal visible
  showModal(true);
  resetForm();
}

// Écoute du clic sur le bouton "fermer" de la modal
btnFermer.addEventListener("click", () => {
  // Appel de la fonction pour rendre la modal non visible
  showModal(false);
});

// Écoute du clic sur le bouton de fermeture de la fin du formulaire
inputFermerFormulaire.addEventListener("click", () => {
  showModal(false);
});

// Soumission du formulaire : récupération de la classe du formulaire, si soumis, appel de la fonction "validate"
document
  .querySelector('form[name="reserve"]')
  .addEventListener("submit", (event) => {
    event.preventDefault();
    validate();
  });

// Fonction qui crée un élément "span" pour afficher un message d'erreur spécifique et éviter les doublons
function createSpan(errorMessage, id) {
  const parentElement = document.getElementById(id);
  document.getElementById(id).innerHTML = "";
  const span = document.createElement("span");
  span.textContent = errorMessage;
  span.classList.add("error-message");
  parentElement.appendChild(span);
}

// Validation de l'adresse email
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// validation nom / prenom
function validateIdentity(identity) {
  const regex = /^[a-zA-Z]{2,}(?:(-|\s)[a-zA-Z]{2,})*$/;
  return regex.test(identity);
}

//validation nombre de trois
function verificationNbTournois(tournois) {
  const regex = /^(?:0|[1-9][0-9]?|99)$/;
  return regex.test(tournois);
}

//function verification date de naissance
function estMajeur(dateNaissance) {
  const today = new Date();
  const birthDate = new Date(dateNaissance);
  let age = today.getFullYear() - birthDate.getFullYear();

  if (
    birthDate.getMonth() > today.getMonth() ||
    (birthDate.getMonth() === today.getMonth() &&
      birthDate.getDate() > today.getDate())
  ) {
    age--;
  }
  if (age >= 18) {
    return true;
  }
}

// reset form
function resetForm() {
  document.getElementById("form-modal").reset();
  const spanIds = [
    "errorSpanPrenom",
    "errorSpanNom",
    "errorSpanEmail",
    "errorSpanNaissance",
    "errorSpanNbTournoi",
    "errorSpanVilles",
    "errorSpanCondition",
  ];
  spanIds.forEach((spanId) => {
    document.getElementById(spanId).innerHTML = "";
  });

  modalContent.style.display = "block";
  modalFinFormulaire.style.display = "none";
}

// Fonction de validation du formulaire
function validate() {
  // Récupération des valeurs des champs du formulaire
  const firstName = document.getElementById("first").value.trim();
  const lastName = document.getElementById("last").value.trim();
  const email = document.getElementById("email").value;
  const birthdate = document.getElementById("birthdate").value;
  const quantity = document.getElementById("quantity").value;
  const villes = document.querySelectorAll(".verification-ville");
  const condition = document.getElementById("checkbox1");

  // Vérification de la validité de tous les champs du formulaire
  let correct = true;

  // Validation individuelle des champs
  if (!validateIdentity(firstName)) {
    createSpan(
      "Veuillez entrer un prénom valide et avec plus de 2 caractères.",
      "errorSpanPrenom"
    );
    correct = false;
  } else {
    document.getElementById("errorSpanPrenom").innerHTML = "";
  }
  if (!validateIdentity(lastName)) {
    createSpan(
      "Veuillez entrer un nom valide et avec plus de 2 caractères.",
      "errorSpanNom"
    );
    correct = false;
  } else {
    document.getElementById("errorSpanNom").innerHTML = "";
  }
  if (!validateEmail(email)) {
    createSpan("Veuillez entrer une adresse e-mail valide.", "errorSpanEmail");
    correct = false;
  } else {
    document.getElementById("errorSpanEmail").innerHTML = "";
  }

  if (!estMajeur(birthdate)) {
    createSpan(
      "Vous devez être majeur pour vous inscrire.",
      "errorSpanNaissance"
    );
    correct = false;
  } else {
    document.getElementById("errorSpanNaissance").innerHTML = "";
  }

  if (!verificationNbTournois(quantity)) {
    createSpan(
      "Vous ne pouvez pas dépasser 99 tournois.",
      "errorSpanNbTournoi"
    );
    correct = false;
  } else {
    document.getElementById("errorSpanNbTournoi").innerHTML = "";
  }

  // Vérification des villes sélectionnées
  let nbChecked = 0;
  villes.forEach(function (input) {
    if (input.checked) {
      nbChecked++;
    }
  });
  if (nbChecked === 0) {
    createSpan("Veuillez choisir une ville.", "errorSpanVilles");
    correct = false;
  } else {
    document.getElementById("errorSpanVilles").innerHTML = "";
  }

  // Vérification de l'acceptation des conditions
  if (!condition.checked) {
    createSpan(
      "Veuillez accepter les conditions d'utilisation.",
      "errorSpanCondition"
    );
    correct = false;
  } else {
    document.getElementById("errorSpanCondition").innerHTML = "";
  }

  // Affichage de la modal de fin du questionnaire si tous les champs sont valides
  if (correct) {
    modalContent.style.display = "none";
    modalFinFormulaire.style.display = "block";
  }
}
