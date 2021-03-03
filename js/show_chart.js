var click_pos;

function show_chart(data) {
  try {
    if (data.features.length == 0) return;

    let chart = new CesiumPopup({}).setPosition(click_pos).addTo(viewer);

    let items = data.features[0].properties;
    chart.setTitle(`Feature ID: ${items.fid}`);
    chart.setHTML(`
        <div id="graphdiv"></div><br>
        Mean Velocity: ${items.vel}<br>
        `);

    let log_items = Object.entries(items).filter(i => !isNaN(Number(i[0])));

    g = new Dygraph(
      document.getElementById("graphdiv"),
      "Date,Displacement\n" + log_items.join('\n'),
      { width: 400, height: 200 }
    );

  } catch (error) {

  }
}


function show_chart_with_geojson(data) {
  try {
    if (data.properties.length == 0) return;

    let chart = new CesiumPopup({}).setPosition(click_pos).addTo(viewer);

    let items = data.properties;
    chart.setTitle(`Feature ID: ${items.ID}`);
    chart.setHTML(`
        <div id="graphdiv"></div><br>
        Mean Velocity: ${items.VEL}<br>
        `);

    let log_items_key = items.propertyNames.filter(
      name => !isNaN(Date.parse(name)));

    let log_items = [];
    log_items_key.forEach(
      key => log_items.push([key, items[key]._value])
    );

    g = new Dygraph(
      document.getElementById("graphdiv"),
      "Date,Displacement\n" + log_items.join('\n'),
      { width: 400, height: 200 }
    );

  } catch (error) {

  }
}


function pickEntity(viewer, windowPosition) {
  var picked = viewer.scene.pick(windowPosition);
  if (Cesium.defined(picked)) {
    var id = Cesium.defaultValue(picked.id, picked.primitive.id);
    if (id instanceof Cesium.Entity) {
      return id;
    }
  }
  return undefined;
};

var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function (event) {

  click_pos = viewer.camera.pickEllipsoid(
    event.position,
    viewer.scene.globe.ellipsoid
  );


  entity = pickEntity(viewer, event.position);
  if (Cesium.defined(entity)) {
    click_pos = entity.position._value;
    show_chart_with_geojson(entity);
  }

}, Cesium.ScreenSpaceEventType.LEFT_CLICK);


// wms_url = "http://127.0.0.1:8080/geoserver/my_app/wms";
// add_wms(viewer, wms_url, "my_app:base_img");
// add_wms_get_features(viewer, wms_url, "my_app:poi", show_chart);

// viewer.camera.setView({
//   destination: Cesium.Rectangle.fromDegrees(
//       121.810, 24.60,
//       121.820, 24.61
//   ),
// });
