import Ember from 'ember';

/**
 * 字符串控制 Handlerbar helper
 * @param  {[type]} input      输入
 * @param  {[type]} def        默认值
 * @param  {[type]}
 * @return {String}            输出
 */
export default Ember.Helper.helper(function ([input, def], hash) {
    if (def === undefined) {
        def = '';
    }

    var str = (!input && input !== 0) ? def : input;

    if (Number(hash.maxLength)) {

        var len = parseInt(hash.maxLength);

        if (len > 0) {
            str = str.substr(0, len);
        }
        else {
            str = str.substr(len);
        }
    }

    return str;
});
