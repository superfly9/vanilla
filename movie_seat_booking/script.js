const $container = document.querySelector('.container');
const $usableSeat = document.querySelectorAll(".row .seat:not(.occupied)");
const $movieContainer = document.querySelector('#movie');
const $selectedSeatCount = document.querySelector('#count');
const $totalPrice = document.querySelector('#total');


const saveToLocalStorage = (key, value)=> localStorage.setItem(key, JSON.stringify(value));

const calculatePrice = () =>{
    const selectedSeatsCount = document.querySelectorAll('.row .seat.selected').length;
    $selectedSeatCount.innerText  = selectedSeatsCount;
    $totalPrice.innerText = selectedSeatsCount * $movieContainer.value;
}
//change발생시 selectedIndex도 같이 바뀜
$movieContainer.addEventListener('change', calculatePrice)

$container.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected')
    calculatePrice();
  }
});
// classList.toggle => Removes a given token from the list and returns false. If token doesn't exist it's added and the function returns true.