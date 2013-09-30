
// Configure loading modules from the lib directory,
requirejs.config({
    "baseUrl": "js",
    "paths": {

        "jquery": [
            'http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min',
            "libs/jquery-2.0.2.min" //If the CDN location fails, load from this location
        ],

        "modernizr": "libs/modernizr-2.6.2.min",
        "underscore": "libs/underscore.min",
        "backbone": "libs/backbone.min",
        "gumby": "libs/gumby.min",
        "plugins": "plugins/plugins.min",

        "app-utils": "utils",
        "app-router": "router",
        "app-home-view": "views/home",
        "app-login-view": "views/login",
        "app-register-view": "views/register",
        "app-entry-view": "views/entry",
        "app-header-view": "views/header",
        "app-footer-view": "views/footer",
        "app-testing-view": "views/testing"

    },
    "shim": {

        "backbone": ["jquery", "underscore", "plugins"],
        "gumby": ["jquery"],
        "plugins": ["jquery"],

        "app-utils": ["backbone"],
        "app-home-view": ["backbone", "app-utils"],
        "app-login-view": ["backbone", "app-utils"],
        "app-register-view": ["backbone", "app-utils"],
        "app-entry-view": ["backbone", "app-utils"],
        "app-header-view": ["backbone", "app-utils"],
        "app-footer-view": ["backbone", "app-utils"],
        "app-testing-view": ["backbone", "app-utils"],
        "app-router": ["backbone", "app-utils", "app-home-view", "app-login-view", "app-register-view", "app-entry-view", "app-header-view", "app-footer-view", "app-testing-view"]

    }
});

// Load the main app module to start the app
requirejs(["main"]);