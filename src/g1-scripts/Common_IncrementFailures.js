var attributes = require('Library_Attributes');
var maxAttempts = parseInt(systemEnv.getProperty('esv.account.lockout.max.attempts'));

var outcomes = {
    LOCKED: "locked",
    UNLOCKED: "unlocked",
    ERROR: "error"
};

function main() {
    var id = nodeState.get("_id");
    var identity = idRepository.getIdentity(id);
    var lockoutAttr = identity.getAttributeValues(attributes.invalidAttempts.am);
    var currentDate = new Date();
    var lockoutInfo;

    if (lockoutAttr && lockoutAttr.length > 0) {
        lockoutInfo = new XML(lockoutAttr[0]);
    } else {
        lockoutInfo = <InvalidPassword>
            <InvalidCount>0</InvalidCount>
            <LastInvalidAt>0</LastInvalidAt>
            <LockedoutAt>0</LockedoutAt>
            <ActualLockoutDuration>900000</ActualLockoutDuration>
            <NoOfTimesLocked>0</NoOfTimesLocked>
        </InvalidPassword>;
    }

    var currentCount = parseInt(lockoutInfo.InvalidCount);
    lockoutInfo.InvalidCount = currentCount + 1;
    lockoutInfo.LastInvalidAt = new Date().getTime();
    var outcome;

    if (currentCount + 1 >= maxAttempts) {
        lockoutInfo.LockedoutAt = new Date().getTime();
        outcome = outcomes.LOCKED;

        var lockoutDatesSet = identity.getAttributeValues(attributes.softLockTimes.am);
        var lockoutDates = lockoutDatesSet && lockoutDatesSet.length > 0 ? lockoutDatesSet[0] : '[]';
        var lockoutDatesArray = JSON.parse(lockoutDates);

        lockoutDatesArray.push(currentDate.getTime());

        if (lockoutDatesArray.length > 5) {
            lockoutDatesArray = lockoutDatesArray.slice(-5);
        }

        identity.setAttribute(attributes.softLockTimes.am, [JSON.stringify(lockoutDatesArray)]);

        if (hasThreeLockoutsInTwentyFourHours(lockoutDatesArray)) {
            identity.setAttribute(attributes.status.am, ["inactive"]);
        }
    } else {
        outcome = outcomes.UNLOCKED;
    }

    identity.setAttribute(attributes.invalidAttempts.am, [lockoutInfo.toString()]);

    try {
        identity.store();
        action.goTo(outcome);
    } catch (e) {
        logger.error("Unable to update lockout info. " + e);
        action.goTo(outcomes.ERROR);
    }
}

function hasThreeLockoutsInTwentyFourHours(lockoutTimes) {
    if (lockoutTimes.length < 3) {
        return false;
    }

    var currentTime = new Date().getTime();
    var twentyFourHoursAgo = currentTime - (24 * 60 * 60 * 1000);

    var recentLockouts = lockoutTimes.filter(function (time) {
        return time >= twentyFourHoursAgo;
    });

    return recentLockouts.length >= 3;
}

main();