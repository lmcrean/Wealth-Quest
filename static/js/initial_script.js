"use strict";

const professionCard = {
  name: document.getElementById("profession-card-name"),

  // Income tab
  salary: document.getElementById("profession-card-salary"),
  interest: document.getElementById("profession-card-interest"),
  realEstate: document.getElementById("profession-card-real-estate"),
  passiveIncome: document.getElementById("profession-card-pasive-income"),
  totalIncome: document.getElementById("profession-card-total-income"),

  // Expenses tab
  taxes: document.getElementById("profession-card-taxes"),
  homeMortgage: document.getElementById("profession-card-home-mortgage"),
  schoolLoan: document.getElementById("profession-card-school-loan"),
  carLoan: document.getElementById("profession-card-car-loan"),
  creditCard: document.getElementById("profession-card-credit-card"),
  retailExpenses: document.getElementById("profession-card-retail-expenses"),
  otherExpenses: document.getElementById("profession-card-other-expenses:"),
  childExpenses: document.getElementById("profession-card-child-expenses:"),
  bankLoanPayment: document.getElementById("profession-card-bank-loan-payment"),

  childrenCount: document.getElementById("profession-card-children-count"),
  perChildExpense: document.getElementById("profession-card-per-child-expense"),
  totalExpenses: document.getElementById("profession-card-total-expenses"),
  monthlyCashFlow: document.getElementById("profession-card-monthly-cashflow"),

  // Assets and Liabilities
  savings: document.getElementById("profession-savings"),
  additionalAssets: document.getElementById("profession-card-additional-assets"),
  homeMortgageLiabilities: document.getElementById("profession-card-home-mortgage-liabilities"),
  schoolLoanLiabilities: document.getElementById("profession-card-school-loan-liabilities"),
  carLoanLiabilities: document.getElementById("profession-card-car-loan-liabilities"),
  creditCardLiabilities: document.getElementById("profession-card-credit-card-liabilities"),
  retailLiabilities: document.getElementById("profession-card-retail-liabilities"),
  bankLiabilities: document.getElementById("profession-card-bank-loan"),
};

const gameDataHTML = {
  progressBar: document.getElementById("progress-bar"),
  progressBarContainer: document.getElementById("progress-bar-container"),
  eventCard: document.getElementById("event-card"),
};

// Profession card modal carousel
const carouselInner = document.querySelector(".carousel-inner");

// Game variables with initial values
let gameData = {
  currentMonth: 1,
  passiveIncome: 0,
  totalExpenses: 0,
  progressBarPerecentage: 0,
  bankLoanProcentage: 10, // 5% of the loan is added to the loan as a fee

  chances: [
    {
      id: 1,
      name: "Payday",
      chance: 5,
    },
    {
      id: 2,
      name: "Money Loss",
      chance: 5,
    },
    {
      id: 3,
      name: "Deal",
      chance: 10,
    },
  ],
};

// variable taken from json to have list of all professions
let professions;

// variable that is selected by player chosing his profession within selectProfession() function
let profession;

fetch("static/game_data/professions.json")
  .then((response) => response.json())
  .then((json) => {
    professions = json;
    createProfessionCarousel();
  });

let deals;

fetch("static/game_data/deals.json")
  .then((response) => response.json())
  .then((json) => {
    deals = json;
  });

let lifeEvents;
fetch("static/game_data/life_events.json")
  .then((response) => response.json())
  .then((json) => {
    lifeEvents = json;
  });

let childEvents;
fetch("static/game_data/child_events.json")
  .then((response) => response.json())
  .then((json) => {
    childEvents = json;
  });

function createProfessionCarousel() {
  professions.forEach((profession, index) => {
    const isActive = index === 0 ? "active" : "";
    const carouselItem = `
          <div class="carousel-item ${isActive}" data-profession-id="${profession.id}">
            <h5>${profession.profession}</h5>
            <p>Salary: $${profession.incomes.salary}</p>
            <p>Total Expenses: $${calculateTotalExpenses(profession)}</p>
            <p>Savings: $${profession.assets.saving}</p>
          </div>
        `;
    carouselInner.innerHTML += carouselItem;
  });
}

// Sets up initial bank rate for display
function setInitialBankRate() {
  document.getElementById("bank-rate").textContent = gameData.bankLoanProcentage;
}

setInitialBankRate();

function barrowFromBank() {
  const inputValue = document.getElementById("bankInput").value;
  const bankLoan = parseInt(inputValue);

  // Check if the input is a valid number and a multiple of 10
  if (bankLoan % 100 === 0) {
    const bankLoanLiability = (bankLoan * gameData.bankLoanProcentage) / 100;
    profession.expenses.bankLoanPayment += bankLoanLiability;
    profession.liabilities.bankLoan += bankLoan;
    profession.assets.saving += bankLoan;

    finishTurn();
    alert(`You have barrowed from bank ${bankLoan}.`);
  } else {
    alert("Please enter a valid multiple of 100.");
  }
}
