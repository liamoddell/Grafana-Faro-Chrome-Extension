const faroUrlInput = document.getElementById('faroUrl');
const saveButton = document.getElementById('saveButton');
const urlStringInput = document.getElementById('urlString');
const clearButton = document.getElementById('clearButton');
const restoreButton = document.getElementById('restoreButton');
const testErrorButton = document.getElementById('testErrorButton');

saveButton.addEventListener('click', saveOptions);
clearButton.addEventListener('click', clearInputs);
restoreButton.addEventListener('click', restoreOptions);
testErrorButton.addEventListener('click', triggerTestError);

function saveOptions() {
    var faroUrl = faroUrlInput.value.trim();
    var urlString = urlStringInput.value.trim();

    if (!faroUrl) {
        showErrorMessage('Faro Collector URL is required.');
        return;
    }

    try {
        new URL(faroUrl);
    } catch (e) {
        showErrorMessage('Please enter a valid Faro Collector URL.');
        return;
    }

    chrome.storage.sync.set({
        faroUrl: faroUrl,
        urlString: urlString
    }, function() {
        showSuccessMessage('Options saved. Reload the page to apply changes.');
    });
}

function clearInputs() {
    faroUrlInput.value = '';
    urlStringInput.value = '';
    showSuccessMessage('Fields cleared.');
}

function restoreOptions() {
    chrome.storage.sync.get({
        faroUrl: '',
        urlString: ''
    }, function(items) {
        faroUrlInput.value = items.faroUrl;
        urlStringInput.value = items.urlString;
        showSuccessMessage('Previous configuration restored.');
    });
}

function showSuccessMessage(message) {
    showMessage(message, '#0078d4');
}

function showErrorMessage(message) {
    showMessage(message, '#d32f2f');
}

function showMessage(message, backgroundColor) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.backgroundColor = backgroundColor;
    messageElement.style.color = '#ffffff';
    messageElement.style.padding = '5px';
    messageElement.style.marginTop = '10px';
    messageElement.style.textAlign = 'center';

    document.body.appendChild(messageElement);

    setTimeout(function() {
        if (messageElement.parentNode) {
            document.body.removeChild(messageElement);
        }
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get({
        extensionEnabled: true
    }, function(items) {
        document.getElementById('toggleExtension').checked = items.extensionEnabled;
    });

    document.getElementById('toggleExtension').addEventListener('change', function() {
        const extensionEnabled = this.checked;
        chrome.storage.sync.set({
            extensionEnabled: extensionEnabled
        }, function() {
            showSuccessMessage('Extension ' + (extensionEnabled ? 'enabled' : 'disabled') + '.');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    restoreOptions();
});

function triggerTestError() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (!tabs[0]) {
            showErrorMessage('No active tab found');
            return;
        }

        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            func: function() {
                window.postMessage({
                    type: 'FARO_TEST_TRIGGER'
                }, '*');

                setTimeout(() => {
                    const listener = (event) => {
                        if (event.data.type === 'FARO_TEST_RESULT') {
                            window.removeEventListener('message', listener);
                            if (event.data.success) {
                                alert('✓ Test telemetry sent!\n\nSimulated realistic frontend errors:\n\n• API Error (404): Failed to fetch user data\n• TypeError: Cannot read property of undefined\n• Warning: Slow API response\n• User action event\n\nCheck your Grafana Cloud dashboard in 1-2 minutes.');
                            } else {
                                alert('Faro is not loaded on this page. Make sure:\n1. Extension is enabled\n2. URL matches your filter\n3. Page has been reloaded after enabling');
                            }
                        }
                    };
                    window.addEventListener('message', listener);
                }, 100);
            }
        }).catch(function(error) {
            showErrorMessage('Failed to inject test: ' + error.message);
        });
    });
}