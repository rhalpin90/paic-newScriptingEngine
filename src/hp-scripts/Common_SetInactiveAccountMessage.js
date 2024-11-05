var scriptOutcomes = {
    OUTCOME: 'outcome'
}

function main() {
    var lockMessage = "For your security, we've locked your account. Please contact us for assistance.";
    nodeState.putShared("errorMessage", lockMessage);

    action.goTo(scriptOutcomes.OUTCOME);
}

main();

