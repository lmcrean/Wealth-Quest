// called when the carusel choise is made
function selectProfession() {
  let id = document.querySelector(".carousel-item.active").getAttribute("data-profession-id");

  profession = professions.find((profession) => profession.id === parseInt(id));

  console.log(profession);
  professionCard.name.innerText = profession.profession;

  // INITIAL VALUES
  profession.childrenCount = 0;
  profession.totalIncome = calculateTotalIncome(profession);
  profession.passiveIncome = calculatePassiveIncome(profession);
  profession.totalExpenses = calculateTotalExpenses(profession);
  profession.finalCashFlow = profession.totalIncome - profession.totalExpenses;
  childrenCountChange(0);

  updateProfession();
  updateGameData();
}

function updateProfession() {
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
  professionCard.childExpenses.innerText = profession.perChildExpense * profession.childrenCount;

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
}

function updateGameData() {
  gameData.totalExpenses = profession.totalExpenses;
  gameData.passiveIncome = profession.passiveIncome;
  calculateProgressBar();
  gameDataHTML.progressBarContainer.setAttribute("aria-valuemax", gameData.totalExpenses);
  gameDataHTML.progressBar.style.width = `${gameData.progressBarPerecentage}%`;
  console.log(gameData.progressBarPerecentage);
  gameDataHTML.progressBar.innerText = `${gameData.passiveIncome} / ${gameData.totalExpenses}`;
}
