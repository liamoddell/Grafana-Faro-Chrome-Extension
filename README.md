# Simple ADRUM Extension

This is a very simple chrome extension, that allows you to inject the AppDynamics Browser Real User Monitoring Agent (ADRUM) into websites.

Use this extension as starter kit, if you want to build a chrome extension

If you are looking for a ready to use extension with a proper user interface, use [AppDynamics RUM and Analytics Injector](https://chrome.google.com/webstore/detail/appdynamics-rum-and-analy/jaglimgofcfiledfllnblglekgehibob)

## Installation

Make a copy of this repository, either by [downloading](https://github.com/svrnm/simple-adrum-extension/archive/master.zip) or by cloning:

```shell
git clone git@github.com:svrnm/simple-adrum-extension.git
```

In your chrome browser open `chrome://extensions/` and turn on the "Developer Mode".

Click on the "Load unpacked" extension button and source the directory where you have placed the extension

Load any website now and you should see the following message in the developer toolbar console:

```
[extension.js] If you can read this message in your developer tools console, the injection was a success.
```

and also 

```
[agent.js] injected
```

With this you have the extension up and running. You can now start editing the agent.js file, which holds the code for the ADRUM injection
