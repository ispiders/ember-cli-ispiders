import Ember from 'ember';

var defaultOptions = {
    transport: ['websocket', 'polling']
};

export default Ember.Mixin.create({

    socket: null,
    connected: false,
    options: null,

    ioConfig: function () {

        var manager = this.socket.io;

        manager.reconnection(true);
        manager.reconnectionDelay(1000);
        manager.reconnectionDelayMax(5000);
        manager.reconnectionAttempts(Infinity);

        return this;
    },

    setupOptions: function (options) {

        this.options = Ember.merge({}, defaultOptions);

        if (options) {
            Ember.merge(this.options, options);
        }

        return this;
    },

    buildUrl: function () {

        var options = this.options;

        return options.hostname + (options.port ? ':' + options.port : '');
    },

    connect: function (url, options) {

        if (this.socket) {
            return this;
        }

        this.setupOptions(options);

        this.socket = window.io(url || this.buildUrl(), options);

        this.ioConfig();
        this._listionSocketEvents();

        this.trigger('setupSocket');

        return this;
    },

    _listionSocketEvents: function () {

        var self = this,
            socket = this.socket;

        socket.on('connect', function () {
            self.set('connected', true);
            self.trigger('connected');
            console.info('connect');
        });

        socket.on('connecting', function () {
            console.info('connecting');
        });

        socket.on('disconnect', function () {
            self.set('connected', false);
            self.trigger('disconnect');
            console.info('disconnect');
        });

        socket.on('reconnect_error', function (e) {
            self.set('connected', false);
            self.trigger('reconnectError');
            console.info('reconnect_error');
        });

        socket.on('reconnect', function (e) {
            self.set('connected', true);
            self.trigger('reconnect');
            console.info('reconnect', e);
        });

        socket.on('error', function (error) {
            console.error(error);
        });
    },

    reconnectErrorCount: 0,
    networkWarning: Ember.on('reconnectError', function () {

        this.incrementProperty('reconnectErrorCount');
    }),

    resetReconnectCount: Ember.on('reconnect', function () {

        this.set('reconnectErrorCount', 0);
    }),

    connectionError: Ember.computed.gt('reconnectErrorCount', 1),

    connectionObserver: Ember.observer('connected', function () {

        this.trigger('connectionChange', this.get('connected'));
    })
});
