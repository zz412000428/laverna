require.config({
    packages: [
        // Ace editor
        {
            name     : 'ace',
            location : '../bower_components/ace/lib/ace',
            main     : 'ace'
        },
        // Pagedown-ace editor
        {
            name     : 'pagedown-ace',
            location : '../bower_components/pagedown-ace',
            main     : 'Markdown.Editor'
        },
        // Xregexp
        {
            name     : 'xregexp',
            location : '../bower_components/xregexp/src',
            main     : 'xregexp'
        }
    ],
    paths: {
        sjcl                       :  '../bower_components/sjcl/sjcl',
        // Dependencies            :  and libraries
        text                       :  '../bower_components/requirejs-text/text',
        jquery                     :  '../bower_components/jquery/dist/jquery',
        underscore                 :  '../bower_components/underscore/underscore',
        devicejs                   :  '../bower_components/device.js/lib/device.min',
        i18next                    :  '../bower_components/i18next/i18next.min',
        // Backbone &              :  Marionette
        backbone                   :  '../bower_components/backbone/backbone',
        marionette                 :  '../bower_components/marionette/lib/core/backbone.marionette',
        localStorage               :  '../bower_components/backbone.localStorage/backbone.localStorage',
        IndexedDBShim              :  '../bower_components/IndexedDBShim/dist/IndexedDBShim',
        indexedDB                  :  '../bower_components/indexeddb-backbonejs-adapter/backbone-indexeddb',
        dropzone                   :  '../bower_components/dropzone/downloads/dropzone.min',
        toBlob                     :  '../bower_components/blueimp-canvas-to-blob/js/canvas-to-blob',
        blobjs                     :  '../bower_components/Blob/Blob',
        fileSaver                  :  '../bower_components/FileSaver/FileSaver',
        enquire                    :  '../bower_components/enquire/dist/enquire.min',
        dropbox                    :  'libs/dropbox',
        hammerjs                   :  '../bower_components/hammerjs/hammer',
        remotestorage              :  '../bower_components/remotestorage.js/release/0.10.0-beta3/remotestorage-nocache.amd',
        'backbone.wreqr'           :  '../bower_components/backbone.wreqr/lib/backbone.wreqr',
        'backbone.babysitter'      :  '../bower_components/backbone.babysitter/lib/backbone.babysitter',
        // Keybindings             :
        'Mousetrap'                :  '../bower_components/mousetrap/mousetrap',
        'mousetrap-pause'          :  '../bower_components/mousetrap/plugins/pause/mousetrap-pause',
        'backbone.mousetrap'       :  '../bower_components/backbone.mousetrap/backbone.mousetrap',
        // Pagedown                :
        'pagedown'                 :  '../bower_components/pagedown/Markdown.Editor',
        'pagedown-extra'           :  '../bower_components/pagedown-extra/Markdown.Extra',
        'to-markdown'              :  '../bower_components/to-markdown/src/to-markdown',
        'mathjax'                  :  '../bower_components/MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML',
        // Markdown helpers        :
        'checklist'                :  'libs/checklist',
        'tags'                     :  'libs/tags',
        // Other                   :  libraries
        'bootstrap'                :  '../bower_components/bootstrap/dist/js/bootstrap.min',
        'prettify'                 :  '../bower_components/google-code-prettify/src/prettify',
        // View                    :  scripts here
        'modalRegion'              :  'views/modal',
        'brandRegion'              :  'views/brand',
        'apps'                     :  'apps/'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        devicejs: {
            exports: 'device'
        },
        localStorage: {
            deps: ['underscore', 'backbone']
        },
        indexedDB: {
            deps: ['underscore', 'backbone']
        },
        'IndexedDBShim': {
            exports: 'shimIndexedDB'
        },
        // Mousetrap
        'Mousetrap': { },
        'mousetrap-pause': {
            deps: ['Mousetrap']
        },
        'backbone.mousetrap': {
            deps: ['Mousetrap', 'mousetrap-pause', 'backbone']
        },
        // Ace && pagedown editor
        ace: {
            exports: 'ace'
        },
        'pagedown': {
            exports: 'Markdown',
            deps: [ 'pagedown-extra' ]
        },
        'pagedown-extra': [ 'pagedown-ace' ],
        'pagedown-ace/Markdown.Editor': {
            exports: 'Markdown',
            deps: [ 'pagedown-ace/Markdown.Converter' ]
        },
        'pagedown-ace/Markdown.Sanitizer': {
            deps: [ 'pagedown-ace/Markdown.Converter' ]
        },
        'mathjax': {
            exports: 'MathJax'
        },
        // Xregexp
        'xregexp/xregexp': {
            exports: 'XRegExp'
        },
        'xregexp/addons/unicode/unicode-base': {
            deps: ['xregexp/xregexp'],
            exports: 'XRegExp'
        },
        'to-markdown': {
            exports: 'toMarkdown'
        },
        bootstrap: {
            deps: ['jquery']
        },
        sjcl: {
            exports: 'sjcl'
        },
        dropbox: {
            exports: 'Dropbox'
        },
        remotestorage: {
            exports: 'remoteStorage'
        },
        i18next: {
            deps: ['jquery'],
            exports: 'i18n'
        }
    },
    findNestedDependencies: true,
    waitSeconds: 10
});

require([
    'jquery',
    'app',
    'bootstrap'
], function ($, App) {
    'use strict';
    /* global Modernizr */

    function startApp () {
        var request;

        // Browser doesn't support neither indexeddb nor websql
        if ( ( !Modernizr.indexeddb && !Modernizr.websqldatabase ) ||
            !Modernizr.localstorage ) {
            window.alert('Your browser is outdated and does not support IndexedDB and/or LocalStorage.');
            return;
        }

        request = window.indexedDB.open('MyTestDatabase');
        request.onerror = function() {
            window.appNoDB = true;
            App.start();
        };
        request.onsuccess = function() {
            App.start();
        };
    }

    $(document).ready(function () {
        if ( !Modernizr.indexeddb ) {
            require(['IndexedDBShim'], function () {
                window.appNoDB = true;
                window.shimIndexedDB.__useShim(true);
                startApp();
            });
        }
        else {
            startApp();
        }
    });

});
