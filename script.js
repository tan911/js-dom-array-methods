"use strict";

const main = document.getElementById("main");
const addUserBtn = document.getElementById("add_user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show_millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate_wealth");

let data = [];

// format number as money
const formatMoney = (number) => {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

const updateDOM = (provideData = data) => {
  // Clear main div
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";

  provideData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> <strong>$${formatMoney(
      item.money
    )}</strong>`;
    main.appendChild(element);
  });
};

// Add new user to data object
const addData = (userData) => {
  data.push(userData);

  // update the dom
  updateDOM();
};

////////////////////////////////////
// fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  console.log(data);

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

////////////////////////
// double money
const doubleMoney = () => {
  data = data.map((item) => {
    return { ...item, money: item.money * 2 };
  });

  updateDOM();
};

/////////////////////////
// filter millionaires
const showMillionaire = () => {
  data = data.filter((item) => item.money > 1000000);

  updateDOM();
};

/////////////////////
// sorted money by richest
const sortByRichest = () => {
  data = data.sort((a, b) => b.money - a.money);

  updateDOM();
};

///////////////////////
// Calculate wealth
const calculateWealth = () => {
  const wealth = data.reduce((acc, curr) => acc + curr.money, 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>$${formatMoney(
    wealth
  )}</strong></h3>`;

  main.appendChild(wealthEl);
};

getRandomUser();
getRandomUser();
getRandomUser();

// event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
showMillionairesBtn.addEventListener("click", showMillionaire);
sortBtn.addEventListener("click", sortByRichest);
calculateWealthBtn.addEventListener("click", calculateWealth);
