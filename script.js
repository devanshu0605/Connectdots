
const dotSequences = {
    A: [7, 4, 1, 2, 3, 6, 9, 5],
    B: [1, 2, 3, 4, 5, 7, 8, 9],
    C: [3, 2, 1, 4, 7, 8, 9],
    D: [3, 2, 1, 4, 7, 8, 9, 6],
    E: [3, 2, 1, 4, 5, 7, 8, 9],
    F: [3, 2, 1, 4, 5, 7],
    H: [1, 4, 7, 5, 3, 6, 9],
    I: [1, 2, 3, 5, 7, 8, 9],
    

  };
  

  const dots = document.querySelectorAll('.dot');
  const startButton = document.getElementById('startButton');
  
  let alphabet = '';
  

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      if (!alphabet) return;
  
      const dotIndex = Array.from(dot.parentNode.children).indexOf(dot) + 1;
      if (!dotSequences[alphabet].includes(dotIndex)) return;
  
      dot.classList.add('clicked');
      drawLine();
  
      const nextDotIndex = dotSequences[alphabet][dotSequences[alphabet].indexOf(dotIndex) + 1];
      if (nextDotIndex) {
        const nextDot = dot.parentNode.querySelector(`.dot:nth-child(${nextDotIndex})`);
        nextDot.classList.add('active');
      } else {
        displayMessage(`You completed the letter ${alphabet}!`);
      }
    });
  });

  startButton.addEventListener('click', startGame);

  function startGame() {
    resetGame();
    alphabet = getRandomAlphabet();
    displayMessage(`Connect the dots for letter ${alphabet}`);
  
    const firstDotIndex = dotSequences[alphabet][0];
    const firstDot = document.querySelector(`.dot:nth-child(${firstDotIndex})`);
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
  
    clickedDots.forEach(dot => dot.classList.remove('clicked'));
    lines.forEach(line => line.parentNode.removeChild(line));
    dots.forEach(dot => dot.classList.remove('active'));
  }
  

  function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerText = message;
  
    document.body.appendChild(messageElement);
  

    setTimeout(() => {
      document.body.removeChild(messageElement);
    }, 2000);
  }
  

  function getRandomAlphabet() {
    const alphabets = Object.keys(dotSequences);
    const randomIndex = Math.floor(Math.random() * alphabets.length);
    return alphabets[randomIndex];
  }
