var scriptOutcomes = {
    OUTCOME: 'outcome'
};

function main() {
    var id = nodeState.get("_id");
    var portal = nodeState.get("portal");
    var emailAddress = idRepository.getAttributeValues(id, 'mail');
    
    var auditRequest = {
        reason: 'SendForgottenPasswordEmail',
        param1: portal,
        param2: emailAddress,
        param3: "",
        success: true
    };
    nodeState.putShared('auditRequest', JSON.stringify(auditRequest));
    action.goTo(scriptOutcomes.OUTCOME);
}

main(); 

(function() {
    var auditRequest = {
        reason: 'SendForgottenPasswordEmail',
        param1: portal,
        param2: emailAddress,
        param3: "",
        success: true
    };
    sharedState.put('auditRequest', JSON.stringify(auditRequest));
    outcome = 'outcome';
})();
