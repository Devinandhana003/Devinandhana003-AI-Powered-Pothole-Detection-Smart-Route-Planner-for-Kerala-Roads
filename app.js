const routeCards = document.querySelectorAll(".route-card");
const phoneBest = document.querySelector(".phone-status strong");
const phoneScore = document.querySelector(".safe-score");
const phonePotholes = document.querySelector(".phone-card span:last-child");

const routeData = {
  lake: {
    label: "Best: Lake Road",
    score: "82% smoother",
    potholes: "2 active potholes"
  },
  market: {
    label: "Fastest: Market Street",
    score: "54% smoother",
    potholes: "6 active potholes"
  },
  temple: {
    label: "Smoothest: Temple Bypass",
    score: "91% smoother",
    potholes: "1 active pothole"
  }
};

routeCards.forEach((card) => {
  card.addEventListener("click", () => {
    routeCards.forEach((item) => item.classList.remove("selected"));
    card.classList.add("selected");

    const route = routeData[card.dataset.route];
    phoneBest.textContent = route.label;
    phoneScore.textContent = route.score;
    phonePotholes.textContent = route.potholes;
  });
});

document.querySelectorAll(".update-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".update-item");
    const dot = item.querySelector(".status-dot");
    const detail = item.querySelector("p");
    const nextStatus = button.dataset.status;

    if (nextStatus === "Cleared") {
      dot.classList.remove("open");
      dot.classList.add("cleared");
      detail.textContent = "Cleared | just updated";
      button.textContent = "Still there?";
      button.dataset.status = "Still there";
      return;
    }

    dot.classList.remove("cleared");
    dot.classList.add("open");
    detail.textContent = "Still there | just updated";
    button.textContent = "Mark cleared";
    button.dataset.status = "Cleared";
  });
});

const photoInput = document.querySelector(".photo-input");
const photoPreview = document.querySelector(".photo-preview");
const photoPreviewImage = document.querySelector(".photo-preview img");

photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];

  if (!file) {
    photoPreview.classList.remove("has-image");
    photoPreviewImage.removeAttribute("src");
    return;
  }

  photoPreviewImage.src = URL.createObjectURL(file);
  photoPreview.classList.add("has-image");
});

document.querySelector(".report-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const message = document.querySelector(".form-message");
  message.textContent = "Update received. Route suggestions will use this report.";
  photoPreview.classList.remove("has-image");
  photoPreviewImage.removeAttribute("src");
  event.currentTarget.reset();
});
