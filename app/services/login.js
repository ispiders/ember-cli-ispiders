import Ember from 'ember';

export default Ember.Service.extend({

    user: null,

    id: Ember.computed.alias('user.id'),
    access: Ember.computed.alias('user.access')
});
