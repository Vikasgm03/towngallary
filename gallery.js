document.addEventListener("DOMContentLoaded", () => {
  const galleryGrid = document.getElementById("gallery-grid");
  const buttons = document.querySelectorAll("#category-buttons button");

  // Image data (you can later move this to a JSON file if needed)
  const galleryData = [
    { category: "temples", src: "images/temples/temple1.jpeg", title: "Gomateshwara" },
    { category: "temples", src: "images/temples/temple2.jpeg", title: "Chandragiri Temple" },
    { category: "nature", src: "images/nature/lake1.jpeg", title: "Shravanabelagola Lake" },
    { category: "nature", src: "images/nature/hill1.jpeg", title: "Chandragiri Hill" },
    { category: "food", src: "images/food/dosa1.jpeg", title: "Crispy Dosa" },
    { category: "food", src: "images/food/sweets1.jpeg", title: "Homemade Sweets" }
  ];

  function renderGallery(category = "all") {
    galleryGrid.innerHTML = "";

    const filtered = category === "all" ? galleryData : galleryData.filter(img => img.category === category);

    filtered.forEach(img => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${img.src}" alt="${img.title}">
        <h3>${img.title}</h3>
      `;
      galleryGrid.appendChild(card);
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderGallery(btn.dataset.category);
    });
  });

  renderGallery();
});
