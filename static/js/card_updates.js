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
  childrenCountChange(0);

  updateProfessionHTML();
  updateGameData();
}

// called when spin the weal button is clicked
function selectRandomEvent() {
  const event = choseRandomEvent(gameData.chances).id;
  switch (event) {
    case 1:
      payday();
      break;
    case 2:
      lifeEvent();
      break;
    case 3:
      deal();
      break;
    default:
      break;
  }
}

// updates profestion card HTML with new values
function updateProfessionHTML() {
  // Income tab
  professionCard.salary.innerText = profession.incomes.salary;
  professionCard.interest.innerText = profession.incomes.interest;
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

  // Assets and Liabilities
  professionCard.savings.innerText = profession.assets.saving;
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
}

function finishTurn() {
  profession.expenses.child = profession.perChildExpense * profession.childrenCount;
  profession.passiveIncome = calculatePassiveIncome(profession);
  profession.totalIncome = calculateTotalIncome(profession);
  profession.totalExpenses = calculateTotalExpenses(profession);
  profession.finalCashFlow = profession.totalIncome - profession.totalExpenses;
  updateProfessionHTML();
  updateGameData();

  // add logic that check if saving is less than 0 and monthly cash flow is less than 0
  // if true then game over
}
