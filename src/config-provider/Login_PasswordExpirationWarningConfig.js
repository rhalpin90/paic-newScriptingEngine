/**
 * Configuration Provider Node Script for a Message Node that displays how many days until the
 * authenticating user's password expires. The options shown to the user are to reset their
 * password now or to skip.
 */

var DAYS_UNTIL_PASSWORD_EXPIRES_KEY = 'sou_daysUntilPasswordExpires';
var daysUntilPasswordExpires = String(nodeState.get(DAYS_UNTIL_PASSWORD_EXPIRES_KEY).asString());

config = {
    message: { en: 'Your password is going to expire in ' + daysUntilPasswordExpires + ' day(s).' },
    messageYes: { en: 'Reset password now' },
    messageNo: { en: 'Skip' }
};
