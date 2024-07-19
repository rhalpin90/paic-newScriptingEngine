// Journey Decision Node Script that implements the same functionality as the RSA SecurID Initialize
// node on ForgeRock's Marketplace (not available in cloud). This is the first step in using the RSA
// Authentication API. It initializes the authentication and gets a list of challenge method for the
// user. This script currently only supports SECURID as it its challenge method. It saves the
// `authnAttemptId`, `messageId`, and `methodId` on the sharedState for use by the RSA SecurID Verify
// node (or custom script).

var uuid = require('Library_Uuid');

var scriptOutcomes = {
    CHALLENGE: 'challenge',
    UNSUPPORTED: 'unsupported',
    ERROR: 'error'
};

var scriptConfig = {
    baseUrl: String(systemEnv.getProperty('esv.sou.rsa.url')),
    clientId: String(systemEnv.getProperty('esv.sou.rsa.client.id')),
    clientKey: String(systemEnv.getProperty('esv.sou.rsa.client.key'))
};

function createInitializeBody(username) {
    return {
        clientId: scriptConfig.clientId,
        subjectName: username,
        context: {
            messageId: uuid.v4()
        }
    };
}

function handleResponse(response) {
    if (response.attemptReasonCode !== 'CHALLENGE' && response.attemptReasonCode !== 'AUTHENTICATION_REQUIRED') {
        return scriptOutcomes.ERROR;
    }
    var challenges = response.challengeMethods.challenges;
    for (var i = 0; i < challenges.length; i++) {
        var challenge = challenges[i];
        if (challenge.requiredMethods[0].methodId === 'SECURID') {
            nodeState.putShared('authnAttemptId', response.context.authnAttemptId);
            nodeState.putShared('messageId', response.context.messageId);
            nodeState.putShared('methodId', 'SECURID');
            return scriptOutcomes.CHALLENGE;
        }
    }
    return scriptOutcomes.UNSUPPORTED;
}

(function () {
    if (!nodeState.isDefined('username')) {
        logger.error('No username defined on nodeState');
        action.goTo(scriptOutcomes.ERROR);
        return;
    }
    var username = nodeState.get('username');
    if (!username) {
        logger.error('Username is empty');
        action.goTo(scriptOutcomes.ERROR);
        return;
    }
    var response;
    try {
        var httpResponse = httpClient.send(scriptConfig.baseUrl + '/mfa/v1_1/authn/initialize', {
            method: 'POST',
            headers: {
                'client-key': scriptConfig.clientKey
            },
            body: createInitializeBody(username)
        }).get();
        if (!httpResponse.ok) {
            logger.error('Unable to initialize response');
            action.goTo(scriptOutcomes.ERROR);
            return;
        }
        response = httpResponse.json();
    } catch (err) {
        logger.error(err.toString());
        action.goTo(scriptOutcomes.ERROR);
        return;
    }
    action.goTo(handleResponse(response));
})();
