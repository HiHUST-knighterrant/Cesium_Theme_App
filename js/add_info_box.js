
var viewModel = {
  x: 0,
  y: 0,
};

Cesium.knockout.track(viewModel);
var elem = document.getElementById('infobox');
Cesium.knockout.applyBindings(viewModel, elem);

Cesium.knockout.getObservable(viewModel, 'x').subscribe(
  function (newValue) {
    var cam_pos = viewer.camera.positionCartographic;
    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(newValue, Cesium.Math.toDegrees(cam_pos.latitude), cam_pos.height)
    });
  }
);

Cesium.knockout.getObservable(viewModel, 'y').subscribe(
  function (newValue) {
    var cam_pos = viewer.camera.positionCartographic;
    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(cam_pos.longitude), newValue, cam_pos.height)
    });
  }
);

var camera = viewer.camera;
removeEnd = camera.moveEnd.addEventListener(function () {
  var cam_pos = viewer.camera.positionCartographic;
  viewModel.x = Cesium.Math.toDegrees(cam_pos.longitude);
  viewModel.y = Cesium.Math.toDegrees(cam_pos.latitude);
});
