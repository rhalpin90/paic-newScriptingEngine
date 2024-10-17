var loggingLibrary = require('Library_Logging')(logger, requestHeaders);

var scriptOutcomes = {
    PHONE: 'phone',
    EMAIL: 'email'
};

var scriptLogger = new loggingLibrary.ScriptLogger(scriptName);

function main() {
    if (callbacks.isEmpty()) {
        createCallbacks();
        return;
    }
    var username = callbacks.getNameCallbacks()[0];
    if (username.length === 0) {
        createCallbacks(true);
        return;
    }
    var objectAttributes = nodeState.get('objectAttributes') || {};
    objectAttributes.userName = username;
    nodeState.putShared('objectAttributes', objectAttributes);
    nodeState.putShared('username', username);
    var selectedOption = callbacks.getConfirmationCallbacks()[0];
    switch (selectedOption) {
    case 0:
        action.goTo(scriptOutcomes.PHONE);
        return;
    case 1:
        action.goTo(scriptOutcomes.EMAIL);
        return;
    default:
        scriptLogger.error('Invalid OTP method selected');
    }
}

/**
 * @param {boolean=} showError
 */
function createCallbacks(showError) {
    if (showError) {
        callbacksBuilder.textOutputCallback(2, 'You must provide a User Name');
    }
    callbacksBuilder.nameCallback('User Name');
    callbacksBuilder.confirmationCallback(
        'Select a one-time passcode method',
        0,
        [
            'Email me my code',
            'Text me my code'
        ],
        0
    );
}

main();