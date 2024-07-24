var scriptOutcomes = {
    OUTCOME: 'outcome',
};
function main() {
    var errorMessage;
    if (nodeState.isDefined("errorMessage") && nodeState.get("errorMessage") != "") {
      errorMessage = nodeState.get("errorMessage");
      nodeState.putShared("errorMessage", "");
      callbacksBuilder.textOutputCallback(2, errorMessage);
    } else {
      action.goTo(scriptOutcomes.OUTCOME);
    }
  };

  main();