import Ember from 'ember';

export default Ember.Component.extend({

    layoutName: 'components/pop-up',

    model: null,

    actions: {

        trigger: function (actionName) {
            this.sendAction(actionName);
        }
    }
});
