export function render(container) {
  let currentTheme = localStorage.getItem('friday_theme') || 'dark';

  function applyThemeUI() {
    // 1. 设置系统级别的数据属性和缓存 (这会让 index.html 里靠 CSS 变量控制的部分自动变色)
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('friday_theme', currentTheme);
    const meta = document.getElementById('theme-color-meta');
    if (meta) meta.content = currentTheme === 'dark' ? '#000000' : '#f2f2f7';


    const isDark = currentTheme === 'dark';
    
    // 2. 更新 theme app 内部页面的独立样式 (为了跟随日夜间变化)
    

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 16px; transform: scale(1.02); transform-origin: top center;">
        <div style="font-size: 13px; color: var(--text-secondary); margin-left: 4px; transition: color 0.3s;">外观风格</div>

        <!-- 外观切换卡片 -->
        <div style="background: var(--card-bg); border-radius: 18px; border: 1px solid var(--card-border); padding: 16px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); transition: background 0.3s, border 0.3s, box-shadow 0.3s;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 36px; height: 36px; border-radius: 10px; background: var(--blue-accent); display: flex; align-items: center; justify-content: center; font-size: 20px; transition: background 0.3s;">
                ${isDark ? '🌙' : '☀️'}
              </div>
              <div>
                <div style="font-size: 16px; font-weight: 600;">深色外观</div>
                <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px; transition: color 0.3s;">
                  ${isDark ? '当前为夜间模式（黑/蓝）' : '当前为日间模式（白/蓝）'}
                </div>
              </div>
            </div>

            <!-- iOS Toggle 开关 -->
            <div id="toggleThemeBtn" style="width: 50px; height: 30px; background: ${isDark ? '#34c759' : 'rgba(120,120,128,0.32)'}; border-radius: 15px; padding: 2px; cursor: pointer; transition: background 0.25s; position: relative;">
              <div id="knobTheme" style="width: 26px; height: 26px; background: #fff; border-radius: 50%; position: absolute; top: 2px; left: ${isDark ? '22px' : '2px'}; transition: left 0.25s; box-shadow: 0 2px 5px rgba(0,0,0,0.2);"></div>
            </div>
          </div>
        </div>

        <!-- 预览与配色说明 -->
        <div style="font-size: 13px; color: var(--text-secondary); margin-left: 4px; margin-top: 8px; transition: color 0.3s;">预览与模式配色</div>
        <div style="background: var(--card-bg); border-radius: 18px; border: 1px solid var(--card-border); padding: 16px; font-size: 13px; line-height: 1.8; transition: background 0.3s, border 0.3s;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span style="background: #007aff; color: #fff; padding: 2px 8px; border-radius: 6px; font-size: 12px; font-weight: 600;">日间</span> 纯白底色 (#e2e8f0) + 苹果蓝色调 (#007aff)
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="background: #1c1c1e; color: #0a84ff; border: 1px solid #0a84ff; padding: 2px 8px; border-radius: 6px; font-size: 12px; font-weight: 600;">夜间</span> 深黑底色 (#000000) + 高亮蓝色调 (#0a84ff)
          </div>
        </div>
      </div>
    `;

    document.getElementById('toggleThemeBtn').onclick = function() {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyThemeUI();
    };
  }

  applyThemeUI();
}
