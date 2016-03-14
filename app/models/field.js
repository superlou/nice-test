import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  fieldType: DS.attr(),
  step: DS.belongsTo('step')
});
