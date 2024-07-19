// Journey Decision Node Script that checks to see if the currently authenticating user's password
// is expired or about to expire. It compares the current date against the date saved in the
// `custom_passwordExpirationTime` attribute on the user. If the password is within 7 days of
// expiring, the outcome of this script is warning.

var dateUtils = require('Library_DateUtils');

var DAYS_UNTIL_PASSWORD_EXPIRES_KEY = 'sou_daysUntilPasswordExpires';

var scriptOutcomes = {
    NOT_EXPIRED: 'not-expired',
    WARNING: 'warning',
    EXPIRED: 'expired'
};

(function () {
    var userId = nodeState.get('_id');
    var identity = idRepository.getIdentity(userId);
    var customAttributes = JSON.parse(identity.getAttributeValues('fr-idm-custom-attrs')[0]);
    var passwordExpirationDate = customAttributes.custom_passwordExpirationTime;
    if (!passwordExpirationDate) {
        action.goTo(scriptOutcomes.EXPIRED);
        return;
    }
    var expirationDate = dateUtils.parseLdapStringToDate(passwordExpirationDate);
    var daysUntilPasswordExpires = (+expirationDate - +new Date()) / (1000 * 60 * 60 * 24);
    nodeState.putShared(DAYS_UNTIL_PASSWORD_EXPIRES_KEY, String(Math.ceil(daysUntilPasswordExpires)));
    if (daysUntilPasswordExpires <= 0) {
        action.goTo(scriptOutcomes.EXPIRED);
    } else if (daysUntilPasswordExpires <= 7) {
        action.goTo(scriptOutcomes.WARNING);
    } else {
        action.goTo(scriptOutcomes.NOT_EXPIRED);
    }
})();
