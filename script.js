// Dynamically load images from places.json
fetch("places.json")
  .then(response => response.json())
  .then(data => {
    const galleryContainer = document.getElementById("gallery-container");
    if (!galleryContainer) {
      console.error("Gallery container not found!");
      return;
    }

    data.forEach(place => {
      const img = document.createElement("img");
      img.src = place.image;
      img.alt = place.name;
      img.title = place.name;
      galleryContainer.appendChild(img);
    });
  })
  .catch(error => console.error("Error loading places:", error));
