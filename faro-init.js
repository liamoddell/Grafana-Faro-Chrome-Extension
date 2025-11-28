(function() {
    const configElement = document.getElementById('faro-config');
    if (!configElement) {
        console.error("[Faro] Configuration element not found");
        return;
    }

    const config = JSON.parse(configElement.textContent);
    const { faroURL, appName } = config;

    function waitForFaro() {
        if (typeof window.GrafanaFaroWebSdk === 'undefined' || typeof window.GrafanaFaroWebTracing === 'undefined') {
            setTimeout(waitForFaro, 100);
            return;
        }

        try {
            const webInstrumentations = window.GrafanaFaroWebSdk.getWebInstrumentations();
            const tracingInstrumentation = new window.GrafanaFaroWebTracing.TracingInstrumentation();

            window.GrafanaFaroWebSdk.initializeFaro({
                url: faroURL,
                app: {
                    name: appName,
                    version: "1.0.0"
                },
                instrumentations: [
                    ...webInstrumentations,
                    tracingInstrumentation
                ]
            });

            console.log("[Faro] Initialised successfully");
        } catch (error) {
            console.error("[Faro] Initialisation failed:", error);
        }
    }

    waitForFaro();
})();
