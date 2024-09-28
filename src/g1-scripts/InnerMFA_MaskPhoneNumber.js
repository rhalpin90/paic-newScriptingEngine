var scriptOutomes = {
    OUTCOME: 'outcome'
};

function main(){
    var telephoneNumber = nodeState.get("userIdentifier")
    var maskedTelephoneNumber = "(***) ***-" + telephoneNumber.slice(-4)
    var messageText = "We've sent a one-time password to " + maskedTelephoneNumber; 

    if (callbacks.isEmpty()) {
        callbacksBuilder.textOutputCallback(0, messageText);
        return;
    }
    action.goTo(scriptOutomes.OUTCOME)
}

main();
