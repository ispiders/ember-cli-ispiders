import Ember from 'ember';

export default {

    name: 'link-to-reopen',

    initialize: function () {

        Ember.LinkComponent.reopen({

            forceRefresh: '',

            _invoke: function (event) {

                var ret = this._super(event);

                if (this.get('forceRefresh') && typeof ret === 'undefined') {

                    if (this.get('active')) {
                        this.sendAction('forceRefresh', {
                            name: 'refresh',
                            targetRouteName: this.get('qualifiedRouteName')
                        });
                    }
                }

                return ret;
            },

            willRender: function () {

                this._super(...arguments);

                if (this.get('resetQP')) {

                    var values = this.get('queryParams.values');

                    if (values) {
                        Ember.set(values, '_resetQP', true);
                    }
                    else {
                        this.set('queryParams', {
                            values: {
                                '_resetQP': true
                            }
                        });
                    }

                    if (!this.get('current-when')) {
                        this.set('current-when', this.get('qualifiedRouteName'));
                    }
                }
            }
        });
    }
};
