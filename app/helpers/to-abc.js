import Ember from "ember";

var ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default Ember.Helper.helper(function ([index], options) {

    return ABC[index] || String.fromCodePoint(index - 26 + 90);
});
