var scriptOutcomes = {
    OUTCOME: "outcome"
};

function main() {
  var id = nodeState.get('_id');
  var identity = idRepository.getIdentity(id);
  var portal = nodeState.get("portal");
  var email = identity.getAttributeValues("mail")[0];  
    
  var auditRequest = {
      reason: 'OTPAuthentication',
      success: 'failure',
      param1: portal,
      param2: email,
      param3: ""
  };
  nodeState.putShared('auditRequest', JSON.stringify(auditRequest));
  action.goTo(scriptOutcomes.OUTCOME);
}

main();