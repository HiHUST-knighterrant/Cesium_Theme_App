function add_qtiles(viewer, url, img_type) {
  viewer.imageryLayers.addImageryProvider(
    new Cesium.UrlTemplateImageryProvider({
      url: url + '/{z}/{x}/{y}.' + img_type,
    })
  );
}