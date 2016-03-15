import Ember from 'ember';

export default Ember.Component.extend({
  order: Ember.computed('step.id', function() {
    return parseInt(this.get('step.id')) + 1;
  }),

  fields: Ember.computed('step.fields.@each.{name,fieldType,id}', function() {
    return this.get('step.fields').map(function(item) {
      return {
        order: parseInt(item.get('id')) + 1,
        model: item,
        component: `field-${item.get('fieldType')}`,
        name: item.get('name')
      }
    });
  }),

  actions: {
    next: function() {
      this.sendAction('next');
    }
  }
});
