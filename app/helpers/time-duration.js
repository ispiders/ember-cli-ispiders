import Ember from 'ember';

export default Ember.Helper.helper(function ([start, end], hash) {

    if (!hash.msec) {
        start = start > 1e10 - 1 ? parseInt(start / 1000) : start;
        end = end > 1e10 - 1 ? parseInt(end / 1000) : end;
    }
    else {
        start = start < 1e10 - 1 ? start * 1000 : start;
        end = end < 1e10 - 1 ? end * 1000 : end;
    }

    return start - end;
});
