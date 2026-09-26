import { render as renderSettings } from './apps/settings/index.js';
import { render as renderTheme } from './apps/theme/index.js';

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  // 全局框架布局
  appContainer.innerHTML = `
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: space-between; padding: 20px 16px 40px 16px; box-sizing: border-box; background: url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop') center/cover no-repeat;">
      
      <!-- 顶部放大下移时间小组件 -->
      <div style="text-align: center; margin-top: 28px; transform: scale(1.15); transform-origin: top center; color: #fff; text-shadow: 0 2px 10px rgba(0,0,0,0.5);">
        <div id="clockTime" style="font-size: 52px; font-weight: 200; letter-spacing: -1px; line-height: 1;">12:00</div>
        <div id="clockDate" style="font-size: 15px; font-weight: 500; opacity: 0.9; margin-top: 6px;">9月26日 星期六</div>
      </div>

      <!-- 网格 App 列表 (整体放大并上调) -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px 16px; width: 100%; max-width: 420px; margin: 0 auto; transform: scale(1.08) translateY(-12px); transform-origin: center center;">
        <div class="app-icon" data-app="settings" style="display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer;">
          <div style="width: 60px; height: 60px; border-radius: 14px; background: #2c2c2e; display: flex; align-items: center; justify-content: center; font-size: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">⚙️</div>
          <span style="font-size: 12px; color: #fff; font-weight: 500; text-shadow: 0 1px 3px rgba(0,0,0,0.8);">设置</span>
        </div>

        <div class="app-icon" data-app="theme" style="display: flex; flex-direction: column; gap: 6px; align-items: center; cursor: pointer;">
          <div style="width: 60px; height: 60px; border-radius: 14px; background: linear-gradient(135deg, #007aff, #5856d6); display: flex; align-items: center; justify-content: center; font-size: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">🎨</div>
          <span style="font-size: 12px; color: #fff; font-weight: 500; text-shadow: 0 1px 3px rgba(0,0,0,0.8);">美化</span>
        </div>
      </div>
    </div>

    <!-- 统一 App 弹窗 Modal -->
    <div id="appModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999; background: #000;">
      <div style="position: absolute; top: 12px; right: 16px; z-index: 10000; background: rgba(255,255,255,0.15); color: #fff; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 600; cursor: pointer;" id="closeModalBtn">✕</div>
      <div id="modalContent" style="width: 100%; height: 100%;"></div>
    </div>
  `;

  // 1. 实时时钟更新
  function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });
    const dateStr = now.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });
    const timeEl = document.getElementById('clockTime');
    const dateEl = document.getElementById('clockDate');
    if (timeEl) timeEl.innerText = timeStr;
    if (dateEl) dateEl.innerText = dateStr;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // 2. App 图标点击路由交互
  const modal = document.getElementById('appModal');
  const modalContent = document.getElementById('modalContent');
  const closeBtn = document.getElementById('closeModalBtn');

  document.querySelectorAll('.app-icon').forEach(icon => {
    icon.onclick = () => {
      const appName = icon.getAttribute('data-app');
      modalContent.innerHTML = '';
      if (appName === 'settings') {
        renderSettings(modalContent);
        modal.style.display = 'block';
      } else if (appName === 'theme') {
        renderTheme(modalContent);
        modal.style.display = 'block';
      }
    };
  });

  closeBtn.onclick = () => {
    modal.style.display = 'none';
  };
});
