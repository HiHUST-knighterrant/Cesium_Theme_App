
var layer_poi, layer_base_img;

wms_url = "http://127.0.0.1:8080/geoserver/my_app/wms";
layer_base_img = add_wms(viewer, wms_url, "my_app:base_img");
layer_base_img.show = false;
layer_poi = add_wms_get_features(viewer, wms_url, "my_app:poi", show_chart);
layer_poi.show = false;

var viewModel = {
  layer_base_img_on: false, layer_base_img_alpha: 1.0,
  layer_poi_on: false, layer_poi_alpha: 1.0,
};

Cesium.knockout.track(viewModel);
var elem = document.getElementById('layers');
Cesium.knockout.applyBindings(viewModel, elem);

Cesium.knockout.getObservable(viewModel, 'layer_base_img_on').subscribe(
  function (newValue) {
    if (layer_base_img) layer_base_img.show = newValue;
  }
);
Cesium.knockout.getObservable(viewModel, 'layer_base_img_alpha').subscribe(
  function (newValue) {
    if (layer_base_img) layer_base_img.alpha = newValue;
  }
);
Cesium.knockout.getObservable(viewModel, 'layer_poi_on').subscribe(
  function (newValue) {
    if (layer_poi) layer_poi.show = newValue;
  }
);
Cesium.knockout.getObservable(viewModel, 'layer_poi_alpha').subscribe(
  function (newValue) {
    if (layer_poi) layer_poi.alpha = newValue;
  }
);
