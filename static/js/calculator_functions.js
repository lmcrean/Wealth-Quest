// Call this function when any expense changes
function calculateTotalExpenses(profession) {
  let totalExpenses = 0;
  for (const expense in profession.expenses) {
    if (profession.expenses.hasOwnProperty(expense)) {
      totalExpenses += profession.expenses[expense];
    }
  }
  return totalExpenses;
}

// call this function when any toal income changes
function calculateTotalIncome(profession) {
  let totalIncome = 0;
  for (const income in profession.incomes) {
    if (profession.incomes.hasOwnProperty(income)) {
      totalIncome += profession.incomes[income];
    }
  }
  return totalIncome;
}

// call this function when player interest and real estate changes
function calculatePassiveIncome(profession) {
  let totalPasiveIncome = profession.incomes.interest + profession.incomes.realEstate;
  return totalPasiveIncome;
}

// call this function when player gets new children
function childrenCountChange(value) {
  if (profession.childrenCount < 3) {
    profession.childrenCount += value;
  }
  profession.expenses.child = profession.perChildExpense * profession.childrenCount;
}

function calculateProgressBar() {
  const total = gameData.passiveIncome / gameData.totalExpenses;

  if (total < 1) {
    gameData.progressBarPerecentage = total * 100;
  }
}
