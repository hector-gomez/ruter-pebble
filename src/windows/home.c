#include <pebble.h>

static Window *s_window;
static TextLayer *s_title_layer;

/**
 * Window handler called when the main window is loaded.
 * Will create the window's child layers.
 *
 * @param window Window object
 */
static void home_window_load(Window *window) {
    // Get information about the Window
    Layer *window_layer = window_get_root_layer(window);
    GRect bounds = layer_get_bounds(window_layer);

    // Create the TextLayer with specific bounds
    s_title_layer = text_layer_create(
        GRect(0, 0, bounds.size.w, 32)
    );

    // Give the layer its properties
    text_layer_set_text(s_title_layer, "Ruter");
    text_layer_set_text_alignment(s_title_layer, GTextAlignmentCenter);
    text_layer_set_text_color(s_title_layer, GColorWhite);
    text_layer_set_background_color(s_title_layer, GColorRed);
    text_layer_set_font(s_title_layer, fonts_get_system_font(FONT_KEY_GOTHIC_24_BOLD));

    // Add title layer to the window's root layer
    layer_add_child(window_layer, text_layer_get_layer(s_title_layer));
}

/**
 * Window handler called when the main window is unloaded.
 * Will destroy the window's child layers.
 *
 * @param window Window object
 */
static void home_window_unload(Window *window) {
    text_layer_destroy(s_title_layer);
}

/**
 * Creates the home window (but does not show it).
 */
void home_window_create(void) {
    s_window = window_create();
    window_set_window_handlers(s_window, (WindowHandlers) {
        .load = home_window_load,
        .unload = home_window_unload,
    });

    // Apply some styling and settings
    window_set_background_color(s_window, GColorBlack);
}

/**
 * Destroys the home window.
 */
void home_window_destroy(void) {
    window_destroy(s_window);
}

/**
 * Shows the home window. Must be called after home_window_create.
 *
 * @param animated Whether if the app should transition into this window with an animation.
 */
void home_window_show(bool animated) {
    window_stack_push(s_window, animated);
}
