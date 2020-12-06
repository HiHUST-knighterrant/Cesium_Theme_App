function add_wms(viewer, url, layer) {
    return viewer.imageryLayers.addImageryProvider(
        new Cesium.WebMapServiceImageryProvider({
            url: url,
            layers: layer,
            parameters: {
                transparent: true,
                format: "image/png",
            },
        })
    );
}

function add_wms_get_features(viewer, url, layer, callback) {
    return viewer.imageryLayers.addImageryProvider(
        new Cesium.WebMapServiceImageryProvider({
            url: url,
            layers: layer,
            getFeatureInfoFormats: [
                new Cesium.GetFeatureInfoFormat('json', 'application/json', callback)],
            parameters: {
                transparent: true,
                format: "image/png",
            },
        })
    );
}