const gridRows = [];
function createGrid(patterns) {
  const grid = document.getElementById('grid');
  patterns.forEach(pattern => {
    const row = document.createElement('div');
    row.className = 'row';
    [...pattern].forEach(ch => {
      const cell = document.createElement('div');
      cell.className = 'cell ' + colorClass(ch);
      row.appendChild(cell);
    });
    grid.appendChild(row);
    gridRows.push(row);
  });
}

function colorClass(symbol) {
  switch (symbol) {
    case '🟩':
      return 'green';
    case '🟨':
      return 'yellow';
    default:
      return 'black';
  }
}

function computePattern(guess, answer) {
  guess = guess.toLowerCase();
  answer = answer.toLowerCase();
  const result = Array(5).fill('⬛');
  const answerLetters = answer.split('');
  const used = Array(5).fill(false);
  // Greens
  for (let i = 0; i < 5; i++) {
    if (guess[i] === answer[i]) {
      result[i] = '🟩';
      used[i] = true;
    }
  }
  // Yellows
  for (let i = 0; i < 5; i++) {
    if (result[i] === '🟩') continue;
    const idx = answerLetters.findIndex((ch, j) => !used[j] && ch === guess[i]);
    if (idx !== -1) {
      result[i] = '🟨';
      used[idx] = true;
    }
  }
  return result.join('');
}

let currentRow = 0;
let attempts = 6;

function setupGame() {
  if (!PUZZLE) {
    document.getElementById('message').textContent = 'No puzzle data. Create one at create.html';
    return;
  }
  if (!PUZZLE.patterns) {
    PUZZLE.patterns = PUZZLE.solutions.map(sol => computePattern(sol, PUZZLE.answer));
  }
  document.getElementById('answer').textContent = 'Answer: ' + PUZZLE.answer.toUpperCase();
  createGrid(PUZZLE.patterns);
  showInput();
}

function showInput() {
  const area = document.getElementById('input-area');
  area.innerHTML = '';
  if (currentRow >= PUZZLE.patterns.length) {
    document.getElementById('message').textContent = 'You solved them all!';
    return;
  }
  const rowDiv = document.createElement('div');
  rowDiv.className = 'guess-row';
  const input = document.createElement('input');
  input.maxLength = 5;
  input.autofocus = true;
  const btn = document.createElement('button');
  btn.textContent = 'Guess';
  btn.onclick = () => handleGuess(input.value);
  rowDiv.appendChild(input);
  rowDiv.appendChild(btn);
  area.appendChild(rowDiv);
  document.getElementById('message').textContent = `Row ${currentRow+1}, attempts left: ${attempts}`;
}

function handleGuess(value) {
  const guess = value.trim().toLowerCase();
  if (guess.length !== 5) {
    alert('Guess must be 5 letters');
    return;
  }
  if (!DICTIONARY.includes(guess)) {
    alert('Word not in dictionary');
    return;
  }
  const target = PUZZLE.solutions[currentRow];
  const pattern = computePattern(guess, target);
  const guessRow = document.createElement('div');
  guessRow.className = 'row';
  [...pattern].forEach((ch, i) => {
    const cell = document.createElement('div');
    cell.className = 'cell ' + colorClass(ch);
    cell.textContent = guess[i];
    guessRow.appendChild(cell);
  });
  document.getElementById('grid').appendChild(guessRow);
  attempts--;
  if (guess === target) {
    gridRows[currentRow].style.display = 'none';
    currentRow++;
    attempts = 6;
    showInput();
  } else if (attempts === 0) {
    gameOver();
  } else {
    document.getElementById('message').textContent = `Row ${currentRow+1}, attempts left: ${attempts}`;
  }
}

function gameOver() {
  const area = document.getElementById('input-area');
  area.innerHTML = '';
  let msg = 'Game over! Solutions:\n';
  PUZZLE.solutions.forEach((w, i) => {
    msg += `${i+1}. ${w}\n`;
  });
  alert(msg);
  document.getElementById('message').textContent = 'Game over';
}

document.addEventListener('DOMContentLoaded', setupGame);
