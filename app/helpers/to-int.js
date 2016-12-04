import Ember from 'ember';

/**
 * 整型控制 Handlerbar helper
 * @param  {[type]} input      输入
 * @param  {[type]} def        默认值
 * @param  {[type]}
 * @return {Integer}            输出
 */
export default Ember.Helper.helper(function ([input, def], hash) {
    var output = parseInt(input);

    if (def === undefined) {
        def = 0;
    }

    return isNaN(output) ? def : output;
});
