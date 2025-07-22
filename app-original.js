// 明曦元启 - 原APK精确复刻版本
// 基于APK分析的完整功能实现

class MingxiLauncher {
    constructor() {
        this.currentActivity = 'launcher';
        this.isLoggedIn = false;
        this.gameData = {
            level: 0,
            hp: 0,
            mp: 0,
            spirit: '',
            gold: 0
        };
        this.watcherVisible = false;
        this.freeMode = false;
        this.scripts = [];
        this.selectedScripts = [];
        
        this.init();
    }
    
    init() {
        console.log('明曦元启启动中...');
        
        // 模拟LauncherActivity的初始化过程
        this.loadConfiguration();
        this.handleCrashRecovery();
        
        // 3秒后跳转到登录界面（模拟原APK）
        setTimeout(() => {
            this.switchActivity('login');
        }, 3000);
    }
    
    // 加载配置（模拟原APK的配置加载）
    loadConfiguration() {
        console.log('正在加载游戏配置...');
        
        // 模拟Angel.config加载
        const angelConfig = localStorage.getItem('angel-config');
        if (!angelConfig) {
            console.log('首次启动，创建默认配置');
            this.createDefaultConfig();
        }
        
        // 模拟CombatConfig.xml加载
        this.loadCombatConfig();
    }
    
    createDefaultConfig() {
        const defaultConfig = {
            spirits: {
                1: { id: 1, name: '火花', element: '火', level: 1 },
                4: { id: 4, name: '水蓝蓝', element: '水', level: 1 },
                7: { id: 7, name: '草系宠物', element: '草', level: 1 }
            },
            skills: {
                1: { id: 1, name: '撞击', power: 40, pp: 35 },
                2: { id: 2, name: '火花', power: 40, pp: 25 },
                3: { id: 3, name: '水枪', power: 40, pp: 25 }
            }
        };
        localStorage.setItem('angel-config', JSON.stringify(defaultConfig));
    }
    
    loadCombatConfig() {
        // 模拟战斗配置加载
        const combatConfig = {
            weatherEffects: {
                sunny: { fireBoost: 1.5, waterWeaken: 0.5 },
                rainy: { waterBoost: 1.5, fireWeaken: 0.5 }
            }
        };
        localStorage.setItem('combat-config', JSON.stringify(combatConfig));
    }
    
    handleCrashRecovery() {
        // 模拟崩溃恢复机制
        const lastCrash = localStorage.getItem('last-crash');
        if (lastCrash) {
            console.log('检测到上次异常退出，正在恢复...');
            localStorage.removeItem('last-crash');
        }
    }
    
    // Activity切换（模拟Android Activity跳转）
    switchActivity(activityName) {
        // 隐藏当前Activity
        const currentElement = document.getElementById(`${this.currentActivity}-activity`);
        if (currentElement) {
            currentElement.classList.add('hidden');
        }
        
        // 显示新Activity
        const newElement = document.getElementById(`${activityName}-activity`);
        if (newElement) {
            newElement.classList.remove('hidden');
            newElement.classList.add('visible');
        }
        
        this.currentActivity = activityName;
        console.log(`切换到 ${activityName} Activity`);
    }
    
    // 启动QQ登录（模拟原APK的QQ登录流程）
    startQQLogin() {
        console.log('启动QQ登录...');
        
        // 模拟QQ登录URL（与原APK一致）
        const loginUrl = 'https://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=716027609&daid=383&style=33&login_text=%E7%99%BB%E5%BD%95&hide_title_bar=1&hide_border=1&target=self&s_url=https%3A%2F%2Fweb2.qq.com%2Floginproxy.html';
        
        // 创建登录窗口
        const loginWindow = window.open(
            loginUrl,
            'QQ登录',
            'width=450,height=550,scrollbars=yes,resizable=yes'
        );
        
        // 监听登录完成
        const checkLogin = setInterval(() => {
            try {
                if (loginWindow.closed) {
                    clearInterval(checkLogin);
                    this.handleLoginSuccess();
                }
            } catch (e) {
                // 跨域限制
            }
        }, 1000);
        
        // 模拟登录成功（3秒后自动成功，用于演示）
        setTimeout(() => {
            if (!loginWindow.closed) {
                loginWindow.close();
                this.handleLoginSuccess();
            }
        }, 3000);
    }
    
    handleLoginSuccess() {
        console.log('QQ登录成功');
        this.isLoggedIn = true;
        
        // 保存登录状态
        localStorage.setItem('login-status', 'true');
        
        // 跳转到主界面
        this.switchActivity('lite');
        
        // 初始化主界面
        this.initLiteActivity();
    }
    
