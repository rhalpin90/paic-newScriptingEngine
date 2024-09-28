var scriptOutcomes = {
    OUTCOME: 'outcome'
};

function main(){
    var id = nodeState.get('username').toString();
    var maskedTelephoneNumber = "(***) ***-" + generateFourDigits(id);
    var messageText = "We've sent a one-time password to " + maskedTelephoneNumber; 

    if (callbacks.isEmpty()) {
        callbacksBuilder.textOutputCallback(0, messageText);
        return;
    }
    action.goTo(scriptOutcomes.OUTCOME)
}

function generateFourDigits(username) {
    var ascii1 = username.charCodeAt(0);
    var ascii2 = username.charCodeAt(1);
    var ascii3 = username.charCodeAt(2);
    var ascii4 = username.charCodeAt(3);
    var combined = (ascii1 * 1 + ascii2 * 2 + ascii3 * 3 + ascii4 * 4);
    var fourDigitNumber = (combined * 123) % 10000;
    return ('0000' + fourDigitNumber).slice(-4);
}

main();