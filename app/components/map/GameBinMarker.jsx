// ...existing code...
import mapboxgl from 'mapbox-gl';

/**
 * GameBinMarker
 * - 用法: const m = new GameBinMarker({ id, lat, lng, cleanliness }); m.addTo(map);
 * - 不使用 React hooks，适用于直接通过 new 调用的场景
 */
export default class GameBinMarker {
  constructor(bin = {}) {
    this.bin = bin;
    this.marker = null;
    this.el = this._createElement();
  }

  _createElement() {
    const el = document.createElement('div');
    el.className = 'game-bin-marker flex items-center justify-center rounded-full bg-blue-500 text-white';
    // 绑定 pulse 动画类（globals.css 已包含 .pulse）
    el.classList.add('pulse');

    // 简单样式（可通过 Tailwind 或 CSS 调整）
    el.style.width = '32px';
    el.style.height = '32px';
    el.style.boxSizing = 'border-box';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    el.style.cursor = 'pointer';

    // 显示简短信息，例如洁净度（cleanliness）
    const text = document.createElement('span');
    text.style.fontSize = '12px';
    text.style.fontWeight = '600';
    text.textContent = (this.bin.cleanliness !== undefined) ? String(this.bin.cleanliness) : '•';
    el.appendChild(text);

    // 点击事件示例（可以在 addTo 之后再绑定到 map）
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      // 可自定义：弹出 info 或触发全局事件
      console.log('GameBinMarker clicked:', this.bin);
    });

    return el;
  }

  addTo(map) {
    if (!map || !this.bin || this.bin.lat == null || this.bin.lng == null) {
      console.warn('GameBinMarker.addTo: 缺少 map 或 bin 坐标，跳过添加', this.bin);
      return;
    }

    try {
      // 如果已有 marker，先移除
      if (this.marker) {
        try { this.marker.remove(); } catch (e) { /* ignore */ }
      }

      this.marker = new mapboxgl.Marker(this.el)
        .setLngLat([this.bin.lng, this.bin.lat]);

      this.marker.addTo(map);
    } catch (err) {
      console.warn('GameBinMarker.addTo 失败：', err);
    }
  }

  remove() {
    try {
      if (this.marker) {
        this.marker.remove();
        this.marker = null;
      }
      // 从 DOM 移除元素（如果有必要）
      if (this.el && this.el.parentNode) {
        this.el.parentNode.removeChild(this.el);
      }
    } catch (err) {
      console.warn('GameBinMarker.remove 失败：', err);
    }
  }

  // 可选：更新位置与显示数据
  update(bin) {
    this.bin = { ...this.bin, ...bin };
    if (this.marker && this.bin.lat != null && this.bin.lng != null) {
      try {
        this.marker.setLngLat([this.bin.lng, this.bin.lat]);
      } catch (err) {
        console.warn('GameBinMarker.update setLngLat 失败：', err);
      }
    }
    // 更新显示文本
    if (this.el && this.el.firstChild) {
      this.el.firstChild.textContent = (this.bin.cleanliness !== undefined) ? String(this.bin.cleanliness) : '•';
    }
  }
}
// ...existing code...