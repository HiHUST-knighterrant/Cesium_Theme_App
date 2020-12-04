var viewer = new Cesium.Viewer('cesiumContainer', {
  imageryProvider: new Cesium.TileMapServiceImageryProvider({
    url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
  }),
  // baseLayerPicker: false,
  // geocoder: false
});

viewer.camera.setView({
  destination: Cesium.Rectangle.fromDegrees(
    121.0, 23.5,
    122.3, 24.2
  ),
});      
