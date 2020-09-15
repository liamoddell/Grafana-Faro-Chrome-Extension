// You don't need to edit this file. It only makes sure that the agent.js
// is loaded into your website.
console.log("[extension.js] If you can read this message in your developer tools console, the injection was a success.")

function inject() {
  console.log("[extension.js] Injecting")
  const script = document.createElement("script")
  script.setAttribute("type", "text/javascript")
  script.setAttribute("src", chrome.runtime.getURL("agent.js"))
  document.head.appendChild(script)
}


// The extension is loaded super early, so we have to make sure that the document head
// is already created.
if (document.head) {
    inject();
} else {
    // if document.head is not yet created, use a MutationObserver
    // to wait for it to be created and inject the javascript then.
    new MutationObserver(function(mutations) {
        if (document.head) {
            this.disconnect();
            inject();
        }
    }).observe(document.documentElement, {childList: true});
}
