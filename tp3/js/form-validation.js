window.onload = function () {
    console.log("DOM ready!");

    const form = document.getElementById("myForm");

    // Fonction pour valider l'email
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Fonction pour afficher la modal
    function showModal(title, bodyHtml) {
        const modalEl = document.getElementById("myModal");
        document.querySelector("#myModal .modal-title").textContent = title;
        document.querySelector("#myModal .modal-body").innerHTML = bodyHtml;
        const myModal = new bootstrap.Modal(modalEl);
        myModal.show();
    }

    // Interception de l'envoi du formulaire
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // empêche le rechargement de la page

        // Récupération des valeurs
        const nom = document.getElementById("nom").value.trim();
        const prenom = document.getElementById("prenom").value.trim();
        const birthday = document.getElementById("birthday").value;
        const adresse = document.getElementById("adresse").value.trim();
        const email = document.getElementById("email").value.trim();
        const texteAlt = document.getElementById("texteAlt").value.trim();

        // Vérification des champs texte (>=5 caractères)
        if (nom.length < 5 || prenom.length < 5 || adresse.length < 5 || texteAlt.length < 5) {
            showModal("Erreur", "Tous les champs texte doivent contenir au moins 5 caractères.");
            return;
        }

        // Vérification de l'email
        if (!validateEmail(email)) {
            showModal("Erreur", "L'adresse email n'est pas valide.");
            return;
        }

        // Vérification de la date de naissance
        const birthdayDate = new Date(birthday);
        const now = Date.now();
        if (birthdayDate.getTime() > now) {
            showModal("Erreur", "La date de naissance ne peut pas être dans le futur.");
            return;
        }

        // Tous les champs sont valides, afficher la modal avec Google Maps
        const mapUrl = "https://maps.googleapis.com/maps/api/staticmap?markers=Paris&zoom=14&size=400x300&scale=2&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg";
        const mapLink = "http://maps.google.com/maps?q=Paris";

        const bodyHtml = `
            <p>Formulaire valide !</p>
            <a href="${mapLink}" target="_blank">
                <img src="${mapUrl}" alt="Carte Google Maps" class="img-fluid"/>
            </a>
        `;

        showModal("Succès", bodyHtml);
    });
};
