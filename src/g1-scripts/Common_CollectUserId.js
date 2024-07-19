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