var mongoose = require('mongoose')
  , async = require('async')
  , moment = require('moment')
  , Layer = require('../models/layer');

var Schema = mongoose.Schema;

// Creates the Schema for the Attachments object
var FeatureSchema = new Schema({
  type: {type: String, required: true},
  geometry: Schema.Types.Mixed,
  properties: Schema.Types.Mixed
},{
  strict: false,
  versionKey: false
});

FeatureSchema.index({geometry: "2dsphere"});

var transform = function(feature, ret, options) {
  if ('function' != typeof feature.ownerDocument) {
    ret.id = ret._id;
    delete ret._id;
  }
}

FeatureSchema.set("toJSON", {
  transform: transform
});

var models = {};

var featureModel = function(layer) {
  var name = layer.collectionName;
  var model = models[name];
  if (!model) {
    // Creates the Model for the Features Schema
    var model = mongoose.model(name, FeatureSchema, name);
    models[name] = model;
  }

  return model;
}

exports.featureModel = featureModel;

exports.getFeatures = function(layer, callback) {
  featureModel(layer).find({}, function(err, features) {
    callback(err, features);
  });
}


exports.createFeatures = function(layer, features, callback) {
  features.forEach(function(feature) {
    feature.properties = feature.properties || {};
  });

  featureModel(layer).create(features, function(err) {
    callback(err, features);
  });
}
