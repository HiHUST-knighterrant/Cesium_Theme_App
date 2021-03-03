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
    121.825, 24.520,
    121.880, 24.560
  ),
});


Cesium.GeoJsonDataSource.load('../layers/geojson/Dongao.geojson')
  .then(
    function (dataSource) {
      viewer.dataSources.add(dataSource);

      let pt = new Cesium.PointGraphics({
        pixelSize: 5,
        color: Cesium.Color.RED,
        outlineColor: Cesium.Color.RED,
        outlineWidth: 1
      });
      
      var entities = dataSource.entities.values;
      entities.forEach(entity => {
        entity.billboard = undefined;
        entity.point = pt;
      });

    })
  .otherwise(function (error) {
    console.log(error);
  });