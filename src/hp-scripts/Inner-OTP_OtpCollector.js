/**
 * @file Copy of OTP Collector Decision node but adding retry and error messaging
 */

var scriptOutcomes = {
    SUCCESS: 'success',
    FAILURE: 'failure',
    RETRY: 'retry'
};

var scriptConfig = {
    passwordExpiryTime: 5,
};

var LOGGER_PREFIX = '[Custom OTP Collector][Custom] ';

function main() {
    logger.debug(LOGGER_PREFIX + 'Started');

    // Send callbacks if none
    if (callbacks.isEmpty()) {
        createCallbacks(false);
        return;
    }

    // Check selected option
    var selectedOption = getSelectedOption();
    if (selectedOption === 'Retry') {
        action.goTo(scriptOutcomes.RETRY);
        nodeState.putShared('retryFlag', true);
        return;
    }


    /** @type {string} */
    var code = callbacks.getNameCallbacks()[0];
    if (code.length === 0) {
        createCallbacks(true);
        return;
    }
    var passwordMatches = checkPassword(code);
    if (!passwordMatches) {
        action.goTo(scriptOutcomes.FAILURE);
        return;
    }
    action.goTo(scriptOutcomes.SUCCESS);
}

/**
 * @param {string} password
 */
function checkPassword(password) {
    var oneTimePassword = nodeState.get('oneTimePassword');
    var passwordTimestamp = nodeState.get('oneTimePasswordTimestamp');
    var passwordMatches = oneTimePassword != null
        && String(oneTimePassword) === password
        && passwordTimestamp != null
        && isWithinExpiryTime(Number(passwordTimestamp));
    logger.debug(LOGGER_PREFIX + 'passwordMatches: ' + passwordMatches);

    if (passwordMatches) {
        nodeState.remove('oneTimePassword');
        nodeState.remove('oneTimePasswordTimestamp');
    }
    return passwordMatches;
}

/**
 * Checks if the current time is within the password expiry time.
 *
 * @param {number} passwordTimestamp - The timestamp of the password creation in seconds (Unix epoch time).
 * @returns {boolean} - Returns true if the password is within the expiry time, otherwise false.
 */
function isWithinExpiryTime(passwordTimestamp) {
    var previous = new Date(passwordTimestamp * 1000);
    var passwordExpiryMinutes = scriptConfig.passwordExpiryTime;
    var passwordExpiryMillis = passwordExpiryMinutes * 60 * 1000;
    var now = new Date();
    logger.debug(LOGGER_PREFIX + 'previous:', previous);
    logger.debug(LOGGER_PREFIX + 'passwordExpiryMillis:', passwordExpiryMillis);
    logger.debug(LOGGER_PREFIX + 'now:', now);
    var expiryTime = new Date(previous.getTime() + passwordExpiryMillis);
    var withinExpiryTime = now.getTime() < expiryTime.getTime();
    logger.debug(LOGGER_PREFIX + 'withinExpiryTime:', withinExpiryTime);
    return withinExpiryTime;
}

function getLabels() {
    var options = ['Next'];
    options.push('Retry');
    return options;
}

/**
 * @returns {'Next' | 'Retry'}
 */
function getSelectedOption() {
    var selectedOption = callbacks.getConfirmationCallbacks()[0];
    switch (selectedOption) {
    case 0:
        return 'Next';
    case 1:
        return 'Retry';
    }
}

function createCallbacks(showError) {
    if (showError) {
        callbacksBuilder.textOutputCallback(2, 'You must enter the code that was provided to you');
    }
    callbacksBuilder.nameCallback('One Time Passcode');
    callbacksBuilder.confirmationCallback(0, getLabels(), 0);
}

main();