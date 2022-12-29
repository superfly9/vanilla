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
let currencyRate = {};

const fixedHandler = (value, digit = 2) => value.toFixed(digit);
const rateTextMaker = (fromCurrency, toCurrency)=> `1 ${fromCurrency} ~ ${currencyRate[toCurrency].toFixed(2)} ${toCurrency}`;

const init = async () => {
  const currencyList = await getCurrencyData('currency.json');
  addCountryToSelect(currencyOne, currencyList, fromCurrency);
  addCountryToSelect(currencyTwo, currencyList, toCurrency);
  currencyRate = (await getCurrencyData(`https://open.er-api.com/v6/latest/${fromCurrency}`))['rates'];

  amountTwo.value = fixedHandler(currencyRate[toCurrency]);
  rate.innerText = rateTextMaker(fromCurrency,toCurrency)
};

const amountHandler = (e)=>{
  if (e.target.id === 'amount_one') {
    amountTwo.value = fixedHandler(e.target.value * currencyRate[toCurrency]);
  } 
  if (e.target.id === 'amount_two') {
    amountOne.value = fixedHandler(e.target.value / currencyRate[toCurrency]);
  }
}

const currencyChangeHandler = async (e) => {
  if (e.target.id === 'currency_one') {
    fromCurrency = e.target.value;
    currencyRate = (await getCurrencyData(`https://open.er-api.com/v6/latest/${fromCurrency}`))['rates'];
    amountTwo.value = fixedHandler(amountOne.value * currencyRate[toCurrency]);
    rate.innerText = rateTextMaker(fromCurrency, toCurrency);
  }
  if (e.target.id === 'currency_two') {
    toCurrency = e.target.value;
    amountOne.value = fixedHandler(amountTwo.value / currencyRate[toCurrency]);
    rate.innerText = rateTextMaker(fromCurrency, toCurrency);
  }
}

const swapHandler = async () => {
  const tempVal = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = tempVal;

  fromCurrency = currencyOne.value;
  toCurrency = currencyTwo.value;

  currencyRate = (await getCurrencyData(`https://open.er-api.com/v6/latest/${fromCurrency}`))['rates'];
  amountTwo.value = fixedHandler(amountOne.value * currencyRate[toCurrency]);
  rate.innerText = rateTextMaker(fromCurrency, toCurrency);
}


window.addEventListener("DOMContentLoaded", init);
amountOne.addEventListener('input',amountHandler);
amountTwo.addEventListener('input',amountHandler);
currencyOne.addEventListener('change', currencyChangeHandler);
currencyTwo.addEventListener('change', currencyChangeHandler);
swapBtn.addEventListener('click', swapHandler)