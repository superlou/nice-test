// import ApplicationAdapter from './application';
import DS from 'ember-data';

export default DS.Adapter.extend({
  ajax: Ember.inject.service(),

  findRecord: function(store, type, id, snapshot) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.get('ajax').request('http://localhost:8080/').then((data) => {
        resolve(data);
      })
    });
  }
});
