var scriptOutcomes = {
    OUTCOME: 'outcome'
};
(function () {
    var errorMessage = 'Invalid OTP code. Please try again.';
    action.goTo(scriptOutcomes.OUTCOME).withErrorMessage(errorMessage);
})();
