var scriptOutomes = {
    OUTCOME: 'outcome'
};

function main(){
    var telephoneNumber = nodeState.get("userIdentifier")
    var maskedTelephoneNumber = "(***) ***-" + telephoneNumber.substring(telephoneNumber.length - 4)
    var messageText = "We've sent a One Time Password to " + maskedTelephoneNumber; 

    if (callbacks.isEmpty()) {
        callbacksBuilder.textOutputCallback(0, messageText);
        return;
    }
    action.goTo(scriptOutomes.OUTCOME)
}

main();
