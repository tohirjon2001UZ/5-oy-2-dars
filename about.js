const elContainer = document.getElementById("container");
const elCard = document.getElementById("aboutTemplate");
const elError = document.getElementById("error");

fetch(`https://json-api.uz/api/project/fn43/cars/${id}`)
  .then((res) => res.json())
  .then((res) => {
    elContainer.innerHTML = "";
    info(res.data);
  })
  .catch(() => {
    elError.classList.remove("hidden");
  });

function info(card) {
  card.forEach((el) => {
    const clone = elCard.cloneNode(true).content;
    const elTitle = clone.querySelector("h2");
    const elDescription = clone.querySelector("p");
    const elCategory = clone.querySelector("mark");
    elTitle.innerText = el.name;
    elDescription.innerText = el.description;
    elCategory.innerText = el.category;
    elContainer.append(clone);
  });
}
