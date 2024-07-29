var scriptOutcomes = {
    TRUE: 'true',
    FALSE: 'false',
};

function main() {
    var tenantEnv = systemEnv.getProperty('esv.aic.env');
    if (!tenantEnv || String(tenantEnv) !== 'dev') {
        logger.debug(
            "Assumed journey is not running in test mode because 'esv.aic.env' was not set or was not 'dev'.",
        );
        action.goTo(scriptOutcomes.FALSE);
        return;
    }
    var isTestHeader = requestHeaders.get('Is-Journey-Test');
    if (!isTestHeader || String(isTestHeader.get(0)) !== 'true') {
        logger.debug(
            "Assumed journey is not running in test mode because 'Is-Journey-Test' request header was missing or was not 'true'.",
        );
        action.goTo(scriptOutcomes.FALSE);
        return;
    }
    action.goTo(scriptOutcomes.TRUE);
}

main();
