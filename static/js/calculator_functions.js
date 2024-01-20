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

function lifeEvent() {
  const deal = choseRandomEvent(lifeEvents);

  gameDataHTML.eventCard.innerHTML = "";
  const card = document.createElement("div");
  const cardDescription = document.createElement("p");
  card.className = "event-card-body";

  const cardTitle = document.createElement("h2");

  if (deal.id === 0 && profession.childrenCount < 3) {
    profession.childrenCount += 1;
    cardTitleValue = `It is a ${Math.random() < 0.5 ? "boy" : "girl"}!`;
    cardDescriptionValue = `Congradulations! You just had a newborn!`;
  } else if (deal.id === 0 && profession.childrenCount === 3) {
    const event = choseRandomEvent(childEvents);
    profession.assets.saving += event.amount_loss;
    cardTitleValue = event.description;
    cardDescriptionValue = `You lost ${Math.abs(event.amount_loss)} from your savings, your new total savings is ${
      profession.assets.saving
    }`;
  } else {
    profession.assets.saving += deal.ammount_change;
    cardTitleValue = deal.description;
    cardDescriptionValue = `You ${deal.ammount_change < 0 ? "lost" : "gain"} £${Math.abs(deal.ammount_change)} ${
      deal.ammount_change < 0 ? "from" : "towards"
    } your savings, your new total savings is ${profession.assets.saving}`;
  }

  cardTitle.textContent = cardTitleValue;
  cardDescription.textContent = cardDescriptionValue;

  card.appendChild(cardTitle);
  card.appendChild(cardDescription);

  // Append the card to the card container
  gameDataHTML.eventCard.appendChild(card);
}

function deal() {
  const deal = choseRandomEvent(deals);
  const dealType = deal.type;

  gameDataHTML.eventCard.innerHTML = "";
  const card = document.createElement("div");
  const cardTitle = document.createElement("h2");
  const cardDescription = document.createElement("p");
  card.className = "event-card-body";

  const cardNumbers = document.createElement("div");
  cardNumbers.className = "card-numbers";

  const cardInitialCost = document.createElement("p");
  const cardDownpay = document.createElement("p");
  const cardMortgage = document.createElement("p");
  const passiveIncome = document.createElement("p");

  let cardDetails;

  switch (dealType) {
    case "property":
      cardDetails = realEstateDeal(deal);
      break;
    case "business":
      cardDetails = businessDeal(deal);
      break;
    case "stocks":
      cardDetails = stocksDeal(deal);
      break;
    default:
      break;
  }

  console.log(cardDetails);

  cardTitle.innerText = cardDetails[0];
  cardDescription.innerText = `${cardDetails[1]} \n ${cardDetails[2]} \n ${cardDetails[3]}`;

  card.appendChild(cardTitle);
  card.appendChild(cardDescription);

  // card numbers setup

  cardInitialCost.innerText = cardDetails[4];
  cardDownpay.innerText = cardDetails[5];
  cardMortgage.innerText = cardDetails[6];
  passiveIncome.innerText = cardDetails[7];
  cardNumbers.appendChild(cardInitialCost);
  cardNumbers.appendChild(cardDownpay);
  cardNumbers.appendChild(cardMortgage);
  cardNumbers.appendChild(passiveIncome);

  card.appendChild(cardNumbers);

  gameDataHTML.eventCard.appendChild(card);
}

function realEstateDeal(deal) {
  const cardTitleValue = deal.title;
  const cardDescription1 = deal.description;
  const cardDescription2 = `Buy this property to get ${deal.passive_income} passive income or sell it later`;
  const cardDescription3 = `ROI: ${deal.resell_roi}%, May sell for: £${deal.min_resell} to £${deal.max_resell}.`;
  const cardInitialCost = `Cost: £${deal.initial_cost}`;
  const cardDownpay = `Downpay: £${deal.down_pay}`;
  const cardMortgage = `Mortgage: £${deal.initial_cost - deal.down_pay}`;
  const passiveIncome = `Passive Income: +£${deal.passive_income}`;

  const values = [
    cardTitleValue,
    cardDescription1,
    cardDescription2,
    cardDescription3,
    cardInitialCost,
    cardDownpay,
    cardMortgage,
    passiveIncome,
  ];

  return values;
}

function businessDeal(deal) {
  const cardTitleValue = deal.title;
  const cardDescription1 = deal.description;
  const cardDescription2 = `Invest in this business to get ${deal.passive_income} passive income or sell it later`;
  const cardDescription3 = `ROI: ${deal.resell_roi}%, May sell for: £${deal.min_resell} to £${deal.max_resell}.`;
  const cardInitialCost = `Cost: £${deal.initial_cost}`;
  const cardDownpay = `Downpay: £${deal.down_pay}`;
  const cardMortgage = `Mortgage: £${deal.initial_cost - deal.down_pay}`;
  const passiveIncome = `Passive Income: +£${deal.passive_income}`;

  const values = [
    cardTitleValue,
    cardDescription1,
    cardDescription2,
    cardDescription3,
    cardInitialCost,
    cardDownpay,
    cardMortgage,
    passiveIncome,
  ];

  return values;
}

function stocksDeal(deal) {
  const cardTitleValue = deal.title;
  const cardDescription1 = deal.description;
  const cardDescription2 = `Invest in to stocks and hope the price to go up`;
  const cardDescription3 = `ROI: ${deal.resell_roi}%, May sell for: £${deal.min_resell} to £${deal.max_resell}.`;
  const cardInitialCost = `Todays Price: £${deal.initial_cost}`;
  const cardDownpay = ``;
  const cardMortgage = ``;
  const passiveIncome = `Passive Income: +£${deal.passive_income}`;

  const values = [
    cardTitleValue,
    cardDescription1,
    cardDescription2,
    cardDescription3,
    cardInitialCost,
    cardDownpay,
    cardMortgage,
    passiveIncome,
  ];

  return values;
}

// Function called to get random large number for deals
function getRandomLargeNumber(min, max) {
  // Ensure min and max are multiples of 100
  min = Math.ceil(min / 100) * 100;
  max = Math.floor(max / 100) * 100;

  // Generate a random number within the adjusted range
  return Math.floor(Math.random() * ((max - min + 1) / 100)) * 100 + min;
}
