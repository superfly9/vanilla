const $container = document.querySelector('.container');
const $usableSeat = document.querySelectorAll(".row .seat:not(.occupied)");
const $movieContainer = document.querySelector('#movie');
const $selectedSeatCount = document.querySelector('#count');
const $totalPrice = document.querySelector('#total');

const saveToLocalStorage = (key, value)=> localStorage.setItem(key, JSON.stringify(value));
const getDataFromLocalStorage = key=> JSON.parse(localStorage.getItem(key));

const calculatePrice = () =>{
    const selectedSeatsCount = document.querySelectorAll('.row .seat.selected').length;
    const moviePrice = $movieContainer.value;
    $selectedSeatCount.innerText  = selectedSeatsCount;
    $totalPrice.innerText = selectedSeatsCount * moviePrice;
}
//change발생시 selectedIndex도 같이 바뀜
$movieContainer.addEventListener('change', (e)=>{
    saveToLocalStorage('selectedMovie', JSON.stringify({ index: e.target.selectedIndex, price : +e.target.value }));
    calculatePrice();
})

$container.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsIndex = [...selectedSeats].map(seat=>[...$usableSeat].indexOf(seat));
    
    saveToLocalStorage('selectedSeatsIndex', JSON.stringify(selectedSeatsIndex))
    calculatePrice();
  }
});
// classList.toggle => Removes a given token from the list and returns false. If token doesn't exist it's added and the function returns true.

const init = () =>{
  const defaultValue = { index: 0 , price : +$movieContainer.querySelector('option').value}

  const {index} = JSON.parse(getDataFromLocalStorage('selectedMovie')) ?? defaultValue
  const selectedSeatsIndex = JSON.parse(getDataFromLocalStorage('selectedSeatsIndex'));

  [...$usableSeat].forEach((seat, index)=>{
    if(selectedSeatsIndex.indexOf(index) > -1) seat.classList.add('selected')
  });

  $movieContainer.selectedIndex = index
  calculatePrice();
}

document.addEventListener('DOMContentLoaded', init)