// Journey Decision Node Script that checks for a `trivir_message` property on the sharedState
// and sends a warning TextOutputCallback to the client with the message contents. After sending
// the callback, it sets the message to `_` which gets ignored by this script.

var scriptOutcomes = {
    OUTCOME: 'outcome'
};

var MESSAGE_KEY = 'trivir_message';

(function () {
    if (callbacks.isEmpty() && nodeState.get(MESSAGE_KEY) && String(nodeState.get(MESSAGE_KEY)) !== '_') {
        callbacksBuilder.textOutputCallback(1, nodeState.get(MESSAGE_KEY));
        return;
    }
    nodeState.putShared(MESSAGE_KEY, '_');
    action.goTo(scriptOutcomes.OUTCOME);
})();
