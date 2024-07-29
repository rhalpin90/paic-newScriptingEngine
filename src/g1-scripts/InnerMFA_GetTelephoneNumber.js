var scriptOutomes = {
    VERIFIED: 'verified',
    NOTVERIFIED: 'not-verified'
};

function main() {
    var id = nodeState.get("_id");
    
    if (!id) {
        logger.error("_id is null or empty");
        action.goTo(scriptOutomes.NOTVERIFIED);
    } else {
        var identity = idRepository.getIdentity(id);
        var telephoneNumbers = identity.getAttributeValues("telephoneNumber");
        var telephoneNumber = telephoneNumbers && telephoneNumbers.length > 0 ? telephoneNumbers[0] : "";
        
        if (!telephoneNumber) {
            logger.error("Phone number is null or empty for identity with id: " + id);
        }
        
        nodeState.putShared('userIdentifier', telephoneNumber);
        action.goTo(scriptOutomes.VERIFIED);
    }
}

main();
