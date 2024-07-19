// Journey Decision Node Script to save the entered email address onto the sharedState for later
// use by the Verify Phone Number script for OTP.

(function () {
    var email = nodeState.get('username');
    nodeState.putShared('inputEmail', email);
    action.goTo('outcome');
})();
