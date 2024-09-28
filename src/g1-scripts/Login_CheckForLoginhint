var scriptOutcomes = {
    HASLOGINHINT: 'has-login-hint',
    NOLOGINHINT: 'no-login-hint',
};

function main() {
    if (!requestCookies.containsKey("oidcLoginHint")) {
        action.goTo(scriptOutcomes.NOLOGINHINT);
        return;
    }

    var oidcLoginHint = requestCookies.oidcLoginHint;
    var username = oidcLoginHint;

    if (!username) {
        action.goTo(scriptOutcomes.NOLOGINHINT);
        return;
    }

    nodeState.putShared('username', username);
    var objectAttributes = {
        userName: username,
    };
    nodeState.putShared('objectAttributes', objectAttributes);
    action.goTo(scriptOutcomes.HASLOGINHINT);
}

main();