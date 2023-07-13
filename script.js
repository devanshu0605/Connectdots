const dotSequences = {
  A: [22, 17, 12, 7, 2, 3, 4, 9, 14, 19, 24, 13],
  B: [22, 17, 12, 7, 2, 3, 4, 8, 12 , 18, 24, 23],
  C: [9, 8, 7, 12, 17, 18, 19],
  E: [4, 3, 2, 7, 12, 17, 22, 23, 24, 13, 14],
  H: [2, 7, 12, 17, 22, 13, 4, 9, 14, 19, 24],
  I: [1, 2, 3, 4, 5, 8, 13, 18, 23, 21, 22, 24, 25],
  // Add sequences for other letters as needed
};

const dots = document.querySelectorAll('.dot');
const startButton = document.getElementById('startButton');
const completionScreen = document.getElementById('completionScreen');
const newGameButton = document.getElementById('newGameButton');
const randomAlphabetElement = document.getElementById('randomAlphabet');

let alphabet = '';

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    if (!alphabet) return;

    const dotIndex = index + 1;
    if (!dotSequences[alphabet].includes(dotIndex)) return;

    dot.classList.add('clicked');
    drawLine();

    const nextDotIndex = dotSequences[alphabet][dotSequences[alphabet].indexOf(dotIndex) + 1];
    if (nextDotIndex) {
      const nextDot = dots[nextDotIndex - 1];
      nextDot.classList.add('active');
    } else {
      const alphabetCompleted = document.querySelectorAll('.clicked').length === dotSequences[alphabet].length;
      if (alphabetCompleted) {
        showCompletionScreen();
      }
    }
  });
});

startButton.addEventListener('click', startGame);
completionScreen.addEventListener('click', hideCompletionScreen);
newGameButton.addEventListener('click', startGame);

function startGame() {
  resetGame();
  hideCompletionScreen();
  alphabet = getRandomAlphabet();
  randomAlphabetElement.textContent = `Random Alphabet: ${alphabet}`;

  const firstDotIndex = dotSequences[alphabet][0];
  const firstDot = dots[firstDotIndex - 1];
  firstDot.classList.add('active');
}

function drawLine() {
  const clickedDots = document.querySelectorAll('.clicked');

  if (clickedDots.length < 2) return;

  const lastDot = clickedDots[clickedDots.length - 1];
  const secondLastDot = clickedDots[clickedDots.length - 2];

  const line = document.createElement('div');
  line.classList.add('line');
  line.style.top = `${lastDot.offsetTop + 15}px`;
  line.style.left = `${lastDot.offsetLeft + 15}px`;
  line.style.width = `${calculateDistance(lastDot, secondLastDot)}px`;
  line.style.transform = `rotate(${calculateAngle(lastDot, secondLastDot)}deg)`;

  document.body.appendChild(line);
}

function calculateDistance(dot1, dot2) {
  const x1 = dot1.offsetLeft + 15;
  const y1 = dot1.offsetTop + 15;
  const x2 = dot2.offsetLeft + 15;
  const y2 = dot2.offsetTop + 15;

  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function calculateAngle(dot1, dot2) {
  const x1 = dot1.offsetLeft + 15;
  const y1 = dot1.offsetTop + 15;
  const x2 = dot2.offsetLeft + 15;
  const y2 = dot2.offsetTop + 15;

  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
  return angle;
}

function resetGame() {
  const clickedDots = document.querySelectorAll('.clicked');
  const lines = document.querySelectorAll('.line');

  clickedDots.forEach((dot) => dot.classList.remove('clicked'));
  lines.forEach((line) => line.parentNode.removeChild(line));
  dots.forEach((dot) => dot.classList.remove('active'));
}

function getRandomAlphabet() {
  const alphabets = Object.keys(dotSequences);
  const randomIndex = Math.floor(Math.random() * alphabets.length);
  return alphabets[randomIndex];
}

function showCompletionScreen() {
  completionScreen.classList.add('show');
}

function hideCompletionScreen() {
  completionScreen.classList.remove('show');
}
