export function render(container) {
  

  let bgNotifyEnabled = localStorage.getItem('friday_bg_notify') === 'true';
  let currentRingtone = localStorage.getItem('friday_ringtone_name') || '默认铃声';
  
  let backupRemindEnabled = localStorage.getItem('friday_backup_remind') === 'true';
  let backupRemindInterval = localStorage.getItem('friday_backup_remind_interval') || '3';
  
  let autoCloudBackupEnabled = localStorage.getItem('friday_auto_cloud_backup') === 'true';
  let autoCloudBackupInterval = localStorage.getItem('friday_auto_cloud_interval') || '1';

  renderMainSettings();

  function showInAppNotification(title, body) {
    const oldBanner = document.getElementById('friday_inapp_banner');
    if (oldBanner) oldBanner.remove();

    const banner = document.createElement('div');
    banner.id = 'friday_inapp_banner';
    banner.style.cssText = `
      position: fixed;
      top: -100px;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 32px);
      max-width: 400px;
      background: var(--header-bg);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 12px 16px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      z-index: 999999;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: top 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;

    banner.innerHTML = `
      <div style="width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, #0a84ff, #5e5ce6); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; box-shadow: 0 2px 8px var(--input-bg);">
        🔔
      </div>
      <div style="flex: 1; overflow: hidden;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 14px; font-weight: 600; color: var(--text-color);">${title}</span>
          <span style="font-size: 11px; color: var(--text-tertiary);">现在</span>
        </div>
        <div style="font-size: 13px; color: var(--text-color); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${body}</div>
      </div>
    `;

    document.body.appendChild(banner);

    if ('vibrate' in navigator) {
      try { navigator.vibrate([100, 50, 100]); } catch(e) {}
    }

    setTimeout(() => { banner.style.top = '16px'; }, 10);
    setTimeout(() => {
      banner.style.top = '-100px';
      setTimeout(() => banner.remove(), 400);
    }, 4000);
  }

  function renderMainSettings() {
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 16px; padding-bottom: 30px; transform: scale(1.05); transform-origin: top center; margin-top: -8px;">
        <div style="background: var(--card-bg); border-radius: 18px; border: 1px solid var(--card-border); overflow: hidden;">
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; border-bottom: 1px solid var(--divider); cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 32px; height: 32px; border-radius: 8px; background: #007aff; display: flex; align-items: center; justify-content: center; font-size: 18px;">⚙️</div>
              <span style="font-size: 16px; font-weight: 500;">通用设置</span>
            </div>
            <span style="color: var(--text-tertiary); font-size: 14px;">❯</span>
          </div>

          <div id="btnGoNotify" style="display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 32px; height: 32px; border-radius: 8px; background: #ff9500; display: flex; align-items: center; justify-content: center; font-size: 18px;">🔔</div>
              <span style="font-size: 16px; font-weight: 500;">通知与铃声</span>
            </div>
            <span style="color: var(--text-tertiary); font-size: 14px;">❯</span>
          </div>
        </div>

        <div style="background: var(--card-bg); border-radius: 18px; border: 1px solid var(--card-border); overflow: hidden;">
          <div id="btnGoBackup" style="display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 32px; height: 32px; border-radius: 8px; background: #34c759; display: flex; align-items: center; justify-content: center; font-size: 18px;">☁️</div>
              <span style="font-size: 16px; font-weight: 500;">数据备份与恢复</span>
            </div>
            <span style="color: var(--text-tertiary); font-size: 14px;">❯</span>
          </div>
        </div>

        <div style="background: var(--card-bg); border-radius: 18px; border: 1px solid var(--card-border); overflow: hidden;">
          <div id="btnAbout" style="display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 32px; height: 32px; border-radius: 8px; background: #8e8e93; display: flex; align-items: center; justify-content: center; font-size: 18px;">ℹ️</div>
              <span style="font-size: 16px; font-weight: 500;">关于 Friday</span>
            </div>
            <span id="aboutArrow" style="color: var(--text-tertiary); font-size: 14px; transition: transform 0.2s;">❯</span>
          </div>
          
          <div id="aboutPanel" style="display: none; padding: 16px; border-top: 1px solid var(--divider); background: var(--header-bg); text-align: center;">
            <div style="font-size: 20px; font-weight: 600; margin-bottom: 4px;">Friday</div>
            <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">版本：1.0 (PWA Ready)</div>
            <div style="font-size: 12px; color: #34c759; letter-spacing: 0.5px;">by 無法逃離這個雨天</div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btnGoNotify').onclick = renderNotifyPage;
    document.getElementById('btnGoBackup').onclick = renderBackupPage;

    const btnAbout = document.getElementById('btnAbout');
    const aboutPanel = document.getElementById('aboutPanel');
    const aboutArrow = document.getElementById('aboutArrow');
    let isAboutExpanded = false;

    btnAbout.onclick = function() {
      isAboutExpanded = !isAboutExpanded;
      if (isAboutExpanded) {
        aboutPanel.style.display = 'block';
        aboutArrow.style.transform = 'rotate(90deg)';
      } else {
        aboutPanel.style.display = 'none';
        aboutArrow.style.transform = 'rotate(0deg)';
      }
    };
  }

  function renderNotifyPage() {
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 16px; transform: scale(1.05); transform-origin: top center; margin-top: -8px;">
        <div id="btnBackMain1" style="display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 20px; color: #0a84ff; font-size: 14px; width: fit-content; cursor: pointer;">❮ 返回设置</div>

        <div style="font-size: 13px; color: var(--text-secondary); margin-left: 4px;">通知设置</div>
        <div style="background: var(--card-bg); border-radius: 18px; border: 1px solid var(--card-border); overflow: hidden; padding: 16px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <div>
              <div style="font-size: 16px; font-weight: 500;">开启应用通知</div>
              <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">接收应用内置顶部弹出消息提醒</div>
            </div>
            <div id="toggleBgNotify" style="width: 50px; height: 30px; background: ${bgNotifyEnabled ? '#34c759' : 'rgba(255,255,255,0.2)'}; border-radius: 15px; padding: 2px; cursor: pointer; transition: background 0.25s; position: relative;">
              <div id="toggleKnob" style="width: 26px; height: 26px; background: #fff; border-radius: 50%; position: absolute; top: 2px; left: ${bgNotifyEnabled ? '22px' : '2px'}; transition: left 0.25s; box-shadow: 0 2px 5px var(--input-bg);"></div>
            </div>
          </div>

          <div style="font-size: 11px; color: var(--text-tertiary); margin-bottom: 16px; margin-left: 2px;">无任何用处，纯娱乐</div>

          <button id="btnTestNotification" style="width: 100%; padding: 12px; background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 12px; color: var(--text-color); font-weight: 500; font-size: 14px; cursor: pointer;">测试通知弹出</button>
        </div>

        <div style="font-size: 13px; color: var(--text-secondary); margin-left: 4px; margin-top: 8px;">铃声素材</div>
        <div style="background: var(--card-bg); border-radius: 18px; border: 1px solid var(--card-border); padding: 16px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <div style="font-size: 15px; font-weight: 500;">当前铃声</div>
            <div id="ringtoneName" style="font-size: 13px; color: #34c759; max-width: 160px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${currentRingtone}</div>
          </div>
          
          <input type="file" id="ringtoneFileInput" accept="audio/*" style="display: none;" />
          <button id="btnSelectRingtone" style="width: 100%; padding: 12px; background: rgba(10, 132, 255, 0.2); border: 1px solid #0a84ff; border-radius: 12px; color: #0a84ff; font-weight: 600; font-size: 15px; cursor: pointer;">导入本地铃声音频</button>
        </div>
      </div>
    `;

    document.getElementById('btnBackMain1').onclick = renderMainSettings;

    const toggle = document.getElementById('toggleBgNotify');
    const knob = document.getElementById('toggleKnob');
    const btnTest = document.getElementById('btnTestNotification');

    toggle.onclick = function() {
      bgNotifyEnabled = !bgNotifyEnabled;
      localStorage.setItem('friday_bg_notify', bgNotifyEnabled);
      toggle.style.background = bgNotifyEnabled ? '#34c759' : 'rgba(255,255,255,0.2)';
      knob.style.left = bgNotifyEnabled ? '22px' : '2px';
    };

    btnTest.onclick = function() {
      if (!bgNotifyEnabled) {
        alert("⚠️ 请先开启应用通知");
        return;
      }
      showInAppNotification("Friday", "用于测试喵");
    };

    const btnSelect = document.getElementById('btnSelectRingtone');
    const fileInput = document.getElementById('ringtoneFileInput');
    const ringtoneName = document.getElementById('ringtoneName');

    btnSelect.onclick = function() { fileInput.click(); };
    fileInput.onchange = function(e) {
      const file = e.target.files[0];
      if (file) {
        currentRingtone = file.name;
        localStorage.setItem('friday_ringtone_name', currentRingtone);
        ringtoneName.innerText = currentRingtone;
      }
    };
  }

  function renderBackupPage() {
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 16px; transform: scale(1.05); transform-origin: top center; margin-top: -8px;">
        <div id="btnBackMain2" style="display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 20px; color: #0a84ff; font-size: 14px; width: fit-content; cursor: pointer;">❮ 返回设置</div>

        <div style="background: var(--card-bg); border-radius: 18px; border: 1px solid var(--card-border); overflow: hidden;">
          <div id="btnLocalBackup" style="display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; border-bottom: 1px solid var(--divider); cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 32px; height: 32px; border-radius: 8px; background: #007aff; display: flex; align-items: center; justify-content: center; font-size: 18px;">💾</div>
              <div>
                <div style="font-size: 16px; font-weight: 500;">本地备份</div>
                <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">导出 JSON / ZIP 或开启定时提醒</div>
              </div>
            </div>
            <span style="color: var(--text-tertiary); font-size: 14px;">❯</span>
          </div>

          <div id="btnCloudBackup" style="display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 32px; height: 32px; border-radius: 8px; background: #5856d6; display: flex; align-items: center; justify-content: center; font-size: 18px;">☁️</div>
              <div>
                <div style="font-size: 16px; font-weight: 500;">云端备份</div>
                <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">WebDAV 连通测试与自动备份</div>
              </div>
            </div>
            <span style="color: var(--text-tertiary); font-size: 14px;">❯</span>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btnBackMain2').onclick = renderMainSettings;
    document.getElementById('btnLocalBackup').onclick = renderLocalBackupOptions;
    document.getElementById('btnCloudBackup').onclick = renderCloudBackupPage;
  }

  function renderLocalBackupOptions() {
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 16px; transform: scale(1.05); transform-origin: top center; margin-top: -8px;">
        <div id="btnBackBackup" style="display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 20px; color: #0a84ff; font-size: 14px; width: fit-content; cursor: pointer;">❮ 返回备份</div>

        <div style="font-size: 13px; color: var(--text-secondary); margin-left: 4px;">手动导出</div>
        <div style="background: var(--card-bg); border-radius: 18px; border: 1px solid var(--card-border); overflow: hidden;">
          <div onclick="triggerFormatChoice('light')" style="display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; border-bottom: 1px solid var(--divider); cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 32px; height: 32px; border-radius: 8px; background: #ff9500; display: flex; align-items: center; justify-content: center; font-size: 18px;">⚡</div>
              <div>
                <div style="font-size: 16px; font-weight: 500;">轻量备份</div>
                <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">仅导出“关系网”与“书架”数据</div>
              </div>
            </div>
            <span style="color: var(--text-tertiary); font-size: 14px;">❯</span>
          </div>

          <div onclick="triggerFormatChoice('full')" style="display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 32px; height: 32px; border-radius: 8px; background: #34c759; display: flex; align-items: center; justify-content: center; font-size: 18px;">📦</div>
              <div>
                <div style="font-size: 16px; font-weight: 500;">全量备份</div>
                <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">导出网页全站所有数据</div>
              </div>
            </div>
            <span style="color: var(--text-tertiary); font-size: 14px;">❯</span>
          </div>
        </div>

        <div style="font-size: 13px; color: var(--text-secondary); margin-left: 4px; margin-top: 8px;">定时提醒策略</div>
        <div style="background: var(--card-bg); border-radius: 18px; border: 1px solid var(--card-border); padding: 16px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: ${backupRemindEnabled ? '16px' : '0'};">
            <div>
              <div style="font-size: 16px; font-weight: 500;">定时备份提醒</div>
              <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">结合应用通知，定期弹框提醒备份</div>
            </div>
            <div id="toggleBackupRemind" style="width: 50px; height: 30px; background: ${backupRemindEnabled ? '#34c759' : 'rgba(255,255,255,0.2)'}; border-radius: 15px; padding: 2px; cursor: pointer; transition: background 0.25s; position: relative;">
              <div id="knobBackupRemind" style="width: 26px; height: 26px; background: #fff; border-radius: 50%; position: absolute; top: 2px; left: ${backupRemindEnabled ? '22px' : '2px'}; transition: left 0.25s; box-shadow: 0 2px 5px var(--input-bg);"></div>
            </div>
          </div>

          <div id="panelBackupRemindInterval" style="display: ${backupRemindEnabled ? 'block' : 'none'}; border-top: 1px solid var(--divider); padding-top: 12px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 14px; color: rgba(255,255,255,0.8);">提醒间隔频率</span>
              <select id="selectRemindInterval" style="background: var(--input-bg); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; color: #34c759; padding: 6px 10px; font-size: 14px; outline: none;">
                <option value="1" ${backupRemindInterval === '1' ? 'selected' : ''}>每 1 天</option>
                <option value="3" ${backupRemindInterval === '3' ? 'selected' : ''}>每 3 天</option>
                <option value="7" ${backupRemindInterval === '7' ? 'selected' : ''}>每 7 天</option>
                <option value="30" ${backupRemindInterval === '30' ? 'selected' : ''}>每 30 天</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btnBackBackup').onclick = renderBackupPage;

    const toggle = document.getElementById('toggleBackupRemind');
    const knob = document.getElementById('knobBackupRemind');
    const panel = document.getElementById('panelBackupRemindInterval');
    const select = document.getElementById('selectRemindInterval');

    toggle.onclick = function() {
      backupRemindEnabled = !backupRemindEnabled;
      localStorage.setItem('friday_backup_remind', backupRemindEnabled);
      toggle.style.background = backupRemindEnabled ? '#34c759' : 'rgba(255,255,255,0.2)';
      knob.style.left = backupRemindEnabled ? '22px' : '2px';
      panel.style.display = backupRemindEnabled ? 'block' : 'none';
    };

    select.onchange = function() {
      backupRemindInterval = select.value;
      localStorage.setItem('friday_backup_remind_interval', backupRemindInterval);
    };
  }

  function renderCloudBackupPage() {
    const savedUrl = localStorage.getItem('friday_webdav_url') || 'https://webdav.aliyundrive.com';
    const savedUser = localStorage.getItem('friday_webdav_user') || '';
    const savedPass = localStorage.getItem('friday_webdav_pass') || '';

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 16px; transform: scale(1.05); transform-origin: top center; margin-top: -8px;">
        <div id="btnBackBackup3" style="display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 20px; color: #0a84ff; font-size: 14px; width: fit-content; cursor: pointer;">❮ 返回备份</div>

        <div style="font-size: 13px; color: var(--text-secondary); margin-left: 4px;">WEBDAV 配置</div>
        <div style="background: var(--card-bg); border-radius: 18px; border: 1px solid var(--card-border); padding: 16px;">
          <div style="font-size: 12px; color: var(--text-tertiary); margin-bottom: 4px;">服务器地址</div>
          <input id="webdavUrl" type="text" value="${savedUrl}" style="width: 100%; background: var(--input-bg); border: 1px solid var(--card-border); border-radius: 10px; padding: 10px; color: var(--text-color); font-size: 14px; margin-bottom: 12px; box-sizing: border-box;" />

          <div style="font-size: 12px; color: var(--text-tertiary); margin-bottom: 4px;">账号</div>
          <input id="webdavUser" type="text" value="${savedUser}" placeholder="请输入账号 / 手机号" style="width: 100%; background: var(--input-bg); border: 1px solid var(--card-border); border-radius: 10px; padding: 10px; color: var(--text-color); font-size: 14px; margin-bottom: 12px; box-sizing: border-box;" />

          <div style="font-size: 12px; color: var(--text-tertiary); margin-bottom: 4px;">应用授权密码</div>
          <input id="webdavPass" type="password" value="${savedPass}" placeholder="请输入生成的授权密码" style="width: 100%; background: var(--input-bg); border: 1px solid var(--card-border); border-radius: 10px; padding: 10px; color: var(--text-color); font-size: 14px; margin-bottom: 16px; box-sizing: border-box;" />

          <div style="display: flex; gap: 10px;">
            <button id="btnTestWebdav" style="flex: 1; padding: 12px; background: rgba(10, 132, 255, 0.2); border: 1px solid #0a84ff; border-radius: 12px; color: #0a84ff; font-weight: 600; font-size: 14px; cursor: pointer;">测试连接</button>
            <button id="btnSaveWebdav" style="flex: 1; padding: 12px; background: #007aff; border: none; border-radius: 12px; color: #fff; font-weight: 600; font-size: 14px; cursor: pointer;">保存设置</button>
          </div>
        </div>

        <div style="font-size: 13px; color: var(--text-secondary); margin-left: 4px; margin-top: 8px;">云端自动备份</div>
        <div style="background: var(--card-bg); border-radius: 18px; border: 1px solid var(--card-border); padding: 16px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: ${autoCloudBackupEnabled ? '16px' : '0'};">
            <div>
              <div style="font-size: 16px; font-weight: 500;">开启自动备份</div>
              <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">需完成 WebDAV 配置后生效</div>
            </div>
            <div id="toggleAutoCloud" style="width: 50px; height: 30px; background: ${autoCloudBackupEnabled ? '#34c759' : 'rgba(255,255,255,0.2)'}; border-radius: 15px; padding: 2px; cursor: pointer; transition: background 0.25s; position: relative;">
              <div id="knobAutoCloud" style="width: 26px; height: 26px; background: #fff; border-radius: 50%; position: absolute; top: 2px; left: ${autoCloudBackupEnabled ? '22px' : '2px'}; transition: left 0.25s; box-shadow: 0 2px 5px var(--input-bg);"></div>
            </div>
          </div>

          <div id="panelAutoCloudInterval" style="display: ${autoCloudBackupEnabled ? 'block' : 'none'}; border-top: 1px solid var(--divider); padding-top: 12px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 14px; color: rgba(255,255,255,0.8);">自动备份频率</span>
              <select id="selectAutoCloudInterval" style="background: var(--input-bg); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; color: #34c759; padding: 6px 10px; font-size: 14px; outline: none;">
                <option value="1" ${autoCloudBackupInterval === '1' ? 'selected' : ''}>每 1 天</option>
                <option value="3" ${autoCloudBackupInterval === '3' ? 'selected' : ''}>每 3 天</option>
                <option value="7" ${autoCloudBackupInterval === '7' ? 'selected' : ''}>每 7 天</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btnBackBackup3').onclick = renderBackupPage;

    async function testWebDAVConnection(url, user, pass) {
      try {
        const auth = 'Basic ' + btoa(user + ':' + pass);
        const res = await fetch(url, {
          method: 'PROPFIND',
          headers: {
            'Authorization': auth,
            'Depth': '0'
          }
        });

        if (res.status === 207 || res.status === 200) {
          return { success: true, msg: "✅ WebDAV 连接成功！节点可正常访问。" };
        } else if (res.status === 401) {
          return { success: false, msg: "❌ 认证失败！请检查账号与授权密码。" };
        } else {
          return { success: false, msg: `⚠️ 服务器返回响应码：${res.status}` };
        }
      } catch (err) {
        return { success: false, msg: "❌ 无法连接服务器！可能是跨域(CORS)限制或网络无法到达。" };
      }
    }

    document.getElementById('btnTestWebdav').onclick = async function() {
      const u = document.getElementById('webdavUrl').value.trim();
      const user = document.getElementById('webdavUser').value.trim();
      const pass = document.getElementById('webdavPass').value.trim();

      if (!u || !user || !pass) {
        alert("⚠️ 请先完整填写 WebDAV 配置后再测试！");
        return;
      }

      this.innerText = "正在连接...";
      this.disabled = true;

      const result = await testWebDAVConnection(u, user, pass);
      alert(result.msg);

      this.innerText = "测试连接";
      this.disabled = false;
    };

    document.getElementById('btnSaveWebdav').onclick = function() {
      const u = document.getElementById('webdavUrl').value.trim();
      const user = document.getElementById('webdavUser').value.trim();
      const pass = document.getElementById('webdavPass').value.trim();

      if (!u || !user || !pass) {
        alert("⚠️ 请完整填写 WebDAV 配置项！");
        return;
      }

      localStorage.setItem('friday_webdav_url', u);
      localStorage.setItem('friday_webdav_user', user);
      localStorage.setItem('friday_webdav_pass', pass);
      alert("✅ WebDAV 配置保存成功！");
    };

    const toggle = document.getElementById('toggleAutoCloud');
    const knob = document.getElementById('knobAutoCloud');
    const panel = document.getElementById('panelAutoCloudInterval');
    const select = document.getElementById('selectAutoCloudInterval');

    toggle.onclick = function() {
      const u = localStorage.getItem('friday_webdav_url');
      const user = localStorage.getItem('friday_webdav_user');
      const pass = localStorage.getItem('friday_webdav_pass');

      if (!autoCloudBackupEnabled && (!u || !user || !pass)) {
        alert("⚠️ 请先填写并保存 WebDAV 配置信息，才能启用自动云端备份！");
        return;
      }

      autoCloudBackupEnabled = !autoCloudBackupEnabled;
      localStorage.setItem('friday_auto_cloud_backup', autoCloudBackupEnabled);
      toggle.style.background = autoCloudBackupEnabled ? '#34c759' : 'rgba(255,255,255,0.2)';
      knob.style.left = autoCloudBackupEnabled ? '22px' : '2px';
      panel.style.display = autoCloudBackupEnabled ? 'block' : 'none';
    };

    select.onchange = function() {
      autoCloudBackupInterval = select.value;
      localStorage.setItem('friday_auto_cloud_interval', autoCloudBackupInterval);
    };
  }
}
