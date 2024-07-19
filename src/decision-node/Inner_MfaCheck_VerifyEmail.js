// Journey Decision Node Script that prompts the user to verify the email address they selected to
// send an OTP code to as MFA. If the user has already entered their password (by coming from the
// Login journey) or if they already input the selected email address (by entering their email on
// the first page of ResetPassword) they do not need to verify and are instead automatically
// considered verified.

var scriptOutcomes = {
    VERIFIED: 'verified',
    ERROR: 'error'
};

function getEmail(otpContactValue) {
    var userId = nodeState.get('_id');
    var identity = idRepository.getIdentity(userId);
    var email = identity.getAttributeValues(otpContactValue)[0];
    return email;
}

function emailDisplayValues(emailAddress) {
    var parts = emailAddress.split('@');
    var username = parts[0];
    var domain = parts[1];
    var obscuredUsername = username.slice(0, 2);
    var obscuredDomain = domain.slice(0, 2) + '****.***';
    return [obscuredUsername, '@' + obscuredDomain];
}

(function () {
    if (nodeState.isDefined('password')) {
        action.goTo(scriptOutcomes.VERIFIED);
        return;
    }
    var otpContactValue = nodeState.get('otpContactValue');
    var email = getEmail(otpContactValue);
    if (nodeState.isDefined('inputEmail') && nodeState.get('inputEmail') === email) {
        action.goTo(scriptOutcomes.VERIFIED);
        return;
    }
    if (callbacks.isEmpty()) {
        var prompt = 'Email Address';
        var emailValues = emailDisplayValues(email);
        var message = 'Please verify your email address starting with "' + emailValues[0] + '" and ending with "' + emailValues[1] + '".';
        callbacksBuilder.textOutputCallback(0, message);
        callbacksBuilder.nameCallback(prompt);
        return;
    }
    var providedOtpValue = callbacks.getNameCallbacks()[0];
    if (providedOtpValue === email) {
        action.goTo(scriptOutcomes.VERIFIED);
        return;
    }
    action.goTo(scriptOutcomes.ERROR);
})();
