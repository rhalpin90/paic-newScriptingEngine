// Journey Decision Node Script that checks the currently authenticating user's account for the
// different MFA options they have enrolled in and displays a page prompting the user to select
// which MFA option they would like to authenticate with.
//
// Possible options are:
//
// - Passkey/WebAuthn (Saved on the user as `webAuthnDeviceProfiles`)
// - Push Notifications (Saved on the user as `pushDeviceProfiles`)
// - Primary Email (Saved on the user as `mail`)
// - Alternate Email (Saved on the user as `fr-attr-str1`)
// - Primary Phone (Saved on the user as `fr-attr-str2`)
// - Alternate Phone (Saved on the user as `fr-attr-str3`)
// - WebAuthn Recovery Code
// - Push Notifications Recovery Code

var scriptOutcomes = {
    WEBAUTHN: 'webauthn',
    PUSH: 'push',
    PHONE: 'phone',
    EMAIL: 'email',
    RECOVERY_WEBAUTHN: 'recovery-webauthn',
    RECOVERY_PUSH: 'recovery-push'
};

var PRIMARY_EMAIL_ATTR = 'mail';
var ALTERNATE_EMAIL_ATTR = 'fr-attr-str1';
var PRIMARY_PHONE_ATTR = 'fr-attr-str2';
var ALTERNATE_PHONE_ATTR = 'fr-attr-str3';

function phoneNumberDisplayValue(phoneNumber) {
    return 'Send text to (***) ***-' + phoneNumber.slice(-4);
}

function emailDisplayValue(emailAddress) {
    var parts = emailAddress.split('@');
    var username = parts[0];
    var domain = parts[1];
    var obscuredUsername = username.slice(0, 2) + '****';
    var obscuredDomain = domain.slice(0, 2) + '****.***';
    return 'Send email to ' + obscuredUsername + '@' + obscuredDomain;
}

function getChoices() {
    var userId = nodeState.get('_id');
    var identity = idRepository.getIdentity(userId);
    var choices = {
        outcomes: [],
        values: [],
        displayValues: []
    };
    if (identity.getAttributeValues('webAuthnDeviceProfiles').length !== 0) {
        choices.outcomes.push(scriptOutcomes.WEBAUTHN);
        choices.values.push(scriptOutcomes.WEBAUTHN);
        choices.displayValues.push('Use WebAuthN');
    }
    if (identity.getAttributeValues('pushDeviceProfiles').length !== 0) {
        choices.outcomes.push(scriptOutcomes.PUSH);
        choices.values.push(scriptOutcomes.PUSH);
        choices.displayValues.push('Send push notification');
    }
    if (identity.getAttributeValues(PRIMARY_PHONE_ATTR).length !== 0) {
        var primaryTelephone = identity.getAttributeValues(PRIMARY_PHONE_ATTR)[0];
        choices.outcomes.push(scriptOutcomes.PHONE);
        choices.values.push(primaryTelephone);
        choices.displayValues.push(phoneNumberDisplayValue(primaryTelephone));
    }
    if (identity.getAttributeValues(ALTERNATE_PHONE_ATTR).length !== 0) {
        var alternateTelephone = identity.getAttributeValues(ALTERNATE_PHONE_ATTR)[0];
        choices.outcomes.push(scriptOutcomes.PHONE);
        choices.values.push(alternateTelephone);
        choices.displayValues.push(phoneNumberDisplayValue(alternateTelephone));
    }
    if (identity.getAttributeValues(PRIMARY_EMAIL_ATTR).length !== 0) {
        var primaryEmail = identity.getAttributeValues(PRIMARY_EMAIL_ATTR)[0];
        choices.outcomes.push(scriptOutcomes.EMAIL);
        choices.values.push(PRIMARY_EMAIL_ATTR);
        choices.displayValues.push(emailDisplayValue(primaryEmail));
    }
    if (identity.getAttributeValues(ALTERNATE_EMAIL_ATTR).length !== 0) {
        var alternateEmail = identity.getAttributeValues(ALTERNATE_EMAIL_ATTR)[0];
        choices.outcomes.push(scriptOutcomes.EMAIL);
        choices.values.push(ALTERNATE_EMAIL_ATTR);
        choices.displayValues.push(emailDisplayValue(alternateEmail));
    }
    if (identity.getAttributeValues('webauthnDeviceProfiles').length !== 0) {
        choices.outcomes.push(scriptOutcomes.RECOVERY_WEBAUTHN);
        choices.values.push(scriptOutcomes.RECOVERY_WEBAUTHN);
        choices.displayValues.push('Recovery code (WebAuthN)');
    }
    if (identity.getAttributeValues('pushDeviceProfiles').length !== 0) {
        choices.outcomes.push(scriptOutcomes.RECOVERY_PUSH);
        choices.values.push(scriptOutcomes.RECOVERY_PUSH);
        choices.displayValues.push('Recovery code (push)');
    }
    return choices;
}

(function () {
    var choices = getChoices();
    if (choices.values.length > 1 && callbacks.isEmpty()) {
        callbacksBuilder.choiceCallback('MFA Options', choices.displayValues, 0, false);
        return;
    }
    var selectedIndex = choices.values.length === 1 ? 0 : callbacks.getChoiceCallbacks()[0][0];
    nodeState.putShared('otpContactValue', choices.values[selectedIndex]);
    action.goTo(choices.outcomes[selectedIndex]);
})();
