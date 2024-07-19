// Journey Decision Node Script to set the currently authenticating user's
// `custom_passwordExpirationTime` attribute to the date 60 days from now (in ISO format).

var dateUtils = require('Library_DateUtils');

(function () {
    var currentDate = new Date();
    var futureDate = dateUtils.addDays(currentDate, 60);
    var isoDate = dateUtils.formatDateToLdapString(futureDate);
    var objectAttributes = nodeState.getObject('objectAttributes');
    var newObjectAttributes = JSON.parse(JSON.stringify(objectAttributes));
    logger.error('BRIAN:' + JSON.stringify(newObjectAttributes));
    newObjectAttributes.custom_passwordExpirationTime = isoDate;
    nodeState.putTransient('objectAttributes', newObjectAttributes);
    action.goTo('outcome');
})();
