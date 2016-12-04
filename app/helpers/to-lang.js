import Ember from 'ember';

var uuid = 0;
var tmp = {};
var debug = localStorage.debugLang;

function debugLang (key, lang) {

    if (!tmp[key]) {
        tmp[key] = ++uuid;
    }

    console.log('debug to-lang:', tmp[key], key, lang);

    return '##' + tmp[key] + '##';
}

export default Ember.Helper.extend({

    lang: Ember.inject.service('lang'),

    compute: function ([key]) {

        var ret = this.get('lang').translate(key);

        if (!ret) {
            console.error('to-lang', key);
        }

        if (debug) {
            return debugLang(key, ret);
        }

        return ret;
    }
});
