var scriptOutcomes = {
    // Other outcomes are dynamic based on portal param
    ERROR: 'error',
}

function main() {
    var fr = JavaImporter(
        org.forgerock.openam.auth.node.api.Action
    );

    var REQUEST_PARAM_NAME = 'portal';

    if (!requestParameters.get(REQUEST_PARAM_NAME) || !requestParameters.get(REQUEST_PARAM_NAME).get(0)) {
        action.goTo(scriptOutcomes.ERROR).withErrorMessage('No ' + REQUEST_PARAM_NAME + ' parameter provided');
        return;
    }
    var portalName = String(requestParameters.get(REQUEST_PARAM_NAME).get(0));

    var KNOWN_PORTALS = [
        // member, patient, jrneywell, virtuwell
        'consumer',
        'journeywell',
        'livingwell',
        'mobile',
        // 'headless', // Headless not used for themeing
        'virtuwell',
        // provider
        'provider',
        // employer
        'employer',
        // broker
        'broker'
    ];

    if (KNOWN_PORTALS.indexOf(portalName) === -1) {
        action.goTo(scriptOutcomes.ERROR).withErrorMessage('Unknown portal specified');
        return;
    }
    nodeState.putShared('portal', portalName);
    action.goTo(portalName);
}

main();
