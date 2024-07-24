var scriptOutcomes = {
  OUTCOME: 'outcome',
};
function main() {
  var stylingScript = `
    function buildError(id) {
      var newError = document.createElement('p');
      newError.classList.add('text-danger', 'mb-0', 'error-message', 'text-left');
      newError.id = id;
      return newError;
    }
    
    function insertAfter(referenceNode, newNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    
    function elementPresent(referenceNode, checkNode) {
      return referenceNode.parentNode.contains(checkNode);
    }
    
    /*function updateDisallowedCharactersMessage() {
      var disallowedChars = ["spaces", "~", "\`", "^", "&", "*", "+", "=", "[", "]", "{", "}", "|", ";", "<", ">", "%", "\\"", "'", "_"];
      var disallowedCharsElement = document.querySelector("#password0-error");
      var passwordInput = document.querySelector("input[data-vv-as*='Password']");
      
      if (passwordInput && passwordInput.value) {
        var containsDisallowedChar = disallowedChars.some(char => 
          char === 'spaces' ? passwordInput.value.includes(' ') : passwordInput.value.includes(char)
        );
        
        if (containsDisallowedChar) {
          if (!disallowedCharsElement) {
            disallowedCharsElement = buildError('password0-error');
            // Insert after the parent container of the password input
            insertAfter(passwordInput.closest('.form-label-group'), disallowedCharsElement);
          }
          disallowedCharsElement.textContent = "Cannot contain characters: " + disallowedChars.join(' ');
        } else if (disallowedCharsElement) {
          disallowedCharsElement.remove();
        }
      } else if (disallowedCharsElement) {
        disallowedCharsElement.remove();
      }
    }*/

    var wrapper = document.getElementById('wrapper');
    var btns = document.getElementsByTagName('button');
    var btn = btns[btns.length - 1];

    // Create a MutationObserver to watch for changes in the DOM
    /*var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          updateDisallowedCharactersMessage();
        }
      });
    });*/

    // Start observing the wrapper for changes
    //observer.observe(wrapper, { childList: true, subtree: true });

    //setTimeout(updateDisallowedCharactersMessage, 50);
    
    wrapper.addEventListener('input', function (event) {
      /*if (event.target.matches("input[data-vv-as*='Password']")) {
        updateDisallowedCharactersMessage();
      }*/

      var passwordInputs = document.querySelectorAll("input[data-vv-as*='Password']");
      var password = passwordInputs[0];
      var passwordConfirmation = passwordInputs[1];
      var passwordsMatch = false;
      var passwordError = "Passwords don't match";
      var passwordId = 'password-error';
    
      var passwordValidationPassed = false;
    
      passwordConfirmation.type = 'password';
    
      if (password.value !== passwordConfirmation.value) {
        var error = buildError(passwordId);
        error.innerText = passwordError;
        if (!document.getElementById(passwordId)) {
          insertAfter(passwordConfirmation.closest('.form-label-group'), error);
        }
        passwordsMatch = false;
      } else {
        if (document.getElementById(passwordId)) {
          document.getElementById(passwordId).remove();
        }
        passwordsMatch = true;
      }
    
      setTimeout(function () {
        //check for fr valid attribute
        var policies = document.querySelectorAll("[id^='policy_panel'] .fr-valid");
        var allPolicies = document.querySelectorAll("[id^='policy_panel'] li");
        if (allPolicies.length === policies.length) {
          passwordValidationPassed = true;
        } else {
          passwordValidationPassed = false;
        }
    
        if (passwordsMatch && passwordValidationPassed) {
          btn.style.removeProperty('pointer-events');
          btn.style.removeProperty('background-color');
          btn.style.removeProperty('opacity');
        } else {
          btn.style.setProperty('pointer-events', 'none', 'important');
          btn.style.setProperty('background-color', '#747679', 'important');
          btn.style.setProperty('opacity', '.65', 'important');
        }
      }, 250);
    });
    `;
  if (callbacks.isEmpty()) {
    callbacksBuilder.scriptTextOutputCallback(stylingScript);
  } else {
    action.goTo(scriptOutcomes.OUTCOME);
  }
}
main();