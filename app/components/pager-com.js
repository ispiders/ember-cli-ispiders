import Ember from "ember";

export default Ember.Component.extend({

    isVisible: Ember.computed.bool('showPager'),

    pagination: null,

    /**
     * 判断是否需要显示分页信息（当只有一页时不显示）
     * @return {Boolean} [description]
     */
    showPager: Ember.computed('pagination.total', 'pagination.pageSize', function () {
        var total = Number(this.get('pagination.total')),
            size = Number(this.get('pagination.pageSize'));

        return total > size;
    }),

    /**
     * 前一页
     * @return {Integer} [description]
     */
    previousPage: Ember.computed('pagination.page', function () {
        var current = this.get('pagination.page');

        return (current - 1) > 0 ? (current - 1) : 1;
    }),

    /**
     * 最后一页
     * @return {Integer} [description]
     */
    lastPage: Ember.computed('pagination.pageSize', 'pagination.total', function () {
        return Math.ceil(this.get('pagination.total') / this.get('pagination.pageSize'));
    }),

    /**
     * 后一页
     * @return {Integer} [description]
     */
    nextPage: Ember.computed('lastPage', 'pagination.page', function () {
        var current = this.get('pagination.page'),
            last = this.get('lastPage');

        return (current + 1) <= last ? (current + 1) : last;
    }),

    /**
     * 分页详细数据
     * @return {Array} [description]
     */
    pages: Ember.computed('lastPage', 'pagination.page', function () {
        var last = this.get('lastPage'),
            current = this.get('pagination.page'),
            maxPageCount = 9,
            pagesArray = [];

        var start = 1,
            end = last,
            offset = parseInt((maxPageCount - 1) / 2);

        if (last > maxPageCount) {
            if (current <= offset) {
                start = 1;
                end = maxPageCount;
            }
            else
            if (current + offset > last) {
                start = last - maxPageCount + 1;
            }
                else {
                start = current - offset;
                end = current + offset;
            }
        }

        for (var i = start; i <= end; i++) {
            pagesArray.push({
                page: i,
                active: (current == i) ? 'active' : false
            });
        }

        return pagesArray;
    }),

    actions: {

        toPage: function (page) {
            this.sendAction('action', page);
        }
    }
});
