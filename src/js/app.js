//TODO This is a test function, adapt to real usage
function sendTestMessage() {
    // Prepare the message, for the keys see appKeys in appinfo.json
    var message = {
        KEY_USER_SETTINGS: 'settings go here'
    };

    // Send it
    var transactionId = Pebble.sendAppMessage(message,
        function onSendSuccess(e) {
            console.log('Successfully delivered message with transactionId=' + e.data.transactionId);
        },
        function onSendError(e) {
            console.log('Unable to deliver message with transactionId=' + e.data.transactionId + ' Error is: ' + e.error.message);
        }
    );
}

// All the code has been run, once Pebble is ready we kickstart the app
Pebble.addEventListener('ready', function onAppReady(e) {
    console.log('Initializing JavaScript app...');

    //TODO Remove, this is just to test the communication
    sendTestMessage();

    console.log('JavaScript app initialized');
});
