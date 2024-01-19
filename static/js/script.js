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

// Profession card modal carousel
const carouselInner = document.querySelector(".carousel-inner");

let professions;
fetch("/static/game_data/professions.json")
  .then((response) => response.json())
  .then((json) => {
    professions = json;
    console.log(professions);
    createProfesionCarousel();
  });

function createProfesionCarousel() {
  professions.forEach((profession, index) => {
    const isActive = index === 0 ? "active" : "";
    const carouselItem = `
          <div class="carousel-item ${isActive}" data-profession-id="${profession.id}">
            <h5>${profession.profession}</h5>
            <p>Salary: $${profession.income.salary}</p>
            <p>Total Expenses: $${calculateTotalExpenses(profession.expenses)}</p>
            <p>Savings: $${profession.assets.saving}</p>
          </div>
        `;
    carouselInner.innerHTML += carouselItem;
  });
}

function selectProfesion() {
  let id = document.querySelector(".carousel-item.active").getAttribute("data-profession-id");

  const profession = professions.find((profession) => profession.id === parseInt(id));
  console.log(profession);
  professionCard.name.innerText = profession.profession;

  // Income tab
  professionCard.salary.innerText = profession.income.salary;
  professionCard.interest.innerText = profession.income.interest;
  professionCard.realEstate.innerText = profession.income.realEstate;
  professionCard.passiveIncome.innerText = profession.income.passiveIncome;
  professionCard.totalIncome.innerText = profession.income.totalIncome;

  // Expenses tab
  professionCard.taxes.innerText = profession.expenses.taxes;
  professionCard.homeMortgage.innerText = profession.expenses.homeMortgage;
  professionCard.schoolLoan.innerText = profession.expenses.schoolLoan;
  professionCard.carLoan.innerText = profession.expenses.carLoan;
  professionCard.creditCard.innerText = profession.expenses.creditCard;
  professionCard.retailExpenses.innerText = profession.expenses.retail;
  professionCard.otherExpenses.innerText = profession.expenses.other;
  professionCard.childExpenses.innerText = profession.expenses.child;
  professionCard.childrenCount.innerText = 0;
  professionCard.perChildExpense.innerText = profession.perChildExpense;
  professionCard.totalExpenses.innerText = profession.expenses.totalExpenses;
  professionCard.monthlyCashFlow.innerText = profession.expenses.monthlyCashFlow;

  // Assets and Liabilities
  professionCard.savings.innerText = profession.assets.savings;
  professionCard.additionalAssets.innerText = profession.assets.additionalAssets;
  professionCard.homeMortgageLiabilities.innerText = profession.liabilities.homeMortgage;
  professionCard.schoolLoanLiabilities.innerText = profession.liabilities.schoolLoan;
  professionCard.carLoanLiabilities.innerText = profession.liabilities.carLoan;
  professionCard.creditCardLiabilities.innerText = profession.liabilities.creditCard;
  professionCard.retailLiabilities.innerText = profession.liabilities.retailLiabilities;
}
