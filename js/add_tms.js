function add_tms(viewer, url) {

  // Method 1
  viewer.imageryLayers.addImageryProvider(
    new Cesium.TileMapServiceImageryProvider({
      // url: 'layers/tms',
      url: url,
    })
  );

}

function add_tms_url_template(viewer, url) {

  // Method 2
  viewer.imageryLayers.addImageryProvider(
    new Cesium.UrlTemplateImageryProvider({
      // url: 'layers/tms/{z}/{x}/{reverseY}.png',
      url: url + '/{z}/{x}/{reverseY}.png',
    })
  );
}