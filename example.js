const traceLength = document.getElementById('traceLength');
traceLength.addEventListener('change', updateValues);
const fadeOut = document.getElementById('fadeOut');
fadeOut.addEventListener('change', updateValues);
const fontSize = document.getElementById('fontSize');
fontSize.addEventListener('change', updateValues);
const threshold = document.getElementById('threshold');
threshold.addEventListener('change', updateValues);

var emoji = new emojiMouseTrace({
  'traceLength': 20,
  'fadeOut': true,
  'zIndex': 2,
  'threshold': 1
});

function updateValues() {
  const config = {
    'traceLength': traceLength.value,
    'fadeOut': fadeOut.checked,
    'fontSize': fontSize.value + 'px',
    'threshold': threshold.value
  }
  emoji.disable();
  emoji = new emojiMouseTrace(config);
}