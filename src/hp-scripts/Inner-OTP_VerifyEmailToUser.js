var scriptOutcomes = {
    MATCH: "match",
    NO_MATCH: "no-match"
};

function main() {
    var id = nodeState.get("_id");
    var identity = idRepository.getIdentity(id);
    var providedEmail = nodeState.get("objectAttributes").get("mail").toLowerCase();
    var actualEmail = identity.getAttributeValues("mail")[0];

    if (providedEmail !== actualEmail || !actualEmail) {
        var currentFailures = identity.getAttributeValues("fr-attr-int1")[0];
        var newFailureCount = (parseInt(currentFailures) || 0) + 1;
        identity.setAttribute("fr-attr-int1", [newFailureCount.toString()]);
        
        action.goTo(scriptOutcomes.NO_MATCH);
        return;
    }
    action.goTo(scriptOutcomes.MATCH);
}

main();