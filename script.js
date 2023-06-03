const textDisplay = document.getElementById('digitando');
const phrases = [
  'Programador FrontEnd JR',
  'Desenvolvedor Web',
  'Desenvolvedor Full Stack JR',
];
let i = 0;
let j = 0;
let currentPhrase = [];
let isDeleting = false;
let isEnd = false;

function loop() {
  isEnd = false;
  textDisplay.innerHTML = currentPhrase.join('');

  if (i < phrases.length) {
    if (!isDeleting && j <= phrases[i].length) {
      currentPhrase.push(phrases[i][j]);
      j++;
      textDisplay.innerHTML = currentPhrase.join('');
    }

    if (isDeleting && j <= phrases[i].length) {
      currentPhrase.pop(phrases[i][j]);
      j--;
      textDisplay.innerHTML = currentPhrase.join('');
    }

    if (j == phrases[i].length) {
      isEnd = true;
      isDeleting = true;
    }

    if (isDeleting && j === 0) {
      currentPhrase = [];
      isDeleting = false;
      i++;
      if (i === phrases.length) {
        i = 0;
      }
    }
  }
  const spedUp = Math.random() * 200;
  const normalSpeed = Math.random() * 300;
  const time = isEnd ? 200 : isDeleting ? spedUp : normalSpeed;
  setTimeout(loop, time);
}

loop();

const ativaMenu = document.querySelector('.fa-bars');
const navMenu = document.querySelector('header .navegacao-primaria');

ativaMenu.addEventListener('click', () => {
  ativaMenu.classList.toggle('fa-x');
  navMenu.classList.toggle('ativado');
});
