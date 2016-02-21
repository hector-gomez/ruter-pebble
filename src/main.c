#include <pebble.h>
#include "windows/home.h"

#define KEY_USER_SETTINGS 0

/**
 * Callback handler invoked when an AppMessage is received successfully
 */
static void inbox_received_callback(DictionaryIterator *iterator, void *context) {
    APP_LOG(APP_LOG_LEVEL_INFO, "AppMessage received");

    //TODO Instead of trying to find each of the keys in the message, iterate over it and then
    //     use a switch statement to call the relevant method (put them in separate files).

    // Get the user settings
    Tuple *data = dict_find(iterator, KEY_USER_SETTINGS);
    if (data) {
        APP_LOG(APP_LOG_LEVEL_INFO, "KEY_USER_SETTINGS received with value: %s", data->value->cstring);
    } else {
        APP_LOG(APP_LOG_LEVEL_INFO, "KEY_USER_SETTINGS not included in this message.");
    }
}

/**
 * Callback handler invoked when an AppMessage could not be received
 */
static void inbox_dropped_callback(AppMessageResult reason, void *context) {
  APP_LOG(APP_LOG_LEVEL_ERROR, "Incoming AppMessage dropped!");
}

/**
 * Callback handler invoked when an AppMessage is sent successfully
 */
static void outbox_sent_callback(DictionaryIterator *iterator, void *context) {
  APP_LOG(APP_LOG_LEVEL_INFO, "AppMessage sent successfully");
}

/**
 * Callback handler invoked when an AppMessage could not be sent
 */
static void outbox_failed_callback(DictionaryIterator *iterator, AppMessageResult reason, void *context) {
  APP_LOG(APP_LOG_LEVEL_ERROR, "Failed to send AppMessage");
}

/**
 * App initialization
 */
static void init(void) {
    home_window_create();
    home_window_show(true);

    // Register callbacks
    app_message_register_inbox_received(inbox_received_callback);
    app_message_register_inbox_dropped(inbox_dropped_callback);
    app_message_register_outbox_failed(outbox_failed_callback);
    app_message_register_outbox_sent(outbox_sent_callback);

    // Open AppMessage
    //TODO Calculate the maximum size of any message and adjust the buffer sizes
    const int inbox_size = 128;
    const int outbox_size = 128;
    app_message_open(inbox_size, outbox_size);
}

/**
 * App deinitialization
 */
static void deinit(void) {
    home_window_destroy();
}

/**
 * The application's entry point
 *
 * @return  Exit code
 */
int main(void) {
    APP_LOG(APP_LOG_LEVEL_DEBUG, "Starting application...");
    init();
    APP_LOG(APP_LOG_LEVEL_DEBUG, "Application started");

    app_event_loop();
    deinit();
}
