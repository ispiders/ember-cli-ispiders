import Ember from "ember";

/**
 * switch tab Component
 */
var SwitchTabComponent = Ember.Component.extend({

    classNameBindings: ['activeClass'],

    tabName: null,
    activeTab: null,

    action: null,

    activeClass: Ember.computed('isActive', 'activeClassName', function () {
        var activeClassName = this.get('activeClassName') || 'active';
        var reverse = false;

        if (activeClassName[0] === ':') {
            activeClassName = activeClassName.slice(1);
            reverse = true;
        }

        if (this.get('isActive') ^ reverse) {
            return activeClassName;
        }
        else {
            return false;
        }
    }),

    /**
     * 当前是否为激活状态
     * @return {Boolean} [description]
     */
    isActive: Ember.computed('tabName', 'activeTab', function () {
        return this.get('tabName') == this.get('activeTab');
    }),

    /**
     * 被点击时的响应：发送action 或 改变activeTab
     * @return {[type]} [description]
     */
    click: function () {
        if (this.get('action')) {
            this.sendAction('action', this.get('tabName'));
        }
        else {
            this.set('activeTab', this.get('tabName'));
        }
    }
});

export default SwitchTabComponent;
