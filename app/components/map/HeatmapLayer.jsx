// ...existing code...
export default class HeatmapLayer {
  constructor(map) {
    this.map = map;
    this.sourceId = 'greentrace-heatmap-source';
    this.layerId = 'greentrace-heatmap-layer';
  }

  addLayer() {
    if (!this.map || !this.map.style) {
      console.warn('HeatmapLayer: map 未就绪，跳过 addLayer');
      return;
    }

    try {
      // 如果已经存在则跳过
      if (this.map.getLayer(this.layerId)) return;

      // 使用一个空的 geojson source（你可以替换为真实数据）
      if (!this.map.getSource(this.sourceId)) {
        this.map.addSource(this.sourceId, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: []
          }
        });
      }

      this.map.addLayer({
        id: this.layerId,
        type: 'heatmap',
        source: this.sourceId,
        paint: {
          // 简单的热力样式，按需要调整
          'heatmap-weight': ['interpolate', ['linear'], ['get', 'intensity'], 0, 0, 5, 1],
          'heatmap-intensity': 1,
          'heatmap-radius': 20,
          'heatmap-opacity': 0.8
        }
      });
    } catch (err) {
      console.warn('HeatmapLayer 添加失败：', err);
    }
  }

  // 可选：更新数据
  setData(geojson) {
    try {
      const src = this.map.getSource(this.sourceId);
      if (src && geojson) {
        src.setData(geojson);
      }
    } catch (err) {
      console.warn('HeatmapLayer setData 失败：', err);
    }
  }

  // 可选：移除图层与源
  remove() {
    try {
      if (this.map.getLayer(this.layerId)) {
        this.map.removeLayer(this.layerId);
      }
      if (this.map.getSource(this.sourceId)) {
        this.map.removeSource(this.sourceId);
      }
    } catch (err) {
      console.warn('HeatmapLayer remove 失败：', err);
    }
  }
}
// ...existing code...