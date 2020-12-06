var viewer = new Cesium.Viewer('cesiumContainer', {
  imageryProvider: new Cesium.TileMapServiceImageryProvider({
    url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
  }),
  shouldAnimate: true,
  timeline: false,
  animation: false,
  shadow: false,
  infoBox: false,
  selectionIndicator: false,
  geocoder: false,
  homeButton: false,
  baseLayerPicker: false,
  navigationHelpButton: false,
  sceneModePicker: false,
});
viewer._cesiumWidget._creditContainer.style.display = 'none';

viewer.camera.setView({
  destination: Cesium.Rectangle.fromDegrees(
      121.810, 24.60,
      121.820, 24.61
  ),
});