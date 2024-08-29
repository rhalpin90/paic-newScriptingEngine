var ScriptOutcomes = {
    OUTCOME: 'outcome'
};

function main() {

var id = nodeState.get("_id");
var identity = idRepository.getIdentity(id);

identity.setAttribute("fr-attr-str1", [])
try {
    identity.store();
} catch(e) {
    logger.error("Unable to set reset password status." + e)
}
action.goTo(ScriptOutcomes.OUTCOME);
}

main();
