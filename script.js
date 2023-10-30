const in_Out_Timer = document.getElementById('in_Out_Timer');
const startTimer = document.getElementById('buttonTimerStart');
const pauseTimer = document.getElementById('buttonTimerPause');
const stopTimer = document.getElementById('buttonTimerStop');
const sound1 = document.querySelector('.sound1');

in_Out_Timer.placeholder = `${localStorage.getItem('hour')}:${localStorage.getItem('minute')}:${localStorage.getItem('second')}`;
let timerSetInt;
startTimer.addEventListener('click', (e) => {
    let timerInArr = in_Out_Timer.value.split(':');
    let inputValid = /^\d{2}:\d{2}:\d{2}$/.test(in_Out_Timer.value);
    if (inputValid) {
        localStorage.setItem('hour', timerInArr[0]);
        localStorage.setItem('minute', timerInArr[1]);
        localStorage.setItem('second', timerInArr[2]);
    }

    let hour = +localStorage.getItem('hour');
    let minute = +localStorage.getItem('minute');
    let second = +localStorage.getItem('second');

    if (!isNaN(hour) && !isNaN(minute) && !isNaN(second)) {
        timerSetInt = setInterval(() => {
            if (second > 0) {
                second--;
            } else {
                if (minute > 0) {
                    minute--;
                    second = 59;
                } else {
                    if (hour > 0) {
                        hour--;
                        minute = 59;
                        second = 59;
                    } else {
                        clearInterval(timerSetInt);
                        sound1.play();
                        setTimeout(() => {
                            sound1.pause();
                        }, 10000)

                    }
                }
            }
            const formatHour = String(hour).padStart(2, '0');
            const formatMinute = String(minute).padStart(2, '0');
            const formatSecond = String(second).padStart(2, '0');
            in_Out_Timer.value = `${formatHour}:${formatMinute}:${formatSecond}`;
        }, 1000)
    }

});

pauseTimer.addEventListener('click', (e) => {
    clearInterval(timerSetInt);
});

stopTimer.addEventListener('click', (e) => {
    clearInterval(timerSetInt);
    in_Out_Timer.value = ``;
})