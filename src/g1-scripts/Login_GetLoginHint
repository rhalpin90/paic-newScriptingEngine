var urlUtils = require('Library_UrlUtils');

var scriptOutcomes = {
    HASLOGINHINT: 'has-login-hint',
    NOLOGINHINT: 'no-login-hint',
};

function main() {
    var gotoParam = requestParameters.get('goto');
    if (!gotoParam || String(gotoParam.get(0)) === '') {
        logger.error("No 'goto' parameter in the request.");
        action.goTo(scriptOutcomes.NOLOGINHINT);
        return;
    }
    var gotoUrl = String(gotoParam.get(0));
    var username = urlUtils.getQueryParam(gotoUrl, 'login_hint');
    if (!username) {
        Logger.error("No 'username' present in goto");
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