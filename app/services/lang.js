import Ember from 'ember';
import LANG from '../languages';

export default Ember.Service.extend({

    lang: 'cn',
    packs: LANG,

    translate: function (key, lang) {

        lang = lang || this.get('lang');

        var pack = this.get('packs.' + lang);

        return pack && pack[key];
    }
});
