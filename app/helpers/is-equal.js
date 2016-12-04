import Ember from "ember";

export default Ember.Helper.helper(function ([leftSide, rightSide], options) {

    if (options.type === 'string') {
        return String(leftSide) === String(rightSide);
    }

    return leftSide === rightSide;
});
