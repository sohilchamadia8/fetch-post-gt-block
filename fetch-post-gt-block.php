<?php

/*
*  Plugin Name: Fetch Post Block
*  Description: This plugin creates gutenberg block which fetch post data based on selection
 * Version: 1.0.0
 * Author: Sohil Chamadia
 * Author URI: https://sohilchamadia8.wordpress.com/
*/

define('FPGB_PLUGIN_URL_PATH', plugins_url('fetch-post-gt-block'));
define('FPGB_PLUGIN_DIR_PATH', plugin_dir_path(__FILE__));

include 'includes/block_register.php';
