import DS from 'ember-data';

export default DS.Transform.extend({

    deserialize: function (json) {

        if (json) {
            if (typeof json === 'object') {

                return JSON.stringify(json);
            }
            else {
                console.warn(json + ' is not a valid json object');

                return null;
            }
        }
        else {
            return null;
        }
    },

    serialize: function (string) {

        if (string) {
            return JSON.parse(string);
        }
        else {
            return null;
        }
    }
});
