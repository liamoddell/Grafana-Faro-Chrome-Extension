// Edit this file to configure your agent
console.log("[agent.js] injected")

// A simple URL check, the whole url is checked (including path, query)
// so pay attention: https://www.example.com/check?q=google.com
// will match on "google.com"
// An empty string ("") will match on every website.
const url = ""
if(document.location.href.indexOf(url) < 0) {
    console.log("[agent.js] URL does not match '" + url + "' not in", document.location.href)
} else {
    console.log("[agent.js] URL does match '" + url + "' in", document.location.href)
    window["adrum-start-time"] = new Date().getTime();
    (function(config){
        config.appKey = "";
        config.adrumExtUrlHttp = "http://cdn.appdynamics.com";
        config.adrumExtUrlHttps = "https://cdn.appdynamics.com";
        config.beaconUrlHttp = "http://fra-col.eum-appdynamics.com";
        config.beaconUrlHttps = "https://fra-col.eum-appdynamics.com";
        config.resTiming = {"bufSize":200,"clearResTimingOnBeaconSend":true};
        config.maxUrlLength = 512;
        config.page = {"captureTitle":true};
        config.fetch = true;
    })(window["adrum-config"] || (window["adrum-config"] = {}));
    console.log("[agent.js] agent is configured for appkey", window["adrum-config"].appKey, "and beaconUrl", document.location.protocol === "http:" ? window["adrum-config"].beaconUrlHttp : window["adrum-config"].beaconUrlHttps)
    console.log("[agent.js] config", window["adrum-config"])
    const script = document.createElement("script")
    script.setAttribute("type", "text/javascript")
    script.setAttribute("src", "//cdn.appdynamics.com/adrum/adrum-latest.js")
    document.head.appendChild(script)
    console.log("[agent.js] adrum.js loaded:", script)
}
