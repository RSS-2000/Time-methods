const in_Out_Timer = document.getElementById('in_Out_Timer');
const startTimer = document.getElementById('buttonTimerStart');
const pauseTimer = document.getElementById('buttonTimerPause');
const stopTimer = document.getElementById('buttonTimerStop');
const sound1 = document.querySelector('.sound1');
const imgTimer = document.getElementById('imgTimer');

if (localStorage.getItem('hour')) {
    in_Out_Timer.placeholder = `${localStorage.getItem('hour')}:${localStorage.getItem('minute')}:${localStorage.getItem('second')}`;
}
let startOnOff = true;
let pauseOnOff = true;
let timerSetInt;
startTimer.addEventListener('click', (e) => {
    let timerInArr = in_Out_Timer.value.split(':');
    let inputValid = /^\d{2}:\d{2}:\d{2}$/.test(in_Out_Timer.value);
    if (inputValid && startOnOff && pauseOnOff) {
        localStorage.setItem('hour', timerInArr[0]);
        localStorage.setItem('minute', timerInArr[1]);
        localStorage.setItem('second', timerInArr[2]);
    };

    let hourTimer = +localStorage.getItem('hour');
    let minuteTimer = +localStorage.getItem('minute');
    let secondTimer = +localStorage.getItem('second');
    if (startOnOff) {
        if (!isNaN(hourTimer) && !isNaN(minuteTimer) && !isNaN(secondTimer) && hourTimer || minuteTimer || secondTimer !== 0) {
            startOnOff = false;
            timerSetInt = setInterval(() => {
                if (secondTimer > 0) {
                    secondTimer--;
                } else {
                    if (minuteTimer > 0) {
                        minuteTimer--;
                        secondTimer = 59;
                    } else {
                        if (hourTimer > 0) {
                            hourTimer--;
                            minuteTimer = 59;
                            secondTimer = 59;
                        } else {
                            clearInterval(timerSetInt);
                            sound1.play();
                            imgTimer.style.display = 'block';
                        }
                    }
                }
                const formatHour = String(hourTimer).padStart(2, '0');
                const formatMinute = String(minuteTimer).padStart(2, '0');
                const formatSecond = String(secondTimer).padStart(2, '0');
                in_Out_Timer.value = `${formatHour}:${formatMinute}:${formatSecond}`;
            }, 1000)
        }

    }
});

pauseTimer.addEventListener('click', (e) => {
    clearInterval(timerSetInt);
    pauseOnOff = false;
    startOnOff = true;
});

stopTimer.addEventListener('click', (e) => {
    startOnOff = true;
    clearInterval(timerSetInt);
    in_Out_Timer.value = ``;
    if (localStorage.getItem('hour')) {
        in_Out_Timer.placeholder = `${localStorage.getItem('hour')}:${localStorage.getItem('minute')}:${localStorage.getItem('second')}`;
    }
    sound1.load();
    imgTimer.style.display = 'none';
    textClickTimer.style.display = 'none';
});

const in_Out_Alarm = document.getElementById('in_Out_Alarm');
const btnAlarmOn = document.getElementById('buttonAlarmOn');
const btnAlarmOff = document.getElementById('buttonAlarmOff');
const imgOnAlarm = document.querySelector('.imgOn');
const imgOffAlarm = document.querySelector('.imgOff');
const imgAlarm = document.querySelector('.imgAlarm');
const sound2 = document.querySelector('.sound2');

btnAlarmOn.addEventListener('click', (e) => {
    const inTimeAlarm = /^\d{2}:\d{2}:\d{2}$/.test(in_Out_Alarm.value);
    let indicator = true;
    let audioInterval;
    imgOnAlarm.style.display = 'block';
    imgOffAlarm.style.display = 'none';
    function alarmFunc() {
        const date = new Date();
        const hourAlarm = String(date.getHours()).padStart(2, '0')
        const minuteAlarm = String(date.getMinutes()).padStart(2, '0');
        const secondAlarm = String(date.getSeconds()).padStart(2, '0');
        const fullTime = `${hourAlarm}:${minuteAlarm}:${secondAlarm}`;
        console.log('ведений час', in_Out_Alarm.value)
        console.log('поточний час', fullTime)
        if (!inTimeAlarm) {
            console.log('error not correct format')
            imgOnAlarm.style.display = 'none';
            imgOffAlarm.style.display = 'block';
            return
        } else {
            if (in_Out_Alarm.value === fullTime) {
                audioInterval = setInterval(() => { sound2.play() }, 1000)
                imgOnAlarm.style.display = 'none';
                imgAlarm.style.display = 'block';
            } else {
                if (indicator) {
                    setTimeout(alarmFunc, 1000);
                }
            }
        }
    }
    alarmFunc();
    btnAlarmOff.addEventListener('click', (e) => {
        indicator = false;
        clearInterval(audioInterval);
        sound2.pause();
        sound2.load();
        imgOnAlarm.style.display = 'none';
        imgOffAlarm.style.display = 'block';
        imgAlarm.style.display = 'none';
    })
});

const buttonWatchStart = document.getElementById('buttonWatchStart');
const buttonWatchStop = document.getElementById('buttonWatchStop');
const buttonWatchReset = document.getElementById('buttonWatchReset');
const in_Out_stopWatch = document.getElementById('in_Out_stopWatch');
let stopwatch;
let indWatch = true;
buttonWatchStart.addEventListener('click', (even) => {
    let hourWatch = 0;
    let minuteWatch = 0;
    let secondWatch = 0;
    let milisecondWatch = 0;
    if (indWatch) {
        stopwatch = setInterval(() => {
            indWatch = false;
            milisecondWatch += 10;
            if (milisecondWatch === 1000) {
                milisecondWatch = 0;
                secondWatch += 1;
                if (secondWatch === 59) {
                    secondWatch = 0;
                    minuteWatch += 1;
                    if (minuteWatch === 59) {
                        minuteWatch = 0;
                        hourWatch += 1;
                    }
                }
            }
            const outWatch = `${String(hourWatch).padStart(2, '0')}:${String(minuteWatch).padStart(2, '0')}:${String(secondWatch).padStart(2, '0')}:${String(milisecondWatch).padStart(3, '00')}`;
            in_Out_stopWatch.value = outWatch;
        }, 10)
    }

});

buttonWatchStop.addEventListener('click', (even) => {
    clearInterval(stopwatch);
    indWatch = true;
});

buttonWatchReset.addEventListener('click', (even) => {
    clearInterval(stopwatch);
    in_Out_stopWatch.value = '00:00:00:0000';
    indWatch = true;
})

