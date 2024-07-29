var scriptOutcomes = {
    OUTCOME: 'outcome'
};

function main() {
    action.goTo(scriptOutcomes.OUTCOME).withErrorMessage('Your account is locked. Please contact Member Services at 877-465-3361 for assistance.');
}

main();
