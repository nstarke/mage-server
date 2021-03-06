var mongoose = require('mongoose')
  , path = require('path')
  , url = require('url');

// Creates a new Mongoose Schema object
var Schema = mongoose.Schema;

var IconSchema = new Schema({
  eventId: { type: Number, required: true },
  type: { type: String, required: false },
  variant: { type: Object, required: false },
  relativePath: {type: String, required: true }
},{
  versionKey: false
});

// Creates the Model for the Layer Schema
var Icon = mongoose.model('Icon', IconSchema);
exports.Model = Icon;

exports.getAll = function(options, callback) {
  var conditions = {};
  if (options.eventId) conditions.eventId = options.eventId;

  Icon.find(conditions, function(err, icons) {
    callback(err, icons);
  });
}

exports.getIcon = function(options, callback) {
  var type = options.type;
  var variant = options.variant;

  var condition = {
    eventId: options.eventId,
    type: {"$in": [type, null]},
  };

  if (isNaN(variant)) {
    condition.variant = {"$in": [variant, null]};
  } else {
    condition["$or"] = [{variant: {"$lte": variant}}, {variant: null}];
  }

  Icon.findOne(condition, {}, {sort: {type: -1, variant: -1}}, function (err, icon) {
    callback(err, icon);
  });
}

exports.create = function(icon, callback) {
  var conditions = {
    eventId: icon.eventId,
    type: icon.type,
    variant: icon.variant
  };
  Icon.findOneAndUpdate(conditions, icon, {upsert: true, new: false}, function(err, oldIcon) {
    callback(err, oldIcon);
  });
}

exports.remove = function(options, callback) {
  var condition = {
    eventId: options.eventId
  };

  if (options.type) condition.type = options.type;
  if (options.variant) condition.variant = options.variant;

  Icon.remove(condition, function(err) {
    callback(err);
  });
}
