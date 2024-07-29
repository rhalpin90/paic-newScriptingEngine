/**
 * @file This is the same as the Platform Username node but the label for the field is "User ID"
 *   instead of "Username"
 */

var scriptOutcomes = {
    OUTCOME: 'outcome',
};

function main() {
    if (callbacks.isEmpty()) {
        callbacksBuilder.nameCallback('User ID');
        return;
    }
    var username = callbacks.getNameCallbacks()[0];
    nodeState.putShared('username', username);
    var objectAttributes = nodeState.get('objectAttributes') || {};
    objectAttributes.userName = username;
    nodeState.putShared('objectAttributes', objectAttributes);
    action.goTo(scriptOutcomes.OUTCOME);
}

main();
