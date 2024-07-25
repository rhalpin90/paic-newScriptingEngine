var dateUtils = require('Library_DateUtils');

var DAYS_UNTIL_PASSWORD_EXPIRES_KEY = 'daysUntilPasswordExpires';

var scriptOutcomes = {
    NOT_EXPIRED: 'not-expired',
    WARNING: 'warning',
    EXPIRED: 'expired'
};

var userId = nodeState.get('_id');
var identity = idRepository.getIdentity(userId);
var passwordExpiration = identity.getAttributeValues('customAttributes.custom_passwordExpirationTime');
var passwordLastChanged = identity.getAttributeValues('passwordLastChangedTime');
logger.error("bbbbb" + passwordLastChanged);
logger.error("aaaaa" + passwordExpiration);

function main() {
   
    if (!passwordExpiration) {
        action.goTo(scriptOutcomes.EXPIRED);
        return;
    }
    var expirationDate = dateUtils.parseLdapStringToDate(passwordExpiration);
    var daysUntilPasswordExpires = (+expirationDate - +new Date()) / (1000 * 60 * 60 * 24);
    nodeState.putShared(DAYS_UNTIL_PASSWORD_EXPIRES_KEY, String(Math.ceil(daysUntilPasswordExpires)));
    if (daysUntilPasswordExpires <= 0) {
        action.goTo(scriptOutcomes.EXPIRED);
    } else if (daysUntilPasswordExpires <= 7) {
        action.goTo(scriptOutcomes.WARNING);
    } else {
        action.goTo(scriptOutcomes.NOT_EXPIRED);
    }
};

main();