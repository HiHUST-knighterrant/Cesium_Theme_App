var viewer = new Cesium.Viewer('cesiumContainer', {
  imageryProvider: new Cesium.TileMapServiceImageryProvider({
      url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
  }),
  baseLayerPicker: false,
  geocoder: false
});

wms_url = "http://127.0.0.1:8080/geoserver/my_app/wms";
add_wms(viewer, wms_url, "my_app:base_img");
add_wms(viewer, wms_url, "my_app:poi");

viewer.camera.setView({
  destination: Cesium.Rectangle.fromDegrees(
      120, 22,
      122, 26
  ),
});