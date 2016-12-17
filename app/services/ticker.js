import Ember from 'ember';

export default Ember.Service.extend({

    timer: null,

    _timestamp: 0,
    timestamp: Ember.computed('serverTime', function () {

        if (!this.timer) {
            this.start();
        }

        return this.get('serverTime');
    }).readOnly(),

    start: Ember.on('init', function () {
        var self = this;

        Ember.run.next(function () {

            self.set('_timestamp', Date.now());

            if (!self.timer) {
                self.timer = setInterval(function () {
                    Ember.run(function () {
                        self.set('_timestamp', Date.now());
                    });
                }, 1000);
            }
        });
    }),

    stop: function () {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    },

    serverTime: Ember.computed('_timestamp', function () {
        return (parseInt(window.sessionStorage.getItem('local-timestamp-delta')) || 0) + Date.now();
    }).readOnly()
});
