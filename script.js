document.addEventListener("DOMContentLoaded", () => {
  fetch("places.json")
    .then(response => response.json())
    .then(places => {
      const container = document.getElementById("gallery-container");
      if (!container) {
        console.error("Gallery container not found!");
        return;
      }

      container.innerHTML = ""; // Clear if anything exists

      places.forEach(place => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <img src="images/${place.image}" alt="${place.name}">
          <h3>${place.name}</h3>
          <p>${place.description}</p>
          <a href="${place.map}" target="_blank">View on Google Maps</a>
        `;

        container.appendChild(card);
      });
    })
    .catch(error => console.error("Error loading places:", error));
});
