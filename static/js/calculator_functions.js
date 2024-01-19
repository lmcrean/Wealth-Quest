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
  } else {
    gameData.progressBarPerecentage = 100;
  }
}

function choseRandomEvent(eventArray) {
  let totalChance = 0;
  for (const event of eventArray) {
    totalChance += event.chance;
  }
  let random = radnomInt(1, totalChance);
  for (const event of eventArray) {
    if (random <= event.chance) {
      return event;
    }
    random -= event.chance;
  }
}

function radnomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// function called when player lando on a payday event
function payday() {
  console.log("Payday");
  profession.assets.saving += profession.finalCashFlow;
  gameDataHTML.eventCard.innerHTML = "";

  const card = document.createElement("div");
  card.className = "event-card-body";

  // Add information to the card
  const cardTitle = document.createElement("h2");
  cardTitle.textContent = "Congradulations you got paid!";
  card.appendChild(cardTitle);

  // Add information to the card
  const cardDescription = document.createElement("p");
  cardDescription.textContent = `${profession.finalCashFlow} was added to your savings, your new total savings is ${profession.assets.saving}`;
  card.appendChild(cardDescription);

  // Append the card to the card container
  gameDataHTML.eventCard.appendChild(card);
}

function moneyLoss() {
  console.log("Money loss");
}

function deal() {
  console.log("Deal");
}
