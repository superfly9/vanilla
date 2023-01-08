import { qs } from '../util.js';
const totalTime = 7500; //ms
const breatheInTime = (totalTime / 5 ) * 2
const holdTome = totalTime / 5;
const text = qs('.text');
const container = qs('.container');

const getBreath = ()=>{
    console.log('check')
    text.innerText = 'Breathe In';
    container.className='container grow';
    
    const holdTimeInterval = setInterval(()=>{
        text.innerText = 'Hold'
        clearInterval(holdTimeInterval);

        const outTimeInterval = setInterval(()=>{
            text.innerText = 'Breath Out'
            container.className='container shrink';
            clearInterval(outTimeInterval);
        },holdTome)
    },breatheInTime)
}

const init = () => {
    getBreath();
    setInterval(getBreath, totalTime);
}

document.addEventListener('DOMContentLoaded' ,init)