import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var dir = params.procedure_dir;

    // var steps = [
    //   {
    //     id: 0,
    //     order: 0,
    //     name: 'Welcome to the Example test procedure',
    //     text: 'This is some descriptive text.  Move to the next step when ready.',
    //     readyForNext: true,
    //     nextStep: 1,
    //     procedureId: 0
    //   },
    //   {
    //     id: 1,
    //     order: 1,
    //     name: 'Enter descriptive information',
    //     text: 'This information is used to track the EUT.',
    //     procedureId: 0
    //   }
    // ];
    //
    // return steps[params.step_id];

    return this.get('store').findRecord('step', params.step_id)
  },

  actions: {
    next: function(order) {
      var nextStep = this.currentModel.nextStep;
      if (nextStep) {
        this.transitionTo('procedure.step', this.currentModel.procedureId, nextStep);
      }
    }
  }
});
