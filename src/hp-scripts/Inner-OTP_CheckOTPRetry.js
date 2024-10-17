var scriptOutcomes = {
    RETRY: 'retry',
    FAILURE: 'failure'
}

function main() {
    var retryFlag = Boolean(nodeState.get('retryFlag'));
    if (retryFlag) {
        nodeState.remove('retryFlag');
        action.goTo(scriptOutcomes.RETRY);
        return;
    }
    action.goTo(scriptOutcomes.FAILURE);
}

main();