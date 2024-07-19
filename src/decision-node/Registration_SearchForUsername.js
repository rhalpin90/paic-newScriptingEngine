// Journey Decision Node Script that queries the OnPrem connector to ensure that the username
// the user provided for registration is not already used by a different account.

var scriptOutcomes = {
    FOUND: 'found',
    NOT_FOUND: 'not-found',
    ERROR: 'error'
};

var MESSAGE_KEY = 'trivir_message';

(function () {
    var objectAttributes = nodeState.getObject('objectAttributes');
    if (!objectAttributes) {
        logger.error('No objectAttributes found in node state');
        action.goTo(scriptOutcomes.ERROR);
        return;
    }
    var userName = objectAttributes.userName;
    try {
        var onPremConnectorName = String(systemEnv.getProperty('esv.sou.onprem.connector.name'));
        var result = openidm.query(
            `system/${onPremConnectorName}/user`,
            { _queryFilter: `/userName eq "${userName}"` },
            ['userName']
        );
        if (result.resultCount > 0) {
            nodeState.putShared(MESSAGE_KEY, 'An account with that username already exists.');
            action.goTo(scriptOutcomes.FOUND);
            return;
        }
    } catch (err) {
        logger.error(err.toString());
        action.goTo(scriptOutcomes.ERROR);
        return;
    }
    nodeState.putShared(MESSAGE_KEY, '_');
    action.goTo(scriptOutcomes.NOT_FOUND);
})();
