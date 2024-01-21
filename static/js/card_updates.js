// called when the carusel choise is made
function selectProfession() {
  let id = document.querySelector(".carousel-item.active").getAttribute("data-profession-id");

  profession = professions.find((profession) => profession.id === parseInt(id));

  professionCard.name.innerText = profession.profession;

  // INITIAL VALUES
  profession.childrenCount = 0;
  profession.expenses.bankLoanPayment = 0;
  profession.liabilities.bankLoan = 0;

  profession.expenses.child = profession.perChildExpense * profession.childrenCount;
  profession.passiveIncome = calculatePassiveIncome(profession);
  profession.totalIncome = calculateTotalIncome(profession);
  profession.totalExpenses = calculateTotalExpenses(profession);
  profession.finalCashFlow = profession.totalIncome - profession.totalExpenses;
  profession.additionalAssets = [];
  childrenCountChange(0);

  updateProfessionHTML();
  updateGameData();
}

// called when spin the weal button is clicked
function selectRandomEvent() {
  checkForGameEnd();
  acceptBtnOff(true);
  rejectBtnOff(true);
  orderInputOff(true);
  const event = choseRandomEvent(gameData.chances).id;
  switch (event) {
    case 1:
      gameData.chances[0].chance = 5;
      payday();
      break;
    case 2:
      gameData.chances[0].chance += 1;
      lifeEvent();
      break;
    case 3:
      gameData.chances[0].chance += 1;
      deal();
      break;
    case 4:
      gameData.chances[0].chance += 1;
      opportunity();
      break;
    default:
      break;
  }
  createButtonName();
  finishTurn();
}

// updates profestion card HTML with new values
function updateProfessionHTML() {
  // Income tab
  professionCard.salary.innerText = profession.incomes.salary;
  professionCard.realEstate.innerText = profession.incomes.realEstate;
  professionCard.passiveIncome.innerText = profession.passiveIncome;
  professionCard.totalIncome.innerText = profession.totalIncome;

  // Expenses tab
  professionCard.taxes.innerText = profession.expenses.taxes;
  professionCard.homeMortgage.innerText = profession.expenses.homeMortgage;
  professionCard.schoolLoan.innerText = profession.expenses.schoolLoan;
  professionCard.carLoan.innerText = profession.expenses.carLoan;
  professionCard.creditCard.innerText = profession.expenses.creditCard;
  professionCard.retailExpenses.innerText = profession.expenses.retail;
  professionCard.otherExpenses.innerText = profession.expenses.other;
  professionCard.childExpenses.innerText = profession.expenses.child;
  professionCard.bankLoanPayment.innerText = profession.expenses.bankLoanPayment;

  //  Totals
  professionCard.childrenCount.innerText = profession.childrenCount;
  professionCard.perChildExpense.innerText = profession.perChildExpense;
  professionCard.totalExpenses.innerText = profession.totalExpenses;
  professionCard.monthlyCashFlow.innerText = profession.finalCashFlow;

  // Assets
  professionCard.savings.innerText = profession.assets.saving;
  fillAdditionalAssets();

  // Liabilities
  professionCard.homeMortgageLiabilities.innerText = profession.liabilities.homeMortages;
  professionCard.schoolLoanLiabilities.innerText = profession.liabilities.schoolLoans;
  professionCard.carLoanLiabilities.innerText = profession.liabilities.carLoans;
  professionCard.creditCardLiabilities.innerText = profession.liabilities.creditCards;
  professionCard.retailLiabilities.innerText = profession.liabilities.retailDebt;
  professionCard.bankLiabilities.innerText = profession.liabilities.bankLoan;
}

// updates game data HTML with new values
function updateGameData() {
  gameData.totalExpenses = profession.totalExpenses;
  gameData.passiveIncome = profession.passiveIncome;
  calculateProgressBar();
  gameDataHTML.progressBarContainer.setAttribute("aria-valuemax", gameData.totalExpenses);
  gameDataHTML.progressBar.style.width = `${gameData.progressBarPerecentage}%`;
  gameDataHTML.progressBar.innerText = `${gameData.passiveIncome} / ${gameData.totalExpenses}`;

  gameDataHTML.paydayCard.innerText = `Month: ${gameData.currentMonth}`;
}

function finishTurn() {
  profession.expenses.child = profession.perChildExpense * profession.childrenCount;
  profession.passiveIncome = calculatePassiveIncome(profession);
  profession.totalIncome = calculateTotalIncome(profession);
  profession.totalExpenses = calculateTotalExpenses(profession);
  profession.finalCashFlow = profession.totalIncome - profession.totalExpenses;
  updateProfessionHTML();
  updateGameData();
}

