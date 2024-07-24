var scriptOutcomes = {
    OUTCOME: 'outcome'
};

var MESSAGE_KEY = 'errorMessage';

function main() {
    if (callbacks.isEmpty() && nodeState.get(MESSAGE_KEY)) {
        callbacksBuilder.textOutputCallback(1, nodeState.get(MESSAGE_KEY));
        return;
    }
    nodeState.remove(MESSAGE_KEY);
    action.goTo(scriptOutcomes.OUTCOME);
}

main();