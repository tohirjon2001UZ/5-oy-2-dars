const elInfoCar = document.getElementById("info-car");
const elError = document.getElementById("error");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  elError.classList.remove("hidden");
} else {

 fetch(`https://json-api.uz/api/project/fn43/cars/${id}`)
  .then(res => res.json())
  .then(car => {
   

    elInfoCar.innerHTML = `
      <div class="card text-black p-6">
        <h2 class="text-2xl font-bold mb-4">${car.name}</h2>
        <p class="mb-2"><strong>Brend:</strong> ${car.brand}</p>
        <p class="mb-2"><strong>Kategoriya:</strong> ${car.category}</p>
        <p class="mb-2"><strong>Narxi:</strong> $${car.price}</p>
        <p class="mb-4">${car.description}</p>
        <a href="index.html" class="btn btn-primary">Orqaga qaytish</a>
      </div>
    `;
  })
  .catch(() => {
    elError.classList.remove("hidden");
  });

}
