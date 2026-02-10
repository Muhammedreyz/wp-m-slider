<?php
/**
 * Plugin Name: Faal Slider
 * Description: Lightweight, accessible WordPress slider with shortcode and admin management.
 * Version: 1.1.0
 * Author: Faal App
 * Text Domain: faal-slider
 */

if (! defined('ABSPATH')) {
    exit;
}

require_once plugin_dir_path(__FILE__) . 'includes/class-faal-slider.php';

Faal_Slider::init();
