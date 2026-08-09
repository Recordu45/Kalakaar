/* =========================================================
   KALAKAAR V3
   Frontend Application Logic
========================================================= */

const API_URL = "https://kalakaar-gzvn.onrender.com";

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalAction = document.getElementById("modalAction");
const closeModal = document.getElementById("closeModal");

const searchInput = document.getElementById("searchInput");
const moduleCount = document.getElementById("moduleCount");

let currentModule = null;


/* =========================================================
   BASIC MODAL
========================================================= */

function openModal() {
  if (modal) {
    modal.classList.add("show");
  }
}

function closeModule() {
  if (modal) {
    modal.classList.remove("show");
  }
}

if (closeModal) {
  closeModal.addEventListener("click", closeModule);
}

if (modal) {
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModule();
    }
  });
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModule();
  }
});


/* =========================================================
   MODAL CONTENT
========================================================= */

function showModule(title, html) {

  currentModule = title;

  modalTitle.textContent = title;

  modalText.innerHTML = html;

  if (modalAction) {
    modalAction.style.display = "none";
  }

  openModal();
}


/* =========================================================
   EMI CALCULATOR
========================================================= */

function openEMI() {

  showModule(
    "EMI Calculator",
    `
      <p>Loan amount, interest rate aur tenure enter karke EMI calculate karein.</p>

      <div class="form-group">
        <label>Loan Amount (₹)</label>
        <input
          class="form-input"
          id="emiAmount"
          type="number"
          placeholder="100000"
        >
      </div>

      <div class="form-group">
        <label>Annual Interest Rate (%)</label>
        <input
          class="form-input"
          id="emiRate"
          type="number"
          step="0.01"
          placeholder="12"
        >
      </div>

      <div class="form-group">
        <label>Tenure (Months)</label>
        <input
          class="form-input"
          id="emiMonths"
          type="number"
          placeholder="24"
        >
      </div>

      <button class="primary" id="calculateEMI">
        Calculate EMI
      </button>

      <div id="emiResult"></div>
    `
  );

  document
    .getElementById("calculateEMI")
    .addEventListener("click", calculateEMI);
}

