const API_URL = "https://kalakaar-gzvn.onrender.com";

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

  if (modalTitle) modalTitle.textContent = item[0];
  if (modalText) modalText.textContent = item[1];

  if (modal) {
    modal.classList.add("show");
  }
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

if (closeModal && modal) {
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

    if (modalTitle) {
      modalTitle.textContent = "Kalakaar AI Assistant";
    }

    if (modalText) {
      modalText.textContent =
        "AI Assistant ka full chat system next phase mein connect karenge.";
    }

  });
}


/* =========================
   MODAL ACTION
========================= */

const modalAction = document.getElementById("modalAction");

if (modalAction && modal) {
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


/* =====================================================
   KALAKAAR API
   ===================================================== */

async function apiRequest(endpoint, options = {}) {

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,

      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    }
  );

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong."
    );
  }

  return data;
}


/* =====================================================
   SIGNUP
   ===================================================== */

async function signup(name, email, password) {

  try {

    const data = await apiRequest(
      "/api/auth/signup",
      {
        method: "POST",

        body: JSON.stringify({
          name,
          email,
          password
        })
      }
    );

    localStorage.setItem(
      "kalakaar-token",
      data.token
    );

    localStorage.setItem(
      "kalakaar-user",
      JSON.stringify(data.user)
    );

    console.log(
      "Signup successful:",
      data.user
    );

    return data;

  } catch (error) {

    console.error(
      "Signup failed:",
      error.message
    );

    throw error;
  }
}


/* =====================================================
   LOGIN
   ===================================================== */

async function login(email, password) {

  try {

    const data = await apiRequest(
      "/api/auth/login",
      {
        method: "POST",

        body: JSON.stringify({
          email,
          password
        })
      }
    );

    localStorage.setItem(
      "kalakaar-token",
      data.token
    );

    localStorage.setItem(
      "kalakaar-user",
      JSON.stringify(data.user)
    );

    console.log(
      "Login successful:",
      data.user
    );

    return data;

  } catch (error) {

    console.error(
      "Login failed:",
      error.message
    );

    throw error;
  }
}


/* =====================================================
   LOGOUT
   ===================================================== */

function logout() {

  localStorage.removeItem(
    "kalakaar-token"
  );

  localStorage.removeItem(
    "kalakaar-user"
  );

  console.log(
    "Logged out successfully."
  );

}


/* =====================================================
   CURRENT USER
   ===================================================== */

function getCurrentUser() {

  const user =
    localStorage.getItem(
      "kalakaar-user"
    );

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }

}


/* =====================================================
   API HEALTH CHECK
   ===================================================== */

async function checkAPI() {

  try {

    const data =
      await apiRequest("/api/health");

    console.log(
      "Kalakaar API:",
      data
    );

    return data;

  } catch (error) {

    console.error(
      "API connection failed:",
      error.message
    );

    return null;
  }

}


/* =====================================================
   MAKE FUNCTIONS AVAILABLE
   ===================================================== */

window.Kalakaar = {

  API_URL,

  signup,

  login,

  logout,

  getCurrentUser,

  checkAPI

};


/* =========================
   ESCAPE KEY
========================= */

document.addEventListener("keydown", event => {

  if (
    event.key === "Escape" &&
    modal
  ) {

    modal.classList.remove("show");

  }

});


/* =========================
   STARTUP
========================= */

console.log(
  "Kalakaar V2 frontend loaded."
);

console.log(
  "API:",
  API_URL
);

checkAPI();
