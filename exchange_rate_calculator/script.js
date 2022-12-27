const qs = (target, scope = document) => scope.querySelector(target);

const currencyOne = qs("#currency_one");
const currencyTwo = qs("#currency_two");
const swapBtn = qs("#swap_btn");
const compareResult = qs("#result");

const getCurrencyData = async () => {
  const res = await fetch("/currency.json");
  const data = await res.json();
  return data;
};
const addCountryToSelect = (target, data = [],initialIndex = 0) => {
  data.forEach((currency,index) => {
    const option = document.createElement("option");
    option.className = 'currency'
    option.innerText = currency;
    option.value = currency;
    target.appendChild(option);
    if (initialIndex === index) {
        target.value = initialIndex === index && currency;
    }
  });
};

const init = async () => {
  const data = await getCurrencyData();
  addCountryToSelect(currencyOne, data,4);
  addCountryToSelect(currencyTwo, data,1);
};

window.addEventListener("DOMContentLoaded", init);
