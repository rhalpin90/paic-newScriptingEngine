var scriptOutcomes = {
    OUTCOME: 'outcome'
};

function generateFakePhoneNumber(id) {
    // Simple hash function
    var hash = 0;
    for (var i = 0; i < id.length; i++) {
        var char = id.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    
    var phoneNumber = Math.abs(hash).toString().padStart(10, '0').slice(-10);
    return phoneNumber;
}

function main() {
    var id = nodeState.get("username");
    logger.error("AAAAA" + id);
    
    var telephoneNumber = generateFakePhoneNumber(id);
    
    var maskedTelephoneNumber = "(" + telephoneNumber.substring(0, 3) + ") " +
                                telephoneNumber.substring(3, 6) + "-" +
                                telephoneNumber.substring(6);
    
    var messageText = "We've sent a One Time Password to " + maskedTelephoneNumber;

    if (callbacks.isEmpty()) {
        callbacksBuilder.textOutputCallback(0, messageText);
        return;
    }
    action.goTo(scriptOutcomes.OUTCOME);
}

main();