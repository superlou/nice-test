import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  stepsCount: DS.attr(),
  steps: DS.hasMany('step')
});
