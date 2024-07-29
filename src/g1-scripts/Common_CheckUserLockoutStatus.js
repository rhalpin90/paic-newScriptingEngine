var outcomes = {
    LOCKED: "locked",
    UNLOCKED: "unlocked"
};

function main() {
    var id = nodeState.get("_id");
    var identity = idRepository.getIdentity(id);
    var lockoutAttr = identity.getAttributeValues("fr-attr-str4");
    var outcome;

    if (lockoutAttr && lockoutAttr.length > 0) {
        var lockoutInfo = new XML(lockoutAttr[0]);
        var currentCount = parseInt(lockoutInfo.InvalidCount);
        var maxAttempts = 5;
        var lockedoutAt = parseInt(lockoutInfo.LockedoutAt);
        var currentTime = new Date().getTime();
        var lockoutDuration = 15 * 60 * 1000; // 15 minutes in milliseconds

        if (currentCount >= maxAttempts) {
            if (lockedoutAt > 0 && (currentTime - lockedoutAt) >= lockoutDuration) {
                // 15 minutes have passed, unlock the account
                outcome = outcomes.UNLOCKED;
                // Clear the lockout information
                identity.setAttribute("fr-attr-str4", [""]);
                try {
                    identity.store();
                } catch(e) {
                    logger.error("Unable to update lockout info. " + e);
                }
            } else {
                outcome = outcomes.LOCKED;
            }
        } else {
            outcome = outcomes.UNLOCKED;
        }
    } else {
        outcome = outcomes.UNLOCKED;
    }

    action.goTo(outcome);
}

main();
