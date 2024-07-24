var outcomes = {
    LOCKED: "locked",
    UNLOCKED: "unlocked"
};

var id = nodeState.get("_id");
var identity = idRepository.getIdentity(id);
var lockoutAttr = identity.getAttributeValues("fr-attr-str4");
var lockoutInfo;

function main() {
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

var maxAttempts = 4; 
var outcome;

if (currentCount + 1 >= maxAttempts) {
    lockoutInfo.LockedoutAt = new Date().getTime();
    outcome = outcomes.LOCKED;
} else {
    outcome = outcomes.UNLOCKED;
}

identity.setAttribute("fr-attr-str4", [lockoutInfo.toString()]);
try {
    identity.store();
    action.goTo(outcome);
} catch(e) {
    logger.error("Unable to update lockout info. " + e);
    action.goTo("error");
}
}

main();