import Ember from 'ember';

export default Ember.Component.extend({

    tagName: 'select',
    layoutName: 'components/tags/select-tag',

    value: '',
    content: [],
    optionLabelPath: 'label',
    optionValuePath: 'value',
    yield: false,
    prompt: null,

    contentObserverKey: Ember.computed('optionValuePath', function () {

        return 'content.@each.' + this.get('optionValuePath');
    }),

    setupObservers: Ember.on('init', function () {

        var self = this,
            key = this.get('contentObserverKey');

        function method () {
            Ember.run.scheduleOnce('afterRender', self, function () {

                Ember.run.debounce(this, self.updateValue, 10);
            });
        }

        Ember.addObserver(this, key, this, method);
        this.on('willDestroyElement', function () {
            Ember.removeObserver(this, key, this, method);
        });
    }),

    initValue: Ember.on('init', function () {

        if (!this.get('notReady')) {
            this.one('didInsertElement', function () {
                if (!this.get('value')) {
                    Ember.run.scheduleOnce('afterRender', this, function () {
                        this.updateValue();
                    });
                }
            });
        }
    }),

    notReady: Ember.computed('content.isFulfilled', 'content.isLoaded', function () {

        return this.get('content.isFulfilled') === false || this.get('content.isLoaded') === false;
    }),

    readyObserver: Ember.observer('content.[]', function () {

        if (!this.get('notReady')) {

            if (!this.get('value')) {
                Ember.run.scheduleOnce('afterRender', this, function () {
                    this.updateValue();
                });
            }
        }
    }),

    updateValue: Ember.on('change', function () {

        Ember.run.scheduleOnce('afterRender', this, function () {

            if (this.get('_state') === 'inDOM' && !this.get('notReady')) {

                // 都是空值时不做任何操作
                if (Ember.isEmpty(this.get('value')) && Ember.isEmpty(this.$().val())) {
                    return;
                }

                if (this.get('value') !== this.$().val()) {
                    this.set('value', this.$().val());
                }
            }
        });
    })
});