function calculateEMI() {

  const amount =
    Number(document.getElementById("emiAmount").value);

  const annualRate =
    Number(document.getElementById("emiRate").value);

  const months =
    Number(document.getElementById("emiMonths").value);

  if (
    !amount ||
    !annualRate ||
    !months ||
    amount <= 0 ||
    annualRate < 0 ||
    months <= 0
  ) {

    document.getElementById("emiResult").innerHTML =
      `<div class="result-box">
        Please valid details enter karein.
      </div>`;

    return;
  }

  const monthlyRate =
    annualRate / 12 / 100;

  let emi;

  if (monthlyRate === 0) {
    emi = amount / months;
  } else {
    emi =
      amount *
      monthlyRate *
      Math.pow(1 + monthlyRate, months) /
      (Math.pow(1 + monthlyRate, months) - 1);
  }

  const totalPayment = emi * months;
  const totalInterest = totalPayment - amount;

  document.getElementById("emiResult").innerHTML =
    `
      <div class="result-box">

        <div class="result-label">
          Monthly EMI
        </div>

        <div class="result-main">
          ₹${formatMoney(emi)}
        </div>

        <hr>

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

let ledger = JSON.parse(
  localStorage.getItem("kalakaar-ledger") || "[]"
);

function openLedger() {

  showModule(
    "Customer Ledger",
    `
      <p>Customer transactions add karke balance track karein.</p>

      <div class="form-group">
        <label>Customer Name</label>
        <input
          class="form-input"
          id="ledgerName"
          placeholder="Customer name"
        >
      </div>

      <div class="form-row">

        <div class="form-group">
          <label>Amount</label>
          <input
            class="form-input"
            id="ledgerAmount"
            type="number"
            placeholder="1000"
          >
        </div>

        <div class="form-group">
          <label>Type</label>
          <select
            class="form-select"
            id="ledgerType"
          >
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>

      </div>

      <button class="primary" id="addLedger">
        Add Transaction
      </button>

      <div id="ledgerList"></div>
    `
  );

  renderLedger();

  document
    .getElementById("addLedger")
    .addEventListener("click", addLedgerEntry);
}

function addLedgerEntry() {

  const name =
    document.getElementById("ledgerName").value.trim();

  const amount =
    Number(document.getElementById("ledgerAmount").value);

  const type =
    document.getElementById("ledgerType").value;

  if (!name || !amount || amount <= 0) {

    alert("Customer name aur valid amount enter karein.");

    return;
  }

  ledger.unshift({
    id: Date.now(),
    name,
    amount,
    type,
    date: new Date().toLocaleDateString("en-IN")
  });

  localStorage.setItem(
    "kalakaar-ledger",
    JSON.stringify(ledger)
  );

  document.getElementById("ledgerName").value = "";
  document.getElementById("ledgerAmount").value = "";

  renderLedger();
}

function renderLedger() {

  const container =
    document.getElementById("ledgerList");

  if (!container) return;

  if (ledger.length === 0) {

    container.innerHTML =
      `<div class="empty">
        No transactions yet.
      </div>`;

    return;
  }

  container.innerHTML =
    `
      <div class="ledger-list">

        ${ledger.map(item => `

          <div class="ledger-item">

            <div>
              <strong>${escapeHTML(item.name)}</strong>
              <small>${item.date}</small>
            </div>

            <div class="${item.type}">
              ${item.type === "credit" ? "+" : "-"}
              ₹${formatMoney(item.amount)}
            </div>

          </div>

        `).join("")}

      </div>

      <button
        class="secondary danger"
        id="clearLedger"
      >
        Clear Ledger
      </button>
    `;

  document
    .getElementById("clearLedger")
    .addEventListener("click", function () {

      if (
        confirm("Kya aap poora ledger delete karna chahte hain?")
      ) {

        ledger = [];

        localStorage.setItem(
          "kalakaar-ledger",
          JSON.stringify(ledger)
        );

        renderLedger();
      }

    });
}


/* =========================================================
   RESUME BUILDER
========================================================= */

function openResume() {

  showModule(
    "Resume Builder",
    `
      <p>Basic professional resume details enter karein.</p>

      <div class="form-group">
        <label>Full Name</label>
        <input
          class="form-input"
          id="resumeName"
          placeholder="Your Name"
        >
      </div>

      <div class="form-group">
        <label>Email</label>
        <input
          class="form-input"
          id="resumeEmail"
          type="email"
          placeholder="you@example.com"
        >
      </div>

      <div class="form-group">
        <label>Phone</label>
        <input
          class="form-input"
          id="resumePhone"
          placeholder="Mobile number"
        >
      </div>

      <div class="form-group">
        <label>Professional Summary</label>
        <textarea
          class="form-textarea"
          id="resumeSummary"
          placeholder="Write your professional summary..."
        ></textarea>
      </div>

      <div class="form-group">
        <label>Skills</label>
        <textarea
          class="form-textarea"
          id="resumeSkills"
          placeholder="Excel, Banking, Communication..."
        ></textarea>
      </div>

      <button class="primary" id="generateResume">
        Generate Resume
      </button>

      <div id="resumeResult"></div>
    `
  );

  document
    .getElementById("generateResume")
    .addEventListener("click", generateResume);
}

function generateResume() {

  const name =
    document.getElementById("resumeName").value.trim();

  const email =
    document.getElementById("resumeEmail").value.trim();

  const phone =
    document.getElementById("resumePhone").value.trim();

  const summary =
    document.getElementById("resumeSummary").value.trim();

  const skills =
    document.getElementById("resumeSkills").value.trim();

  if (!name) {

    alert("Name enter karein.");

    return;
  }

  document.getElementById("resumeResult").innerHTML =
    `
      <div class="result-box">

        <h3>${escapeHTML(name)}</h3>

        <p>
          ${escapeHTML(email)}
          ${email && phone ? " | " : ""}
          ${escapeHTML(phone)}
        </p>

        <hr>

        <strong>Professional Summary</strong>

        <p>
          ${escapeHTML(summary || "Professional summary not added.")}
        </p>

        <strong>Skills</strong>

        <p>
          ${escapeHTML(skills || "Skills not added.")}
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
    .getElementById("printResume")
    .addEventListener("click", function () {
      window.print();
    });
}