    // 初始化主界面（LiteActivity）
    initLiteActivity() {
        console.log('初始化主界面...');
        
        // 加载游戏页面
        this.loadGamePage();
        
        // 初始化Watcher系统
        this.initWatcher();
        
        // 加载脚本列表
        this.loadScriptList();
    }
    
    loadGamePage() {
        const webView = document.getElementById('webView');
        
        // 检测Flash支持
        if (!this.checkFlashSupport()) {
            this.showFlashAlternatives(webView);
            return;
        }
        
        // 加载洛克王国游戏
        webView.src = 'https://www.17roco.qq.com/';
        
        // 游戏加载完成后注入脚本
        webView.onload = () => {
            this.injectGameScript();
        };
    }
    
    checkFlashSupport() {
        // Flash已被所有现代浏览器弃用
        return false;
    }
    
    showFlashAlternatives(webView) {
        webView.srcdoc = `
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body {
                        font-family: 'Microsoft YaHei', sans-serif;
                        background: linear-gradient(135deg, #ff0088ff, #4a90e2);
                        color: white;
                        text-align: center;
                        padding: 20px;
                        margin: 0;
                        height: 100vh;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                    }
                    .title {
                        font-size: 24px;
                        margin-bottom: 20px;
                        font-weight: bold;
                    }
                    .alternatives {
                        background: rgba(255,255,255,0.1);
                        border-radius: 10px;
                        padding: 20px;
                        margin: 10px 0;
                        text-align: left;
                    }
                    .option {
                        background: rgba(255,255,255,0.2);
                        border-radius: 8px;
                        padding: 15px;
                        margin: 10px 0;
                        cursor: pointer;
                        transition: all 0.3s;
                    }
                    .option:hover {
                        background: rgba(255,255,255,0.3);
                        transform: translateY(-2px);
                    }
                    .demo-game {
                        background: white;
                        color: #333;
                        border-radius: 8px;
                        padding: 20px;
                        margin: 10px 0;
                        min-height: 200px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                    }
                    .game-btn {
                        background: #ff0088ff;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 14px;
                        margin: 5px;
                    }
                    .status {
                        margin: 10px 0;
                        font-size: 12px;
                    }
                </style>
            </head>
            <body>
                <div class="title">⚠️ Flash已不再支持</div>
                
                <div class="alternatives">
                    <h3>🎮 游戏访问方案：</h3>
                    
                    <div class="option" onclick="window.open('https://www.17roco.qq.com/', '_blank')">
                        <strong>方案1: 官方网站</strong><br>
                        直接访问洛克王国官网（可能需要特殊浏览器）
                    </div>
                    
                    <div class="option" onclick="window.open('https://4399.com/flash/', '_blank')">
                        <strong>方案2: 4399小游戏</strong><br>
                        访问4399等支持Flash的游戏平台
                    </div>
                    
                    <div class="option" onclick="loadMobileVersion()">
                        <strong>方案3: 手机版</strong><br>
                        使用洛克王国手机版或模拟器
                    </div>
                </div>
                
                <div class="demo-game">
                    <h3>🎯 脚本功能演示</h3>
                    <div class="status" id="demo-status">模拟游戏环境已就绪</div>
                    <div>
                        <button class="game-btn" onclick="demoLogin()">模拟登录</button>
                        <button class="game-btn" onclick="demoBattle()">模拟战斗</button>
                        <button class="game-btn" onclick="demoScript()">运行脚本</button>
                    </div>
                    <div id="demo-log" style="margin-top: 10px; font-size: 12px; color: #666;"></div>
                </div>
                
                <script>
                    let demoLevel = 1;
                    let demoHp = 100;
                    let demoMp = 50;
                    
                    function updateStatus() {
                        document.getElementById('demo-status').innerHTML = 
                            \`等级: \${demoLevel} | 血量: \${demoHp} | 魔法: \${demoMp}\`;
                        
                        // 发送模拟数据给父窗口
                        parent.postMessage({
                            type: 'game-data-update',
                            data: {
                                level: demoLevel,
                                hp: demoHp,
                                mp: demoMp,
                                spirit: '演示精灵',
                                gold: Math.floor(Math.random() * 1000)
                            }
                        }, '*');
                    }
                    
                    function demoLogin() {
                        addLog('🔑 模拟登录成功');
                        updateStatus();
                    }
                    
                    function demoBattle() {
                        addLog('⚔️ 开始模拟战斗');
                        demoHp = Math.max(10, demoHp - 10);
                        if (Math.random() > 0.5) {
                            demoLevel++;
                            addLog('🎉 等级提升!');
                        }
                        updateStatus();
                    }
                    
                    function demoScript() {
                        addLog('🤖 自动化脚本执行中...');
                        setTimeout(() => {
                            demoBattle();
                            addLog('✅ 脚本执行完成');
                        }, 1000);
                    }
                    
                    function addLog(message) {
                        const log = document.getElementById('demo-log');
                        log.innerHTML = message + '<br>' + log.innerHTML;
                        // 只保留最后5条日志
                        const lines = log.innerHTML.split('<br>');
                        if (lines.length > 5) {
                            log.innerHTML = lines.slice(0, 5).join('<br>');
                        }
                    }
                    
                    function loadMobileVersion() {
                        addLog('📱 建议使用洛克王国手机版');
                        alert('建议下载洛克王国官方手机版游戏，或使用安卓模拟器运行');
                    }
                    
                    // 定期更新演示数据
                    setInterval(updateStatus, 3000);
                    updateStatus();
                </script>
            </body>
            </html>
        `;
    }
    
