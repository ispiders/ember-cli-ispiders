import DS from 'ember-data';

var boundary = 10000000000;

export default DS.Transform.extend({

    deserialize: function (timestamp) {

        if (timestamp === null || typeof timestamp === 'undefined') {
            return timestamp;
        }

        var unixTimestap = Number(timestamp);

        if (isNaN(unixTimestap)) {
            unixTimestap = new Date(timestamp).getTime();

            if (isNaN(unixTimestap)) {
                unixTimestap = 0;
            }
        }
        else {
            unixTimestap = timestamp;
            if (unixTimestap < boundary) {
                unixTimestap *= 1000;
            }
        }

        return unixTimestap;
    },

    serialize: function (timestamp) {

        if (timestamp === null || typeof timestamp === 'undefined') {
            return timestamp;
        }

        return parseInt(timestamp / 1000);
    }
});
