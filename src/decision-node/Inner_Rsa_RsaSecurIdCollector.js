// Journey Decision Node Script that implements the same functionality as the RSA SecurID Collector
// node on ForgeRock's Marketplace (not available in cloud). This collects the user's RSA token and
// puts it on the transientState for use by the RSA SecurID Verify node (or custom script).

(function () {
    if (callbacks.isEmpty() || !String(callbacks.getPasswordCallbacks()[0])) {
        callbacksBuilder.passwordCallback('RSA SecurID Code/PIN', false);
        return;
    }
    var submittedOtp = callbacks.getPasswordCallbacks()[0];
    nodeState.putTransient('oneTimePassword', submittedOtp);
    action.goTo('outcome');
})();
