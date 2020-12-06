var viewer = new Cesium.Viewer('cesiumContainer', {
  imageryProvider: new Cesium.TileMapServiceImageryProvider({
    url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
  }),
  infoBox: false,
  selectionIndicator: false,
});


var tileset = add_3d_tileset(viewer, 'layers/3d_tileset/tileset.json', false);
viewer.zoomTo(tileset);