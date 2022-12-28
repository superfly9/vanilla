const qs = (target, scope = document) => scope.querySelector(target);

const currencyOne = qs("#currency_one");
const amountOne = qs('#amount_one');
const currencyTwo = qs("#currency_two");
const amountTwo = qs('#amount_two');
const swapBtn = qs("#swap_btn");
const rate = qs("#rate");

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

let fromCurrency = 'USD';
let toCurrency ='KRW';
let fromAmount = amountOne.value;
let toAmount = amountTwo.value;
let currencyRate = {};
const fixedHandler = (value, digit = 2) => value.toFixed(digit)

const init = async () => {
  const currencyList = await getCurrencyData('currency.json');
  addCountryToSelect(currencyOne, currencyList, fromCurrency);
  addCountryToSelect(currencyTwo, currencyList, toCurrency);
  currencyRate = (await getCurrencyData(`https://open.er-api.com/v6/latest/${fromCurrency}`))['rates'];
  console.log(currencyRate)
  rate.innerText = `1 ${fromCurrency} ~ ${currencyRate[toCurrency].toFixed(2)} ${toCurrency}`;
};

const amountHandler = (e)=>{
  if (e.target.id === 'amount_one') {
    amountTwo.value = fixedHandler(e.target.value * currencyRate[toCurrency]);
  } 
  if (e.target.id === 'amount_two') {
    amountOne.value = Math.floor(e.target.value / currencyRate[toCurrency]);
  }
}


window.addEventListener("DOMContentLoaded", init);
amountOne.addEventListener('input',amountHandler)
amountTwo.addEventListener('input',amountHandler)
