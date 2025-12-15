function unityShowBanner(msg, type) {
    var warningBanner = document.querySelector("#unity-warning");
    function updateBannerVisibility() {
        warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
    }
    var div = document.createElement('div');
    div.innerHTML = msg;
    warningBanner.appendChild(div);
    if (type == 'error') div.style = 'background: red; padding: 10px;';
    else {
        if (type == 'warning') div.style = 'background: yellow; padding: 10px;';
        setTimeout(function () {
            warningBanner.removeChild(div);
            updateBannerVisibility();
        }, 5000);
    }
    updateBannerVisibility();
}

function initializeUnity() {
    var buildUrl = "Build";
    var config = {
        dataUrl: buildUrl + "/Molar.data.unityweb",
        frameworkUrl: buildUrl + "/Molar.framework.js.unityweb", 
        codeUrl: buildUrl + "/Molar.wasm.unityweb",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "SibVlab",
        productName: "MolarMass_0.1",
        productVersion: "0.1",
        showBanner: unityShowBanner,
    };

    var container = document.querySelector("#unity-container");
    var canvas = document.querySelector("#unity-canvas");
    var loadingBar = document.querySelector("#unity-loading-bar");
    var progressBarFull = document.querySelector("#unity-progress-bar-full");
    var fullscreenButton = document.querySelector("#unity-fullscreen-button");

    var loaderUrl = buildUrl + "/Molar.loader.js";
    var script = document.createElement("script");
    script.src = loaderUrl;

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        container.className = "unity-mobile";
        canvas.className = "unity-mobile";
    } else {
        canvas.style.width = "960px";
        canvas.style.height = "540px";
    }

    script.onload = () => {
        createUnityInstance(canvas, config, (progress) => {
            progressBarFull.style.width = 100 * progress + "%";
        }).then((unityInstance) => {
            myUnityInstance=unityInstance;
            loadingBar.style.display = "none";
            fullscreenButton.onclick = () => {
                unityInstance.SetFullscreen(1);
            };
        }).catch((message) => {
            alert(message);
        });
    };

    loadingBar.style.display = "block";
    document.body.appendChild(script);
}

// Запускаем загрузку Unity когда DOM готов
document.addEventListener('DOMContentLoaded', initializeUnity);
