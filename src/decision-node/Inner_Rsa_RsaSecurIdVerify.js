// Journey Decision Node Script that implements the same functionality as the RSA SecurID Verify
// node on ForgeRock's Marketplace (not available in cloud). This is the last step in using the RSA
// Authenication API. It reads the `messageId` and `authnAttemptId` set by the Initialize node from
// the sharedState and submits those along with the `oneTimePassword` on the transientState
// collected by the Collect node. If the OTP is accepted, this node outputs "success", if the OTP
// is incorrect, it outputs "fail".
//
// Sometimes a user will need to also submit the next tokencode,in these cases, the outcome will be
// "nextTokenCode". (This can happen to either resync the user's SecurID token, or if there have
// been multiple failed authentications.) If the user needs to either set or change their PIN, the
// outcome will be "newPin". Otherwise, this node ends with "error".

var uuid = require('Library_Uuid');

var scriptOutcomes = {
    SUCCESS: 'success',
    NEXT_TOKENCODE: 'nextTokenCode',
    NEWPIN: 'newPin',
    FAIL: 'fail',
    ERROR: 'error'
};

var scriptConfig = {
    baseUrl: String(systemEnv.getProperty('esv.sou.rsa.url')),
    clientKey: String(systemEnv.getProperty('esv.sou.rsa.client.key'))
};

function createVerifyBody(otp) {
    return {
        subjectCredentials: [
            {
                methodId: nodeState.get('methodId'),
                collectedInputs: [
                    {
                        name: nodeState.get('methodId'),
                        value: otp
                    }
                ]
            }
        ],
        context: {
            messageId: uuid.v4(),
            inResponseTo: nodeState.get('messageId'),
            authnAttemptId: nodeState.get('authnAttemptId')
        }
    };
}

function handleResponse(response) {
    if (response.attemptResponseCode === 'SUCCESS' && response.attemptReasonCode === 'CREDENTIAL_VERIFIED') {
        return scriptOutcomes.SUCCESS;
    }
    if (response.attemptResponseCode === 'FAIL' && response.attemptReasonCode === 'VERIFY_ERROR') {
        return scriptOutcomes.FAIL;
    }
    if (response.attemptResponseCode === 'CHALLENGE' && response.attemptReasonCode === 'AUTHENTICATION_REQUIRED') {
        var challenges = response.challengeMethods.challenges;
        for (var i = 0; i < challenges.length; i++) {
            var challenge = challenges[i];
            if (challenge.requiredMethods[0].methodId === 'SECURID_NEXT_TOKENCODE') {
                nodeState.putShared('authnAttemptId', response.context.authnAttemptId);
                nodeState.putShared('messageId', response.context.messageId);
                nodeState.putShared('methodId', 'SECURID_NEXT_TOKENCODE');
                return scriptOutcomes.NEXT_TOKENCODE;
            } else if (challenge.requiredMethods[0].methodId === 'SECURID_NEWPIN') {
                nodeState.putShared('authnAttemptId', response.context.authnAttemptId);
                nodeState.putShared('messageId', response.context.messageId);
                nodeState.putShared('methodId', 'SECURID_NEWPIN');
                return scriptOutcomes.NEWPIN;
            } else if (challenge.requiredMethods[0].methodId === 'SECURID') {
                nodeState.putShared('authnAttemptId', response.context.authnAttemptId);
                nodeState.putShared('messageId', response.context.messageId);
                nodeState.putShared('methodId', 'SECURID');
                return scriptOutcomes.NEXT_TOKENCODE;
            }
        }
    }
    logger.error('Unexpected response from RSA API: ' + JSON.stringify(response));
    return scriptOutcomes.ERROR;
}

(function () {
    if (!nodeState.isDefined('oneTimePassword')) {
        logger.error('No oneTimePassword found on nodeState');
        action.goTo(scriptOutcomes.ERROR);
        return;
    }
    var otp = nodeState.get('oneTimePassword');
    if (!otp) {
        logger.error('oneTimePassword is empty');
        action.goTo(scriptOutcomes.ERROR);
        return;
    }
    var response;
    try {
        var httpResponse = httpClient.send(scriptConfig.baseUrl + '/mfa/v1_1/authn/verify', {
            method: 'POST',
            headers: {
                'client-key': scriptConfig.clientKey
            },
            body: createVerifyBody(otp)
        }).get();
        if (!httpResponse.ok) {
            logger.error('Unable to get verify response');
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
