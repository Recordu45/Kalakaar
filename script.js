console.log("KALAKAAR JS LOADED");

document.addEventListener("DOMContentLoaded", function () {

  console.log("DOM READY");

  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  const closeModal = document.getElementById("closeModal");

  function openTest(title, text) {

    if (!modal) {
      alert("ERROR: modal nahi mila");
      return;
    }

    modalTitle.textContent = title;
    modalText.textContent = text;

    modal.classList.add("show");
  }

  document.querySelectorAll("[data-open]").forEach(function (button) {

    button.addEventListener("click", function (event) {

      event.preventDefault();

      const key = this.getAttribute("data-open");

      console.log("CLICK:", key);

      if (key === "emi") {
        openTest(
          "EMI Calculator",
          "EMI Calculator successfully open ho raha hai."
        );
      }

      else if (key === "ledger") {
        openTest(
          "Customer Ledger",
          "Customer Ledger successfully open ho raha hai."
        );
      }

      else if (key === "resume") {
        openTest(
          "Resume Builder",
          "Resume Builder successfully open ho raha hai."
        );
      }

      else if (key === "notes") {
        openTest(
          "AI Notes",
          "AI Notes successfully open ho raha hai."
        );
      }

      else if (key === "business") {
        openTest(
          "Business AI",
          "Business AI successfully open ho raha hai."
        );
      }

      else if (key === "banking") {
        openTest(
          "Banking & Finance",
          "Banking & Finance successfully open ho raha hai."
        );
      }

      else if (key === "jobs") {
        openTest(
          "AI Resume & Jobs",
          "AI Resume & Jobs successfully open ho raha hai."
        );
      }

      else if (key === "services") {
        openTest(
          "Local Services",
          "Local Services successfully open ho raha hai."
        );
      }

      else if (key === "study") {
        openTest(
          "AI Study",
          "AI Study successfully open ho raha hai."
        );
      }

      else if (key === "crm") {
        openTest(
          "WhatsApp CRM",
          "WhatsApp CRM successfully open ho raha hai."
        );
      }

    });

  });


  if (closeModal) {

    closeModal.addEventListener("click", function () {

      modal.classList.remove("show");

    });

  }


  if (modal) {

    modal.addEventListener("click", function (event) {

      if (event.target === modal) {
        modal.classList.remove("show");
      }

    });

  }

});
