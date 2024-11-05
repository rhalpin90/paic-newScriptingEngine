var scriptOutcomes = {
    OUTCOME: 'outcome'
}
function main(){
var message = "The username and passcode combination you entered doesn't match our records. Please try again. If you continue to experience problems, consider resetting your password"
action.goTo(scriptOutcomes.OUTCOME).withErrorMessage(message);
}

main()
