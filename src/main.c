#include <pebble.h>
#include "windows/home.h"

/**
 * App initialization
 */
static void init(void) {
    home_window_create();
    home_window_show(true);
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
    init();

    APP_LOG(APP_LOG_LEVEL_DEBUG, "Application started");

    app_event_loop();
    deinit();
}
