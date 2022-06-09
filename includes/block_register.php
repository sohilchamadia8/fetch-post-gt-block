<?php

class Block_Register {

    function __construct() {

        add_action('init', array($this, 'register_block'));


        add_action('rest_api_init', function () {
            register_rest_route('post_data/v1', '/post_detail/(?P<id>\d+)', [
                'method' => 'GET',
                'callback' => array($this, 'get_specific_post')
            ]);
        });
    }


    function register_block() {

        // Register JavasScript File build/index.js
        wp_register_script(
            'ftgt-block-edior-script',
            FPGB_PLUGIN_URL_PATH . '/build/index.js',
            array('wp-blocks', 'wp-element', 'wp-editor', 'wp-api'),
            filemtime(FPGB_PLUGIN_DIR_PATH . 'build/index.js')
        );

        // Register editor style src/editor.css
        wp_register_style(
            'ftgt-block-editor-style',
            FPGB_PLUGIN_URL_PATH . '/src/editor.css',
            array('wp-edit-blocks'),
            filemtime(FPGB_PLUGIN_DIR_PATH . 'src/editor.css')
        );

        // Register front end block style src/style.css
        wp_register_style(
            'ftgt-block-front-end-style',
            FPGB_PLUGIN_URL_PATH . '/src/style.css',
            array(),
            filemtime(FPGB_PLUGIN_DIR_PATH . 'src/style.css')
        );

        // Register your block
        register_block_type('ftgt-block/custom-post-fetch', array(
            'editor_script' => 'ftgt-block-edior-script',
            'editor_style' => 'ftgt-block-editor-style',
            'style' => 'ftgt-block-front-end-style',
        ));
    }


    function get_specific_post($data) {

        $post = get_post($data['id']);
        $data = array();
        $data['id'] = $post->ID;
        $data['post_title'] = $post->post_title;
        $data['post_excerpt'] = $post->post_excerpt;
        $data['post_date'] = date("d M Y", strtotime($post->post_date));
        echo json_encode($data);
    }
}
new Block_Register();
