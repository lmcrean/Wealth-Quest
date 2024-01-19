// Calculates total expenses for a profession
function calculateTotalExpenses(expenses) {
  let totalExpenses = 0;
  for (const expense in expenses) {
    if (expenses.hasOwnProperty(expense)) {
      totalExpenses += expenses[expense];
    }
  }
  return totalExpenses;
}

// calculates total expenses of given profesion
function calculateTotalExpenses(expenses) {
  let totalExpenses = 0;
  for (const expense in expenses) {
    if (expenses.hasOwnProperty(expense)) {
      totalExpenses += expenses[expense];
    }
  }
  return totalExpenses;
}
