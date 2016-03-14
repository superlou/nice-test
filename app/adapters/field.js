import DS from 'ember-data';

export default DS.Adapter.extend({
  ajax: Ember.inject.service(),

  findRecord: function(store, type, id, snapshot) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      var url = `http://localhost:8080/fields?id=${id}`

      this.get('ajax').request(url).then((data) => {
        resolve(data);
      })
    });
  }
});
