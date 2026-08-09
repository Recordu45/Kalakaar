document.addEventListener("DOMContentLoaded", function () {

  console.log("KALAKAAR JS LOADED");

  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  const closeModal = document.getElementById("closeModal");
  const modalAction = document.getElementById("modalAction");

  if (!modal) {
    console.error("Modal element nahi mila.");
    return;
  }

  function openModule(title, text) {

    if (modalTitle) {
      modalTitle.textContent = title;
    }

    if (modalText) {
      modalText.textContent = text;
    }

    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeModule() {

    modal.classList.remove("show");
    document.body.style.overflow = "";
  }


  /* =========================
     ALL MODULE BUTTONS
  ========================= */

  const buttons = document.querySelectorAll("[data-open]");

  console.log("Buttons found:", buttons.length);

  buttons.forEach(function (button) {

    button.addEventListener("click", function (event) {

      event.preventDefault();
      event.stopPropagation();

      const key = button.getAttribute("data-open");

      console.log("MODULE CLICK:", key);

      switch (key) {

        case "emi":
          openModule(
            "EMI Calculator",
            "Yahan loan amount, interest rate aur tenure enter karke EMI calculate kar sakte ho."
          );
          break;

        case "ledger":
          openModule(
            "Customer Ledger",
            "Customer-wise credit, debit, balance aur transaction history yahan manage hogi."
          );
          break;

        case "resume":
          openModule(
            "Resume Builder",
            "Professional resume create aur download karne ka module."
          );
          break;

        case "notes":
          openModule(
            "AI Notes",
            "Topic enter karo aur Kalakaar AI notes, summary aur questions generate karega."
          );
          break;

        case "business":
          openModule(
            "Business AI",
            "Billing, stock, customer ledger, payment reminders aur business reports."
          );
          break;

        case "banking":
          openModule(
            "Banking & Finance",
            "EMI, collection, DPD, NPA, branch checklist aur banking productivity tools."
          );
          break;

        case "jobs":
          openModule(
            "AI Resume & Jobs",
            "Resume, interview preparation, job matching aur application tracking."
          );
          break;

        case "services":
          openModule(
            "Local Services",
            "Electrician, plumber, mechanic, AC repair aur local service booking."
          );
          break;

        case "study":
          openModule(
            "AI Study",
            "NCERT explanation, notes, quiz, exam preparation aur AI tutor."
          );
          break;

        case "crm":
          openModule(
            "WhatsApp CRM",
            "Customer records, follow-ups, payment reminders aur WhatsApp tools."
          );
          break;

        default:
          openModule(
            "Kalakaar",
            "Feature successfully selected."
          );
      }

    });

  });


  /* =========================
     CLOSE BUTTON
  ========================= */

  if (closeModal) {

    closeModal.addEventListener("click", function (event) {

      event.preventDefault();
      event.stopPropagation();

      closeModule();

    });

  }


  /* =========================
     CONTINUE BUTTON
  ========================= */

  if (modalAction) {

    modalAction.addEventListener("click", function (event) {

      event.preventDefault();
      event.stopPropagation();

      closeModule();

    });

  }


  /* =========================
     CLICK OUTSIDE
  ========================= */

  modal.addEventListener("click", function (event) {

    if (event.target === modal) {

      closeModule();

    }

  });


  /* =========================
     ESC KEY
  ========================= */

  document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

      closeModule();

    }

  });


  /* =========================
     THEME
  ========================= */

  const themeBtn = document.getElementById("themeBtn");

  if (themeBtn) {

    themeBtn.addEventListener("click", function () {

      document.body.classList.toggle("light");

      const theme =
        document.body.classList.contains("light")
          ? "light"
          : "dark";

      localStorage.setItem(
        "kalakaar-theme",
        theme
      );

    });

  }


  /* =========================
     LOAD THEME
  ========================= */

  if (
    localStorage.getItem("kalakaar-theme") === "light"
  ) {

    document.body.classList.add("light");

  }


  /* =========================
     SEARCH
  ========================= */

  const searchInput =
    document.getElementById("searchInput");

  const moduleCards =
    document.querySelectorAll(".module-card");

  if (searchInput) {

    searchInput.addEventListener("input", function () {

      const query =
        searchInput.value
          .toLowerCase()
          .trim();

      let visible = 0;

      moduleCards.forEach(function (card) {

        const text =
          (
            card.dataset.name ||
            card.textContent ||
            ""
          ).toLowerCase();

        if (!query || text.includes(query)) {

          card.style.display = "";

          visible++;

        } else {

          card.style.display = "none";

        }

      });

      const moduleCount =
        document.getElementById("moduleCount");

      if (moduleCount) {

        moduleCount.textContent =
          query
            ? visible + " Found"
            : "6 Modules";

      }

    });

  }


  /* =========================
     AI ASSISTANT
  ========================= */

  const askBtn =
    document.getElementById("askBtn");

  if (askBtn) {

    askBtn.addEventListener("click", function () {

      openModule(
        "Kalakaar AI Assistant",
        "AI Assistant ready hai. Yahan business, banking, study, jobs aur daily tasks ke liye help milegi."
      );

    });

  }


  console.log("KALAKAAR: All modules ready.");

});
