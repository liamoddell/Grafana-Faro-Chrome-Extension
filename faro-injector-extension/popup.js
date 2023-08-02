// Get the DOM elements
const faroUrlInput = document.getElementById('faroUrl');
const saveButton = document.getElementById('saveButton');
const urlStringInput = document.getElementById('urlString'); // Change variable name to avoid confusion
const clearButton = document.getElementById('clearButton');
const restoreButton = document.getElementById('restoreButton');

// Event listeners
saveButton.addEventListener('click', saveOptions);
clearButton.addEventListener('click', clearInputs);
restoreButton.addEventListener('click', restoreOptions);

// Function to handle Save button click
function saveOptions() {
    var faroUrl = faroUrlInput.value;
    var urlString = urlStringInput.value; // Use the correct variable name
    chrome.storage.sync.set({
        faroUrl: faroUrl,
        urlString: urlString
    }, function() {
        // Update status to let user know options were saved.
        showSuccessMessage('Options saved.');
    });
}

// Function to handle Clear button click
function clearInputs() {
    faroUrlInput.value = '';
    urlStringInput.value = '';
    showSuccessMessage('Fields cleared.');
}

// Function to handle Restore button click
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

// Function to show a success message
function showSuccessMessage(message) {
    const successMessage = document.createElement('div');
    successMessage.textContent = message;
    successMessage.style.backgroundColor = '#0078d4';
    successMessage.style.color = '#ffffff';
    successMessage.style.padding = '5px';
    successMessage.style.marginTop = '10px';
    successMessage.style.textAlign = 'center';

    // Append the success message to the body
    document.body.appendChild(successMessage);

    // Remove the message after 3 seconds
    setTimeout(function() {
        document.body.removeChild(successMessage);
    }, 3000);
}

// popup.js
document.addEventListener('DOMContentLoaded', function() {
    // Restore the toggle state from chrome.storage
    chrome.storage.sync.get({
        extensionEnabled: true
    }, function(items) {
        document.getElementById('toggleExtension').checked = items.extensionEnabled;
    });

    // Handle the toggle change event
    document.getElementById('toggleExtension').addEventListener('change', function() {
        const extensionEnabled = this.checked;
        chrome.storage.sync.set({
            extensionEnabled: extensionEnabled
        });
        updateExtensionStatus(extensionEnabled);
    });
});

function updateExtensionStatus(enabled) {
    // Get the extension ID
    const extensionId = chrome.runtime.id;

    // Enable or disable the extension using chrome.management.setEnabled
    chrome.management.setEnabled(extensionId, enabled, function() {
        console.log('Extension ' + (enabled ? 'enabled' : 'disabled') + '.');
    });
}

// Restore select box and checkbox state using the preferences stored in chrome.storage.
document.addEventListener('DOMContentLoaded', function() {
    restoreOptions();
});