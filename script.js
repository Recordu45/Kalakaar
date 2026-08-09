/* =========================================================
   KALAKAAR V3
   COMPLETE SCRIPT
========================================================= */


/* =========================================================
   DOM ELEMENTS
========================================================= */

const modal =
  document.getElementById("modal");

const modalTitle =
  document.getElementById("modalTitle");

const modalText =
  document.getElementById("modalText");

const closeModal =
  document.getElementById("closeModal");

const searchInput =
  document.getElementById("searchInput");

const moduleCount =
  document.getElementById("moduleCount");

const themeBtn =
  document.getElementById("themeBtn");

const askBtn =
  document.getElementById("askBtn");


/* =========================================================
   OPEN / CLOSE MODAL
========================================================= */

function openModal() {

  if (!modal) {
    console.error("Modal not found");
    return;
  }

  modal.classList.add("show");
}


function closeModule() {

  if (!modal) {
    return;
  }

  modal.classList.remove("show");
}


/* Close button */

if (closeModal) {

  closeModal.addEventListener(
    "click",
    closeModule
  );

}


/* Click outside */

if (modal) {

  modal.addEventListener(
    "click",
    function (event) {

      if (event.target === modal) {

        closeModule();

      }

    }
  );

}


/* Escape key */

document.addEventListener(
  "keydown",
  function (event) {

    if (event.key === "Escape") {

      closeModule();

    }

  }
);


/* =========================================================
   BASIC MODULE POPUP
========================================================= */

function showModule(
  title,
  description
) {

  if (!modalTitle || !modalText) {

    alert(
      "Modal elements nahi mile. index.html check karein."
    );

    return;

  }

  modalTitle.textContent =
    title;

  modalText.innerHTML =
    description;

  openModal();

}


/* =========================================================
   EMI CALCULATOR
========================================================= */

function openEMI() {

  showModule(
    "EMI Calculator",

    `
      <p>
        Loan amount, interest rate aur tenure enter karein.
      </p>

      <div class="form-group">

        <label>
          Loan Amount (₹)
        </label>

        <input
          class="form-input"
          id="emiAmount"
          type="number"
          placeholder="100000"
        >

      </div>


      <div class="form-group">

        <label>
          Annual Interest Rate (%)
        </label>

        <input
          class="form-input"
          id="emiRate"
          type="number"
          step="0.01"
          placeholder="12"
        >

      </div>


      <div class="form-group">

        <label>
          Tenure (Months)
        </label>

        <input
          class="form-input"
          id="emiMonths"
          type="number"
          placeholder="24"
        >

      </div>


      <button
        class="primary"
        id="calculateEMI"
      >
        Calculate EMI
      </button>


      <div id="emiResult"></div>
    `
  );


  const calculateButton =
    document.getElementById(
      "calculateEMI"
    );


  if (calculateButton) {

    calculateButton.addEventListener(
      "click",
      calculateEMI
    );

  }

}


function calculateEMI() {

  const amount =
    Number(
      document.getElementById(
        "emiAmount"
      ).value
    );


  const rate =
    Number(
      document.getElementById(
        "emiRate"
      ).value
    );


  const months =
    Number(
      document.getElementById(
        "emiMonths"
      ).value
    );


  if (
    !amount ||
    amount <= 0 ||
    rate < 0 ||
    !months ||
    months <= 0
  ) {

    document.getElementById(
      "emiResult"
    ).innerHTML =

      `
        <div class="result-box">
          Please valid details enter karein.
        </div>
      `;

    return;

  }


  const monthlyRate =
    rate / 12 / 100;


  let emi;


  if (monthlyRate === 0) {

    emi =
      amount / months;

  }

  else {

    emi =
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

  }


  const totalPayment =
    emi * months;


  const totalInterest =
    totalPayment - amount;


  document.getElementById(
    "emiResult"
  ).innerHTML =

    `
      <div class="result-box">

        <div class="result-label">
          Monthly EMI
        </div>

        <div class="result-main">
          ₹${formatMoney(emi)}
        </div>

        <br>

        <div class="result-label">
          Total Interest
        </div>

        <strong>
          ₹${formatMoney(totalInterest)}
        </strong>

        <br><br>

        <div class="result-label">
          Total Payment
        </div>

        <strong>
          ₹${formatMoney(totalPayment)}
        </strong>

      </div>
    `;

}


