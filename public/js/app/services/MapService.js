'use strict';

angular.module('mage.mapService', ['mage.***REMOVED***s', 'mage.lib'])
  .factory('MapService', ['appConstants', 'mageLib',
    function (appConstants, mageLib) {
      var functions = {};
      var currentMapPanel = "layers"; // options are: layers, observation, export, or none

      functions.getCurrentMapPanel = function () {
        return currentMapPanel;
      };

      functions.setCurrentMapPanel = function (mapPanel) {
        currentMapPanel = mapPanel;
      };

      return functions;
    }]); // end of MapService

  /* Barela idea */
  /*
angular.module('mage.mapService', ['mage.***REMOVED***s', 'mage.lib'])
  .factory('MapService', ['appConstants', 'mageLib',
    function (appConstants, mageLib) {
      var ***REMOVED*** = {
        currentMapPanel: 'layers' // options are: layers, observation, export, or none
      };
      // now in your controller you can just access MapService.currentMapPanel.  The controller
      // will be able to watch that variable fine if you attach the ***REMOVED*** to a scope variable ie
      // $scope.mapService = MapService; (after injecting that of course)
      return ***REMOVED***;
    }]);
    */