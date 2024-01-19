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

  childrenCount: document.getElementById("profession-card-children-count"),
  perChildExpense: document.getElementById("profession-card-per-child-expense"),
  totalExpenses: document.getElementById("profession-card-total-expenses"),
  monthlyCashFlow: document.getElementById("profession-card-monthly Cashflow"),

  // Assets and Liabilities
  savings: document.getElementById("profession-savings"),
  additionalAssets: document.getElementById("profession-card-additional-assets"),
  homeMortgageLiabilities: document.getElementById("profession-card-home-mortgage-liabilities"),
  schoolLoanLiabilities: document.getElementById("profession-card-school-loan-liabilities"),
  carLoanLiabilities: document.getElementById("profession-card-car-loan-liabilities"),
  creditCardLiabilities: document.getElementById("profession-card-credit-card-liabilities"),
  retailLiabilities: document.getElementById("profession-card-retail-liabilities"),
};

const gameDataHTML = {
  progressBar: document.getElementById("progress-bar"),
  progressBarContainer: document.getElementById("progress-bar-container"),
};

// Profession card modal carousel
const carouselInner = document.querySelector(".carousel-inner");

// variable taken from json to have list of all professions
let professions;

// Game variables with initial values
let gameData = {
  currentMonth: 1,
  passiveIncome: 0,
  totalExpenses: 0,
  progressBarPerecentage: 0,
};

// variable that is selected by player chosing his profession within selectProfession() function
let profession;

const bakLoanProcentage = 0.05; // 5%

fetch("/static/game_data/professions.json")
  .then((response) => response.json())
  .then((json) => {
    professions = json;
    createProfessionCarousel();
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
