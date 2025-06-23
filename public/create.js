function addRow() {
  const div = document.createElement('div');
  const input = document.createElement('input');
  input.maxLength = 5;
  div.appendChild(input);
  document.getElementById('solutions').appendChild(div);
}

document.getElementById('add-row').onclick = addRow;
addRow();

document.getElementById('generate').onclick = function() {
  const answer = document.getElementById('answer-input').value.trim().toLowerCase();
  if (answer.length !== 5 || !DICTIONARY.includes(answer)) {
    alert('Invalid final answer');
    return;
  }
  const inputs = document.querySelectorAll('#solutions input');
  const solutions = [];
  for (const inp of inputs) {
    const val = inp.value.trim().toLowerCase();
    if (val.length !== 5 || !DICTIONARY.includes(val)) {
      alert('Invalid word: ' + inp.value);
      return;
    }
    solutions.push(val);
  }
  const data = {answer, solutions};
  const enc = btoa(JSON.stringify(data));
  const url = location.origin + '/index.html?puzzle=' + enc;
  const linkArea = document.getElementById('link-area');
  linkArea.innerHTML = `<a href="${url}">${url}</a>`;
};
