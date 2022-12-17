const $container = document.querySelector('.container');
const $usableSeat = document.querySelectorAll(".row .seat:not(.occupied)");
const $movieContainer = document.querySelector('#movie');
const $selectedSeatCount = document.querySelector('#count');
const $totalPrice = document.querySelector('#total');

let moviePrice = $movieContainer.value;

const calculatePrice = () =>{
    const selectedSeatsCount = document.querySelectorAll('.row .seat.selected').length
    $selectedSeatCount.innerText  = selectedSeatsCount
    $totalPrice.innerText = selectedSeatsCount * moviePrice;
}

$movieContainer.addEventListener('change', (e)=>{
    moviePrice = e.target.value;
    calculatePrice();
})

$container.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected')
    calculatePrice();
  }
});

// classList.toggle => Removes a given token from the list and returns false. If token doesn't exist it's added and the function returns true.