/* =========================================================
   CUSTOMER LEDGER
========================================================= */

let ledger = [];


try {

  ledger =
    JSON.parse(
      localStorage.getItem(
        "kalakaar-ledger"
      ) || "[]"
    );

}

catch {

  ledger = [];

}


function openLedger() {

  showModule(
    "Customer Ledger",

    `
      <p>
        Customer transaction record maintain karein.
      </p>


      <div class="form-group">

        <label>
          Customer Name
        </label>

        <input
          class="form-input"
          id="ledgerName"
          placeholder="Customer Name"
        >

      </div>


      <div class="form-row">

        <div class="form-group">

          <label>
            Amount
          </label>

          <input
            class="form-input"
            id="ledgerAmount"
            type="number"
            placeholder="1000"
          >

        </div>


        <div class="form-group">

          <label>
            Type
          </label>

          <select
            class="form-select"
            id="ledgerType"
          >

            <option value="credit">
              Credit
            </option>

            <option value="debit">
              Debit
            </option>

          </select>

        </div>

      </div>


      <button
        class="primary"
        id="addLedger"
      >
        Add Transaction
      </button>


      <div id="ledgerList"></div>
    `
  );


  renderLedger();


  document
    .getElementById(
      "addLedger"
    )
    .addEventListener(
      "click",
      addLedger
    );

}


function addLedger() {

  const name =
    document
      .getElementById(
        "ledgerName"
      )
      .value
      .trim();


  const amount =
    Number(
      document
        .getElementById(
          "ledgerAmount"
        )
        .value
    );


  const type =
    document
      .getElementById(
        "ledgerType"
      )
      .value;


  if (
    !name ||
    !amount ||
    amount <= 0
  ) {

    alert(
      "Customer name aur amount enter karein."
    );

    return;

  }


  ledger.unshift({

    id:
      Date.now(),

    name:
      name,

    amount:
      amount,

    type:
      type,

    date:
      new Date()
        .toLocaleDateString(
          "en-IN"
        )

  });


  localStorage.setItem(
    "kalakaar-ledger",
    JSON.stringify(
      ledger
    )
  );


  renderLedger();

}


function renderLedger() {

  const list =
    document.getElementById(
      "ledgerList"
    );


  if (!list) {

    return;

  }


  if (
    ledger.length === 0
  ) {

    list.innerHTML =

      `
        <div class="empty">
          No transactions yet.
        </div>
      `;

    return;

  }


  list.innerHTML =

    `
      <div class="ledger-list">

        ${
          ledger
            .map(
              function (item) {

                return `

                  <div class="ledger-item">

                    <div>

                      <strong>
                        ${escapeHTML(
                          item.name
                        )}
                      </strong>

                      <small>
                        ${item.date}
                      </small>

                    </div>

                    <div
                      class="${
                        item.type
                      }"
                    >

                      ${
                        item.type ===
                        "credit"
                          ? "+"
                          : "-"
                      }

                      ₹${formatMoney(
                        item.amount
                      )}

                    </div>

                  </div>

                `;

              }
            )
            .join("")
        }

      </div>


      <button
        class="secondary"
        id="clearLedger"
      >
        Clear Ledger
      </button>
    `;


  document
    .getElementById(
      "clearLedger"
    )
    .addEventListener(
      "click",
      function () {

        if (
          confirm(
            "Poora ledger delete karein?"
          )
        ) {

          ledger = [];

          localStorage.removeItem(
            "kalakaar-ledger"
          );

          renderLedger();

        }

      }
    );

}


/* =========================================================
   RESUME BUILDER
========================================================= */

