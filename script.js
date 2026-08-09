const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

const names = {
  business: [
    "Business AI",
    "Billing, stock, customer ledger, payment reminders and AI reports."
  ],

  banking: [
    "Banking & Finance",
    "EMI, collection, DPD/NPA, branch checklist and Excel productivity tools."
  ],

  jobs: [
    "AI Resume & Jobs",
    "Resume builder, interview preparation, job matching and application tracking."
  ],

  services: [
    "Local Services",
    "Electrician, plumber, mechanic, AC repair and other local service bookings."
  ],

  study: [
    "AI Study",
    "NCERT explanations, notes, quizzes, exam preparation and Hindi/Hinglish tutor."
  ],

  crm: [
    "WhatsApp CRM",
    "Customer records, follow-ups, payment reminders and WhatsApp message tools."
  ],

  emi: [
    "EMI Calculator",
    "EMI calculator module selected."
  ],

  ledger: [
    "Customer Ledger",
    "Customer ledger module selected."
  ],

  resume: [
    "Resume Builder",
    "Resume builder module selected."
  ],

  notes: [
    "AI Notes",
    "AI study notes module selected."
  ]
};


/* =========================
   OPEN MODULE
========================= */

function openModule(key) {

  const item = names[key] || [
    "Kalakaar",
    "Feature selected."
  ];

  modalTitle.textContent = item[0];
  modalText.textContent = item[1];

  modal.classList.add("show");
}


/* =========================
   MODULE BUTTONS
========================= */

document.querySelectorAll("[data-open]").forEach(button => {

  button.addEventListener("click", () => {

    openModule(button.dataset.open);

  });

});


/* =========================
   CLOSE MODAL
========================= */

const closeModal = document.getElementById("closeModal");

if (closeModal) {

  closeModal.addEventListener("click", () => {

    modal.classList.remove("show");

  });

}


/* =========================
   CLICK OUTSIDE MODAL
========================= */

if (modal) {

  modal.addEventListener("click", event => {

    if (event.target === modal) {

      modal.classList.remove("show");

    }

  });

}


/* =========================
   AI ASSISTANT
========================= */

const askBtn = document.getElementById("askBtn");

if (askBtn) {

  askBtn.addEventListener("click", () => {

    openModule("business");

    modalTitle.textContent = "Kalakaar AI Assistant";

    modalText.textContent =
      "AI Assistant ka full chat system next phase mein connect karenge.";

  });

}


/* =========================
   MODAL CONTINUE BUTTON
========================= */

const modalAction = document.getElementById("modalAction");

if (modalAction) {

  modalAction.addEventListener("click", () => {

    modal.classList.remove("show");

  });

}


/* =========================
   DARK / LIGHT MODE
========================= */

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {

  themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const currentTheme =
      document.body.classList.contains("light")
        ? "light"
        : "dark";

    localStorage.setItem(
      "kalakaar-theme",
      currentTheme
    );

  });

}


/* =========================
   LOAD SAVED THEME
========================= */

if (
  localStorage.getItem("kalakaar-theme") === "light"
) {

  document.body.classList.add("light");

}


/* =========================
   MODULE SEARCH
========================= */

const searchInput =
  document.getElementById("searchInput");

const moduleCards =
  [...document.querySelectorAll(".module-card")];

if (searchInput) {

  searchInput.addEventListener("input", () => {

    const query =
      searchInput.value
        .toLowerCase()
        .trim();

    let visible = 0;

    moduleCards.forEach(card => {

      const searchableText =
        card.dataset.name || "";

      const found =
        !query ||
        searchableText
          .toLowerCase()
          .includes(query);

      card.style.display =
        found ? "grid" : "none";

      if (found) {

        visible++;

      }

    });

    const moduleCount =
      document.getElementById("moduleCount");

    if (moduleCount) {

      moduleCount.textContent =
        query
          ? `${visible} Found`
          : "6 Modules";

    }

  });

}


/* =========================
   ENTER KEY
========================= */

document.addEventListener("keydown", event => {

  if (
    event.key === "Escape" &&
    modal
  ) {

    modal.classList.remove("show");

  }

});


console.log(
  "Kalakaar V1 loaded successfully."
);
