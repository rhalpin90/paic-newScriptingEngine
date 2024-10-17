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
    var telephoneNumber = callbacks.getNameCallbacks()[0];
    if (telephoneNumber.length === 0) {
        createCallbacks(true);
        return;
    }
    var objectAttributes = nodeState.get('objectAttributes') || {};
    objectAttributes.telephoneNumber = telephoneNumber;
    nodeState.putShared('objectAttributes', objectAttributes);
    nodeState.putShared('telephoneNumber', telephoneNumber);

    action.goTo(scriptOutcomes.OUTCOME);
}

/**
 * @param {boolean=} showError
 */
function createCallbacks(showError) {
    if (showError) {
        callbacksBuilder.textOutputCallback(2, 'You must provide a telephone number');
    }
    callbacksBuilder.nameCallback('Telephone Number');
    callbacksBuilder.confirmationCallback(
        'Continue',
        0,
        ['Next'],
        0
    );
}

main();