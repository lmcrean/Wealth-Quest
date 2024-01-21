"use strict";

const professionCard = {
  name: document.getElementById("profession-card-name"),

  // Income tab
  salary: document.getElementById("profession-card-salary"),
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

  // Assets
  savings: document.getElementById("profession-savings"),

  additionalAssets: document.getElementById("profession-card-additional-assets"),

  // Liabilities
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
  paydayCard: document.getElementById("payday-card"),
};

// Profession card modal carousel
const carouselInner = document.querySelector(".carousel-inner");

const rollDiceBtn = document.getElementById("roll-dice-btn");
const orderInputSpan = document.getElementById("order-input-span");
const orderCountInput = document.getElementById("orderCountInput");
const acceptOfferBtn = document.getElementById("accept-offer-btn");
const rejectOfferBtn = document.getElementById("reject-offer-btn");

// Game variables with initial values
let gameData = {
  currentMonth: 1,
  passiveIncome: 0,
  totalExpenses: 0,
  progressBarPerecentage: 0,
  bankLoanProcentage: 10, // 5% of the loan is added to the loan as a fee
  offerId: 0,

  // Adjust chances to increse or decrese occurance of events
  chances: [
    {
      id: 1,
      name: "Payday",
      chance: 5,
    },
    {
      id: 2,
      name: "Money Loss", // Life events
      chance: 5,
    },
    {
      id: 3,
      name: "Deal",
      chance: 5,
    },
    {
      id: 4,
      name: "opportunity",
      chance: 0,
    },
  ],
  opportunityChance: 1,
};

// variable taken from json to have list of all professions
let professions;

// variable that is selected by player chosing his profession within selectProfession() function
let profession;

// Functions for local storage operations
function setLocalStorage(data) {
  localStorage.setItem(`professions`, JSON.stringify(data));
}

function getLocalStorage() {
  const data = localStorage.getItem(`professions`);
  return data ? JSON.parse(data) : null;
}

// Function to fetch initial data
function fetchInitialData() {
  return fetch("static/game_data/professions.json").then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    return response.json();
  });
}
// Check local storage for saved game
const storedProfessions = getLocalStorage();

if (storedProfessions) {
  // Use stored data if available
  professions = storedProfessions;
  createProfessionCarousel();
} else {
  // Fetch initial data if not found in local storage
  fetchInitialData().then((json) => {
    // Process and use fetched data
    professions = json;
    createProfessionCarousel();
  });
}

// Collects deals from database
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

let buttonTitles;
fetch("static/game_data/buttons.json")
  .then((response) => response.json())
  .then((json) => {
    buttonTitles = json;
  });

function createProfessionCarousel() {
  console.log(professions);
  professions.forEach((profession, index) => {
    console.log(profession);
    console.log(profession.id);
    const isActive = index === 0 ? "active" : "";
    const carouselItem = `
          <div class="carousel-item ${isActive}" data-profession-id="${profession.id}">
            <h5>${profession.profession}</h5>
            <p>Salary: £${profession.incomes.salary}</p>
            <p>Total Expenses: £${calculateTotalExpenses(profession)}</p>
            <p>Savings: £${profession.assets.saving}</p>
            ${
              profession.victory === 0
                ? "<p>You have not won the game as this profesion</p>"
                : `<p>Fastest financial Freedom in ${profession.victory} months</p>`
            }
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

    console.log(profession);
    finishTurn();
    alert(`You have barrowed from bank ${bankLoan}.`);
  } else {
    alert("Please enter a valid multiple of 100.");
  }
}

// Check for game end functionality
function checkForGameEnd() {
  // Win = passive income > expenses
  if (profession.passiveIncome >= profession.totalExpenses) {
    win();
    // Lose = bank balance & cash flow =< 0
  } else if (profession.assets.saving <= 0 && profession.finalCashFlow <= 0) {
    lose();
  }
}

function win() {
  updateProfessionsLS();
  // Get the modal element
  const gameEndModal = new bootstrap.Modal(document.getElementById("gameEndModal"));

  // Change the modal title and content
  document.getElementById("gameEndModalLabel").innerText = "Congratulations!";
  document.getElementById("gameEndModalContent").innerText =
    "You have successfully achieved the goal of having a higher passive income than expenses! Which means you could quit your job and your bank balance won't go down. \n Hooray. Hopefully, you have learnt a lot from playing and might have an idea of how you could apply this to real life.";

  // Show the modal
  gameEndModal.show();

  // End game and reset variables
  endGame();
}

function lose() {
  // Get the modal element
  const gameEndModal = new bootstrap.Modal(document.getElementById("gameEndModal"));

  // Change the modal title and content
  document.getElementById("gameEndModalLabel").innerText = "Unlucky!";
  document.getElementById("gameEndModalContent").innerText =
    "It looks like you've gone bankrupt. Good thing it's just a game! Maybe try again with a different profession and new tactics";

  // Show the modal
  gameEndModal.show();

  // End game and reset variables
  endGame();
}

function endGame() {
  // resset buttons
  rollDiceBtnOff(false);
  acceptBtnOff(true);
  rejectBtnOff(true);
  orderInputOff(true);
  // Reset variables

  fetch("static/game_data/deals.json")
    .then((response) => response.json())
    .then((json) => {
      deals = json;
    });

  (gameData.currentMonth = 1),
    (gameData.passiveIncome = 0),
    (gameData.totalExpenses = 0),
    (gameData.progressBarPerecentage = 0),
    (gameData.bankLoanProcentage = 10),
    (gameData.offerId = 0),
    (profession = null);
  // Return user to welcome page?
}

function updateProfessionsLS() {
  const index = professions.findIndex((profession) => profession.id === profession.id);
  if (professions[index].victory === 0) {
    professions[index].victory = gameData.currentMonth;
  } else if (professions[index].victory > gameData.currentMonth) {
    professions[index].victory = gameData.currentMonth;
  }
  setLocalStorage(professions);
}
