import Ember from 'ember';

var scripts = {};
var styles = {};

export function loadScript (url) {

    var el = scripts[url];

    if (el === 1) {
        return Ember.RSVP.resolve(1);
    }
    else if (!el) {
        el = scripts[url] = document.createElement('script');
        document.head.appendChild(el);
    }

    return new Ember.RSVP.Promise(function (resolve, reject) {

        el.src = url;

        el.onload = function () {

            scripts[url] = 1;
            resolve(1);
        };
        el.onerror = function (error) {

            scripts[url] = el;
            reject(error);
        };
    });
}

export function loadStyle (url) {

    var el = styles[url];

    if (el === 1) {
        return Ember.RSVP.resolve(1);
    }
    else if (!el) {
        el = styles[url] = document.createElement('link');
        el.rel = 'stylesheet';
        el.type = 'text/css';
        document.head.appendChild(el);
    }

    return new Ember.RSVP.Promise(function (resolve, reject) {

        el.href = url;

        el.onload = function () {

            styles[url] = 1;
            resolve(1);
        };
        el.onerror = function (error) {

            styles[url] = el;
            reject(error);
        };
    });
}

export function load (type, url) {

    if (type === 'script') {
        return loadScript(url);
    }
    else if (type === 'style') {
        return loadStyle(url);
    }
    else {
        return Ember.RSVP.reject();
    }
}

export default {

    loadScript: loadScript,
    loadStyle: loadStyle,
    load: load
};
