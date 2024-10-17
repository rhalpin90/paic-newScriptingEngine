var scriptOutcomes = {
    OUTCOME: 'outcome'
}

function main() {
    var portal = nodeState.get("portal").asString;
    var telephoneNumber = String(nodeState.get('objectAttributes').get('telephoneNumber'));
    var auditRequest = {
        reason: 'OTPPhoneRetry',
        param1: portal,
        param2: telephoneNumber,
        param3: "",
        success: 'failure'
    };
  nodeState.putShared('auditRequest', JSON.stringify(auditRequest));
  action.goTo(scriptOutcomes.OUTCOME);
}

main();
