// ==============================
// SMARTPAY BANKING APP
// Front-end demonstration only
// ==============================

let balance = 2450780.50;

const balanceElement = document.getElementById("balance");
const modal = document.getElementById("successModal");

// ------------------------------
// Navigation
// ------------------------------

const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".section");
const pageTitle = document.getElementById("pageTitle");

function showSection(sectionId) {

  sections.forEach(section => {
    section.classList.remove("active-section");
  });

  const target = document.getElementById(sectionId);

  if (target) {
    target.classList.add("active-section");
  }

  navItems.forEach(item => {
    item.classList.remove("active");

    if (item.dataset.section === sectionId) {
      item.classList.add("active");
    }
  });

  const titles = {
    dashboard: "Dashboard",
    transfer: "Transfer Money",
    transactions: "Transactions",
    cards: "My Cards",
    settings: "Settings"
  };

  pageTitle.textContent = titles[sectionId] || "Dashboard";

  // Close mobile sidebar
  document.getElementById("sidebar").classList.remove("open");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

navItems.forEach(item => {

  item.addEventListener("click", event => {

    event.preventDefault();

    showSection(item.dataset.section);

  });

});

// ------------------------------
// Quick Actions
// ------------------------------

document.querySelectorAll(".action-card").forEach(button => {

  button.addEventListener("click", () => {

    const action = button.dataset.action;

    if (action === "transfer") {
      showSection("transfer");
    }

    if (action === "cards") {
      showSection("cards");
    }

    if (action === "deposit") {
      openMoneyDialog("Deposit");
    }

    if (action === "withdraw") {
      openMoneyDialog("Withdraw");
    }

  });

});

// ------------------------------
// Balance visibility
// ------------------------------

let balanceVisible = true;

document.getElementById("toggleBalance").addEventListener("click", () => {

  balanceVisible = !balanceVisible;

  if (balanceVisible) {
    balanceElement.textContent =
      "₦" + balance.toLocaleString("en-NG", {
        minimumFractionDigits: 2
      });
  } else {
    balanceElement.textContent = "₦••••••••";
  }

});

// ------------------------------
// Transfer
// ------------------------------

document.getElementById("transferForm").addEventListener("submit", event => {

  event.preventDefault();

  const recipient = document.getElementById("recipient").value.trim();

  const amount = Number(
    document.getElementById("transferAmount").value
  );

  const description =
    document.getElementById("description").value.trim();

  if (recipient.length < 10) {

    alert("Please enter a valid account number.");

    return;
  }

  if (amount <= 0 || Number.isNaN(amount)) {

    alert("Please enter a valid amount.");

    return;
  }

  if (amount > balance) {

    alert("Insufficient balance.");

    return;
  }

  // Demo balance update
  balance -= amount;

  updateBalance();

  document.getElementById("successMessage").textContent =
    `₦${amount.toLocaleString("en-NG", {
      minimumFractionDigits: 2
    })} has been transferred successfully to account ${recipient}.`;

  modal.classList.add("show");

  document.getElementById("transferForm").reset();

});

// ------------------------------
// Update Balance
// ------------------------------

function updateBalance() {

  if (!balanceVisible) {
    return;
  }

  balanceElement.textContent =
    "₦" + balance.toLocaleString("en-NG", {
      minimumFractionDigits: 2
    });

}

// ------------------------------
// Modal
// ------------------------------

document.getElementById("closeModal").addEventListener("click", () => {

  modal.classList.remove("show");

  showSection("dashboard");

});

modal.addEventListener("click", event => {

  if (event.target === modal) {
    modal.classList.remove("show");
  }

});

// ------------------------------
// Deposit / Withdraw demo
// ------------------------------

function openMoneyDialog(type) {

  const amountString = prompt(
    `${type} amount in Naira:`
  );

  if (amountString === null) {
    return;
  }

  const amount = Number(amountString);

  if (!amount || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  if (type === "Deposit") {

    balance += amount;

    alert(
      `Deposit successful: ₦${amount.toLocaleString("en-NG")}`
    );

  } else {

    if (amount > balance) {
      alert("Insufficient balance.");
      return;
    }

    balance -= amount;

    alert(
      `Withdrawal successful: ₦${amount.toLocaleString("en-NG")}`
    );
  }

  updateBalance();

}

// ------------------------------
// Transaction Search
// ------------------------------

document.getElementById("searchTransaction")
  .addEventListener("input", function () {

    const searchTerm = this.value.toLowerCase();

    const transactions =
      document.querySelectorAll("#allTransactions .transaction");

    transactions.forEach(transaction => {

      const text =
        transaction.textContent.toLowerCase();

      if (text.includes(searchTerm)) {
        transaction.style.display = "flex";
      } else {
        transaction.style.display = "none";
      }

    });

  });

// ------------------------------
// Settings
// ------------------------------

document.getElementById("saveSettings")
  .addEventListener("click", () => {

    alert("Your settings have been saved.");

  });

// ------------------------------
// Mobile menu
// ------------------------------

document.getElementById("menuBtn")
  .addEventListener("click", () => {

    document.getElementById("sidebar")
      .classList.toggle("open");

  });

// ------------------------------
// Logout
// ------------------------------

document.getElementById("logoutBtn")
  .addEventListener("click", () => {

    const confirmed =
      confirm("Are you sure you want to log out?");

    if (confirmed) {
      alert("You have been logged out.");
    }

  });

// ------------------------------
// View All Transactions
// ------------------------------

document.querySelectorAll(".view-all").forEach(button => {

  button.addEventListener("click", () => {

    showSection(button.dataset.section);

  });

});

// Initial balance formatting
updateBalance();
