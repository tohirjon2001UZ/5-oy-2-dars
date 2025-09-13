const elContainer = document.getElementById("container");
const elCard = document.getElementById("cardTemplate");
const elSkeleton = document.getElementById("skeletonTemplate");
const elError = document.getElementById("error");

let skeleton = getSkletionCount();
for (let i = 0; i < skeleton; i++) {
  elContainer.append(elSkeleton.cloneNode(true).content);
}

function init() {
  fetch("https://json-api.uz/api/project/fn43/cars")
    .then((res) => res.json())
    .then((res) => {
      elContainer.innerHTML = "";
      info(res.data);
    })
    .catch(() => {
      elError.classList.remove("hidden");
      setTimeout(() => {
        elContainer.innerHTML = "";
      }, 3000);
    })
    .finally(() => {
      console.log("😎");
    });
}

function deleteEl(id) {
  elContainer.innerHTML = "";
  let skeleton = getSkletionCount();
  for (let i = 0; i < skeleton; i++) {
    elContainer.append(elSkeleton.cloneNode(true).content);
  }

  fetch(`https://json-api.uz/api/project/fn43/cars/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      init();
    })
    .then((res) => {})
    .finally(() => {});
}

init();

function info(card) {
  elContainer.innerHTML = "";
  card.forEach((car) => {
    const clone = elCard.cloneNode(true).content;
    const elTitle = clone.querySelector("h2");
    const elDescription = clone.querySelector("p");
    const elCategory = clone.querySelector("mark");
    const elDeleteBtn = clone.querySelector(".delete-btn");
    const elInfoBtn = clone.querySelector(".info-btn");
    elTitle.innerText = car.name;
    elDescription.innerText = car.description;
    elCategory.innerText = car.category;
    elDeleteBtn.id = car.id;
    elInfoBtn.id = car.id;
    elInfoBtn.addEventListener("click", () => {
      window.location.href = `about.html?id=${car.id}`;
    });
    elContainer.append(clone);
  });
}

function getSkletionCount() {
  const width = window.innerWidth;
  if (width < 640) {
    return 6;
  } else if (width < 1024) {
    return 9;
  } else {
    return 12;
  }
}

document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("delete-btn")) {
    deleteEl(evt.target.id);
  }
  if (evt.target.classList.contains("info-btn")) {
    window.location.href = `about.html?id=${evt.target.id}`;
  }
});
