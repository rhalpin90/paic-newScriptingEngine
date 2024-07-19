// Journey Decision Node Script that queries for the user's OnPrem `_id` then uses that `_id` to
// submit an HTTP PATCH request to set their password to the password on the secureState. Because
// this only runs after successful authentication, it will sync the user's password to OnPrem.

var scriptOutcomes = {
    SUCCESS: 'success',
    ERROR: 'error'
};

(function () {
    var userId = String(nodeState.get('_id'));
    var password = String(nodeState.get('password'));
    var identity = idRepository.getIdentity(userId);
    try {
        identity.setAttribute('fr-attr-int5', ['0']);
        identity.store();
    } catch (ex) {
        logger.error('Unable to persist user password sync status: ' + ex.toString());
    }
    var username = identity.getAttributeValues('uid')[0];

    var onPremConnectorName = String(systemEnv.getProperty('esv.sou.onprem.connector.name'));
    var result;
    try {
        result = openidm.query(
            `system/${onPremConnectorName}/user`,
            { _queryField: `mail eq "${username}"` },
            ['userName']
        );
    } catch (err) {
        logger.error(err.toString());
        action.goTo(scriptOutcomes.ERROR);
        return;
    }
    var onPremUserId = result.result[0]['_id'];
    try {
        result = openidm.patch(
            `system/${onPremConnectorName}/user/${onPremUserId}`,
            null,
            [
                {
                    operation: 'replace',
                    field: '/password',
                    value: password
                }
            ]
        );
    } catch (err) {
        logger.error(err.toString());
        action.goTo(scriptOutcomes.ERROR);
        return;
    }
    try {
        identity.setAttribute('fr-attr-int5', ['1']);
        identity.store();
    } catch (ex) {
        logger.error('Unable to persist user password sync status: ' + ex.toString());
    }
    action.goTo(scriptOutcomes.SUCCESS);
})();
