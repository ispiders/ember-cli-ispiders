import DS from 'ember-data';

export default DS.Transform.extend({

    deserialize: function (json) {

        if (json) {

            if (typeof json === 'string') {

                try {
                    json = JSON.parse(json);
                }
                catch (e) {
                    json = json.split(',');
                }

                return JSON.stringify(json.toArray());
            }
            else if (json.toArray) {

                return JSON.stringify(json.toArray());
            }
            else {
                console.warn(json, ' can not be convert to a valid Array');

                return '[]';
            }
        }
        else {
            return '[]';
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
