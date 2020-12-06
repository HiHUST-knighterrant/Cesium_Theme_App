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
