const qs = (target, scope = document) => scope.querySelector(target);

const currencyOne = qs("#currency_one");
const currencyTwo = qs("#currency_two");
const swapBtn = qs("#swap_btn");
const compareResult = qs("#result");

const getCurrencyData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
const addCountryToSelect = (target, data = [],initialCurrency) => {
  data.forEach(currency => {
    const option = document.createElement("option");
    option.className = 'currency'
    option.innerText = currency;
    option.value = currency;
    target.appendChild(option);
    if (initialCurrency === currency) {
        target.value = currency;
    }
  });
};


const init = async () => {
  const currencyList = await getCurrencyData('currency.json');
  addCountryToSelect(currencyOne, currencyList, 'KRW');
  addCountryToSelect(currencyTwo, currencyList, 'USD');
  const currencyRate = await getCurrencyData(`https://open.er-api.com/v6/latest/KRW`);
};

window.addEventListener("DOMContentLoaded", init);
