var scriptOutcomes = {
    OUTCOME: 'outcome'
};

function main () {
    var scriptTemplate = `
    const alertExists = document.querySelector('.fr-alert');
    if (!alertExists) {
        const divElement = document.createElement("div");
        divElement.setAttribute("role", "alert");
        divElement.setAttribute("aria-live", "polite");
        divElement.setAttribute("aria-atomic", "true");
        divElement.classList.add("alert", "fr-alert", "p-3", "text-left", "alert-warning");

        const spanElement = document.createElement("span");
        spanElement.setAttribute("data-v-11eb4528", "");
        spanElement.setAttribute("aria-hidden", "true");
        spanElement.classList.add("mr-2", "material-icons-outlined");
        spanElement.textContent = "warning";

        const textNode = document.createTextNode("{message}");

        divElement.appendChild(spanElement);
        divElement.appendChild(textNode);

        const callbacksPanelElement = document.querySelector('div[data-testid="callbacks_panel"]');
        const firstChild = callbacksPanelElement.firstChild;

        callbacksPanelElement.insertBefore(divElement, firstChild);
}
`;

  if (!callbacks.isEmpty()) {
    action.goTo(scriptOutcomes.OUTCOME);
    return;
  }
    var plannedOutageJSON = systemEnv.getProperty('esv.planned.outage.splash');
    var portalValue = nodeState.get("portal");

    if(plannedOutageJSON) {
        var plannedOutage = JSON.parse(plannedOutageJSON);
        var warningStatus = plannedOutage[portalValue].warningEnabled;
        

        if(warningStatus) {
            action.goTo(scriptOutcomes.OUTCOME);
            var warningMessage = plannedOutage[portalValue].warningMessage;
            var script = scriptTemplate.replace("{message}", warningMessage);
            callbacksBuilder.scriptTextOutputCallback(script);
        }
    }
    
    action.goTo(scriptOutcomes.OUTCOME);
}

main();