function openResume() {

  showModule(
    "Resume Builder",

    `
      <p>
        Apna professional resume banayein.
      </p>


      <div class="form-group">

        <label>
          Full Name
        </label>

        <input
          class="form-input"
          id="resumeName"
          placeholder="Your Name"
        >

      </div>


      <div class="form-group">

        <label>
          Email
        </label>

        <input
          class="form-input"
          id="resumeEmail"
          type="email"
          placeholder="you@example.com"
        >

      </div>


      <div class="form-group">

        <label>
          Phone
        </label>

        <input
          class="form-input"
          id="resumePhone"
          placeholder="Mobile Number"
        >

      </div>


      <div class="form-group">

        <label>
          Professional Summary
        </label>

        <textarea
          class="form-textarea"
          id="resumeSummary"
          placeholder="Professional summary..."
        ></textarea>

      </div>


      <div class="form-group">

        <label>
          Skills
        </label>

        <textarea
          class="form-textarea"
          id="resumeSkills"
          placeholder="Excel, Banking, Communication..."
        ></textarea>

      </div>


      <button
        class="primary"
        id="generateResume"
      >
        Generate Resume
      </button>


      <div id="resumeResult"></div>
    `
  );


  document
    .getElementById(
      "generateResume"
    )
    .addEventListener(
      "click",
      generateResume
    );

}


function generateResume() {

  const name =
    document
      .getElementById(
        "resumeName"
      )
      .value
      .trim();


  const email =
    document
      .getElementById(
        "resumeEmail"
      )
      .value
      .trim();


  const phone =
    document
      .getElementById(
        "resumePhone"
      )
      .value
      .trim();


  const summary =
    document
      .getElementById(
        "resumeSummary"
      )
      .value
      .trim();


  const skills =
    document
      .getElementById(
        "resumeSkills"
      )
      .value
      .trim();


  if (!name) {

    alert(
      "Name enter karein."
    );

    return;

  }


  document.getElementById(
    "resumeResult"
  ).innerHTML =

    `
      <div class="result-box">

        <h3>
          ${escapeHTML(name)}
        </h3>

        <p>
          ${escapeHTML(email)}
          ${
            email && phone
              ? " | "
              : ""
          }
          ${escapeHTML(phone)}
        </p>

        <hr>

        <strong>
          Professional Summary
        </strong>

        <p>
          ${
            escapeHTML(
              summary
            ) ||
            "Summary not added."
          }
        </p>

        <strong>
          Skills
        </strong>

        <p>
          ${
            escapeHTML(
              skills
            ) ||
            "Skills not added."
          }
        </p>


        <button
          class="primary"
          id="printResume"
        >
          Print / Save PDF
        </button>

      </div>
    `;


  document
    .getElementById(
      "printResume"
    )
    .addEventListener(
      "click",
      function () {

        window.print();

      }
    );

}


/* =========================================================
   AI NOTES
========================================================= */

function openNotes() {

  showModule(
    "AI Notes",

    `
      <p>
        Kisi bhi topic ke quick study notes banayein.
      </p>


      <div class="form-group">

        <label>
          Topic
        </label>

        <input
          class="form-input"
          id="notesTopic"
          placeholder="Example: Banking"
        >

      </div>


      <div class="form-group">

        <label>
          Language
        </label>

        <select
          class="form-select"
          id="notesLanguage"
        >

          <option value="Hinglish">
            Hinglish
          </option>

          <option value="Hindi">
            Hindi
          </option>

          <option value="English">
            English
          </option>

        </select>

      </div>


      <button
        class="primary"
        id="generateNotes"
      >
        Generate Notes
      </button>


      <div id="notesResult"></div>
    `
  );


  document
    .getElementById(
      "generateNotes"
    )
    .addEventListener(
      "click",
      generateNotes
    );

}


function generateNotes() {

  const topic =
    document
      .getElementById(
        "notesTopic"
      )
      .value
      .trim();


  if (!topic) {

    alert(
      "Topic enter karein."
    );

    return;

  }


  const language =
    document
      .getElementById(
        "notesLanguage"
      )
      .value;


  document.getElementById(
    "notesResult"
  ).innerHTML =

    `
      <div class="result-box">

        <h3>
          ${escapeHTML(topic)}
        </h3>

        <p>
          ${
            language === "Hindi"
              ? "यह विषय समझने के लिए इसके मूल सिद्धांत, महत्वपूर्ण शब्द और व्यावहारिक उदाहरण पढ़ें।"
              : language === "English"
              ? "Study the basic concept, important terms and practical examples related to this topic."
              : "Is topic ke basic concept, important terms aur practical examples ko samjhein."
          }
        </p>

        <strong>
          Important Points
        </strong>

        <ul>

          <li>
            Basic concept samjhein.
          </li>

          <li>
            Important terms note karein.
          </li>

          <li>
            Practical examples dekhein.
          </li>

          <li>
            Practice questions solve karein.
          </li>

        </ul>

      </div>
    `;

}


