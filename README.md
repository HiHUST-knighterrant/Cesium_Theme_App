# 使用CesiumJS及GeoServer建構三維主題地圖

## 架構

### 前端

* CesiumJS
    [函式庫](https://github.com/CesiumGS/cesium/releases/download/1.75/Cesium-1.75.zip)
    [官網](https://cesium.com/cesiumjs/)
    [教學](https://cesium.com/docs/)
    [測試](https://sandcastle.cesium.com/)
* Bootstrap

### 後端

* GeoServer 2.18
    [Zip](http://sourceforge.net/projects/geoserver/files/GeoServer/2.18.0/geoserver-2.18.0-bin.zip)
    [AdoptOpenJDK JRE 8](https://adoptopenjdk.net/releases.html?variant=openjdk8&jvmVariant=hotspot)
  * JRE安裝路徑： _C:\Program Files\AdoptOpenJDK\jre-8.0.275.1-hotspot\\_
  * 安裝JRE時，設定 _JAVA_HOME_ 環境變數
  * GeoServer安裝路徑： _C:\geoserver_
  * [開啟GeoServer CORS](https://docs.geoserver.org/stable/en/user/production/container.html#enable-cors)，提供跨網域存取
  * 執行 _geoserver/bin/startup.bat_ 啟動伺服器
* Flask

---


## 發布WMS服務

### 準備Shapefile

* 設定CRS
  * 統一採用 __WGS84 經緯度__ ，減少座標轉換錯誤
* 檢查FID( Feature ID)資料型態
  * 必須是 __整數__ 型態，不然GeoServer會看不到
* 將檔案放置於 _C:\geoserver\data_dir\data\my_app\\_

---
### 發布Shapefile

* 瀏覽器語言設為 __英語__，登入[管理網站](http:/127.0.0.1:8080/geoserver)
  * 帳號: _admin_
  * 密碼: _geoserver_

* 新增 Workspace ( 已經有了就不用重複新增 )
  * Data ➡️ 🖱️ __Workspaces__ ➡️ 🖱️ __Add new workspace__
  * Name: _my_app_ ➡️ 🖱️ __Save__
  
* 新增 Store
  * 假設檔名為 _poi.shp_
  * Data ➡️ 🖱️ __Stores__ ➡️ 🖱️ __Add new Store__
  * Vector Data Sources ➡️ 🖱️ __Shapefile__
  * Workspace: _my_app_  
Data Source Name: _poi_  
Shapefile location: ➡️ 🖱️ __Browse...__ ➡️ _file:data/my_app/poi.shp_ ➡️ 🖱️ __Save__

* 新增 Layer
  * Data ➡️ 🖱️ __Layers__ ➡️ 🖱️ __Add a new layer__
  * Add layer from: 🖱️ __my_app:poi__
  * New Layer ➡️ Layer name: _poi_ ➡️ Action: 🖱️ __Publish__  
  * Edit Layer ➡️ Bounding Boxes ➡️ 🖱️ __Compute from data__ ➡️ 🖱️ __Compute from native bounds__ ➡️ 🖱️ __Save__

* 預覽 Layer
  * Data ➡️ 🖱️ __Layer Preview__ ➡️ Name: _my_app:poi_ ➡️ Common Formats: 🖱️ __OpenLayers__

---
### 準備 GeoTIFF

* 設定CRS
  * __盡量__ 採用 __WGS84 經緯度__ ，減少座標轉換錯誤
* 將檔案放置於 _C:\geoserver\data_dir\data\my_app\\_

---
### 發布 GeoTIFF 影像
  
* 新增 Store
  * 假設檔名為 _base_image.tif_
  * Data ➡️ 🖱️ __Stores__ ➡️ 🖱️ __Add new Store__
  * Raster Data Sources ➡️ 🖱️ __GeoTIFF__
  * Workspace: _my_app_  
Data Source Name: _base_img_  
Connection Parameters ➡️ URL: ➡️ 🖱️ __Browse...__ ➡️ _file:data/my_app/base_image.tif_ ➡️ 🖱️ __Save__

* 新增 Layer
  * Data ➡️ 🖱️ __Layers__ ➡️ 🖱️ __Add a new layer__
  * Add layer from: 🖱️ __my_app:base_img__
  * New Layer ➡️ Layer name: _base_image_ ➡️ Action: 🖱️ __Publish__  
  * Edit Layer ➡️ 🖱️ __Save__

* 預覽 Layer
  * Data ➡️ 🖱️ __Layer Preview__ ➡️ Name: _my_app:base_img_ ➡️ Common Formats: 🖱️ __OpenLayers__

---
## 準備開發環境
### Git for Windows
* [安裝程式](https://github.com/git-for-windows/git/releases/download/v2.29.2.windows.2/Git-2.29.2.2-64-bit.exe)


### Visual Studio Code
* [安裝程式](https://code.visualstudio.com/download)
* Extensions
  * Live Server
  * GitLens

---
## 建立基本程式架構
1. 新增一個目錄，例如 _C:\projects\my_app_，並使用VSCode開啟
    ```
    C:\> mkdir projects\my_app
    C:\> cd projects\my_app
    C:\projects\my_app> code .
    ```

2. 下載[CesiumJS函式庫](https://github.com/CesiumGS/cesium/releases/download/1.75/Cesium-1.75.zip)

    解壓縮函式庫，將函式庫中 _Build_ 目錄下的 _Cesium_ 目錄複製到 _my_app_ 目錄下。

3. 建立主程式網頁 _my_app\index.html_
    ```html
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="utf-8">
      <script src="Cesium/Cesium.js"></script>
      <link href="Cesium/Widgets/widgets.css" rel="stylesheet">
      <style>
        html,
        body,
        #cesiumContainer {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
      </style>
    </head>

    <body>
      <div id="cesiumContainer"></div>
      <script>
        var viewer = new Cesium.Viewer('cesiumContainer', {
          imageryProvider: new Cesium.TileMapServiceImageryProvider({
            url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
          }),
          baseLayerPicker: false,
          geocoder: false
        });
      </script>
    </body>

    </html>
    ```

    基本框架  
    ```bash
    my_app
    ├─Cesium          ⬅️ CesiumJS函式庫
    │  ├─Assets
    │  ├─ThirdParty
    │  ├─Widgets
    │  ├─Workers
    │  └─Cesium.js
    └─index.html      ⬅️ 主程式網頁
    ```

4. 測試程式  
熱鍵 <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> 開啟 __Command Palette__，輸入 _Live Server: Open with Live Server_ 然後 <kbd>Enter</kbd>，將自動開啟網頁顯示目前成果。

---  


## 加入WMS

GeoServer預設是將WMS服務發布在URL: _http://<server_ip>:\<port> /geoserver/<workspace_name>/wms_ 下，Layer名稱為 _<workspace_name>:<layer_name>_  

下面程式展示了如何加入一個本機發布的WMS圖層( _"http://127.0.0.1:8080/geoserver/my_app/wms"_ )，圖曾為 _my_app:poi_ ，並且底色為透明( _transparent: true_ )。

```js
// Add a WMS imagery layer
var imageryLayers = viewer.imageryLayers;
imageryLayers.addImageryProvider(
  new Cesium.WebMapServiceImageryProvider({
    url: "http://127.0.0.1:8080/geoserver/my_app/wms",
    layers: "my_app:poi",
    parameters: {
      transparent: true,
      format: "image/png",
    },
  })
);
// Set the camera
viewer.camera.setView({
  destination: Cesium.Rectangle.fromDegrees(
    120, 22,
    122, 26
  ),
});
```
將上方程式碼加到 _index.html_ 中

```js
...    
  var viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider: new Cesium.TileMapServiceImageryProvider({
      url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
    }),
    baseLayerPicker: false,
    geocoder: false
  });

// 將程式碼加到這後面
// ...

...
```

[預覽一下](http://127.0.0.1:5500/index.html)

再加入一層採用 __GeoTIFF 格式__ 發布的WMS( _my_app:base_img_ )

```js
imageryLayers.addImageryProvider(
  new Cesium.WebMapServiceImageryProvider({
    url: "http://127.0.0.1:8080/geoserver/my_app/wms",
    layers: "my_app:base_img",
    parameters: {
      transparent: true,
      format: "image/png",
    },
  })
);
```
因為先加入的WMS會在底部，所以要加在前面的 _poi WMS_ 之前，才不會蓋住 _poi_。

```js
...    
  // Add a WMS imagery layer
  var imageryLayers = viewer.imageryLayers;
// 將程式碼加到這後面
// ...
// 這之前
  imageryLayers.addImageryProvider(
...
```
[預覽一下](http://127.0.0.1:5500/index.html)

完整的 _index.html_ 內容
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <script src="Cesium/Cesium.js"></script>
  <link href="Cesium/Widgets/widgets.css" rel="stylesheet">
  <style>
      html,
      body,
      #cesiumContainer {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
      }
  </style>
</head>

<body>
  <div id="cesiumContainer"></div>
  <script>
      var viewer = new Cesium.Viewer('cesiumContainer', {
        imageryProvider: new Cesium.TileMapServiceImageryProvider({
          url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
        }),
        baseLayerPicker: false,
        geocoder: false
      });

      // Add a WMS imagery layer
      var imageryLayers = viewer.imageryLayers;

      imageryLayers.addImageryProvider(
        new Cesium.WebMapServiceImageryProvider({
          url:"http://127.0.0.1:8080/geoserver/my_app/wms",
          layers: "my_app:base_img",
          parameters: {
            transparent: true,
            format: "image/png",
          },
        })
      );

      imageryLayers.addImageryProvider(
        new Cesium.WebMapServiceImageryProvider({
          url: "http://127.0.0.1:8080/geoserver/my_app/wms",
          layers: "my_app:poi",
          parameters: {
            transparent: true,
            format: "image/png",
          },
        })
      );

      viewer.camera.setView({
        destination: Cesium.Rectangle.fromDegrees(
          120, 22,
          122, 26
        ),
      });
  </script>
</body>

</html>
```
---
