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
  if (profession.additionalAssets) {
    const totalPassiveIncome = profession.additionalAssets.reduce(
      (total, asset) => total + asset.passive_income,
      0
    );
    profession.incomes.realEstate = totalPassiveIncome;
  }
  let totalPasiveIncome = profession.incomes.realEstate;
  return totalPasiveIncome;
}

// call this function when player gets new children
function childrenCountChange(value) {
  if (profession.childrenCount < 3) {
    profession.childrenCount += value;
  }
  profession.expenses.child =
    profession.perChildExpense * profession.childrenCount;
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
  gameData.currentMonth++;
  profession.assets.saving += profession.finalCashFlow;
  gameDataHTML.eventCard.innerHTML = "";

  const card = document.createElement("div");
  card.className = "event-card-body";

  // Add information to the card
  const cardTitle = document.createElement("h2");
  cardTitle.textContent = "Congratulations you got paid!";
  card.appendChild(cardTitle);

  // Add information to the card
  const cardDescription = document.createElement("p");
  cardDescription.textContent = `£${profession.finalCashFlow} was added to your savings, your new total savings is £${profession.assets.saving}`;
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
    cardDescriptionValue = `Congratulations! You just had a newborn!`;
  } else if (deal.id === 0 && profession.childrenCount === 3) {
    const event = choseRandomEvent(childEvents);
    profession.assets.saving += event.amount_loss;
    cardTitleValue = event.description;
    cardDescriptionValue = `You lost ${Math.abs(
      event.amount_loss
    )} from your savings, your new total savings is £${
      profession.assets.saving
    }`;
  } else {
    profession.assets.saving += deal.ammount_change;
    cardTitleValue = deal.description;
    cardDescriptionValue = `You ${
      deal.ammount_change < 0 ? "lost" : "gain"
    } £${Math.abs(deal.ammount_change)} ${
      deal.ammount_change < 0 ? "from" : "towards"
    } your savings, your new total savings is £${profession.assets.saving}`;
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
  gameData.offerId = deal.id;
  gameData.dealorOpportunity = "deal";
  const dealType = deal.type;

  acceptBtnOff(false);
  rejectBtnOff(false);

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
  const cardDescription3 = `ROI: ${deal.resell_roi}%, May sell later for: £${deal.min_resell} to £${deal.max_resell}.`;
  const cardInitialCost = `Cost:\n£${deal.initial_cost}`;
  const cardDownpay = `Downpay:\n£${deal.down_pay}`;
  const cardMortgage = `Mortgage:\n£${deal.initial_cost - deal.down_pay}`;
  const passiveIncome = `Passive Income:\n+£${deal.passive_income}`;

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
  const cardDescription3 = `ROI: ${deal.resell_roi}%, May sell later for: £${deal.min_resell} to £${deal.max_resell}.`;
  const cardInitialCost = `Cost:\n£${deal.initial_cost}`;
  const cardDownpay = `Downpay:\n£${deal.down_pay}`;
  const cardMortgage = `Mortgage:\n£${deal.initial_cost - deal.down_pay}`;
  const passiveIncome = `Passive Income:\n+£${deal.passive_income}`;

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
  orderInputOff(false);
  orderInputSpan.innerText = `How many shares you would like to buy:£`;
  const cardTitleValue = deal.title;
  const cardDescription1 = deal.description;
  const cardDescription2 = `Invest in to stocks and hope the price to go up`;
  const cardDescription3 = `ROI: ${deal.resell_roi}%, May sell later for: £${deal.min_resell} to £${deal.max_resell}.`;
  const cardInitialCost = `Todays Price:\n£${deal.initial_cost}`;
  const cardDownpay = ``;
  const cardMortgage = ``;
  const passiveIncome = `Passive Income:\n+£${deal.passive_income}`;

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

// Function to create an element with attributes
function createElement(tag, attributes, text) {
  const element = document.createElement(tag);
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  if (text) {
    element.appendChild(document.createTextNode(text));
  }
  return element;
}

// Function to handle opportunity
function opportunity() {
  const deal = choseRandomEvent(profession.additionalAssets);
  gameData.offerId = deal.id;
  gameData.dealorOpportunity = "opportunity";
  const dealType = deal.type;

  acceptBtnOff(false);
  rejectBtnOff(false);

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

  let dealChangedCost;

  switch (dealType) {
    case "property":
      dealChangedCost =
        Math.round(radnomInt(deal.min_resell, deal.max_resell) / 100) * 100;
      cardDetails = propertyOpportunity(deal, dealChangedCost);
      break;
    case "business":
      dealChangedCost =
        Math.round(radnomInt(deal.min_resell, deal.max_resell) / 100) * 100;
      cardDetails = businessOpportunity(deal, dealChangedCost);
      break;
    case "stocks":
      dealChangedCost = radnomInt(deal.min_resell, deal.max_resell);
      cardDetails = stocksOpportunity(deal, dealChangedCost);
      break;
    default:
      break;
  }

  cardTitle.innerText = cardDetails[0];
  cardDescription.innerText = `${cardDetails[1]} \n ${cardDetails[2]}`;

  card.appendChild(cardTitle);
  card.appendChild(cardDescription);

  // card numbers setup

  cardInitialCost.innerText = cardDetails[3];
  cardDownpay.innerText = cardDetails[4];
  cardMortgage.innerText = cardDetails[5];
  passiveIncome.innerText = cardDetails[6];
  cardNumbers.appendChild(cardInitialCost);
  cardNumbers.appendChild(cardDownpay);
  cardNumbers.appendChild(cardMortgage);
  cardNumbers.appendChild(passiveIncome);

  card.appendChild(cardNumbers);

  gameDataHTML.eventCard.appendChild(card);
}

function propertyOpportunity(deal, dealChangedCost) {
  deal.newPrice = dealChangedCost;
  const dealchange = dealChangedCost - deal.initial_cost;
  const cardTitleValue = `${deal.title} - ${
    dealchange > 0 ? "Rising" : "Falling apart"
  }?`;
  const cardDescription1 = `You can sell your property to for £${Math.abs(
    dealChangedCost
  )}`;
  const cardDescription2 = `ROI: ${deal.resell_roi}%, May sell later for: £${deal.min_resell} to £${deal.max_resell}.`;
  const cardInitialCost = `Bought for:\n£${deal.initial_cost}`;
  const cardDownpay = `Downpay:\n£${deal.down_pay}`;
  const cardMortgage = `Total Profit:\n£${
    dealChangedCost - (deal.initial_cost - deal.down_pay)
  }`;
  const passiveIncome = `Passive Income loss:\n-£${deal.passive_income}`;

  const values = [
    cardTitleValue,
    cardDescription1,
    cardDescription2,
    cardInitialCost,
    cardDownpay,
    cardMortgage,
    passiveIncome,
  ];

  return values;
}

function businessOpportunity(deal, dealChangedCost) {
  deal.newPrice = dealChangedCost;
  const dealchange = dealChangedCost - deal.initial_cost;
  const cardTitleValue = `${deal.title} - ${
    dealchange > 0 ? "Rising" : "Falling apart"
  }?`;
  const cardDescription1 = `You can sell your business to for £${Math.abs(
    dealChangedCost
  )}`;
  const cardDescription2 = `ROI: ${deal.resell_roi}%, May sell later for: £${deal.min_resell} to £${deal.max_resell}.`;
  const cardInitialCost = `Bought for:\n£${deal.initial_cost}`;
  const cardDownpay = `Downpay:\n£${deal.down_pay}`;
  const cardMortgage = `Total Profit:\n£${
    dealChangedCost - (deal.initial_cost - deal.down_pay)
  }`;
  const passiveIncome = `Passive Income loss:\n-£${deal.passive_income}`;

  const values = [
    cardTitleValue,
    cardDescription1,
    cardDescription2,
    cardInitialCost,
    cardDownpay,
    cardMortgage,
    passiveIncome,
  ];

  return values;
}

function stocksOpportunity(deal, dealChangedCost) {
  orderInputOff(false);
  orderInputSpan.innerText = `How many shares you would like to sell:£`;
  setMinMaxValues(deal.additionalAmount);
  deal.newPrice = dealChangedCost;
  const dealchange = dealChangedCost - deal.initial_cost;

  const totalStocksValue = dealChangedCost * deal.additionalAmount;
  const totalProfitValue =
    totalStocksValue - deal.initial_cost * deal.additionalAmount;

  const cardTitleValue = `${deal.title} - ${
    dealchange > 0 ? "Rising" : "Falling apart"
  }?`;
  const cardDescription1 = `You can sell your stocks to for £${Math.abs(
    dealChangedCost
  )} each`;
  const cardDescription2 = `ROI: ${deal.resell_roi}%, May sell later for: £${deal.min_resell} to £${deal.max_resell} each.`;
  const cardInitialCost = `Bought for:\n£${deal.initial_cost} each`;
  const cardDownpay = `Total Stocks owned:\n${deal.additionalAmount}`;
  const cardMortgage = `Total Profit:\n£${totalProfitValue}`;
  const passiveIncome = ``;

  const values = [
    cardTitleValue,
    cardDescription1,
    cardDescription2,
    cardInitialCost,
    cardDownpay,
    cardMortgage,
    passiveIncome,
  ];

  return values;
}

// Function to accept the deal
function acceptOffer() {
  if (gameData.dealorOpportunity === "deal") {
    acceptDeal();
    closeAllModals();
  } else if (gameData.dealorOpportunity === "opportunity") {
    acceptOpportunity();
    closeAllModals();
  } else {
    alert("Something went wrong");
  }
}

function acceptDeal() {
  const dealId = gameData.offerId;
  const deal = deals.find((deal) => deal.id === dealId);

  let acceptedValue;

  deal.type === "stocks";

  if (deal.type != "stocks") {
    acceptedValue = 1;
  } else if (parseInt(orderCountInput.value) === 0) {
    acceptedValue = parseInt(orderCountInput.value);
    alert(`You need to buy at least 1 stock.`);
    return;
  } else {
    acceptedValue = parseInt(orderCountInput.value);
  }

  if (profession.assets.saving < deal.down_pay * acceptedValue) {
    alert(`You do not have enough money to buy this deal.`);
    return;
  } else {
    profession.assets.saving -= deal.down_pay * acceptedValue;

    // check if deal is already in additional assets array
    const originalDeal = profession.additionalAssets.find(
      (original) => original.id === deal.id
    );
    if (originalDeal) {
      originalDeal.additionalAmount += acceptedValue;
      return;
    } else {
      deal.additionalAmount = acceptedValue;
      profession.additionalAssets.push(deal);
    }

    // remove deal from deals array
    if (deal.type != "stocks") {
      removeDealById(deals, deal.id);
    }

    rejectBtnOff(true);
    acceptBtnOff(true);
  }
  gameData.chances[3].chance = gameData.opportunityChance;
  finishTurn();
}

function acceptOpportunity() {
  const dealId = gameData.offerId;
  const deal = profession.additionalAssets.find((deal) => deal.id === dealId);

  let acceptedValue;

  if (deal.type != "stocks") {
    acceptedValue = 1;
  } else if (parseInt(orderCountInput.value) === 0) {
    acceptedValue = parseInt(orderCountInput.value);
    alert(`You need to sell at least 1 stock.`);
    return;
  } else {
    acceptedValue = parseInt(orderCountInput.value);
  }

  if (deal.additionalAmount < acceptedValue) {
    alert(`You do not have enough stocks to sell.`);
    return;
  } else {
    deal.additionalAmount -= acceptedValue;
    profession.assets.saving += deal.newPrice * acceptedValue;

    // remove deal from deals array
    if (deal.type != "stocks") {
      deals.push(deal);
      removeDealById(profession.additionalAssets, deal.id);
    } else {
      if (deal.additionalAmount === 0)
        removeDealById(profession.additionalAssets, deal.id);
    }

    if (profession.additionalAssets.length == 0) {
      gameData.chances[3].chance = 0;
    }

    rejectBtnOff(true);
    acceptBtnOff(true);
  }
  finishTurn();
}

// Function to remove a deal from the deals array
function removeDealById(dealsArray, targetId) {
  const index = dealsArray.findIndex((deal) => deal.id === targetId);

  if (index !== -1) {
    // Deal found, remove it and return the removed deal
    return dealsArray.splice(index, 1)[0];
  } else {
    // Deal not found, return null or handle accordingly
    return null;
  }
}

function setMinMaxValues(max) {
  orderCountInput.max = max;
  orderCountInput.value = max;
}

// Function to close all modals
function closeAllModals() {
  $(".modal").modal("hide");
}
