var scriptOutcomes = {
    TRUE: 'true',
    FALSE: 'false'
}

function main(){
    if(nodeState.get('_id)')) {
        action.goTo(scriptOutcomes.TRUE)
        return;
    }
    action.goTo(scriptOutcomes.FALSE)
}

main();