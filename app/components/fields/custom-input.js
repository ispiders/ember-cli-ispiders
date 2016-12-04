import Ember from "ember";

export default Ember.TextField.extend({

    tagName: 'input',
    type: 'text',

    value: Ember.computed.oneWay('output'),

    output: '',
    action: '',

    debounce: 500,

    insertNewline: function () {
        this.confirm();
    },

    valueObserver: function () {
        Ember.run.debounce(this, this.confirm, this.get('debounce') || 500);
    }.observes('value'),

    confirm: function () {

        var val = this.formatValue();

        if (val !== this.get('value')) {

            this.set('value', val);

            return;
        }

        if (this.get('action')) {
            this.sendAction('action', val);
        }
        else {
            this.set('output', val);
        }
    },

    formatValue: function () {
        return this.get('value');
    }
});
