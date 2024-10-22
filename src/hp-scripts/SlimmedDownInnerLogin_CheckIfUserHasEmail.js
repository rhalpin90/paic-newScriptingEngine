var scriptOutcomes = {
    EMAIL_FOUND: "emailFound",
    NO_EMAIL: "noEmail"
};

function main() {
    var id = nodeState.get('_id');
    var identity = idRepository.getIdentity(id);
    var email = identity.getAttributeValues("mail")[0]; 
    if (email !== null && email !== 'none@healthpartners.com'){
        action.goTo(scriptOutcomes.EMAIL_FOUND)
        return;
    }
    action.goTo(scriptOutcomes.NO_EMAIL);
}

main ();