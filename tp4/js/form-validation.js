// Calcul du nombre de caractères
function calcNbChar(id) {
  const input = document.querySelector(`#${id}`);
  const countElement = input.parentElement.parentElement.querySelector("[data-count]");
  countElement.textContent = input.value.length + " car.";
}

// Affichage de la liste des contacts
function displayContactList() {
  const contactList = contactStore.getList();
  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = "";
  for (const c of contactList) {
    tbody.innerHTML += `<tr>
      <td>${c.name}</td>
      <td>${c.firstname}</td>
      <td>${c.date}</td>
      <td>${c.adress}</td>
      <td><a href="mailto:${c.mail}">${c.mail}</a></td>
    </tr>`;
  }
}

// Au chargement de la page
window.onload = function () {
  displayContactList();

  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    contactStore.add(
      document.querySelector(`#name`).value,
      document.querySelector(`#firstname`).value,
      document.querySelector(`#birth`).value,
      document.querySelector(`#adresse`).value,
      document.querySelector(`#mail`).value
    );
    displayContactList();
  });

  document.querySelector("#gps").addEventListener("click", function (event) {
    event.preventDefault();
    getLocation();
  });

  document.querySelector("#reset").addEventListener("click", function () {
    contactStore.reset();
    displayContactList();
  });
};
