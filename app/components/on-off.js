import Ember from 'ember';

export default Ember.Component.extend({

    on: false,
    // defaultOn: false,

    onlyClickSelf: false,

    attributeBindings: ['type', 'checked'],

    setupDefault: Ember.on('init', function () {
        var defaultOn = this.get('defaultOn');

        if (typeof defaultOn !== 'undefined') {
            this.set('on', defaultOn);
        }
    }),

    classNameBindings: ['statusClass'],

    statusClass: Ember.computed('on', 'onClass', 'offClass', function () {
        return this.get('on') ? this.get('onClass') : this.get('offClass');
    }),

    click: function (e) {
        var self = this;

        if (!this.get('onlyClickSelf') || e.target === this.$el().get(0)) {
            Ember.run(function () {
                self.toggleProperty('on');
            });
        }
    }
});
