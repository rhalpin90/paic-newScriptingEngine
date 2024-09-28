var ScriptOutcomes = {
    SUCCESS: 'success',
    ERROR: 'error'
};

function main() {
    var id = nodeState.get("_id");
    var identity = idRepository.getIdentity(id);
    var currentDate = new Date().toISOString();
    var customAttributes = JSON.parse(identity.getAttributeValues("fr-idm-custom-attrs")[0]);
    customAttributes.custom_validationMobileDate = currentDate;
    identity.setAttribute("fr-idm-custom-attrs", [JSON.stringify(customAttributes)]);
    logger.error("aaaaa " + currentDate);

    try {
        identity.store();
        
        action.goTo(ScriptOutcomes.SUCCESS);
    } catch (e) {
        logger.error("An error occurred: " + e);
        action.goTo(ScriptOutcomes.ERROR);
    }
}

main();