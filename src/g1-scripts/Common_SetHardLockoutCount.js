var ScriptOutcomes = {
    LOCKED: "locked",
    UNLOCKED: "unlocked"
};

function main() {
    var id = nodeState.get("_id");
    var identity = idRepository.getIdentity(id);
    var hardLockDate = identity.getAttributeValues("frIndexedMultivalued1") || [];
    var lockStatus = identity.getAttributeValues("accountStatus");
    var currentDate = new Date();

    // this isn't working
    hardLockDate.push(currentDate.toISOString());

    var twentyFourHoursAgo = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);

    hardLockDate = hardLockDate.filter(function(date) {
        return new Date(date) >= twentyFourHoursAgo;
    });

    if (hardLockDate.length > 3) {
        hardLockDate = hardLockDate.slice(-3);
    }

    var shouldLock = hardLockDate.length === 3 && 
        (new Date(hardLockDate[0]) >= twentyFourHoursAgo);

    identity.setAttribute("frIndexedMultivalued1", hardLockDate);
    if (shouldLock) {
        identity.setAttribute("accountStatus", );
        return ScriptOutcomes.LOCKED;
    }

    return ScriptOutcomes.UNLOCKED;
}

main();