// fill additional assets function
function fillAdditionalAssets() {
  professionCard.additionalAssets.innerText = "";
  let additionalAssetsHTML = "";

  profession.additionalAssets.forEach((asset) => {
    additionalAssetsHTML += `<div class="d-flex justify-content-between">
                <p>
                  ${asset.title}(x${asset.additionalAmount}):
                  <span
                    class="question-mark"
                    onmouseover="showTooltip(event, 'asset${asset.id}Tooltip')"
                    onmouseout="hideTooltip('asset${asset.id}Tooltip')"
                    ><i class="fa-regular fa-circle-question"></i
                  ></span>
                </p>
                <!-- Tooltip for Bank Balance -->
                <div id="asset${asset.id}Tooltip" class="tooltip-box">
                  This asset provides you with ${asset.passive_income} passive income per month
                </div>
                <p id="profession-savings">${asset.initial_cost}</p>
              </div>`;
  });
  professionCard.additionalAssets.innerHTML = additionalAssetsHTML;
}

function liabilityPayOff(liability) {
  switch (liability) {
    case "house":
      if (profession.liabilities.homeMortages === 0) {
        alert("You don't have any home mortgage debt");
      } else if (profession.assets.saving >= profession.liabilities.homeMortages) {
        profession.assets.saving -= profession.liabilities.homeMortages;
        profession.liabilities.homeMortages = 0;
        profession.expenses.homeMortgage = 0;
      } else {
        alert("You don't have enough money to pay off your home mortgage");
      }
      break;
    case "student":
      if (profession.liabilities.schoolLoans === 0) {
        alert("You don't have any student loan debt");
      } else if (profession.assets.saving >= profession.liabilities.schoolLoans) {
        profession.assets.saving -= profession.liabilities.schoolLoans;
        profession.liabilities.schoolLoans = 0;
        profession.expenses.schoolLoan = 0;
      } else {
        alert("You don't have enough money to pay off your student loan");
      }
      break;
    case "car":
      if (profession.liabilities.carLoans === 0) {
        alert("You don't have any car loan debt");
      } else if (profession.assets.saving >= profession.liabilities.carLoans) {
        profession.assets.saving -= profession.liabilities.carLoans;
        profession.liabilities.carLoans = 0;
        profession.expenses.carLoan = 0;
      } else {
        alert("You don't have enough money to pay off your car loan");
      }
      break;
    case "creditCard":
      if (profession.liabilities.creditCards === 0) {
        alert("You don't have any credit card debt");
      } else if (profession.assets.saving >= profession.liabilities.creditCards) {
        profession.assets.saving -= profession.liabilities.creditCards;
        profession.liabilities.creditCards = 0;
        profession.expenses.creditCard = 0;
      } else {
        alert("You don't have enough money to pay off your credit card");
      }
      break;
    case "retail":
      if (profession.liabilities.retailDebt === 0) {
        alert("You don't have any retail debt");
      } else if (profession.assets.saving >= profession.liabilities.retailDebt) {
        profession.assets.saving -= profession.liabilities.retailDebt;
        profession.liabilities.retailDebt = 0;
        profession.expenses.retail = 0;
      } else {
        alert("You don't have enough money to pay off your retail debt");
      }
      break;
    case "bank":
      if (profession.liabilities.bankLoan === 0) {
        alert("You don't have any bank loan debt");
      } else if (profession.assets.saving >= profession.liabilities.bankLoan) {
        profession.assets.saving -= profession.liabilities.bankLoan;
        profession.liabilities.bankLoan = 0;
        profession.expenses.bankLoanPayment = 0;
      } else {
        alert("You don't have enough money to pay off your bank loan");
      }
      break;
    default:
      break;
  }
  finishTurn();
}

// create button name function
function createButtonName() {
  const button = choseRandomEvent(buttonTitles);
  rollDiceBtn.innerText = button.title;
}

function rollDiceBtnOff(status) {
  if (status) {
    rollDiceBtn.style.display = `none`;
  } else {
    rollDiceBtn.style.display = "inline-block";
  }
}

// value input off and initial set up
function orderInputOff(status) {
  if (status) {
    orderCountInput.style.display = `none`;
    orderInputSpan.style.display = `none`;
  } else {
    orderCountInput.style.display = "inline-block";
    orderInputSpan.style.display = "inline-block";
  }
}
orderInputOff(true);

// accept button turn off and initial set up
function acceptBtnOff(status) {
  if (status) {
    acceptOfferBtn.style.display = `none`;
  } else {
    acceptOfferBtn.style.display = "inline-block";
  }
}
acceptBtnOff(true);

// accept button turn off and initial set up
function rejectBtnOff(status) {
  if (status) {
    rejectOfferBtn.style.display = `none`;
  } else {
    rejectOfferBtn.style.display = "inline-block";
  }
}
rejectBtnOff(true);

// Resset button roll dice
function resetRollDiceBtn() {
  rollDiceBtnOff(false);
  rejectBtnOff(true);
}
