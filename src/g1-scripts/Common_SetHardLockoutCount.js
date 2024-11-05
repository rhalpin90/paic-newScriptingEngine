var scriptOutcomes = {
    HARD_LOCK: 'hard_lock',
    NO_LOCK: 'no_lock'
}

function main() {
    var id = nodeState.get('id');
    var identity = idRepository.getIdentity(id);
    var lockoutDates = identity.getAttributeValues('frIndexedMultivalued1') || [];
    var currentDate = new Date();
    var lockoutTimer = new Date(currentDate - 24 * 60 * 60 * 1000);

    if (lockoutDates.length > 2) {
        lockoutDates = lockoutDates.slice (-2);
    }
    lockoutDates.push();

    var shouldLock = lockoutDates.length === 3 && 
        (new Date(lockoutDates[0]) >= lockoutTimer);

    identity.setAttribute('frIndexedMultivalued1', lockoutDates);
    if (shouldLock) {
        identity.setAttribute('accountStatus', ['inactive']);
        action.goTo(scriptOutcomes.HARD_LOCK);
        return;
    }

    action.goTo(scriptOutcomes.NO_LOCK);
}

main();