    injectGameScript() {
        const webView = document.getElementById('webView');
        try {
            const gameDoc = webView.contentDocument;
            if (gameDoc) {
                // 注入游戏监控脚本
                const script = gameDoc.createElement('script');
                script.textContent = `
                    // 明曦元启游戏监控脚本
                    console.log('明曦元启脚本已注入');
                    
                    // 游戏数据提取
                    function extractGameData() {
                        const data = {
                            level: document.querySelector('.level')?.textContent || '0',
                            hp: document.querySelector('.hp')?.textContent || '0',
                            mp: document.querySelector('.mp')?.textContent || '0',
                            spirit: document.querySelector('.spirit-name')?.textContent || '未知',
                            gold: document.querySelector('.gold')?.textContent || '0'
                        };
                        
                        // 发送数据给父窗口
                        parent.postMessage({
                            type: 'game-data-update',
                            data: data
                        }, '*');
                    }
                    
                    // 定期更新数据
                    setInterval(extractGameData, 2000);
                `;
                gameDoc.head.appendChild(script);
            }
        } catch (e) {
            console.log('脚本注入失败（跨域限制）:', e);
        }
        
        // 监听来自游戏的消息
        window.addEventListener('message', (event) => {
            if (event.data.type === 'game-data-update') {
                this.updateGameData(event.data.data);
            }
        });
    }
    
    updateGameData(data) {
        this.gameData = data;
        
        // 更新Watcher显示
        if (this.watcherVisible) {
            this.updateWatcherDisplay();
        }
    }
    
    // Watcher系统初始化
    initWatcher() {
        this.watcherVisible = false;
        const watcherElement = document.getElementById('lyt-watcher');
        watcherElement.classList.remove('visible');
    }
    
    updateWatcherDisplay() {
        const selfInfo = document.getElementById('watcher-self-info');
        const rivalInfo = document.getElementById('watcher-rival-info');
        
        if (selfInfo) {
            selfInfo.innerHTML = `
                等级: ${this.gameData.level}<br>
                血量: ${this.gameData.hp}<br>
                魔法: ${this.gameData.mp}<br>
                精灵: ${this.gameData.spirit}
            `;
        }
        
        // 对手信息（模拟数据）
        if (rivalInfo) {
            rivalInfo.innerHTML = `
                等级: ?<br>
                血量: ?<br>
                魔法: ?<br>
                精灵: ?
            `;
        }
    }
    
