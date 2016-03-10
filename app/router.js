import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('procedure', {path: 'procedure/:procedure_id'}, function() {
    this.route('step', {path: 'step/:step_id'});
  });
});

export default Router;
