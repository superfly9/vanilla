import { qs } from '../util.js';
const totalTime = 7500; //ms
const breatheInTime = (totalTime / 5 ) * 2
const holdTome = (totalTime / 5) * 1;
const text = qs('.text');
const container = qs('.container');

// 텍스트 처리 + 애니메이션 (클래스 값)
// breatheIn  
// 그후 hold
// breathOut

const getBreath = ()=>{
    console.log('check')
    text.innerText = 'Breathe In';
    container.classList.add('in');
    let holdTimeInterval,outTimeInterval;

    
    holdTimeInterval = setInterval(()=>{
        text.innerText = 'Hold'
        container.classList.replace('in','hold');
        clearInterval(holdTimeInterval);
        outTimeInterval = setInterval(()=>{
            text.innerText = 'Breath Out'
            container.classList.replace('hold','out');
            clearInterval(outTimeInterval);
        },holdTome)
    },breatheInTime)
}

const init = () => {
    getBreath();
    setInterval(getBreath, totalTime);
}

document.addEventListener('DOMContentLoaded' ,init)