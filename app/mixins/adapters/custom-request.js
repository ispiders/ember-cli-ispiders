import Ember from 'ember';
import apis from '../../apis';

export default Ember.Mixin.create({

    /**
     * api 请求的标准入口
     * @param  {String} name  请求名称
     * @param  {[type]} data [description]
     * @return {[type]}       [description]
     */
    doRequest: function (name, data) {

        var request = Ember.get(apis, name);

        if (!request) {
            throw new Error('There is no request named ' + name + ' in apis.');
        }

        request = Ember.copy(request, true);
        request.customRequest = true;

        if (data && typeof data === 'object') {

            if (request.prepareQueryData && typeof request.prepareQueryData === 'function') {
                data = request.prepareQueryData(data);
            }

            request.data = request.data || {};

            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    if (typeof data[key] !== 'undefined') {
                        request.data[key] = data[key];
                    }
                }
            }
        }

        if (typeof request.url === 'function') {
            request.url = request.url(request);
        }

        var parentPath = this.urlPrefix();

        request.url = this.urlPrefix(request.url, parentPath);

        return this.ajax(request.url, request.method, request).then(function (payload) {

            if (typeof request.formatResponse === 'function') {
                return request.formatResponse(payload);
            }
            else {
                return payload;
            }
        });
    },

    handleResponse: function (status, headers, payload, requestData) {

        if (payload.error) {
            payload = {errors: [payload.error]};
        }
        else {
            delete payload.error;
        }

        return this._super(status, headers, payload, requestData);
    },

    isSuccess: function (status, headers, payload) {

        var isSuccess = this._super(...arguments) && (status === 204 || (payload && !payload.error && !payload.errors));

        return isSuccess;
    },

    ajaxOptions: function (url, method, options) {

        if (options && options.customRequest) {

            var hash = options || {};

            hash.url = url;
            hash.method = method;
            hash.context = this;

            var headers = this.get('headers') || {};
            headers = Ember.copy(headers, true);
            hash.headers = Object.assign(headers, hash.headers);

            return hash;
        }
        else {
            return this._super(url, method, options);
        }

        return hash;
    }
});
