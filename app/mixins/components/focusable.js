import Ember from 'ember';

export default Ember.Mixin.create({

    classNameBindings: ['focusedClassName', 'openedClassName', 'disabledClassName'],
    attributeBindings: ['tabindex', 'disabled'],
    tabindex: 0,

    elementsCanBeFocused: 'a[href]',
    focused: false,
    opened: false,
    disabled: false,

    focusedClass: '',
    openedClass: '',
    disabledClass: '',

    toggleButton: '',
    toggleExceptions: '',

    focusedClassName: Ember.computed('focused', 'focusedClass', function () {
        return this.get('focused') ? (this.get('focusedClass') || 'focused') : '';
    }),

    openedClassName: Ember.computed('opened', 'openedClass', function () {
        return this.get('opened') ? (this.get('openedClass') || 'opened') : '';
    }),

    disabledClassName: Ember.computed('disabled', 'disabledClass', function () {
        return this.get('disabled') ? (this.get('disabledClass') || 'disabled') : '';
    }),

    focus: function () {
        var self = this;

        Ember.run(function () {
            self.set('focused', true);
        });
    },

    blur: function () {
        if (!this.get('isDestroyed')) {
            var self = this;

            Ember.run(function () {
                self.set('focused', false);
                self.set('opened', false);
            });
        }
    },

    _bindEvents: Ember.on('didInsertElement', function () {
        var self = this;

        if (this.get('disabled')) {
            this.set('tabindex', null);
        }

        this.$().on('keydown', function (e) {

            if (e.keyCode === 13) {
                self.set('opened', true);
            }
        });

        this.$()
            .on('focus', function (e) {
                self.focus(e);
            })
            .on('blur', function (e) {
                self.set('focused', false);
                setTimeout(function () {
                    // 判断此blur事件是否是由于focus内部元素
                    if (!self.get('focused')) {
                        self.blur(e);
                    }
                });
            });

        // 过滤指定元素内的点击事件，防止触发toggle
        if (this.get('toggleExceptions')) {
            var elements = this.$(this.get('toggleExceptions'));

            elements.each(function (index, el) {

                el.addEventListener('click', function (e) {
                    // 记录指定元素内的点击事件
                    e.toggleException = true;
                }, true);
            });
        }

        if (this.get('toggleButton')) {
            this.$()
                .on('click', this.get('toggleButton'), function (e) {
                    if (!e.originalEvent.toggleException) {
                        self.send('toggle');
                    }
                });
        }
        else {
            this.$()
                .on('click', function (e) {
                    if (!e.originalEvent.toggleException) {
                        self.send('toggle');
                    }
                });
        }

        // 如果component内部还有其他能产生focus的元素
        if (this.get('elementsCanBeFocused')) {
            this.$(this.get('elementsCanBeFocused'))
                .on('focus', function (e) {
                    self.focus(e);
                }).on('blur', function (e) {
                    // 由于元素被隐藏而导致的blur，不进行处理
                    if (!Ember.$(e.target).is(':visible')) {
                        return;
                    }

                    // 如果点击component以外的元素而导致blur
                    // focused将不会再被置为true
                    // 否则将会给component的focus事件置为true
                    self.set('focused', false);
                    setTimeout(function () {
                        // 判断此blur事件是否是由于focus内部元素
                        if (!self.get('focused')) {
                            self.blur(e);
                        }
                    });
                });
        }
    }),

    actions: {

        toggle: function () {
            if (this.get('disabled')) {
                return;
            }

            this.toggleProperty('opened');
        }
    }
});
