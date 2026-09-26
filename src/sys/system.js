import { render as renderSettings } from '../apps/settings/index.js';
import { render as renderTheme } from '../apps/theme/index.js';
import { render as renderRelationship } from '../apps/relationship/index.js';
import { render as renderBookshelf } from '../apps/bookshelf/index.js';
import { render as renderMuyu } from '../apps/muyu/index.js';
import { render as renderTrash } from '../apps/trash/index.js';
import { render as renderDiary } from '../apps/diary/index.js';
import { render as renderNotes } from '../apps/notes/index.js';

// 应用注册表配置 (图标、高级渐变背景、独立渲染逻辑)
const apps = [
  { id: 'settings', name: '设置', icon: '⚙️', bg: 'linear-gradient(135deg, #8e8e93, #3a3a3c)', render: renderSettings },
  { id: 'theme', name: '美化', icon: '🎨', bg: 'linear-gradient(135deg, #ff2d55, #5856d6)', render: renderTheme },
  { id: 'relationship', name: '关系网', icon: '🌐', bg: 'linear-gradient(135deg, #007aff, #5ac8fa)', render: renderRelationship },
  { id: 'bookshelf', name: '书架', icon: '📚', bg: 'linear-gradient(135deg, #ac8e68, #5c4033)', render: renderBookshelf },
  { id: 'muyu', name: '木鱼', icon: '🪵', bg: 'linear-gradient(135deg, #ff9500, #ffcc00)', render: renderMuyu },
  { id: 'trash', name: '垃圾桶', icon: '🗑️', bg: 'linear-gradient(135deg, #ff3b30, #ff6b60)', render: renderTrash },
  { id: 'diary', name: '日记', icon: '📖', bg: 'linear-gradient(135deg, #34c759, #30d158)', render: renderDiary },
  { id: 'notes', name: '笔记', icon: '📝', bg: 'linear-gradient(135deg, #ffcc00, #ff9500)', render: renderNotes },
];

function createAppNode(app) {
  const item = document.createElement('div');
  item.className = 'app-item';
  item.innerHTML = `
    <div class="app-icon" style="background: ${app.bg}">${app.icon}</div>
    <div class="app-name">${app.name}</div>
  `;
  item.onclick = () => openApp(app);
  return item;
}

function openApp(app) {
  const win = document.getElementById('appWindow');
  document.getElementById('windowTitle').innerText = app.name;
  const body = document.getElementById('windowBody');
  body.innerHTML = '';
  if (app.render) app.render(body);
  win.classList.add('active');
}

document.getElementById('closeBtn').onclick = () => {
  document.getElementById('appWindow').classList.remove('active');
};

// 初始化桌面与 Dock
const grid = document.getElementById('appGrid');
const dock = document.getElementById('dockBar');

apps.slice(0, 8).forEach(app => grid.appendChild(createAppNode(app)));
// Dock栏放置前4个常用应用
apps.slice(0, 4).forEach(app => dock.appendChild(createAppNode(app)));
