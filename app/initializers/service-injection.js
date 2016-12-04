export default {

    name: 'service-injection',

    initialize: function (app) {

        app.inject('route', 'loginService', 'service:login');
        app.inject('controller', 'loginService', 'service:login');
        app.inject('component', 'loginService', 'service:login');
    }
};