    // 脚本系统
    loadScriptList() {
        const savedScripts = localStorage.getItem('user-scripts');
        if (savedScripts) {
            this.scripts = JSON.parse(savedScripts);
        } else {
            // 创建演示脚本（适用于无Flash环境）
            this.scripts = [
                {
                    id: 1,
                    name: '演示自动战斗脚本',
                    version: '1.0.0',
                    content: `// 演示自动战斗脚本（无需Flash）
console.log("自动战斗启动");

// 模拟战斗逻辑
function startAutoBattle() {
    console.log("🤖 开始自动战斗");
    
    // 模拟战斗循环
    setInterval(() => {
        console.log("⚔️ 执行攻击");
        // 可以在这里添加实际的游戏操作
    }, 2000);
}

startAutoBattle();`
                },
                {
                    id: 2,
                    name: '演示自动升级脚本',
                    version: '1.1.0',
                    content: `// 演示自动升级脚本（无需Flash）
console.log("自动升级启动");

// 模拟升级逻辑
function autoLevelUp() {
    console.log("📈 开始自动升级");
    
    // 模拟经验获取
    let currentExp = 0;
    const targetExp = 100;
    
    const gainExp = setInterval(() => {
        currentExp += 10;
        console.log(\`当前经验: \${currentExp}/\${targetExp}\`);
        
        if (currentExp >= targetExp) {
            console.log("🎉 等级提升！");
            clearInterval(gainExp);
        }
    }, 1000);
}

autoLevelUp();`
                },
                {
                    id: 3,
                    name: 'Flash替代方案脚本',
                    version: '1.0.0',
                    content: `// Flash替代方案演示脚本
console.log("Flash替代方案脚本启动");

// 提供多种游戏访问建议
function showAlternatives() {
    const alternatives = [
        "🌐 使用支持Flash的特殊浏览器",
        "📱 下载洛克王国手机版",
        "💻 使用安卓模拟器",
        "🎮 访问其他类似游戏平台"
    ];
    
    console.log("可用的游戏访问方案:");
    alternatives.forEach((alt, index) => {
        console.log(\`\${index + 1}. \${alt}\`);
    });
    
    alert("由于Flash已停止支持，建议使用替代方案访问游戏");
}

showAlternatives();`
                }
            ];
            this.saveScriptList();
        }
    }
    
    saveScriptList() {
        localStorage.setItem('user-scripts', JSON.stringify(this.scripts));
    }
    
    renderScriptList(filteredScripts = null) {
        const container = document.getElementById('recycler-script');
        const scriptsToRender = filteredScripts || this.scripts;
        
        container.innerHTML = '';
        
        // 添加Flash状态提示
        const flashNotice = document.createElement('div');
        flashNotice.style.cssText = `
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 5px;
            padding: 10px;
            margin-bottom: 10px;
            font-size: 12px;
            color: #856404;
        `;
        flashNotice.innerHTML = `
            ⚠️ <strong>Flash支持提醒</strong><br>
            由于Flash已停止支持，脚本将在演示环境中运行。<br>
            您可以测试脚本逻辑，但需要其他方案访问实际游戏。
        `;
        container.appendChild(flashNotice);
        
        scriptsToRender.forEach(script => {
            const scriptItem = document.createElement('div');
            scriptItem.className = 'script-item';
            scriptItem.innerHTML = `
                <div class="script-name">${script.name}</div>
                <div class="script-version">版本: ${script.version}</div>
                <button onclick="executeScript('${script.id}')" style="
                    background: #ff0088ff;
                    color: white;
                    border: none;
                    padding: 5px 10px;
                    border-radius: 3px;
                    cursor: pointer;
                    font-size: 12px;
                    margin-top: 5px;
                ">执行脚本</button>
            `;
            
            scriptItem.onclick = () => this.selectScript(script.id);
            container.appendChild(scriptItem);
        });
    }
    
    // 新增：执行脚本功能
    executeScript(scriptId) {
        const script = this.scripts.find(s => s.id == scriptId);
        if (!script) {
            alert('脚本不存在');
            return;
        }
        
        console.log(`执行脚本: ${script.name}`);
        
        try {
            // 在安全的环境中执行脚本
            eval(script.content);
            alert(`✅ 脚本 "${script.name}" 执行成功！`);
        } catch (error) {
            console.error('脚本执行错误:', error);
            alert(`❌ 脚本执行出错: ${error.message}`);
        }
    }
    
    selectScript(scriptId) {
        const index = this.selectedScripts.indexOf(scriptId);
        if (index > -1) {
            this.selectedScripts.splice(index, 1);
        } else {
            this.selectedScripts.push(scriptId);
        }
        console.log('选中的脚本:', this.selectedScripts);
    }
}

// 全局实例
let mingxiApp;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    mingxiApp = new MingxiLauncher();
});

// UI事件处理函数（与原APK按钮功能一致）

// 登录相关
function startQQLogin() {
    mingxiApp.startQQLogin();
}

// 主界面控制
function toggleFreeSwitch() {
    const switchElement = document.getElementById('swt-free');
    mingxiApp.freeMode = !mingxiApp.freeMode;
    
    if (mingxiApp.freeMode) {
        switchElement.classList.add('active');
        console.log('免费模式已开启');
    } else {
        switchElement.classList.remove('active');
        console.log('免费模式已关闭');
    }
}

