/* jshint node: true */
'use strict';

module.exports = {
    name: 'ember-cli-ispiders',

    isDevelopingAddon: function () {

        if (process.env.EMBER_ENV === 'development') {
            return true;
        }

        return false;
    }
};
