var scriptOutcomes = {
    OUTCOME: "outcome"
};

var id = nodeState.get('_id');
var identity = idRepository.getIdentity(id);
var oldEmail = identity.getAttributeValues("mail")[0];
var newEmail = nodeState.get('mail');

function main() {
  var auditRequest = {
      reason: 'OTPBadEmail',
      success: true,
      param1: oldEmail,
      param2: newEmail,
      param3: "Ping"
  };
  nodeState.putShared('auditRequest', JSON.stringify(auditRequest));
  action.goTo(scriptOutcomes.OUTCOME);
}

main();