import Ember from 'ember';

export default Ember.Mixin.create({

    classNames: ['scrollbar-auto'],

    position: 0,
    positionObserver: Ember.observer('position', function () {

        if (this.get('setBySelf') || this.get('isAtBottom')) {

        }
        else {

            Ember.run.next(this, function () {
                var scroll = this.get('scroll');

                if (scroll.scrollTop !== this.get('position')) {
                    this.scrollTo(this.get('position'));
                }
            });
        }
    }),

    // 是否开启滚动事件监控
    autoScroll: Ember.computed('action', function () {
        return Boolean(this.get('action'));
    }),

    scroll: Ember.computed(function () {

        var $el = this.$();

        return {
            height: $el.height(),
            scrollHeight: $el.get(0).scrollHeight,
            scrollTop: $el.get(0).scrollTop
        };
    }).readOnly().volatile(),

    isAtTop: true,
    isAtBottom: false,
    updateState: function () {

        var scroll = this.get('scroll'),
            autoScroll = this.get('autoScroll');

        this.set('isAtBottom',
            (scroll.scrollTop !== 0 || this.get('autoScroll')) &&
            (scroll.scrollHeight === scroll.height + scroll.scrollTop)
        );

        this.set('isAtTop', scroll.scrollTop === 0);
    },

    sendScroll: function () {

        var scroll = this.get('scroll');

        this.sendAction('action', {
            scroll: this.get('scroll'),
            isAtTop: this.get('isAtTop'),
            isAtBottom: this.get('isAtBottom')
        });
    },

    updatePosition: function () {

        var scroll = this.get('scroll');

        this.set('setBySelf', true);
        this.set('position', scroll.scrollTop);
        this.set('setBySelf', false);
    },

    _eventInited: false,
    _bindEvents: function () {

        var self = this;

        if (this._eventInited || !this.get('autoScroll')) {
            return;
        }

        this.$().on('scroll', function (e) {

            Ember.run.debounce(self, self.updatePosition, 100);

            if (e.target._scrolling) {
                return;
            }

            // TODO：由于滚动内容重新渲染会被动触发一次 scrollTop === 0 的滚动事件
            // 导致流程错乱，此问题不解决，这里的功能都不能用
            self.updateState();
        });

        this.$().on('adjust-scroll', function (e) {

            Ember.run.debounce(self, self.adjustPosition, 10);
        });

        this._eventInited = true;
    },

    scrollTo: function (position, doScroll) {

        var el = this.get('element');

        if (el.scrollTop === Number(position)) {
            return;
        }

        if (!doScroll) {
            el._scrolling = true;
        }

        el.scrollTop = position;

        el.addEventListener('scroll', endScroll, true);

        function endScroll () {
            el._scrolling = false;
            el.removeEventListener('scroll', endScroll, true);
        }

        this.updateState();
    },

    autoScrollToBottom: function () {

        var el = this.get('element');

        this.scrollTo(el.scrollHeight);
    },

    /**
     * 切到新状态之后适应滚动条位置
     * @return {[type]} [description]
     */
    adjustPosition: function () {

        var scroll = this.get('scroll'),
            position = Number(this.get('position')) || 0;

        if (this.get('isAtBottom')) {
            this.autoScrollToBottom();
        }
        else if (scroll.scrollTop !== position) {
            this.scrollTo(position);
        }
        else {

        }
    },

    /**
     * 切换到新model的position之后重置状态
     * @return {[type]} [description]
     */
    resetState: function () {

        var scroll = this.get('scroll'),
            autoScroll = this.get('autoScroll'),
            position = this.get('position');

        this.set('isAtBottom',
            (position !== 0 || this.get('autoScroll')) &&
            (scroll.scrollHeight === scroll.height + position)
        );

        this.set('isAtTop', position === 0);

        return this;
    },

    _init: Ember.on('didInsertElement', function () {

        Ember.run.next(this, this._bindEvents);

        this.adjustPosition();
    })
});
