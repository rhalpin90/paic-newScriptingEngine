var id = nodeState.get("_id");
var identity = idRepository.getIdentity(id);

identity.setAttribute("frUnindexedString1", null)
try{
    identity.store();
} catch(e) {
    logger.error("Unable to set reset password status." + e)
}
action.goTo('outcome');
