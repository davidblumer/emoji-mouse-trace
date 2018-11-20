const traceLength = document.getElementById('traceLength');
traceLength.addEventListener('change', updateValues);
const fadeOut = document.getElementById('fadeOut');
fadeOut.addEventListener('change', updateValues);
const fontSize = document.getElementById('fontSize');
fontSize.addEventListener('change', updateValues);
const emojis = document.getElementById('emojis');
emojis.addEventListener('change', updateValues);

const emoji = new emojiMouseTrace({
    'traceLength': 50,
    'fadeOut': true,
    //'emojis': ['🤣']
});

function updateValues() {
    const config = {
        'traceLength': traceLength.value,
        'fadeOut': fadeOut.value,
        'fontSize': fontSize.value,
        'emojis': emojis.value
    }

    emoji.disable();
}