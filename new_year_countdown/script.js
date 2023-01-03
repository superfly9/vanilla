import { qs } from "../util.js";

const days = qs(".days");
const hours = qs(".hours");
const minutes = qs(".minutes");
const seconds = qs(".seconds");
const container =qs('.container');
const loading = qs('.loading');

const getTime = (endDate = new Date(2023, 12, 1), now = new Date()) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24; // 1000 * 60 * 60 * 24;

  const diff = endDate - now;
  const d = Math.floor(diff / day),
        h = Math.floor(diff / hour) % 24,
        m = Math.floor(diff / minute) % 60,
        s = Math.floor(diff / 1000) % 60;

  days.innerHTML = d;
  hours.innerHTML = h < 10 ? "0" + h : h;
  minutes.innerHTML = m < 10 ? "0" + m : m;
  seconds.innerHTML = s < 10 ? "0" + s : s;
};

setTimeout(() => {
    loading.remove();
    container.classList.add('show');
  }, 1000);

document.addEventListener("DOMContentLoaded", () => setInterval(getTime, 1000));