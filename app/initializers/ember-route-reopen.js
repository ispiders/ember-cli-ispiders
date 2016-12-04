import Ember from 'ember';

function determineBubble (event) {
    Ember.assert('Must give a event bubble!', event && typeof event === 'object');
    Ember.assert('Must give a event name to bubble!', typeof event.name === 'string');

    if (event.bubble) {
        event.bubble--;

        return true;
    }
    else if (event.targetRouteName) {
        var routes = event.targetRouteName.split('|');

        for (var i = 0; i < routes.length; ++i) {
            if (routes[i] === this.routeName) {
                return false;
            }
        }

        return true;
    }
    else {
        // no bubble
    }

    return false;
}

var specialEvents = ['refresh'];

function bubble (event) {
    if (determineBubble.call(this, event)) {
        return true;
    }

    if (specialEvents.indexOf(event.name) !== -1) {
        this[event.name]();

        return false;
    }

    var actions = this.actions;

    if (actions && actions[event.name] && typeof actions[event.name] === 'function') {
        return actions[event.name].call(this, event);
    }

    console.warn('Nothing handled the Bubble event `' + event.name + '`');

    return false;
}

export default {

    name: 'ember-route-reopen',

    initialize: function () {
        Ember.Route.reopen({

            // init: function()
            // {
            //     this.actions.bubble = bubble;

            //     return this._super(...arguments);
            // },

            actions: {

                bubble: bubble
            }
        });
    }
};

