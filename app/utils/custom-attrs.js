import Ember from 'ember';

function hasValue (record, key) {
    return key in record._attributes ||
        key in record._inFlightAttributes ||
        key in record._data;
}

function getValue (record, key) {
    if (key in record._attributes) {
        return record._attributes[key];
    }
    else if (key in record._inFlightAttributes) {
        return record._inFlightAttributes[key];
    }
    else {
        return record._data[key];
    }
}

function getDefaultValue (record, options, key) {

    if (typeof options.defaultValue === 'function') {
        return options.defaultValue.apply(null, arguments);
    }
    else {

        var defaultValue = options.defaultValue;

        if (typeof defaultValue === 'object' && defaultValue !== null) {
            console.error('Non primitive defaultValues are deprecated because they are shared between all instances. If you would like to use a complex object as a default value please provide a function that returns the complex object.');
        }

        return defaultValue;
    }
}

function readOnly (type, options) {

    if (typeof type === 'object') {
        options = type;
        type = undefined;
    }
    else {
        options = options || {};
    }

    var meta = {
        type: type,
        isAttribute: true,
        options: options
    };

    return Ember.computed(function (key) {
        var internalModel = this._internalModel;

        if (hasValue(internalModel, key)) {
            return getValue(internalModel, key);
        }
        else {
            return getDefaultValue(this, options, key);
        }
    }).meta(meta).readOnly();

}

export default {
    readOnly: readOnly
};
