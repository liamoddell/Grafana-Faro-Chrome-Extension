# Grafana Faro Extension

This is a very simple chrome extension that allows you to inject the Grafana Browser Real User Monitoring & Tracing SDKs into websites.

Importantly, this extension leverages [corsproxy.io](https://corsproxy.io/) to address CORS-related errors when injecting the code. The recommendation is to only use this extension for **demo purposes**; be mindful of disabling this extension when performing any potentially sensitive tasks, and only monitor websites that you have explicit permission to monitor.

Both the **faro-web-sdk.iife.js** & **faro-web-tracing.iife.js** are stored locally. These files should be replaced frequently to maintain version/feature parity with new releases of Grafana Faro.

## Installation

Make a copy of this repository, either by [downloading](https://github.com/liamoddell/Grafana-Faro-Chrome-Extension/archive/refs/tags/version.zip) or by cloning:

```shell
git clone git@github.com:liamoddell/Grafana-Faro-Chrome-Extension.git
```

In your chrome browser open `chrome://extensions/` and turn on "Developer Mode".

Click on the "Load unpacked" extension button and source the directory where you have placed the extension.

Load any website now and you should see the following message in the developer toolbar console:

```
[faro.js] Current URL: <your_url>
```

and

```
[faro.js] faroSdk loaded
[faro.js] webTracing loaded
```

With this you have the extension up and running.

## Configuration

To configure the extension, you will need the endpoint URL of your Grafana Frontend instance. This can be found after manually creating the Frontend Application in the Grafana UI. Once created, head to the 'Web SDK Configuration' tab and look for the 'url' property within any of the '.initializeFaro' code blocks. Example:

```shell
  webSdkScript.onload = () => {
    window.GrafanaFaroWebSdk.initializeFaro({
      url: "https://faro-collector-prod-us-central-0.grafana.net/collect/<uid>", 
      app: {
        ...
```
The extension also supports matching on a specific URL string to ensure only certain pages are instrumented & monitored. At this time, this **requires a match pattern of > 4 consecutive alphanumeric characters**, with **no wildcard/regex support currently in place** (WIP). A blank string will match on all webpages.

## Options

**Enable Extension**: Enables / disables the extension from instrumenting current webpages.

**Save**: Saves the current configuration into Chrome storage for persistent usage.

**Clear**: Removes the current configuration in both fields. 'Save' after clearing to persist with cleared fields.

**Restore**: Restores the previously used configuration for both the Faro URL and match string. Semi-useful if fields cleared by mistake.