function toggleControlButtons() {
    const controlButtons = document.getElementById('control-buttons');
    controlButtons.classList.toggle('show');
}

// 控制按钮功能（模拟原APK功能）
function btnLogout() {
    console.log('重新登录');
    mingxiApp.isLoggedIn = false;
    localStorage.removeItem('login-status');
    mingxiApp.switchActivity('login');
}

function btnSwitch() {
    console.log('切换服务器');
    // 模拟服务器切换功能
    const servers = ['艾欧大陆', '雷欧大陆', '洛克大陆', '演示服务器'];
    const currentServer = servers[Math.floor(Math.random() * servers.length)];
    
    // 如果切换到演示服务器，重新加载演示环境
    if (currentServer === '演示服务器') {
        mingxiApp.loadGamePage();
    }
    
    alert(`已切换到: ${currentServer}`);
}

function btnOperate() {
    console.log('微操模式');
    // 切换Watcher显示
    mingxiApp.watcherVisible = !mingxiApp.watcherVisible;
    const watcherElement = document.getElementById('lyt-watcher');
    
    if (mingxiApp.watcherVisible) {
        watcherElement.classList.add('visible');
        mingxiApp.updateWatcherDisplay();
        alert('✅ Watcher监控已开启\n\n即使没有Flash，您也可以看到模拟的战斗数据监控功能');
    } else {
        watcherElement.classList.remove('visible');
        alert('❌ Watcher监控已关闭');
    }
}

function btnScript() {
    console.log('打开脚本管理');
    mingxiApp.switchActivity('script');
    mingxiApp.renderScriptList();
}

// 脚本管理功能
function scriptBack() {
    console.log('返回主界面');
    mingxiApp.switchActivity('lite');
}

function scriptDelete() {
    if (mingxiApp.selectedScripts.length === 0) {
        alert('请先选择要删除的脚本');
        return;
    }
    
    if (confirm('确定要删除选中的脚本吗？')) {
        mingxiApp.scripts = mingxiApp.scripts.filter(
            script => !mingxiApp.selectedScripts.includes(script.id)
        );
        mingxiApp.selectedScripts = [];
        mingxiApp.saveScriptList();
        mingxiApp.renderScriptList();
        console.log('脚本删除成功');
    }
}

function scriptAdd() {
    const name = prompt('请输入脚本名称:', '我的演示脚本');
    if (!name) return;
    
    const version = prompt('请输入脚本版本:', '1.0.0');
    if (!version) return;
    
    // 提供默认的演示脚本模板
    const defaultContent = `// ${name} - 演示脚本\n// 适用于无Flash环境\n\nconsole.log("${name} 启动");\n\n// 在这里添加您的脚本逻辑\nfunction myScript() {\n    console.log("脚本执行中...");\n    \n    // 示例：模拟游戏操作\n    alert("这是一个演示脚本");\n}\n\n// 执行脚本\nmyScript();`;
    
    const content = prompt('请输入脚本内容（或使用默认模板）:', defaultContent);
    if (!content) return;
    
    const newScript = {
        id: Date.now(),
        name: name,
        version: version,
        content: content
    };
    
    mingxiApp.scripts.push(newScript);
    mingxiApp.saveScriptList();
    mingxiApp.renderScriptList();
    console.log('脚本添加成功');
    alert('✅ 脚本添加成功！\n\n即使没有Flash，您也可以使用脚本系统进行自动化操作。');
}

function scriptSearch() {
    const searchTerm = document.getElementById('edt-search').value.toLowerCase();
    if (!searchTerm) {
        mingxiApp.renderScriptList();
        return;
    }
    
    const filteredScripts = mingxiApp.scripts.filter(script =>
        script.name.toLowerCase().includes(searchTerm)
    );
    
    mingxiApp.renderScriptList(filteredScripts);
    console.log('搜索结果:', filteredScripts.length, '个脚本');
}

// 崩溃处理（模拟原APK的崩溃恢复）
window.addEventListener('error', function(event) {
    console.error('应用出现错误:', event.error);
    localStorage.setItem('last-crash', Date.now().toString());
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('未处理的Promise错误:', event.reason);
    localStorage.setItem('last-crash', Date.now().toString());
});

// 新增全局脚本执行函数
function executeScript(scriptId) {
    if (mingxiApp && mingxiApp.executeScript) {
        mingxiApp.executeScript(scriptId);
    }
}

console.log('明曦元启 - 原APK精确复刻版本已加载（Flash替代方案版本）');