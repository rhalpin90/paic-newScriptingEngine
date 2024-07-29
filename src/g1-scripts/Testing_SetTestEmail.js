var scriptOutcomes = {
    OUTCOME: 'outcome',
};

function main() {
    var otpTimestamp;
    if (callbacks.isEmpty()) {
        otpTimestamp = String(new Date().valueOf());
        nodeState.putShared('otp_timestamp', otpTimestamp);
        callbacksBuilder.hiddenValueCallback('otp_timestamp', otpTimestamp);
        return;
    }
    otpTimestamp = nodeState.get('otp_timestamp');
    nodeState.remove('otp_timestamp');
    nodeState.putShared('userIdentifier', `bholderness+jrntest-${otpTimestamp}@trivir.com`);
    action.goTo(scriptOutcomes.OUTCOME);
}

main();
