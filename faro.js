// Helper function to load a script dynamically
function loadScript(scriptUrl, async) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = scriptUrl;
        script.setAttribute("type", "text/javascript");
        script.setAttribute("crossorigin", "anonymous");
        script.onload = resolve;
        script.onerror = reject;
        if (async) {
            script.setAttribute("async", "");
        } else {
            script.setAttribute("defer", "");
        }
        document.head.appendChild(script);
    });
}

// Main function to load Faro SDK and instrumentation
async function loadFaroSdk() {
    try {
        const result = await new Promise((resolve) => {
            // Load the specified string from chrome storage
            chrome.storage.sync.get(['urlString', 'faroUrl', 'extensionEnabled'], resolve);
        });

        const urlString = result.urlString || "";
        const faroURL = result.faroUrl || "";
        const extensionEnabled = result.extensionEnabled !== undefined ? result.extensionEnabled : true;

        // Check if the extension is enabled and the current URL contains the specified string
        if (extensionEnabled && checkUrlContains(urlString)) {
            console.log("URL string matches: " + window.location.href);

            // Use of CORSProxy needed to avoid CORS-related issues
            const corsProxy = 'https://corsproxy.io/?';
            const faroProxyUrl = corsProxy + faroURL;
            console.log("Attempting to send data to: " + faroProxyUrl);

            // Load Faro SDK and instrumentation
            await Promise.all([
                loadScript(chrome.runtime.getURL("scripts/faro-web-sdk.iife.js"), false), // Load SDK synchronously
                loadScript(chrome.runtime.getURL("scripts/faro-web-tracing.iife.js"), true) // Load tracing script asynchronously
            ]);

            // Ensure that GrafanaFaroWebSdk is defined after loading the scripts
            if (!window.GrafanaFaroWebSdk) {
                throw new Error('Failed to load Faro SDK.');
            }

            // Initialize Faro SDK and add tracing instrumentation
            window.GrafanaFaroWebSdk.initializeFaro({
                url: faroProxyUrl,
                app: {
                    name: "",
                    version: "1.0.0"
                },
            });

            window.GrafanaFaroWebSdk.faro.instrumentations.add(
                new window.GrafanaFaroWebTracing.TracingInstrumentation()
            );

            console.log("[faro.js] faroSdk loaded");
            console.log("[faro.js] webTracing loaded");
        } else {
            console.log("URL string does not match: " + window.location.href + ' or extension disabled. Not loading the Faro SDK.');
        }
    } catch (error) {
        console.error("Error loading Faro SDK:", error);
    }
}

// Function to check if the current URL contains the specified string
function checkUrlContains(urlString) {
    const currentUrl = window.location.href;
    console.log("Current URL: " + currentUrl);
    // Create a regular expression that matches at least 4 characters from the urlString
    const regex = new RegExp(`\\w{4,}`, "i");
    return regex.test(currentUrl) && currentUrl.includes(urlString);
}

// Call the main function to load Faro SDK
loadFaroSdk();