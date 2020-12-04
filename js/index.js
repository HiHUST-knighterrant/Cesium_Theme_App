var viewer = new Cesium.Viewer('cesiumContainer', {
  imageryProvider: new Cesium.TileMapServiceImageryProvider({
    url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
  }),
  // baseLayerPicker: false,
  // geocoder: false
});

// method 1
add_tms(viewer, 'layers/tms');

// method 2
// add_tms_url_template(viewer, 'layers/tms');

viewer.camera.setView({
  destination: Cesium.Rectangle.fromDegrees(
    121.810, 24.60,
    121.820, 24.61
  ),
});      