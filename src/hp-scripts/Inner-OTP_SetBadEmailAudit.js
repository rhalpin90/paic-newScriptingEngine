var scriptOutcomes = {
    OUTCOME: "outcome"
};

var id = nodeState.get('_id');
var identity = idRepository.getIdentity(id);
var portal = nodeState.get("portal");
var email = identity.getAttributeValues("mail")[0];


function main() {
  var auditRequest = {
      reason: 'OTPBadEmail',
      success: 'failure',
      param1: portal,
      param2: email,
      param3: ""
  };
  nodeState.putShared('auditRequest', JSON.stringify(auditRequest));
  action.goTo(scriptOutcomes.OUTCOME);
}

main();