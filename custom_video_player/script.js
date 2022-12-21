const qs =(target,scope = document)=>scope.querySelector(target);
const video = qs('#video');
const playBtn = qs('#play');
const stopBtn = qs('#stop');
const progressBar = qs('#progress');
const timeStamp = qs('#timestamp');

// 재생, 정지 이벤트

// 비디오 클릭시 정지<-> 재생


// 비디오 프로그레스 바 이동시 비디오 변경

// 비디오 timeupdate시 timestamp 변경