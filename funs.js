function add_wms(viewer, url, layer) {
    viewer.imageryLayers.addImageryProvider(
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