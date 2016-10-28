setInterval(() => {
    setTimeout(() => {
        [document.querySelector('.loading div').style.float, document.querySelector('.loading div').style.width] = ['left', '100%'];
        setTimeout(() => {[document.querySelector('.loading div').style.float, document.querySelector('.loading div').style.width] = ['right', '0']}, 500);
    }, 500);
}, 1000);
