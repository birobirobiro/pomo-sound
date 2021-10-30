const chk = document.getElementById('chk');

chk.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});

function setButtonEvents() {
  const buttons = document.querySelectorAll("#buttons > button")
  const images = document.querySelectorAll("img")
  const sliders = document.querySelectorAll(`input[type="range"]`)
  const buttonMute = document.querySelector("#btn-mute")

  buttons.forEach(button => {
    button.addEventListener("click", event => {
      button.classList.toggle("active")
    })
  })

  images.forEach(image => {
    image.addEventListener("click", event => {
      const key = image.parentElement.dataset.key

      image.classList.toggle("active")
      const slider = document.querySelector(`div[data-key="${key}"] > input[type="range"]`)
      slider.classList.toggle("slider-active")

      const audio = document.querySelector(`audio[data-key="${key}"]`)
      if (audio)
        audio.paused ? audio.play() : audio.pause()
    })
  })

  sliders.forEach(slider => {
    slider.addEventListener("input", event => {
      const key = slider.parentElement.attributes["data-key"].value

      const audio = document.querySelector(`audio[data-key="${key}"]`)
      if (audio)
        audio.volume = slider.value / (slider.max - slider.min)
    })
  })

  buttonMute.addEventListener("click", event => {
    buttonMute.classList.toggle("fa-volume-up")
    buttonMute.classList.toggle("fa-volume-off")

    const audios = document.querySelectorAll("audio")
    audios.forEach(audio => {
      audio.muted = !audio.muted
    })
  })
}


function run() {
  setButtonEvents()
}

run()

// POMODORO

var pomodoro = {
  started: false,
  minutes: 0,
  seconds: 0,
  fillerHeight: 0,
  fillerIncrement: 0,
  interval: null,
  minutesDom: null,
  secondsDom: null,
  fillerDom: null,
  init: function () {
    var self = this;
    this.minutesDom = document.querySelector('#minutes');
    this.secondsDom = document.querySelector('#seconds');
    this.fillerDom = document.querySelector('#filler');
    this.interval = setInterval(function () {
      self.intervalCallback.apply(self);
    }, 1000);
    document.querySelector('#work').onclick = function () {
      self.startWork.apply(self);
    };
    document.querySelector('#shortBreak').onclick = function () {
      self.startShortBreak.apply(self);
    };
    document.querySelector('#longBreak').onclick = function () {
      self.startLongBreak.apply(self);
    };
    document.querySelector('#stop').onclick = function () {
      self.stopTimer.apply(self);
    };
  },
  resetVariables: function (mins, secs, started) {
    this.minutes = mins;
    this.seconds = secs;
    this.started = started;
    this.fillerIncrement = 200 / (this.minutes * 60);
    this.fillerHeight = 0;
  },
  startWork: function () {
    this.resetVariables(25, 0, true);
  },
  startShortBreak: function () {
    this.resetVariables(5, 0, true);
  },
  startLongBreak: function () {
    this.resetVariables(15, 0, true);
  },
  stopTimer: function () {
    this.resetVariables(25, 0, false);
    this.updateDom();
  },
  toDoubleDigit: function (num) {
    if (num < 10) {
      return "0" + parseInt(num, 10);
    }
    return num;
  },
  updateDom: function () {
    this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
    this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
    this.fillerHeight = this.fillerHeight + this.fillerIncrement;
    this.fillerDom.style.height = this.fillerHeight + 'px';
  },
  intervalCallback: function () {
    if (!this.started) return false;
    if (this.seconds == 0) {
      if (this.minutes == 0) {
        this.timerComplete();
        return;
      }
      this.seconds = 59;
      this.minutes--;
    } else {
      this.seconds--;
    }
    this.updateDom();
  },
  timerComplete: function () {
    this.started = false;
    this.fillerHeight = 0;
  }
};
window.onload = function () {
  pomodoro.init();
};