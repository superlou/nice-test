import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var dir = params.procedure_dir;

    return {
      id: 0,
      name: 'Example',
      steps: [0, 1]
    };
  }
});