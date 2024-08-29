var scriptOutcomes = {
    MOBILE: 'mobile',
    NOT_MOBILE: 'not_mobile',
    ERROR: 'error'
};

function main() {
    // Retrieve the portal from the shared state
    var portal = nodeState.get('portal');

    // Check if portal is defined
    if (portal === undefined || portal === null) {
        logger.error('Portal not found in shared state');
        action.goTo(scriptOutcomes.ERROR).withErrorMessage('Portal not found in shared state');
        return;
    }

    // Check if the portal is 'mobile'
    if (portal === 'mobile') {
        action.goTo(scriptOutcomes.MOBILE);
    } else {
        action.goTo(scriptOutcomes.NOT_MOBILE);
    }
}

main();