var scriptOutcomes = {
    OUTCOME: 'outcome',
};

function main() {
    var id = nodeState.get("_id");
    var identity = idRepository.getIdentity(id);
    var telephoneNumbers = identity.getAttributeValues("telephoneNumber");
    var telephoneNumber = telephoneNumbers && telephoneNumbers.length > 0 ? telephoneNumbers[0] : "";
    
    if (!telephoneNumber) {
        logger.error("Phone number is null or empty for identity with id: " + id);
    }
    
    nodeState.putShared('telephoneNumber', telephoneNumber);
    action.goTo(scriptOutcomes.OUTCOME);
}

main();