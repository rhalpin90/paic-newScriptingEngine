var PASSWORD_POLICY = require("Library_PasswordPolicy");

var scriptOutcomes = {
    OUTCOME: 'outcome',
}

var uuid = nodeState.get("_id");
var identity = idRepository.getIdentity(uuid);

var passwordPolicies = {
  0: "Standard Password Policy",
};

var POLICY_TITLE = "Standard Password Policy";
var PASSWORD_ATTR = "password";
var CUSTOM_REGEX_ERROR = "Must validate regex";
var REALM = "alpha_user";

function setRegexScript() {
  return `
    setTimeout(function() {
      var policies = document.querySelectorAll("#policy_panel_1 li");
      for (var i = 0; i < policies.length; i++) {
          if (policies[i].innerText.includes("Has to match pattern:")) {
              policies[i].innerText = "${CUSTOM_REGEX_ERROR}";
          }
      }
    }, 200);
  `;
}

function main() {
  PASSWORD_POLICY.getPasswordPolicy(POLICY_TITLE, openidm, logger);
  if (!PASSWORD_POLICY.policyFound) {
    logger.error("Password policy " + POLICY_TITLE + " failed to load");
  }
  if (PASSWORD_POLICY.getRegexError()) {
    CUSTOM_REGEX_ERROR = PASSWORD_POLICY.getRegexError();
  }
  var regexScript = setRegexScript();
  if (!callbacks.isEmpty()) {
    var passwordCallback = callbacks.getValidatedPasswordCallbacks().get(0);
    var password = passwordCallback.value;
    var failedPolicies = [];

    if (PASSWORD_POLICY.getMinLength() || PASSWORD_POLICY.getMaxLength() !== 0) {
      if (
        password.length < PASSWORD_POLICY.getMinLength() ||
        (password.length > PASSWORD_POLICY.getMaxLength() && PASSWORD_POLICY.getMaxLength() !== 0)
      ) {
        failedPolicies.push(JSON.stringify(PASSWORD_POLICY.getLengthPolicy()));
      }
    }

    if (PASSWORD_POLICY.getCapitalCharCount()) {
      if (password.length - password.replace(/[A-Z]/g, "").length < PASSWORD_POLICY.getCapitalCharCount()) {
        failedPolicies.push(JSON.stringify(PASSWORD_POLICY.getCapitalCharPolicy()));
      }
    }

    if (PASSWORD_POLICY.getNumberCount()) {
      if (password.length - password.replace(/\d/g, "").length < PASSWORD_POLICY.getNumberCount()) {
        failedPolicies.push(JSON.stringify(PASSWORD_POLICY.getNumberCharPolicy()));
      }
    }

    if (PASSWORD_POLICY.getAlphaCharCount()) {
  if (password.length - password.replace(/[a-zA-Z]/g, "").length < PASSWORD_POLICY.getAlphaCharCount()) {
    failedPolicies.push(JSON.stringify(PASSWORD_POLICY.getAlphaCharPolicy()));
  }
}

    if (PASSWORD_POLICY.getCharSet()) {
      var charSet = PASSWORD_POLICY.getCharSet();
      logger.warn("getCharSet() returned: " + JSON.stringify(charSet));
      
      // Convert to string if it's an array or object
      if (typeof charSet !== 'string') {
        if (Array.isArray(charSet)) {
          charSet = charSet.join('');
        } else if (typeof charSet === 'object') {
          charSet = Object.values(charSet).join('');
        } else {
          charSet = String(charSet);
        }
      }
      
      if (charSet && charSet.length > 0) {
        var charSetEscaped = charSet.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        var specialRegex = new RegExp("[" + charSetEscaped + "]");
        if (!specialRegex.test(password)) {
          failedPolicies.push(JSON.stringify(PASSWORD_POLICY.getCharacterSetPolicy()));
        }
      } else {
        logger.warn("getCharSet() returned an invalid value after conversion: " + charSet);
      }
    }

    if (PASSWORD_POLICY.getRegex()) {
      if (!password) {
        failedPolicies.push(JSON.stringify(PASSWORD_POLICY.getRegexPolicy()));
      } else if (password !== password.match(PASSWORD_POLICY.getRegex())[0]) {
        failedPolicies.push(JSON.stringify(PASSWORD_POLICY.getRegexPolicy()));
      }
    }
    
    if (PASSWORD_POLICY.getFieldsNotAllowed()) {
      var id = nodeState.get("_id");
      var fieldsNotAllowed = PASSWORD_POLICY.getFieldsNotAllowed();
      for (var i=0; i < fieldsNotAllowed.length; i++) {
        var query = openidm.read(`managed/${REALM}/${id}`, null, [fieldsNotAllowed[i]]);
        if (query) {
          if (query[fieldsNotAllowed[i]] && password.toLowerCase().includes(query[fieldsNotAllowed[i]].toLowerCase())) {
            logger.error("Password contains attribute value for " + fieldsNotAllowed[i] + "adding failed policy");
            failedPolicies.push(JSON.stringify(PASSWORD_POLICY.getFieldsNotAllowedPolicy()));
            break;
          }
        }
      }
    }

    if (PASSWORD_POLICY.getDisallowedCharacters()) {
      var disallowedChars = PASSWORD_POLICY.getDisallowedCharacters();
      
      // Ensure disallowedChars is a string
      if (Array.isArray(disallowedChars)) {
        disallowedChars = disallowedChars.join('');
      } else if (typeof disallowedChars !== 'string') {
        disallowedChars = String(disallowedChars);
      }

      if (disallowedChars && disallowedChars.length > 0) {
        for (var i = 0; i < disallowedChars.length; i++) {
          if (password.includes(disallowedChars[i])) {
            failedPolicies.push(JSON.stringify(PASSWORD_POLICY.getDisallowedCharactersPolicy()));
            break;
          }
        }
      }
    }
    
    var validateOnly = passwordCallback.validateOnly;
    if (failedPolicies.length > 0) {
      logger.error("PasswordValidatorCallback: failedPolicies populated. Send callback again");
      callbacksBuilder.validatedPasswordCallback("Password", false, {}, true, failedPolicies);
      callbacksBuilder.scriptTextOutputCallback(regexScript);
    } else if (validateOnly === true) {
      logger.error("PasswordValidatorCallback: validateOnly set to true, set to false and send that same callback");
      callbacksBuilder.validatedPasswordCallback("Password", false, {}, false, failedPolicies);
      callbacksBuilder.scriptTextOutputCallback(regexScript);
    } else {
      logger.error("PasswordValidatorCallback: validateOnly set to false, send to success");
      var objectAttributes = nodeState.get("objectAttributes");
      var attributes = {};
      for (var property in objectAttributes) {
        if (property !== "userName" && property !== "_id") {
          attributes[property] = objectAttributes[property];
        }
      }
      attributes.frUnindexedInteger5 = 1;
      attributes[PASSWORD_ATTR] = password;
      nodeState.putTransient("objectAttributes", attributes);
      nodeState.putTransient(PASSWORD_ATTR, password);

      action.goTo(scriptOutcomes.OUTCOME);
    }
  } else {
    var failedPolicies = [];

    if (PASSWORD_POLICY.getMinLength() || PASSWORD_POLICY.getMaxLength() !== 0) {
      failedPolicies.push(JSON.stringify(PASSWORD_POLICY.getLengthPolicy()));
    }
    if (PASSWORD_POLICY.getCapitalCharCount()) {
      failedPolicies.push(JSON.stringify(PASSWORD_POLICY.getCapitalCharPolicy()));
    }
    if (PASSWORD_POLICY.getNumberCount()) {
      failedPolicies.push(JSON.stringify(PASSWORD_POLICY.getNumberCharPolicy()));
    }
    if (PASSWORD_POLICY.getAlphaCharCount()) {
      failedPolicies.push(JSON.stringify(PASSWORD_POLICY.getAlphaCharPolicy()));
    }
    if (PASSWORD_POLICY.getCharSet()) {
      failedPolicies.push(JSON.stringify(PASSWORD_POLICY.getCharacterSetPolicy()));
    }
    if (PASSWORD_POLICY.getRegex()) {
      failedPolicies.push(JSON.stringify(PASSWORD_POLICY.getRegexPolicy()));
    }
    if (PASSWORD_POLICY.getFieldsNotAllowed()) {
      failedPolicies.push(JSON.stringify(PASSWORD_POLICY.getFieldsNotAllowedPolicy()));
    }
    if (PASSWORD_POLICY.getDisallowedCharacters()) {
      failedPolicies.push(JSON.stringify(PASSWORD_POLICY.getDisallowedCharactersPolicy()));
    }
    callbacksBuilder.validatedPasswordCallback("Password", false, {}, true, failedPolicies);
    callbacksBuilder.scriptTextOutputCallback(regexScript);
  }
  action.goTo(scriptOutcomes.OUTCOME);
}

main();