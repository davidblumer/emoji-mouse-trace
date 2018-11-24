function emojiMouseTrace(customConfig) {
    const canvas = document.createElement('canvas');

    var decayTrail;
    const demo = [
        'https://i.kym-cdn.com/photos/images/newsfeed/001/318/758/bbe.png',
        'https://t1.rbxcdn.com/096bd75447e51ae416e373322911faef'
    ];

    const emojis = [0x1F600, 0x1F604, 0x1F34A, 0x1F344, 0x1F37F, 0x1F363, 0x1F370, 0x1F355,
        0x1F354, 0x1F35F, 0x1F6C0, 0x1F48E, 0x1F5FA, 0x23F0, 0x1F579, 0x1F4DA,
        0x1F431, 0x1F42A, 0x1F439, 0x1F424];

    const config = {
        'traceLength': customConfig && customConfig.traceLength ? customConfig.traceLength : 20,
        'imageSize': customConfig && customConfig.imageSize ? customConfig.imageSize : 30,
        'images': customConfig && customConfig.images ? createImages(customConfig.images) : createImages(demo),
        'fadeOut': customConfig && customConfig.fadeOut ? customConfig.fadeOut : false,
        'mode': customConfig && customConfig.mode ? customConfig.mode : 'emoji',
        'fontFamily': customConfig && customConfig.fontFamily ? customConfig.fontFamily : 'Arial',
        'fontSize': customConfig && customConfig.fontSize ? customConfig.fontSize : '30px',
        'emojis': customConfig && customConfig.emojis ? customConfig.emojis : emojis,
        'zIndex': customConfig && customConfig.zIndex ? customConfig.zIndex : 1,
        'id': customConfig && customConfig.id ? customConfig.id : 'trace'
    };

    const trace = [];

    canvas.id = config.id;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.right = 0;
    canvas.style.bottom = 0;
    canvas.style.left = 0;
    canvas.style.zIndex = config.zIndex;

    document.addEventListener('mousemove', drawTrace);

    function createImages(images) {
        return images.map(image => {
            const img = new Image();
            img.src = image;
            return img;
        })
    }


    function drawTrace(event) {

        // Debounce
        clearTimeout(decayTrail);
        decayTrail = setTimeout(decay, 25);
        document.body.style.cursor = 'none';

        removeLastItemOfTrace();
        addPositionToTrace(event);
        clear();
        draw();
    }

    function removeLastItemOfTrace() {
        if (trace.length > config.traceLength - 1) {
            trace.shift();
        }
    }

    function addPositionToTrace(event) {
        const pos = {
            x: event.clientX,
            y: event.clientY,
            img: config.mode === 'images' ? config.images[Math.floor(Math.random() * (config.images.length))] : undefined,
            emoji: config.mode === 'emoji' ? getRandomEmoji() : undefined
        };
        trace.push(pos);
    }

    function clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function draw() {
        trace.map(function (pos, index) {

            if (config.fadeOut) {
                ctx.globalAlpha = index / 10;
            }

            if (config.mode === 'emoji') {
                ctx.font = config.fontSize + ' ' + config.fontFamily;
                ctx.fillText(pos.emoji, pos.x, pos.y);
            }

            if (config.mode === 'images') {
                ctx.drawImage(pos.img, pos.x, pos.y, config.imageSize, config.imageSize);
            }
        })
    }

    function getRandomEmoji() {
        const randomEmoji = config.emojis[Math.floor(Math.random() * config.emojis.length)]
        var returnValue;
        try {
            returnValue = String.fromCodePoint(randomEmoji)
        } catch (err) {
            returnValue = randomEmoji;
        }
        finally {
            return returnValue;
        }
    }

    function decay() {
        var decayInterval = setInterval(function () {
            clear();
            trace.shift();
            draw();

            if (trace.length === 0) {
                document.body.style.cursor = 'auto';
                clearInterval(decayInterval);
            }
        }, 20)
    }

    function disable() {
        clear();
        document.removeEventListener('mousemove', drawTrace);
    }

    return {
        disable: disable
    }
}