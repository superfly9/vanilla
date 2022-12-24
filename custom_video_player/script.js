const qs =(target,scope = document)=>scope.querySelector(target);
const video = qs('#video');
const playBtn = qs('#play');
const stopBtn = qs('#stop');
const progressBar = qs('#progress');
const timeStamp = qs('#timestamp');

// 재생, 정지 이벤트
//HTMLMediaElement.pause = true / false(재생 중)
//HTMLMediaElement.play는 존재X

// 비디오 클릭시 정지<-> 재생
function toggleVideoStatus () {
    if (video.paused) {
        // video.paused 비디오 클릭시의 상태값
        video.play();
        video.muted = true;
    } else {
        video.pause();
    }
}

function updatePlayIcon (e) {
    if (video.paused) {
        playBtn.innerHTML = '<i class="fa fa-play fa-2x"></i>'
    } else {
        playBtn.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
    }
}

function stopVideo () {
    video.currentTime = 0;
    video.pause();
}
// 비디오 프로그레스 바 이동시 비디오 변경
// 비디오 timeupdate시 timestamp 변경
function setVideoProgress () {
    const rangeVal = +progressBar.value // 0 - 100
    const maxRange = 100;
    const currentPercent  = (rangeVal / maxRange).toFixed(2);
    const currentTime = (currentPercent * video.duration);
    video.currentTime = currentTime;
}
function timeUpdateHandler (e) {
    // inputRange값 조정 + timeStamp조정
    // 1. inputRange 조정 => 현재 currnet / Duration => progress.value에 넣기
    console.log('[timeupdate]:')
    const currentPercent = (e.target.currentTime / e.target.duration) * 100;
    progressBar.value = currentPercent;

    let minutes = Math.floor(e.target.currentTime / 60);
    let seconds = Math.floor(e.target.currentTime % 60);
    
    if (minutes < 10) {
        // minutes = '0' + String(minutes);
        minutes = String(minutes).padStart(2,0);
    } 
    if (seconds < 10) {
        seconds = String(seconds).padStart(2,0);
    }
    timeStamp.innerText =  `${minutes}:${seconds}`
}
function videoInputHanlder () {
    // preogressBar 움직이는 동안 비디오를 정지시켜서 timeUpdate발생을 막는 함수
    // progressBar Change발생시 setVideoPregress / timeupdateHandler가 둘 다 실행
    // timeupdateHandler에 의해 progressBar가 계속 변하는 현상 막기 위한 함수
    // progressBar를 움직일때마다 실행
    video.pause()
}

video.addEventListener('click', toggleVideoStatus)
video.addEventListener('play', updatePlayIcon) // HTMLMediaElement.paused = false일때 리스너 실행
video.addEventListener('pause', updatePlayIcon) // HTMLMediaElement.paused = true일때 리스너 실행
video.addEventListener('timeupdate', timeUpdateHandler)

playBtn.addEventListener('click', toggleVideoStatus);
stopBtn.addEventListener('click', stopVideo);
progressBar.addEventListener('change',setVideoProgress) // progressBar를 움직이고 놓았을 때 실행(변화가 끝났을 때)
progressBar.addEventListener('input',videoInputHanlder) //progressBar를 움직일때마다 실행