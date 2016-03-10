import Ember from 'ember';
var remote = requireNode('remote');
var dialog = remote.dialog;
var electron = requireNode('electron');

const proceduresPath = `${__dirname}/procedures/`;

export default Ember.Route.extend({
  actions: {
    openTest: function() {
      var path = dialog.showOpenDialog({
        defaultPath: proceduresPath,
        properties: ['openDirectory']
      });

      path = path[0];
      path = path.replace(proceduresPath, '');

      if (!path.includes('/')) {
        this.transitionTo('procedure', path);
      }
    },

    loadServer: function() {
      var ipcRenderer = electron.ipcRenderer;
      var success = ipcRenderer.sendSync('startProcedureServer', 'example');
    }
  }
});
