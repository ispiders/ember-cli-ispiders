import Ember from "ember";
import CustomInput from './custom-input';

export default CustomInput.extend({

    type: 'number',

    defaultValue: '',

    min: -Infinity,
    max: Infinity,
    step: 1,

    formatValue: function () {

        var val = this.get('value'),
            min = typeof this.get('min') !== 'number' ? -Infinity : this.get('min'),
            max = typeof this.get('max') !== 'number' ? Infinity : this.get('max');

        if (!val) {
            return this.get('defaultValue');
        }

        try {
            val = parseFloat(val) || 0;
        }
        catch (e) {
            val = 0;
        }

        if (val < min) {
            val = min;
        }

        if (val > max) {
            val = max;
        }

        return val;
    }
});
