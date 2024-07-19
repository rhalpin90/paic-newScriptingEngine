// Journey Decision Node Script to ensure that the last name (sn) that the user provided matches the
// last name of the user with the provided username/email address.

var scriptOutcomes = {
    MATCH: 'match',
    NO_MATCH: 'no-match'
};

var LAST_NAME_ATTR = 'sn';

(function () {
    var userId = nodeState.get('_id');
    var identity = idRepository.getIdentity(userId);
    var actualSn = identity.getAttributeValues(LAST_NAME_ATTR)[0];
    var objectAttributes = nodeState.getObject('objectAttributes');
    var providedSn = objectAttributes[LAST_NAME_ATTR];
    action.goTo(providedSn === actualSn ? scriptOutcomes.MATCH : scriptOutcomes.NO_MATCH);
})();
