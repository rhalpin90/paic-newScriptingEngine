var scriptOutcomes = {
    TRUE: 'true',
    FALSE: 'false'
}

function main () {
    var portal = nodeState.get('portal');
    if (portal !== 'virtuwell') {
        action.goTo(scriptOutcomes.FALSE);
        return;
    }
    action.goTo(scriptOutcomes.TRUE);
}

main ();