/* =========================================================
   BUSINESS AI
========================================================= */

function openBusiness() {

  showModule(
    "Business AI",

    `
      <p>
        Sales aur expenses se business report banayein.
      </p>


      <div class="form-group">

        <label>
          Total Sales
        </label>

        <input
          class="form-input"
          id="businessSales"
          type="number"
          placeholder="50000"
        >

      </div>


      <div class="form-group">

        <label>
          Total Expenses
        </label>

        <input
          class="form-input"
          id="businessExpenses"
          type="number"
          placeholder="30000"
        >

      </div>


      <button
        class="primary"
        id="businessReport"
      >
        Generate Report
      </button>


      <div id="businessResult"></div>
    `
  );


  document
    .getElementById(
      "businessReport"
    )
    .addEventListener(
      "click",
      generateBusinessReport
    );

}


function generateBusinessReport() {

  const sales =
    Number(
      document
        .getElementById(
          "businessSales"
        )
        .value
    );


  const expenses =
    Number(
      document
        .getElementById(
          "businessExpenses"
        )
        .value
    );


  if (
    sales < 0 ||
    expenses < 0
  ) {

    alert(
      "Valid amount enter karein."
    );

    return;

  }


  const result =
    sales - expenses;


  document.getElementById(
    "businessResult"
  ).innerHTML =

    `
      <div class="result-box">

        <div class="result-label">
          Sales
        </div>

        <strong>
          ₹${formatMoney(sales)}
        </strong>

        <br><br>

        <div class="result-label">
          Expenses
        </div>

        <strong>
          ₹${formatMoney(expenses)}
        </strong>

        <br><br>

        <div class="result-label">
          ${
            result >= 0
              ? "Profit"
              : "Loss"
          }
        </div>

        <div class="result-main">
          ₹${formatMoney(
            Math.abs(result)
          )}
        </div>

      </div>
    `;

}


/* =========================================================
   BANKING
========================================================= */

function openBanking() {

  showModule(
    "Banking & Finance",

    `
      <p>
        Banking productivity tools.
      </p>


      <button
        class="primary"
        id="bankEMI"
      >
        Open EMI Calculator
      </button>


      <button
        class="secondary"
        id="bankDPD"
      >
        Open DPD Calculator
      </button>
    `
  );


  document
    .getElementById(
      "bankEMI"
    )
    .addEventListener(
      "click",
      openEMI
    );


  document
    .getElementById(
      "bankDPD"
    )
    .addEventListener(
      "click",
      openDPD
    );

}


function openDPD() {

  showModule(
    "DPD Calculator",

    `
      <p>
        Due date aur payment date enter karein.
      </p>


      <div class="form-group">

        <label>
          Due Date
        </label>

        <input
          class="form-input"
          id="dueDate"
          type="date"
        >

      </div>


      <div class="form-group">

        <label>
          Payment Date
        </label>

        <input
          class="form-input"
          id="paymentDate"
          type="date"
        >

      </div>


      <button
        class="primary"
        id="calculateDPD"
      >
        Calculate DPD
      </button>


      <div id="dpdResult"></div>
    `
  );


  document
    .getElementById(
      "calculateDPD"
    )
    .addEventListener(
      "click",
      calculateDPD
    );

}


function calculateDPD() {

  const due =
    new Date(
      document
        .getElementById(
          "dueDate"
        )
        .value
    );


  const payment =
    new Date(
      document
        .getElementById(
          "paymentDate"
        )
        .value
    );


  if (
    isNaN(due.getTime()) ||
    isNaN(payment.getTime())
  ) {

    alert(
      "Dono dates select karein."
    );

    return;

  }


  const days =
    Math.ceil(
      (
        payment - due
      ) /
      (
        1000 *
        60 *
        60 *
        24
      )
    );


  const dpd =
    Math.max(
      0,
      days
    );


  document.getElementById(
    "dpdResult"
  )
