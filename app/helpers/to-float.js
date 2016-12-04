import Ember from 'ember';

/**
 * 浮点型控制 Handlerbar helper
 * @param  {[type]} input      输入
 * @param  {[type]} def        默认值
 * @param  {[type]}
 * @return {Float}            输出
 */
export default Ember.Helper.helper(function ([input, def], hash) {
    var output = parseFloat(input);

    if (def === undefined) {
        def = 0;
    }

    return isNaN(output) ? def : output;
});
