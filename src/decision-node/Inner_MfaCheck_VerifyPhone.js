// Journey Decision Node Script that prompts the user to verify the phone number they selected to
// send an OTP code to as MFA. The expected phone number input format is 0000000000. If the user
// has already entered their password (by coming from the Login journey) they do not need to verify
// and are instead automatically considered verified.

var scriptOutcomes = {
    VERIFIED: 'verified',
    ERROR: 'error'
};

(function () {
    if (nodeState.isDefined('password')) {
        action.goTo(scriptOutcomes.VERIFIED);
        return;
    }
    var otpContactValue = nodeState.get('otpContactValue');
    if (callbacks.isEmpty()) {
        var prompt = 'Phone Number';
        var message = 'Please verify phone number ending in "' + otpContactValue.slice(-4) + '".';
        callbacksBuilder.textOutputCallback(0, message);
        callbacksBuilder.nameCallback(prompt);
        return;
    }
    var providedOtpValue = callbacks.getNameCallbacks()[0];
    var phoneNumberWithCountryCode = '+1' + providedOtpValue;
    if (providedOtpValue === phoneNumberWithCountryCode) {
        action.goTo(scriptOutcomes.VERIFIED);
        return;
    }
    action.goTo(scriptOutcomes.ERROR);
})();
