// Journey Decision Node Script that reimplements the OTP collector node from ForgeRock but also
// adds the options for `incorrect` and `resend` to allow for better branching in the journey.

var scriptOutcomes = {
    CORRECT: 'correct',
    INCORRECT: 'incorrect',
    RESEND: 'resend'
};

var confirmationOptions = [
    'Continue',
    'Resend code'
];

var MESSAGE_KEY = 'trivir_message';

function maskEmail(email) {
    var start = email.slice(0, 2);
    var end = email.split('@')[1].slice(0, 2);
    return '' + start + '****@' + end + '****.***';
}

(function () {
    if (callbacks.isEmpty()) {
        var email = nodeState.getObject('objectAttributes').mail;
        var maskedEmail = maskEmail(email);
        var message = 'A code has been sent to ' + maskedEmail;
        callbacksBuilder.textOutputCallback(0, message);
        callbacksBuilder.nameCallback('Security Code');
        callbacksBuilder.confirmationCallback(0, confirmationOptions, 1);
        return;
    }
    var index = callbacks.getConfirmationCallbacks()[0];
    switch (confirmationOptions[index]) {
    case 'Continue':
        var actualOtp = String(nodeState.get('oneTimePassword'));
        var submittedOtp = String(callbacks.getNameCallbacks()[0]);
        if (submittedOtp !== actualOtp) {
            nodeState.putShared(MESSAGE_KEY, 'That code was incorrect, please try again.');
            action.goTo(scriptOutcomes.INCORRECT);
            return;
        }
        nodeState.putShared(MESSAGE_KEY, '_');
        action.goTo(scriptOutcomes.CORRECT);
        return;
    case 'Resend code':
        nodeState.putShared(MESSAGE_KEY, '_');
        action.goTo(scriptOutcomes.RESEND);
        return;
    }
})();
