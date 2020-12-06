
document.getElementById('zoomIn').onclick = function () {
  let cameraPos = viewer.camera.position;
  let ellipsoid = viewer.scene.globe.ellipsoid;
  let cartographic = ellipsoid.cartesianToCartographic(cameraPos);
  let height = cartographic.height;
  viewer.camera.zoomIn(height / 3);
};

document.getElementById('zoomOut').onclick = function () {
  let cameraPos = viewer.camera.position;
  let ellipsoid = viewer.scene.globe.ellipsoid;
  let cartographic = ellipsoid.cartesianToCartographic(cameraPos);
  let height = cartographic.height;
  viewer.camera.zoomOut(height * 1.2);
};

var wms_layer;
document.getElementById('addWms').onclick = function () {
  if (wms_layer != undefined) return;
  wms_url = "http://127.0.0.1:8080/geoserver/my_app/wms";
  wms_layer = add_wms(viewer, wms_url, "my_app:poi");
};

document.getElementById('removeWms').onclick = function () {
  if (wms_layer == undefined) return;
  viewer.imageryLayers.remove(wms_layer, false);
  wms_layer = undefined;
};

var tool = new MeasureTools(viewer);
document.getElementById('measurePolyLine').onclick = function () {
  tool.measurePolyLine();
};

document.getElementById('measurePolygon').onclick = function () {
  tool.measurePolygon();
};

document.getElementById('measureHeight').onclick = function () {
  tool.measureHeight();
};

document.getElementById('clearMeasurement').onclick = function () {
  tool.destroy();
};


