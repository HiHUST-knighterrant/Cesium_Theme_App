var viewer = new Cesium.Viewer('cesiumContainer', {
  imageryProvider: new Cesium.TileMapServiceImageryProvider({
    url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
  }),
});

viewer.camera.setView({
  destination: Cesium.Rectangle.fromDegrees(
      119, 21,
      123, 26
  ),
});  
