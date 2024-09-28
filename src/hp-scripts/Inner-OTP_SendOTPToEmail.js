var loggingLibrary = require('Library_Logging')(logger, requestHeaders);
var apiPassthru = require('Library_ApiPassthru')(httpClient, systemEnv);

var scriptLogger = new loggingLibrary.ScriptLogger(scriptName);

var PORTAL_TO_BRAND_MAP = {
    consumer: 'HP',
    journeywell: 'JW',
    livingwell: 'LW',
    virtuwell: 'VW',
};

var nodeOutcomes = {
    ERROR: 'error',
    SUCCESS: 'success'
};

(function () {
    var id = nodeState.get('_id');
    var identity = idRepository.getIdentity(id);
    var firstNameSet = identity.getAttributeValues('givenName');
    if (!firstNameSet) {
        scriptLogger.error('First Name is missing or empty');
        action.goTo(nodeOutcomes.ERROR).withErrorMessage('First Name is missing or empty');
        return;
    }

    var emailAddress = identity.getAttributeValues('mail')[0];
    var code = String(nodeState.get('oneTimePassword'));

    var portal = String(nodeState.get('portal'));
    var brand = PORTAL_TO_BRAND_MAP[portal];
    if (!brand) {
        scriptLogger.error('Unknown portal: ' + portal);
        action.goTo(nodeOutcomes.ERROR).withErrorMessage('Unknown portal type: ' + portal);
        return;
    }

    var model = {
        brand: brand,
        code: code
    };

    try {
        apiPassthru.sendEmail(emailAddress, 'code', model, 'validation');
    } catch (e) {
        scriptLogger.error(e.toString());
        action.goTo(nodeOutcomes.ERROR).withErrorMessage(e.toString());

        var failAuditRequest = {
            reason: 'OTPSentEmail',
            param1: portal,
            param2: emailAddress,
            param3: "",
            success: 'failure'
        };
        nodeState.putShared('auditRequest', JSON.stringify(failAuditRequest));

        return;
    }

    var auditRequest = {
        reason: 'OTPSentEmail',
        param1: portal,
        param2: emailAddress,
        param3: "",
        success: true
    };
    nodeState.putShared('auditRequest', JSON.stringify(auditRequest));
    
    nodeState.putShared("otpSent", "true");
    action.goTo(nodeOutcomes.SUCCESS);
})();
