const qs = (target, scope = document) => scope.querySelector(target);

const modalCloseBtn = qs('#close');
const body = qs('body');
const modalOpenBtn = qs('#open');
const navToggleBtn = qs('.toggle_nav');
const modal = qs('#modal');
const submitBtn = qs('input[type="submit"]');

const toggleModalHandler = ()=>modal.classList.toggle('show_modal');

modalOpenBtn.addEventListener('click', toggleModalHandler);
modalCloseBtn.addEventListener('click', toggleModalHandler);
submitBtn.addEventListener('click',toggleModalHandler);
navToggleBtn.addEventListener('click', ()=>{
body.classList.toggle('show_nav');
    // document.body
})

window.addEventListener('click', e=>{
    if (e.target === modal) {
        e.target.classList.remove('show_modal')
    } else {
        e.preventDefault();
    }
})