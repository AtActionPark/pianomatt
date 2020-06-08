const password = ["do", "do", "do", "re", "mi", "re"];
const siteUrl = "https://www.kfc.fr/";

window.onload = function () {
  const background = document.getElementById("piano-container");

  const doNote = document.getElementById("do");
  const reNote = document.getElementById("re");
  const miNote = document.getElementById("mi");
  const faNote = document.getElementById("fa");
  const solNote = document.getElementById("sol");

  const notes = this.document.querySelectorAll(".note");
  const MIN_TIME_DOWN = 200;
  let timer;

  let pressed = [];
  let isCorrect = false;

  doNote.addEventListener("mousedown", (e) => {
    onNoteClicked("do");
  });
  reNote.addEventListener("mousedown", (e) => {
    onNoteClicked("re");
  });
  miNote.addEventListener("mousedown", (e) => {
    onNoteClicked("mi");
  });
  faNote.addEventListener("mousedown", (e) => {
    onNoteClicked("fa");
  });
  solNote.addEventListener("mousedown", (e) => {
    onNoteClicked("sol");
  });

  notes.forEach((note) => {
    note.addEventListener("mouseup", (e) => {
      resetBackground();
    });
  });

  function resetBackground() {
    const now = performance.now();
    const timePressed = now - timer;

    if (timePressed < MIN_TIME_DOWN) {
      setTimeout(() => {
        background.style.backgroundImage = "url(assets/img/piano0.jpg)";
      }, MIN_TIME_DOWN - timePressed);
    } else background.style.backgroundImage = "url(assets/img/piano0.jpg)";
  }

  function onNoteClicked(note) {
    if (isCorrect) return;
    timer = performance.now();
    var audio = new Audio(getAudio(note));
    audio.play();

    pressed.push(note);
    background.style.backgroundImage = "url(assets/img/piano" + note + ".jpg)";

    if (checkIfCorrect()) {
      isCorrect = true;
      setTimeout(() => {
        window.location.replace(siteUrl);
      }, 500);
    }
  }

  function checkIfCorrect() {
    const last = pressed.slice(-password.length);
    return JSON.stringify(last) == JSON.stringify(password);
  }

  function getAudio(note) {
    let file;
    switch (note) {
      case "do":
        file = "./assets/sound/do.mp3";
        break;
      case "re":
        file = "./assets/sound/re.mp3";
        break;
      case "mi":
        file = "./assets/sound/mi.mp3";
        break;
      case "fa":
        file = "./assets/sound/fa.mp3";
        break;
      case "sol":
        file = "./assets/sound/sol.mp3";
        break;
      default:
        break;
    }
    return file;
  }
};
