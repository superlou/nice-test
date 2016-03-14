import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  infoText: DS.attr(),
  fields: DS.hasMany('field')
});
