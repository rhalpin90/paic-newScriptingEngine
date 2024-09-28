var messages = JSON.parse(systemEnv.getProperty('esv.messages'));

var scriptOutcomes = {
    OUTCOME: 'outcome'
};
(function () {
    var errorMessage = messages.error.invalidOtp;
    action.goTo(scriptOutcomes.OUTCOME).withErrorMessage(errorMessage);
})();