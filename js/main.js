const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
const isAndroid = /Android/i.test(navigator.userAgent);

let IOS_widht = 0.80;
let IOS_height = 0.75;

// Глобальные переменные (если нужны)
window.isIOS = isIOS;
window.isAndroid = isAndroid;

window.addEventListener('load', function () {
    if (isIOS) {
        document.querySelector('.ios-only').style.display = 'block';
        document.getElementById('android-title').style.display = 'none';
    } else if (isAndroid) {
        document.querySelector('.android-only').style.display = 'block';
    }
    checkOrientation();

    if (isIOS) {
        window.addEventListener('resize', function () {
            setTimeout(updateIOSContainerSize, 100);
        });
        window.addEventListener('orientationchange', function () {
            setTimeout(function () {
                checkOrientation();
                updateIOSContainerSize();
            }, 500);
        });
    }
});

function checkOrientation() {
    var overlay = document.getElementById('orientation-overlay');
    var container = document.getElementById('unity-container');

    if (window.innerHeight > window.innerWidth) {
        overlay.classList.add('portrait');
        document.getElementById('ios-frame').classList.remove('active');
        if (isIOS) {
            container.classList.remove('ios-positioned');
        }
    } else {
        overlay.classList.remove('portrait');
        if (isIOS) {
            document.getElementById('ios-frame').classList.add('active');
            container.classList.add('ios-positioned');
            setTimeout(updateIOSContainerSize, 100);
        }
    }
}

function updateIOSContainerSize() {
    if (!isIOS) return;
    const container = document.getElementById('unity-container');
    const frame = document.getElementById('ios-frame');
    const containerWidth = window.innerWidth * IOS_widht;
    const containerHeight = window.innerHeight * IOS_height;
    container.style.width = containerWidth + 'px';
    container.style.height = containerHeight + 'px';
    frame.style.width = containerWidth + 'px';
    frame.style.height = containerHeight + 'px';
}

function handleAndroidRotation() {
    console.log('Android: Starting full process...');
    document.getElementById('orientation-overlay').classList.remove('portrait');
    enterFullscreen();
    setTimeout(function () {
        lockLandscapeOrientation();
    }, 500);
}

if (isAndroid) {
    window.addEventListener('resize', checkOrientation);
}

function lockLandscapeOrientation() {
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').then(function () {
            console.log('Android: Orientation locked to landscape');
        }).catch(function (error) {
            console.log('Android: Orientation lock failed:', error);
        });
    }
}

function enterFullscreen() {
    var element = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen().catch(function (e) {
            console.log('Fullscreen error:', e);
        });
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

// Основные обработчики ориентации
window.addEventListener('load', checkOrientation);
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);

document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (isIOS) {
            document.getElementById('ios-frame').classList.remove('active');
            document.getElementById('unity-container').classList.remove('ios-positioned');
        }
    }
});
