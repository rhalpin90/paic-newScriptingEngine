var scriptOutcomes = {
  OUTCOME: 'outcome',
};

function main() {
  var userId = nodeState.get('_id');
  var user = openidm.read("managed/alpha_user/" + userId);
  nodeState.putShared('passwordLastChangedTime', user.passwordLastChangedTime);
  nodeState.putShared('passwordExpirationTime', user.passwordExpirationTime);
  action.goTo(scriptOutcomes.OUTCOME);
}

main();
