import Ember from "ember";

export default Ember.Component.extend({

    tagName: 'select',

    value: '',
    content: null,

    change: function () {
        this.send('changeValue');
    },

    contentObserver: function () {
        Ember.run.next(this, function () {
            this.send('changeValue');
        });
    }.observes('content.[]'),

    initValue: function () {

        if (!this.get('value')) {
            this.on('didInsertElement', function () {
                Ember.run.next(this, function () {
                    this.set('value', this.$el().val());
                });
            });
        }
    }.on('init'),

    actions: {

        changeValue: function () {
            this.set('value', this.$el().val());
        }
    }
});