/* =========================================================
   AI NOTES
========================================================= */

function openNotes() {

  showModule(
    "AI Notes",
    `
      <p>Topic enter karein. Kalakaar basic study notes generate karega.</p>

      <div class="form-group">
        <label>Topic</label>
        <input
          class="form-input"
          id="notesTopic"
          placeholder="Example: Banking, Excel, History"
        >
      </div>

      <div class="form-group">
        <label>Language</label>
        <select class="form-select" id="notesLanguage">
          <option value="Hinglish">Hinglish</option>
          <option value="Hindi">Hindi</option>
          <option value="English">English</option>
        </select>
      </div>

      <button class="primary" id="generateNotes">
        Generate Notes
      </button>

      <div id="notesResult"></div>
    `
  );

  document
    .getElementById("generateNotes")
    .addEventListener("click", generateNotes);
}

function generateNotes() {

  const topic =
    document.getElementById("notesTopic").value.trim();

  const language =
    document.getElementById("notesLanguage").value;

  if (!topic) {

    alert("Topic enter karein.");

    return;
  }

  let content = "";

  if (language === "Hinglish") {

    content = `
      <h3>${escapeHTML(topic)}</h3>

      <p>
        <strong>Definition:</strong>
        ${escapeHTML(topic)} ko simple language mein samajhne ke liye
        iska basic concept, important points aur practical examples
        ko study karein.
      </p>

      <p>
        <strong>Important Points:</strong>
      </p>

      <ul>
        <li>Basic concept samjhein.</li>
        <li>Important terms note karein.</li>
        <li>Real-life example dekhein.</li>
        <li>Practice questions solve karein.</li>
      </ul>

      <p>
        <strong>Revision Tip:</strong>
        Topic ko short points mein revise karein.
      </p>
    `;

  } else {

    content = `
      <h3>${escapeHTML(topic)}</h3>

      <p>
        Study notes for ${escapeHTML(topic)}.
      </p>

      <ul>
        <li>Understand the basic concept.</li>
        <li>Learn important terminology.</li>
        <li>Review practical examples.</li>
        <li>Practice related questions.</li>
      </ul>
    `;
  }

  document.getElementById("notesResult").innerHTML =
    `<div class="result-box">${content}</div>`;
}


/* =========================================================
   BUSINESS AI
========================================================= */

function openBusiness() {

  showModule(
    "Business AI",
    `
      <p>Business calculation aur report tools.</p>

      <div class="form-group">
        <label>Sales (₹)</label>
        <input
          class="form-input"
          id="businessSales"
          type="number"
          placeholder="50000"
        >
      </div>

      <div class="form-group">
        <label>Expenses (₹)</label>
        <input
          class="form-input"
          id="businessExpenses"
          type="number"
          placeholder="30000"
        >
      </div>

      <button class="primary" id="businessReport">
        Generate Report
      </button>

      <div id="businessResult"></div>
    `
  );

  document
    .getElementById("businessReport")
    .addEventListener("click", generateBusinessReport);
}

function generateBusinessReport() {

  const sales =
    Number(document.getElementById("businessSales").value);

  const expenses =
    Number(document.getElementById("businessExpenses").value);

  if (sales < 0 || expenses < 0) {

    alert("Valid amount enter karein.");

    return;
  }

  const profit = sales - expenses;

  document.getElementById("businessResult").innerHTML =
    `
      <div class="result-box">

        <div class="result-label">
          Total Sales
        </div>

        <strong>
          ₹${formatMoney(sales)}
        </strong>

        <br><br>

        <div class="result-label">
          Total Expenses
        </div>

        <strong>
          ₹${formatMoney(expenses)}
        </strong>

        <br><br>

        <div class="result-label">
          ${profit >= 0 ? "Profit" : "Loss"}
        </div>

        <div class="result-main">
          ₹${formatMoney(Math.abs(profit))}
        </div>

      </div>
    `;
}


/* =========================================================
   BANKING & FINANCE
========================================================= */

