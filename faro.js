window.addEventListener('message', async (event) => {
    if (event.source !== window || event.data.type !== 'FARO_FETCH_PROXY') {
        return;
    }

    try {
        const { url, options } = event.data;

        const response = await fetch(url, {
            method: options.method,
            headers: options.headers,
            body: options.body
        });

        const body = await response.text();

        window.postMessage({
            type: 'FARO_FETCH_RESPONSE',
            ok: response.ok,
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
            body: body ? JSON.parse(body) : null
        }, '*');
    } catch (error) {
        window.postMessage({
            type: 'FARO_FETCH_RESPONSE',
            error: error.message
        }, '*');
    }
});

async function loadFaroSdk() {
    try {
        const result = await new Promise((resolve) => {
            chrome.storage.sync.get(['urlString', 'faroUrl', 'extensionEnabled'], resolve);
        });

        const urlString = result.urlString || "";
        const faroURL = result.faroUrl || "";
        const extensionEnabled = result.extensionEnabled !== undefined ? result.extensionEnabled : true;
        const appName = "faro-browser-extension";

        if (!extensionEnabled) {
            return;
        }

        if (!faroURL) {
            return;
        }

        if (!checkUrlContains(urlString)) {
            return;
        }

        console.log("[Faro] Loading SDK for:", window.location.href);

        const transportProxyUrl = chrome.runtime.getURL("faro-transport-proxy.js");
        const sdkUrl = chrome.runtime.getURL("scripts/faro-web-sdk.iife.js");
        const tracingUrl = chrome.runtime.getURL("scripts/faro-web-tracing.iife.js");
        const initUrl = chrome.runtime.getURL("faro-init.js");

        const configScript = document.createElement('script');
        configScript.id = 'faro-config';
        configScript.type = 'application/json';
        configScript.textContent = JSON.stringify({
            faroURL: faroURL,
            appName: appName
        });

        (document.head || document.documentElement).appendChild(configScript);

        const transportProxyScript = document.createElement('script');
        transportProxyScript.src = transportProxyUrl;
        transportProxyScript.type = 'text/javascript';
        (document.head || document.documentElement).appendChild(transportProxyScript);

        const sdkScript = document.createElement('script');
        sdkScript.src = sdkUrl;
        sdkScript.type = 'text/javascript';

        sdkScript.onload = function() {
            const tracingScript = document.createElement('script');
            tracingScript.src = tracingUrl;
            tracingScript.type = 'text/javascript';

            tracingScript.onload = function() {
                const initScript = document.createElement('script');
                initScript.src = initUrl;
                initScript.type = 'text/javascript';
                (document.head || document.documentElement).appendChild(initScript);
            };

            tracingScript.onerror = function(error) {
                console.error("[Faro] Failed to load tracing:", error);
            };

            (document.head || document.documentElement).appendChild(tracingScript);
        };

        sdkScript.onerror = function(error) {
            console.error("[Faro] Failed to load SDK:", error);
        };

        (document.head || document.documentElement).appendChild(sdkScript);
    } catch (error) {
        console.error("[Faro] Loading error:", error);
    }
}

function checkUrlContains(urlString) {
    if (!urlString || urlString.trim() === "") {
        return true;
    }

    const currentUrl = window.location.href;

    if (urlString.startsWith('/') && urlString.endsWith('/')) {
        try {
            const pattern = urlString.slice(1, -1);
            const regex = new RegExp(pattern);
            return regex.test(currentUrl);
        } catch (e) {
            console.error("[Faro] Invalid regex pattern:", e);
            return false;
        }
    }

    if (urlString.includes('*')) {
        const pattern = urlString
            .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
            .replace(/\*/g, '.*');
        try {
            const regex = new RegExp(pattern, 'i');
            return regex.test(currentUrl);
        } catch (e) {
            console.error("[Faro] Invalid wildcard pattern:", e);
            return false;
        }
    }

    return currentUrl.toLowerCase().includes(urlString.toLowerCase());
}

loadFaroSdk();