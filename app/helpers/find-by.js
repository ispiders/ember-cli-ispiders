import Ember from 'ember';

export default Ember.Helper.extend({

    _arrayObserver: Ember.observer('_array.[]', function () {

        this.recompute();
    }),

    compute: function ([array, key, value], hash) {

        this.set('_array', array);

        if (array && array.findBy) {
            return array.findBy(key, value);
        }
        else {
            return null;
        }
    }
});
