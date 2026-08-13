async function fetchMotorcycles() {
    const response = await fetch("https://cdn.freecodecamp.org/curriculum/labs/data/motorcycles.json");
    const data = await response.json();
    return data;
}
function renderMotorcycleCard(motorcycle) {
    return `
    <div class="motorcycle-card">
      <img
        class="motorcycle-card-image-container"
        src="${motorcycle.image_url}"
        alt="${motorcycle.name}"
      >

      <p class="motorcycle-card-year-badge">
        ${motorcycle.year}
      </p>

      <p class="motorcycle-card-title">
        ${motorcycle.name}
      </p>

      <p class="motorcycle-card-manufacturer">
        ${motorcycle.manufacturer}
      </p>

      <p class="motorcycle-card-category">
        ${motorcycle.category}
      </p>

      <p class="motorcycle-card-description  line-clamp-2">
        ${motorcycle.description}
      </p>

      <p class="motorcycle-card-price">
        ${motorcycle.price}
      </p>

      <p class="motorcycle-card-engine">
      </p>
    </div>
  `;
}
class MotorcycleGalleryApp {
    allMotorcycles = [];
    async init() {
        this.allMotorcycles = await fetchMotorcycles();
        this.renderMotorcycles();
        this.setupFilter();
    }
    renderMotorcycles(motorcycles = this.allMotorcycles) {
        const motorcycleGrid = document.getElementById("motorcycle-grid");
        const resultsNumber = document.getElementById("results-number");
        motorcycleGrid.innerHTML = motorcycles
            .map(motorcycle => renderMotorcycleCard(motorcycle))
            .join("");
        resultsNumber.textContent = String(motorcycles.length);
    }
    setupFilter() {
        const input = document.getElementById("name-filter-input");
        input.addEventListener("input", () => {
            const search = input.value.toLowerCase();
            const filteredMotorcycles = this.allMotorcycles.filter(motorcycle => motorcycle.name.toLowerCase().includes(search));
            this.renderMotorcycles(filteredMotorcycles);
        });
    }
}
const app = new MotorcycleGalleryApp();
app.init();
export {};
//# sourceMappingURL=index.js.map