# Grafana Frontend O11y Extension

This is a very simple Chrome extension that allows you to inject the Grafana Faro Real User Monitoring & Tracing SDKs into websites for Frontend Observability.

Both the **faro-web-sdk.iife.js** (v2.0.2) & **faro-web-tracing.iife.js** (v2.0.2) are stored locally. These files should be replaced frequently to maintain version/feature parity with new releases of Grafana Faro.

Importantly, this extension uses a **transport proxy** (faro-transport-proxy.js) to automatically bypass Content Security Policy (CSP) restrictions when sending telemetry data. The proxy intercepts requests from the Faro SDK running in the page context and routes them through the Chrome extension's content script, which has elevated privileges to bypass CSP. The recommendation is to only use this extension for **demo purposes**; be mindful of disabling this extension when performing any potentially sensitive tasks, and only monitor websites that you have explicit permission to monitor.

**Prerequisites**: You will need a [Grafana Cloud account](https://grafana.com/auth/sign-up/create-user) with Frontend Observability enabled to use this extension.

## What Gets Tracked

The extension automatically instruments websites with:

- **Errors & Exceptions**: JavaScript errors and unhandled promise rejections
- **Console Logs**: Console output (log, warn, error, etc.)
- **Web Vitals**: Core Web Vitals (LCP, FID, CLS, INP, TTFB, FCP)
- **User Actions**: Click interactions on elements with `data-faro-user-action-name` attribute
- **HTTP Requests**: Fetch API and XMLHttpRequest calls with timing and status
- **Session Tracking**: User sessions with unique session IDs
- **Performance Metrics**: Resource timing and navigation performance

## Installation

Make a copy of this repository, either by downloading or by cloning:

```shell
git clone git@github.com:liamoddell/Grafana-Faro-Chrome-Extension.git
```

In your Chrome browser open `chrome://extensions/` and turn on "Developer Mode".

Click on the "Load unpacked" extension button and source the directory where you have placed the extension.

Load any website now and you should see the following message in the developer toolbar console:

```
[Faro] Loading SDK for: <your_url>
[Faro] Initialised successfully
```

With this you have the extension up and running.

## Configuration

To configure the extension, you will need the endpoint URL of your Grafana Frontend instance. This can be found after manually creating the Frontend Application in the Grafana UI. Once created, head to the 'Web SDK Configuration' tab and look for the 'url' property within any of the '.initializeFaro' code blocks. Example:

```javascript
webSdkScript.onload = () => {
  window.GrafanaFaroWebSdk.initializeFaro({
    url: "https://faro-collector-prod-us-central-0.grafana.net/collect/<uid>",
    app: {
      ...
```

The extension supports flexible URL matching to ensure only certain pages are instrumented & monitored:

- **Plain text**: `google.com` matches any URL containing this string
- **Wildcards**: `*.google.com` or `google.*` using `*` as a wildcard
- **Regex**: `/google\.com$/` for advanced pattern matching (wrap in forward slashes)
- **Match all**: Leave blank to monitor all webpages

### Configuring CORS Domains

Before the extension can send telemetry data, you need to configure allowed domains in Grafana Cloud:

1. Go to **Grafana Cloud** → **Frontend Observability** → Your Application
2. Navigate to **Settings** → **Domains**
3. Add the domains you want to monitor:
   - Specific domain: `example.com`
   - With subdomains: `*.example.com`
   - All domains (testing only): `*`
4. Save the configuration

**Important**: If no domains are configured, all requests will be blocked by CORS, even though the extension automatically handles CSP bypass.

## Options

**Enable Extension**: Enables / disables the extension from instrumenting current webpages.

**Faro Collector URL**: The collector endpoint URL from your Grafana Cloud Frontend Observability application.

**Monitored URL Contains**: Optional URL filter. Supports plain text (e.g., `google.com`), wildcards (e.g., `*.google.com`), or regex (e.g., `/google\.com$/`). Leave blank to monitor all sites.

**Save**: Saves the current configuration into Chrome storage for persistent usage.

**Clear**: Removes the current configuration in both fields. 'Save' after clearing to persist with cleared fields.

**Restore**: Restores the previously used configuration for both the Faro URL and match string. Semi-useful if fields cleared by mistake.

**Trigger Test Error**: Sends realistic test telemetry to Grafana, simulating:
- API Error (404): Failed to fetch user data
- TypeError: Cannot read property of undefined
- Warning: Slow API response
- User action event

Check your Grafana Cloud dashboard in 1-2 minutes after triggering to verify the extension is working.

## Troubleshooting

### Content Security Policy (CSP)

The extension automatically handles CSP restrictions using a transport proxy (faro-transport-proxy.js). If you see CSP-related errors in the console, they should not prevent telemetry from being sent. The transport proxy intercepts fetch requests from the Faro SDK in the page context and routes them through the content script (faro.js), which has Chrome extension privileges and bypasses CSP.

### "Failed to fetch" Errors

If you see "Failed to fetch" errors:

1. Check that you've configured allowed domains in Grafana Cloud (see "Configuring CORS Domains" above)
2. Verify your Faro collector URL is correct
3. Check that the extension is enabled
4. Use the **Trigger Test Error** button to verify the connection

### No Data in Grafana

If the extension loads without errors but you don't see data:

- Verify your Faro collector URL is correct
- Check that the URL filter matches the site you're visiting
- Ensure the extension toggle is ON
- Ensure CORS domains are configured in Grafana Cloud
- Wait 1-2 minutes for data to appear in Grafana
- Check browser Network tab for POST requests to your collector URL

### No User Actions Data

User actions don't appear automatically. Websites must add `data-faro-user-action-name` attributes to clickable elements:

```html
<button data-faro-user-action-name="checkout">Checkout</button>
```

Alternatively, use the Faro API in website code:

```javascript
const action = faro.api.startUserAction('form-submission', { formId: 'signup' });
// ... user completes action ...
action.end();
```

If you're testing on a website you don't control, you won't see user actions unless that website has implemented this.

## How It Works

The extension consists of several key components:

1. **faro.js** (content script) - Loads the Faro SDK and handles fetch proxying between page and extension contexts
2. **faro-transport-proxy.js** - Injected into page context, intercepts Faro collector requests and proxies them through the content script to bypass CSP
3. **faro-init.js** - Initialises the Faro SDK with all instrumentations in the page context
4. **popup.html/popup.js** - Extension configuration interface

The transport proxy is the key to bypassing CSP restrictions. When the Faro SDK attempts to send telemetry to the collector, faro-transport-proxy.js intercepts the fetch call and uses postMessage to communicate with faro.js (content script), which then makes the actual request with extension privileges that bypass CSP.

## Updating Faro SDK

To update to a newer version:

1. Visit the [Grafana Faro GitHub releases](https://github.com/grafana/faro-web-sdk/releases)
2. Download the IIFE bundles from unpkg for the desired version:
   ```
   https://unpkg.com/@grafana/faro-web-sdk@VERSION/dist/bundle/faro-web-sdk.iife.js
   https://unpkg.com/@grafana/faro-web-tracing@VERSION/dist/bundle/faro-web-tracing.iife.js
   ```
3. Replace the files in the `scripts/` directory
4. Test the extension to ensure compatibility
