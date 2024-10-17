var scriptOutcomes = {
    OUTCOME: 'outcome'
}

function main() {
    var portal = nodeState.get("portal").asString;
    var mail = String(nodeState.get('objectAttributes').get('mail'));
    var auditRequest = {
        reason: 'OTPPhoneRetry',
        param1: portal,
        param2: mail,
        param3: "",
        success: 'failure'
    };
  nodeState.putShared('auditRequest', JSON.stringify(auditRequest));
  action.goTo(scriptOutcomes.OUTCOME);
}

main();