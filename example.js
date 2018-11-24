const traceLength = document.getElementById('traceLength');
traceLength.addEventListener('change', updateValues);
const fadeOut = document.getElementById('fadeOut');
fadeOut.addEventListener('change', updateValues);
const fontSize = document.getElementById('fontSize');
fontSize.addEventListener('change', updateValues);

var emoji = new emojiMouseTrace({
  'traceLength': 20,
  'fadeOut': true,
  'zIndex': 2
});

function updateValues() {
  const config = {
    'traceLength': traceLength.value,
    'fadeOut': fadeOut.checked,
    'fontSize': fontSize.value + 'px',
  }
  emoji.disable();
  emoji = new emojiMouseTrace(config);
}