import Ember from 'ember';

export default Ember.Helper.extend({

    _arrayObserver: Ember.observer('_array.[]', function () {

        this.recompute();
    }),

    compute: function ([item, array], hash) {

        if (typeof array === 'string') {
            array = array.split(',');
        }

        this.set('_array', array);

        if (array && array.indexOf) {
            return array.indexOf(item) !== -1;
        }
        else {
            return false;
        }
    }
});
