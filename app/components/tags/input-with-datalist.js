import Ember from 'ember';

export default Ember.TextField.extend({

    value: '',

    bindDatalist: Ember.on('didInsertElement', function () {

        Ember.run.next(this, function () {

            var datalist = this.$el().next('.datalist').get(0);

            if (datalist) {

                var component = datalist.emberComponent;

                component.set('targetObject', this);
                component.set('confirmed', 'confirmAndClear');

                this.set('datalistComponent', component);
                this.set('list', component.get('elementId'));
            }
        });
    }),

    unbindDatalist: Ember.on('willDestroyElement', function () {

        this.set('datalistComponent', null);
    }),

    datalistComponent: null,
    datalist: null,

    autofill: false,
    selectedIndex: -1,
    selectedItem: Ember.computed('datalist.[]', 'selectedIndex', function () {

        if (!this.get('datalist')) {
            return null;
        }

        return this.get('datalist').objectAt(this.get('selectedIndex'));
    }),

    selectedIndexChange: Ember.observer('selectedIndex', function () {

        if (this.get('datalistComponent')) {
            this.get('datalistComponent').set('selectedIndex', this.get('selectedIndex'));
        }
    }),

    datalistChange: Ember.observer('datalist.[]', function () {

        if (this.get('datalistComponent')) {

            this.get('datalistComponent').set('content', this.get('datalist'));

            if (Ember.isEmpty(this.get('datalist'))) {
                this.hideDatalist();
            }
            else {
                this.showDatalist();
            }
        }
    }),

    focused: false,

    _focusIn: Ember.on('focusIn', function () {

        this.set('focused', true);

        this.showDatalist();
    }),

    _focusOut: Ember.on('focusOut', function () {

        this.set('focused', false);

        Ember.run.later(this, function () {
            this.hideDatalist();
        }, 200);
    }),

    showDatalist: function () {

        if (this.get('focused') && !Ember.isEmpty(this.get('datalist')) && this.get('datalistComponent')) {
            this.get('datalistComponent').set('isVisible', true);
        }
    },

    hideDatalist: function () {

        if (this.get('datalistComponent')) {
            this.get('datalistComponent').set('isVisible', false);
        }
    },

    _bindEvents: Ember.on('didInsertElement', function () {

        var self = this;

        this.$el().on('keydown', function (e) {

            switch (e.keyCode) {
                // ↑
                case 38:
                    self.selectPrev();

                    return false;
                    // break;

                // ↓
                case 40:
                    self.selectNext();

                    return false;
                    // break;

                // enter
                case 13:

                    self.fill();
                    self.confirm();

                    break;

                default:
            }

            return true;
        });
    }),

    selectIndex: function (index) {

        this.set('selectedIndex', index);

        if (this.get('autofill')) {
            this.fill();
        }
    },

    selectPrev: function () {

        var index = this.get('selectedIndex') || 0,
            length = this.get('datalist.length');

        if (index === -1) {
            index = 0;
        }
        else {
            index = --index >= 0 ? index : index + length;
        }

        this.selectIndex(index);
    },

    selectNext: function () {

        var index = this.get('selectedIndex') || 0,
            length = this.get('datalist.length');

        if (this.get('selectedItem')) {

            if (index === -1) {
                index = 0;
            }
            else {
                index = ++index < length ? index : index - length;
            }

            this.selectIndex(index);
        }
        else {
            this.selectIndex(0);
        }
    },

    fill: function () {

        if (this.get('selectedItem')) {
            this.set('value', this.get('selectedItem'));
        }
    },

    confirm: function (value) {

        if (arguments.length) {
            this.sendAction('confirmed', value);
        }
        else {
            this.sendAction('confirmed', this.get('value'));
        }
    },

    actions: {

        confirmAndClear: function (index) {

            this.selectIndex(index);
            this.fill();
            this.confirm();
        }
    }
});
