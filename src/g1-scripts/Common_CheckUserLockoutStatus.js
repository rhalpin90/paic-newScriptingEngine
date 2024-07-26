var outcomes = {
    LOCKED: "locked",
    UNLOCKED: "unlocked"
};

var id = nodeState.get("_id");
var identity = idRepository.getIdentity(id);
var lockoutAttr = identity.getAttributeValues("fr-attr-str4");
var outcome;

if (lockoutAttr && lockoutAttr.length > 0) {
    var lockoutInfo = new XML(lockoutAttr[0]);
    var currentCount = parseInt(lockoutInfo.InvalidCount);
    var maxAttempts = 4;

    if (currentCount >= maxAttempts) {
        outcome = outcomes.LOCKED;
    } else {
        outcome = outcomes.UNLOCKED;
    }
} else {
    outcome = outcomes.UNLOCKED;
}

action.goTo(outcome);