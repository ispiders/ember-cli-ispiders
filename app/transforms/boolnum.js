import DS from 'ember-data';

export default DS.Transform.extend({

    deserialize: function (boolean) {

        return Boolean(boolean);
    },

    serialize: function (boolean) {

        return boolean ? 1 : 0;
    }
});
