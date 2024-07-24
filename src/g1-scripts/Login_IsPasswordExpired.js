var scriptOutcomes = {
  FALSE: 'false',
  TRUE: 'true',
};

var id = nodeState.get("_id");
var identity = idRepository.getIdentity(id);
var date = new java.util.Date();
var dateFormat = new java.text.SimpleDateFormat("yyyyMMddHHmmss");  
var attrIDate1 = identity.getAttributeValues("fr-attr-idate1");
function main() {
if (attrIDate1 === null || attrIDate1.isEmpty()) {
  action.goTo(scriptOutcomes.TRUE);
} else {
  var attrIDate1Parsed = dateFormat.parse(attrIDate1.iterator().next());
  //var differenceInMilliseconds = date.getTime() - attrIDate1Parsed.getTime();

  if (date.getTime() >= attrIDate1Parsed.getTime()) {
      action.goTo(scriptOutcomes.FALSE);
  }
  
  // If the difference is greater than 30 days, set outcome to false
  //if (differenceInMilliseconds > 30 * 24 * 60 * 60 * 1000) {
  //  action = fr.Action.goTo('false').withErrorMessage('Password expired, ').build();
  //}
}
}

main();





