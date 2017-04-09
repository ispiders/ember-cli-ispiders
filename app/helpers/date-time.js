import Ember from 'ember';

var moment = window.moment;

moment.locale('zh-cn', {
    relativeTime : {
        future: '%s后',
        past:   '%s前',
        s:  '%d秒',
        m:  '1分钟',
        mm: '%d分钟',
        h:  '1个小时',
        hh: '%d个小时',
        d:  '1天',
        dd: '%d天',
        M:  '1个月',
        MM: '%d个月',
        y:  '1年',
        yy: '%d年'
    }
});

moment.locale('zh-cn');

export default Ember.Helper.helper(function ([format, timestamp], hash) {

    var date,
        retString = '';

    timestamp = parseInt(timestamp);
    timestamp = timestamp < 1e10 - 1 ? timestamp * 1000 : timestamp;

    date = new Date(timestamp || Date.now());

    if (hash.strictBeforeNow) {
        timestamp = timestamp > Date.now() ? Date.now() : timestamp;
    }
    else if (hash.strictFuture) {
        timestamp = timestamp < Date.now() ? Date.now() : timestamp;
    }

    if (format === 'since') {
        retString = moment(timestamp).fromNow();
    }
    else if (format === 'duration') {

        var duration = moment.duration(Math.abs(timestamp));
        var json = {
            hours: String(Math.floor(duration.asHours())),
            minutes: ('00' + duration.minutes()).slice(-2),
            seconds: ('00' + duration.seconds()).slice(-2)
        };

        json.hours = json.hours.length < 2 ? ('00' + json.hours).slice(-2) : json.hours;

        return json.hours + ':' + json.minutes + ':' + json.seconds;
    }
    else if (format === 'humanize-duration') {
        retString = moment.duration(timestamp).humanize();
    }
    else if (format === 'durationUntilNow') {
        retString = moment.duration(Date.now() - timestamp).humanize();
    }
    else {
        retString = moment(timestamp).format(format);
    }

    return retString;
});
