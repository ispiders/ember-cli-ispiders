import Ember from 'ember';

export default Ember.Component.extend({

    tagName: 'datalist',

    optionValuePath: 'value',
    optionLabelPath: 'label',

    content: Ember.computed.alias('targetObject.datalist'),
    selectedIndex: -1,

    test: Ember.observer('content.[]', function () {

        console.error(this.get('content'))
    }),

    bindComponent: Ember.on('didInsertElement', function () {

        this.get('element').emberComponent = this;
    }),

    unbindComponent: Ember.on('willDestroyElement', function () {

        this.get('element').emberComponent = null;
    }),

    actions: {

        confirm: function (index) {

            this.sendAction('confirmed', index);
        }
    }
});
