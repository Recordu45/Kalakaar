document.addEventListener("DOMContentLoaded", function () {

  console.log("KALAKAAR JS LOADED");

  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  const closeModal = document.getElementById("closeModal");
  const modalAction = document.getElementById("modalAction");

  /* =========================
     MODULE DATA
  ========================= */

  const modules = {

    emi: {
      title: "EMI Calculator",
      text: "Loan amount, interest rate aur tenure enter karke monthly EMI calculate karein."
    },

    ledger: {
      title: "Customer Ledger",
      text: "Customer ka naam, total amount aur payment details manage karein."
    },

    resume: {
      title: "Resume Builder",
      text: "Professional resume banane ke liye apni basic details enter karein."
    },

    notes: {
      title: "AI Notes",
      text: "Topic enter karein aur study notes generate karein."
    },

    business: {
      title: "Business AI",
      text: "Billing, stock, customer ledger aur business reports manage karein."
    },

    banking: {
      title: "Banking & Finance",
      text: "EMI, collection, DPD, NPA aur banking calculation tools."
    },

    jobs: {
      title: "AI Resume & Jobs",
      text: "Resume, interview preparation aur job tracking tools."
    },

    services: {
      title: "Local Services",
      text: "Electrician, plumber, mechanic aur other local services."
    },

    study: {
      title: "AI Study",
      text: "NCERT, notes, quiz aur exam preparation tools."
    },

    crm: {
      title: "WhatsApp CRM",
      text: "Customer follow-up, reminders aur WhatsApp tools."
    }

  };


  /* =========================
     OPEN MODAL
  ========================= */

  function openModal(key) {

    const module = modules[key];

    if (!module) {
      console.log("Unknown module:", key);
      return;
    }

    modalTitle.textContent = module.title;
    modalText.textContent = module.text;

    modalAction.textContent = "Open Module";

    modal.dataset.module = key;

    modal.classList.add("show");
  }


  /* =========================
     CLOSE MODAL
  ========================= */

  function closePopup() {

    modal.classList.remove("show");

  }


  if (closeModal) {

    closeModal.addEventListener("click", function () {

      closePopup();

    });

  }


  /* =========================
     OUTSIDE CLICK
  ========================= */

  if (modal) {

    modal.addEventListener("click", function (event) {

      if (event.target === modal) {

        closePopup();

      }

    });

  }


  /* =========================
     MODULE BUTTONS
  ========================= */

  document.querySelectorAll("[data-open]").forEach(function (button) {

    button.addEventListener("click", function (event) {

      event.preventDefault();

      const key = button.getAttribute("data-open");

      console.log("Opening module:", key);

      openModal(key);

    });

  });


  /* =========================
     CONTINUE / OPEN MODULE
  ========================= */

  if (modalAction) {

    modalAction.addEventListener("click", function () {

      const key = modal.dataset.module;

      console.log("Continue:", key);

      if (key === "emi") {

        openEMICalculator();

      }

      else if (key === "ledger") {

        openLedger();

      }

      else if (key === "resume") {

        openResume();

      }

      else if (key === "notes") {

        openNotes();

      }

      else {

        alert(
          modules[key]?.title +
          " module open ho gaya."
        );

      }

    });

  }


  /* =========================
     EMI CALCULATOR
  ========================= */

  function openEMICalculator() {

    modalTitle.textContent = "EMI Calculator";

    modalText.innerHTML = `

      <div class="tool-form">

        <label>Loan Amount</label>

        <input
          id="loanAmount"
          type="number"
          placeholder="₹ 100000"
        >

        <label>Interest Rate (% per year)</label>

        <input
          id="interestRate"
          type="number"
          step="0.01"
          placeholder="10"
        >

        <label>Tenure (Months)</label>

        <input
          id="loanTenure"
          type="number"
          placeholder="12"
        >

        <button
          id="calculateEMI"
          class="primary"
          type="button"
        >
          Calculate EMI
        </button>

        <div
          id="emiResult"
          class="tool-result"
        ></div>

      </div>

    `;

    modalAction.style.display = "none";


    const calculateButton =
      document.getElementById("calculateEMI");

    calculateButton.addEventListener(
      "click",
      calculateEMI
    );

  }


  /* =========================
     CALCULATE EMI
  ========================= */

  function calculateEMI() {

    const amount =
      Number(
        document.getElementById("loanAmount").value
      );

    const annualRate =
      Number(
        document.getElementById("interestRate").value
      );

    const months =
      Number(
        document.getElementById("loanTenure").value
      );


    if (
      !amount ||
      !annualRate ||
      !months
    ) {

      document.getElementById(
        "emiResult"
      ).innerHTML =
        "Please sabhi details enter karein.";

      return;

    }


    const monthlyRate =
      annualRate / 12 / 100;


    const emi =
      amount *
      monthlyRate *
      Math.pow(
        1 + monthlyRate,
        months
      ) /
      (
        Math.pow(
          1 + monthlyRate,
          months
        ) - 1
      );


    const totalPayment =
      emi * months;


    const totalInterest =
      totalPayment - amount;


    document.getElementById(
      "emiResult"
    ).innerHTML = `

      <h3>EMI Result</h3>

      <p>
        Monthly EMI:
        <strong>
          ₹${emi.toFixed(2)}
        </strong>
      </p>

      <p>
        Principal:
        <strong>
          ₹${amount.toFixed(2)}
        </strong>
      </p>

      <p>
        Total Interest:
        <strong>
          ₹${totalInterest.toFixed(2)}
        </strong>
      </p>

      <p>
        Total Payment:
        <strong>
          ₹${totalPayment.toFixed(2)}
        </strong>
      </p>

    `;

  }


  /* =========================
     CUSTOMER LEDGER
  ========================= */

  function openLedger() {

    modalTitle.textContent =
      "Customer Ledger";

    modalText.innerHTML = `

      <div class="tool-form">

        <label>Customer Name</label>

        <input
          id="customerName"
          type="text"
          placeholder="Customer name"
        >

        <label>Total Amount</label>

        <input
          id="ledgerAmount"
          type="number"
          placeholder="₹ 10000"
        >

        <label>Paid Amount</label>

        <input
          id="paidAmount"
          type="number"
          placeholder="₹ 5000"
        >

        <button
          id="ledgerCalculate"
          class="primary"
          type="button"
        >
          Generate Ledger
        </button>

        <div
          id="ledgerResult"
          class="tool-result"
        ></div>

      </div>

    `;

    modalAction.style.display = "none";


    document
      .getElementById("ledgerCalculate")
      .addEventListener(
        "click",
        function () {

          const name =
            document.getElementById(
              "customerName"
            ).value;

          const total =
            Number(
              document.getElementById(
                "ledgerAmount"
              ).value
            );

          const paid =
            Number(
              document.getElementById(
                "paidAmount"
              ).value
            );

          if (!name || !total) {

            document.getElementById(
              "ledgerResult"
            ).textContent =
              "Customer name aur amount enter karein.";

            return;

          }

          const balance =
            total - paid;


          document.getElementById(
            "ledgerResult"
          ).innerHTML = `

            <h3>${name}</h3>

            <p>
              Total:
              <strong>₹${total}</strong>
            </p>

            <p>
              Paid:
              <strong>₹${paid}</strong>
            </p>

            <p>
              Balance:
              <strong>₹${balance}</strong>
            </p>

          `;

        }
      );

  }


  /* =========================
     RESUME BUILDER
  ========================= */

  function openResume() {

    modalTitle.textContent =
      "Resume Builder";

    modalText.innerHTML = `

      <div class="tool-form">

        <label>Name</label>

        <input
          id="resumeName"
          type="text"
          placeholder="Your name"
        >

        <label>Email</label>

        <input
          id="resumeEmail"
          type="email"
          placeholder="you@example.com"
        >

        <label>Job Role</label>

        <input
          id="resumeRole"
          type="text"
          placeholder="Banking / Accountant / etc."
        >

        <button
          id="resumeGenerate"
          class="primary"
          type="button"
        >
          Generate Resume
        </button>

        <div
          id="resumeResult"
          class="tool-result"
        ></div>

      </div>

    `;

    modalAction.style.display = "none";


    document
      .getElementById("resumeGenerate")
      .addEventListener(
        "click",
        function () {

          const name =
            document.getElementById(
              "resumeName"
            ).value;

          const email =
            document.getElementById(
              "resumeEmail"
            ).value;

          const role =
            document.getElementById(
              "resumeRole"
            ).value;


          if (!name || !email || !role) {

            document.getElementById(
              "resumeResult"
            ).textContent =
              "Please sabhi details enter karein.";

            return;

          }


          document.getElementById(
            "resumeResult"
          ).innerHTML = `

            <h3>${name}</h3>

            <p>${email}</p>

            <p>
              <strong>
                Target Role:
              </strong>
              ${role}
            </p>

            <p>
              Resume successfully generated.
            </p>

          `;

        }
      );

  }


  /* =========================
     AI NOTES
  ========================= */

  function openNotes() {

    modalTitle.textContent =
      "AI Notes";

    modalText.innerHTML = `

      <div class="tool-form">

        <label>Topic</label>

        <input
          id="noteTopic"
          type="text"
          placeholder="Example: Banking, Excel, History"
        >

        <button
          id="generateNotes"
          class="primary"
          type="button"
        >
          Generate Notes
        </button>

        <div
          id="notesResult"
          class="tool-result"
        ></div>

      </div>

    `;

    modalAction.style.display = "none";


    document
      .getElementById("generateNotes")
      .addEventListener(
        "click",
        function () {

          const topic =
            document.getElementById(
              "noteTopic"
            ).value.trim();


          if (!topic) {

            document.getElementById(
              "notesResult"
            ).textContent =
              "Topic enter karein.";

            return;

          }


          document.getElementById(
            "notesResult"
          ).innerHTML = `

            <h3>${topic}</h3>

            <p>
              ${topic} ke notes yahan
              generate honge.
            </p>

            <p>
              Kalakaar AI backend ko
              next step mein connect karenge.
            </p>

          `;

        }
      );

  }


  /* =========================
     THEME
  ========================= */

  const themeBtn =
    document.getElementById("themeBtn");


  if (themeBtn) {

    themeBtn.addEventListener(
      "click",
      function () {

        document.body.classList.toggle(
          "light"
        );

        localStorage.setItem(
          "kalakaar-theme",
          document.body.classList.contains("light")
            ? "light"
            : "dark"
        );

      }
    );

  }


  if (
    localStorage.getItem(
      "kalakaar-theme"
    ) === "light"
  ) {

    document.body.classList.add("light");

  }


  /* =========================
     SEARCH
  ========================= */

  const searchInput =
    document.getElementById(
      "searchInput"
    );

  const moduleCards =
    document.querySelectorAll(
      ".module-card"
    );


  if (searchInput) {

    searchInput.addEventListener(
      "input",
      function () {

        const query =
          searchInput.value
            .toLowerCase()
            .trim();


        let visible = 0;


        moduleCards.forEach(
          function (card) {

            const text =
              card.dataset.name
                ?.toLowerCase() || "";


            const found =
              text.includes(query);


            card.style.display =
              found ? "grid" : "none";


            if (found) {
              visible++;
            }

          }
        );


        const count =
          document.getElementById(
            "moduleCount"
          );


        if (count) {

          count.textContent =
            query
              ? `${visible} Found`
              : "6 Modules";

        }

      }
    );

  }


  /* =========================
     ESC KEY
  ========================= */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape"
      ) {

        closePopup();

      }

    }
  );


  console.log(
    "Kalakaar V2 loaded successfully."
  );

});
.tool-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tool-form label {
  color: var(--muted);
  font-size: 12px;
  margin-top: 4px;
}

.tool-form input {
  width: 100%;
  border: 1px solid var(--line);
  background: rgba(255,255,255,.06);
  color: var(--text);
  border-radius: 12px;
  padding: 13px;
  outline: none;
}

.tool-form input:focus {
  border-color: var(--pink);
  box-shadow: 0 0 0 2px rgba(255,47,145,.12);
}

.tool-result {
  margin-top: 10px;
  padding: 15px;
  border-radius: 14px;
  background: rgba(255,47,145,.08);
  border: 1px solid var(--line);
  color: var(--text);
}

.tool-result h3 {
  margin-top: 0;
  color: var(--pink2);
}

.tool-result p {
  margin: 8px 0;
}
