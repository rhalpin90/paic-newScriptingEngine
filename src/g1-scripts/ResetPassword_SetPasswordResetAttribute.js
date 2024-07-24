var scriptOutcomes = {
    OUTCOME: 'outcome',
};

var id = nodeState.get("_id");
var identity = idRepository.getIdentity(id);

function main() {
    identity.setAttribute("frUnindexedString1", null)
try{
    identity.store();
} catch(e) {
    logger.error("Unable to set reset password status." + e)
}
action.goTo(scriptOutcomes.OUTCOME);
}

main();
