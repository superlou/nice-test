import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  infoText: DS.attr(),
  procedure: DS.belongsTo('procedure'),
  fields: DS.hasMany('field')
});
