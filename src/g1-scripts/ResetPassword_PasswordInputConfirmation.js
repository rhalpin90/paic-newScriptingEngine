var scriptOutcomes = {
    OUTCOME: 'outcome',
};

function main() {
    if (callbacks.isEmpty()) {
      callbacksBuilder.passwordCallback("Password Confirmation", false);
    } else {
      action.goTo(scriptOutcomes.OUTCOME);
    }
}

main(); 
  