function openBanking() {

  showModule(
    "Banking & Finance",
    `
      <p>Banking productivity tools.</p>

      <div class="quick-grid">

        <button class="quick-card" id="bankEMI">
          <strong>₹</strong>
          <span>EMI</span>
        </button>

        <button class="quick-card" id="bankDPD">
          <strong>DPD</strong>
          <span>DPD Check</span>
        </button>

      </div>

      <div id="bankResult"></div>
    `
  );

  document
    .getElementById("bankEMI")
    .addEventListener("click", openEMI);

  document
    .getElementById("bankDPD")
    .addEventListener("click", openDPD);
}

function openDPD() {

  showModule(
    "DPD Calculator",
    `
      <p>Last payment date aur due date ke basis par DPD calculate karein.</p>

      <div class="form-group">
        <label>Due Date</label>
        <input
          class="form-input"
          id="dueDate"
          type="date"
        >
      </div>

      <div class="form-group">
        <label>Payment Date</label>
        <input
          class="form-input"
          id="paymentDate"
          type="date"
        >
      </div>

      <button class="primary" id="calculateDPD">
        Calculate DPD
      </button>

      <div id="dpdResult"></div>
    `
  );

  document
    .getElementById("calculateDPD")
    .addEventListener("click", calculateDPD);
}

function calculateDPD() {

  const due =
    new Date(document.getElementById("dueDate").value);

  const payment =
    new Date(document.getElementById("paymentDate").value);

  if (
    isNaN(due.getTime()) ||
    isNaN(payment.getTime())
  ) {

    alert("Dates select karein.");

    return;
  }

  const difference =
    Math.ceil(
      (payment - due) /
      (1000 * 60 * 60 * 24)
    );

  const dpd =
    Math.max(0, difference);

  document.getElementById("dpdResult").innerHTML =
    `
      <div class="result-box">

        <div class="result-label">
          Days Past Due
        </div>

        <div class="result-main">
          ${dpd} DPD
        </div>

      </div>
    `;
}


/* =========================================================
   JOBS
========================================================= */

function openJobs() {

  showModule(
    "AI Resume & Jobs",
    `
      <p>Resume aur interview preparation tools.</p>

      <button class="primary" id="jobResume">
        Open Resume Builder
      </button>

      <button class="secondary" id="jobInterview">
        Interview Questions
      </button>

      <div id="jobResult"></div>
    `
  );

  document
    .getElementById("jobResume")
    .addEventListener("click", openResume);

  document
    .getElementById("jobInterview")
    .addEventListener("click", function () {

      document.getElementById("jobResult").innerHTML =
        `
          <div class="result-box">

            <h3>Interview Preparation</h3>

            <ol>
              <li>Tell me about yourself.</li>
              <li>What are your strengths?</li>
              <li>Why should we hire you?</li>
              <li>Why do you want this job?</li>
              <li>Where do you see yourself in 5 years?</li>
            </ol>

          </div>
        `;
    });
}


/* =========================================================
   LOCAL SERVICES
========================================================= */

function openServices() {

  showModule(
    "Local Services",
    `
      <p>Service category select karein.</p>

      <div class="quick-grid">

        <button class="quick-card serviceBtn">
          <strong>⚡</strong>
          <span>Electrician</span>
        </button>

        <button class="quick-card serviceBtn">
          <strong>🔧</strong>
          <span>Plumber</span>
        </button>

        <button class="quick-card serviceBtn">
          <strong>🚗</strong>
          <span>Mechanic</span>
        </button>

        <button class="quick-card serviceBtn">
          <strong>❄</strong>
          <span>AC Repair</span>
        </button>

      </div>

      <div id="serviceResult"></div>
    `
  );

  document
    .querySelectorAll(".serviceBtn")
    .forEach(button => {

      button.addEventListener("click", function () {

        document.getElementById("serviceResult").innerHTML =
          `
            <div class="result-box">

              <strong>
                ${this.innerText} selected
              </strong>

              <p>
                Booking system next phase mein
                backend ke saath connect kiya ja sakta hai.
              </p>

            </div>
          `;
      });

    });
}


/* =========================================================
   STUDY
========================================================= */

function openStudy() {
  openNotes();
}


/* =========================================================
   WHATSAPP CRM
========================================================= */

function openCRM() {

  showModule(
    "WhatsApp CRM",
    `
      <p>Customer follow-up message prepare karein.</p>

      <div class="form-group">
  
