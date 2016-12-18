import Ember from 'ember';

export default Ember.Helper.helper(function ([left, oparator, right]) {

  	switch (oparator) {
  		case '||':
  			return left || right;

  		case '&&':
  			return left && right;

        case '>':
            return left > right;

        case '<':
            return left < right;

  		default:
  			return right;
  	}
});
