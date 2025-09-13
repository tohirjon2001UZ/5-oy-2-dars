const elContainer = document.getElementById("container");
const elCard = document.getElementById("cardTemplate");
const elSkeleton = document.getElementById("skeletonTemplate");
const elError = document.getElementById("error");
const elForm = document.getElementById("form");
const elAlert = document.getElementById("successAlert");
const elChangeAlert = document.getElementById("changeAlert");
const elAddBtn = document.getElementById("addBtn");
const elEditBtn = document.getElementById("editBtn");

let skeleton = getSkletionCount();
for (let i = 0; i < skeleton; i++) {
  elContainer.append(elSkeleton.cloneNode(true).content);
}

let editId = null;

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
function getByid(id) {
  fetch(`https://json-api.uz/api/project/fn43/cars/${id}`)
    .then((res) => res.json())
    .then((res) => {
      fill(res);
    })
    .finally(() => {});
}

function addEl(newEl) {
  elContainer.innerHTML = "";
  let skeleton = getSkletionCount();
  for (let i = 0; i < skeleton; i++) {
    elContainer.append(elSkeleton.cloneNode(true).content);
  }

  fetch(`https://json-api.uz/api/project/fn43/cars`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEl),
  })
    .then((res) => {
      elAlert.classList.remove("hidden");
      setTimeout(() => {
        elAlert.classList.add("hidden");
      }, 2000);
      init();
    })
    .finally(() => {});
}

function editEl(editedEl) {
  elContainer.innerHTML = "";
  let skeleton = getSkletionCount();
  for (let i = 0; i < skeleton; i++) {
    elContainer.append(elSkeleton.cloneNode(true).content);
  }

  fetch(`https://json-api.uz/api/project/fn43/cars/${editedEl.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedEl),
  })
    .then((res) => {
      elChangeAlert.classList.remove("hidden");
      setTimeout(() => {
        elChangeAlert.classList.add("hidden");
      }, 2000);
      init();
    })
    .finally(() => {});
}

function fill(obj) {
  elForm.name.value = obj.name;
  elForm.description.value = obj.description;
  elForm.category.value = obj.category;
  elForm.price.value = obj.price;
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
    const elEditeBtn = clone.querySelector(".edit-btn");
    const elInfoBtn = clone.querySelector(".info-btn");
    elTitle.innerText = car.name;
    elDescription.innerText = car.description;
    elCategory.innerText = car.category;
    elDeleteBtn.id = car.id;
    elEditeBtn.id = car.id;
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
  // Delet
  if (evt.target.classList.contains("delete-btn")) {
    deleteEl(evt.target.id);
  }
  // Info
  if (evt.target.classList.contains("info-btn")) {
    window.location.href = `about.html?id=${evt.target.id}`;
  }
  // Edit
  if (evt.target.classList.contains("edit-btn")) {
    getByid(evt.target.id);
    editId = evt.target.id;
    elAddBtn.classList.add("hidden");
    elEditBtn.classList.remove("hidden");

    
  }
});

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const formData = new FormData(elForm);
  const result = {};
  formData.forEach((velue, key) => {
    result[key] = velue;
  });

  if (evt.submitter.id === "addB") {
    addEl(result);
  }
  if (evt.submitter.id === "editBtn") {
    if (editId) {
      result.id = editId;
      editEl(result);
      editId = null;
    }
  }
  elForm.reset();
});
