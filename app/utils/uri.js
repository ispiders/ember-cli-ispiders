const Uri = function (uri) {

    uri = uri || '';

    if (typeof uri === 'string') {
        this.parse(uri);
    }
    else if (uri instanceof Uri) {
        this.parse(uri.toString());
    }
    else {
        throw new Error('Not a valid uri');
    }
};

Uri.Regexp = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*)(?::([^:@\/]*))?)?@)?(\[[0-9a-fA-F:.]+\]|[^:\/?#]*)(?::(\d+|(?=:)))?(:)?)((((?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

Uri.prototype = {

    parse: function (str) {

        var parserKeys = ['source', 'protocol', 'authority', 'userInfo',
            'user', 'password', 'host', 'port', 'isColonUri', 'relative',
            'path', 'directory', 'file', 'query', 'anchor'];
        var matches = Uri.Regexp.exec(str || '');
        var parts = this;

        parserKeys.forEach(function (key, i) {
            parts[key] = matches[i] || '';
        });

        return parts;
    },

    toString: function () {
        return (this.protocol ? this.protocol + ':' : '') + '//' +
                this.host + (this.port ? ':' + this.port : '');
    }
};

export default Uri;
