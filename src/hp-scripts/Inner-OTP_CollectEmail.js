var loggingLibrary = require('Library_Logging')(logger, requestHeaders);

var scriptOutcomes = {
    OUTCOME: 'outcome'
};

var scriptLogger = new loggingLibrary.ScriptLogger(scriptName);

function main() {
    if (callbacks.isEmpty()) {
        createCallbacks();
        return;
    }
    var mail = callbacks.getNameCallbacks()[0];
    if (mail.length === 0) {
        createCallbacks(true);
        return;
    }
    var objectAttributes = nodeState.get('objectAttributes') || {};
    objectAttributes.mail = mail;
    nodeState.putShared('objectAttributes', objectAttributes);
    nodeState.putShared('mail', mail);

    action.goTo(scriptOutcomes.OUTCOME);
}

/**
 * @param {boolean=} showError
 */
function createCallbacks(showError) {
    if (showError) {
        callbacksBuilder.textOutputCallback(2, 'You must provide an email address');
    }
    callbacksBuilder.nameCallback('Email Address');
    callbacksBuilder.confirmationCallback(
        'Continue',
        0,
        ['Next'],
        0
    );
}

main();