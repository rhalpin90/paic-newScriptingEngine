var fr = JavaImporter(
    org.forgerock.openam.auth.node.api.Action,
    javax.security.auth.callback.ConfirmationCallback,
    com.sun.identity.authentication.callbacks.ScriptTextOutputCallback
);

var OUTCOMES = [
    'signin',
    'otp'
];

var script = `
    // Check if the element with id "returnToLogin" exists
    var returnToLoginElement = document.getElementById('returnToLogin');
    
    if (returnToLoginElement) {
        returnToLoginElement.parentNode.removeChild(returnToLoginElement);
    }

    var passcodeButton = document.querySelector('button[data-testid="btn-signinusingapasscode"]');
    if (passcodeButton) {
        var orText = document.createElement('div');
        orText.textContent = 'or';
        orText.classList.add('mt-2');
        passcodeButton.insertAdjacentElement('beforebegin', orText);
    }
`;

(function () {
    if (callbacks.isEmpty()) {
        action = fr.Action.send(
            new fr.ConfirmationCallback(0, ['Sign in', 'Sign in using a passcode'], 0),
            new fr.ScriptTextOutputCallback(script)
        ).build();
        return;
    }
    var selectedIndex = Number(callbacks.get(0).getSelectedIndex());
    outcome = OUTCOMES[selectedIndex];
})();
