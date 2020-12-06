function add_3d_tileset(viewer, url, fly_to) {
  var tilesets = new Cesium.Cesium3DTileset({
    // url: 'layers/3d_tileset/tileset.json',
    url: url,
    skipLevelOfDetail: true,
    maximumMemoryUsage: 1500,
    maximumScreenSpaceError: 16,
    // cullRequestsWhileMovingMultiplier: 100,
    dynamicScreenSpaceError: false,
    preferLeaves: true,
    debugShowContentBoundingVolume: false,
    debugShowViewerRequestVolume: false,
    debugShowBoundingVolume: false,
  });

  tilesets.readyPromise
    .then(function (tileset) {
      viewer.scene.primitives.add(tileset);
      if (fly_to) viewer.flyTo(tileset);
    })
    .otherwise(function (error) {
      console.log(error);
    });
  return tilesets;
}