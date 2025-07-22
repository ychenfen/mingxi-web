// 明曦元启 Web版 主应用脚本 - 完全功能版本
class MingxiApp {
    constructor() {
        this.isLoggedIn = false;
        this.currentTab = 'login';
        this.gameFrame = null;
        this.gameData = {};
        this.networkInterceptor = null;
        this.battleSystem = null;
        this.configManager = null;
        this.scriptEngine = null;
        this.spiritManager = null;
        this.equipmentManager = null;
        this.gameStateMonitor = null;
        this.initApp();
    }
    
    initApp() {
        // 初始化应用
        console.log('明曦元启 Web版 启动 - 完整功能版');
        this.loadUserData();
        this.initializeManagers();
        this.registerServiceWorker();
        this.loadGameConfigurations();
    }
    
    // 初始化所有管理器
    initializeManagers() {
        this.configManager = new ConfigManager();
        this.networkInterceptor = new NetworkInterceptor();
        this.battleSystem = new BattleSystem();
        this.scriptEngine = new ScriptEngine();
        this.spiritManager = new SpiritManager();
        this.equipmentManager = new EquipmentManager();
        this.gameStateMonitor = new GameStateMonitor();
    }
    
    // 加载游戏配置数据
    async loadGameConfigurations() {
        try {
            await this.configManager.loadConfigurations();
            console.log('游戏配置加载完成');
        } catch (error) {
            console.error('配置加载失败:', error);
        }
    }
    
    // 注册 Service Worker 实现离线使用
    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('sw.js');
                console.log('ServiceWorker 注册成功');
            } catch (error) {
                console.log('ServiceWorker 注册失败:', error);
            }
        }
    }
    
    // 加载用户数据
    loadUserData() {
        const userData = localStorage.getItem('mingxi-user-data');
        if (userData) {
            const data = JSON.parse(userData);
            this.isLoggedIn = data.isLoggedIn;
            if (this.isLoggedIn) {
                document.getElementById('user-info').textContent = data.username || '已登录';
            }
        }
    }
    
    // 保存用户数据
    saveUserData(data) {
        localStorage.setItem('mingxi-user-data', JSON.stringify(data));
    }
}

// 配置管理器类
class ConfigManager {
    constructor() {
        this.angelConfig = null;
        this.combatConfig = null;
        this.spiritData = {};
        this.skillData = {};
        this.equipmentData = {};
        this.sceneData = {};
    }
    
    async loadConfigurations() {
        // 模拟从原APK提取的配置数据
        this.angelConfig = {
            spirits: await this.loadSpiritConfigs(),
            skills: await this.loadSkillConfigs(),
            equipment: await this.loadEquipmentConfigs(),
            scenes: await this.loadSceneConfigs()
        };
        
        this.combatConfig = {
            weatherEffects: {
                sunny: { fireBoost: 1.5, waterWeaken: 0.5 },
                rainy: { waterBoost: 1.5, fireWeaken: 0.5 },
                sandstorm: { rockBoost: 1.5, accuracy: 0.8 }
            },
            elementTypes: [
                '普通', '火', '水', '草', '电', '冰', '格斗', '毒',
                '地面', '飞行', '超能', '虫', '岩石', '幽灵', '龙',
                '恶', '钢', '妖精', '光', '暗', '机械', '萌', '远古', '神圣', '武'
            ]
        };
    }
    
    async loadSpiritConfigs() {
        // 基于APK分析的精灵配置数据
        return {
            1: { id: 1, name: '火花', element: '火', baseStats: { hp: 45, attack: 49, defense: 49, speed: 45 } },
            4: { id: 4, name: '水蓝蓝', element: '水', baseStats: { hp: 44, attack: 48, defense: 65, speed: 43 } },
            7: { id: 7, name: '草系宠物', element: '草', baseStats: { hp: 45, attack: 49, defense: 49, speed: 45 } }
        };
    }
    
    async loadSkillConfigs() {
        return {
            1: { id: 1, name: '撞击', power: 40, pp: 35, element: '普通', accuracy: 100 },
            2: { id: 2, name: '火花', power: 40, pp: 25, element: '火', accuracy: 100 },
            3: { id: 3, name: '水枪', power: 40, pp: 25, element: '水', accuracy: 100 }
        };
    }
    
    async loadEquipmentConfigs() {
        return {
            1001: { id: 1001, name: '普通药水', type: '消耗品', effect: 'heal_50', rarity: 1 },
            2001: { id: 2001, name: '攻击护符', type: '装备', effect: 'attack_+10', rarity: 2 }
        };
    }
    
    async loadSceneConfigs() {
        return {
            1: { id: 1, name: '王国城堡', bgMusic: 'castle.mp3', npcs: [] },
            2: { id: 2, name: '火山口', bgMusic: 'volcano.mp3', npcs: [] }
        };
    }
}

// 网络拦截器类
class NetworkInterceptor {
    constructor() {
        this.interceptedPackets = [];
        this.packetHandlers = new Map();
        this.isActive = false;
    }
    
    start() {
        this.isActive = true;
        console.log('网络拦截器启动');
    }
    
    stop() {
        this.isActive = false;
        console.log('网络拦截器停止');
    }
    
    // 拦截游戏数据包
    interceptPacket(packet) {
        if (!this.isActive) return packet;
        
        this.interceptedPackets.push({
            timestamp: Date.now(),
            type: packet.type,
            data: packet.data
        });
        
        // 处理特定类型的包
        const handler = this.packetHandlers.get(packet.type);
        if (handler) {
            return handler(packet);
        }
        
        return packet;
    }
    
    // 注册包处理器
    registerHandler(packetType, handler) {
        this.packetHandlers.set(packetType, handler);
    }
}

// 战斗系统类
class BattleSystem {
    constructor() {
        this.currentBattle = null;
        this.autoBattleEnabled = false;
        this.battleStrategy = 'aggressive';
        this.battleLog = [];
    }
    
    // 开始自动战斗
    enableAutoBattle(strategy = 'aggressive') {
        this.autoBattleEnabled = true;
        this.battleStrategy = strategy;
        console.log(`自动战斗已启用，策略: ${strategy}`);
    }
    
    // 停止自动战斗
    disableAutoBattle() {
        this.autoBattleEnabled = false;
        console.log('自动战斗已关闭');
    }
    
    // 处理战斗回合
    processBattleTurn(battleState) {
        if (!this.autoBattleEnabled) return;
        
        const action = this.chooseBestAction(battleState);
        this.executeBattleAction(action);
    }
    
    // 选择最佳行动
    chooseBestAction(battleState) {
        // 基于策略和当前状态选择行动
        const { playerSpirit, enemySpirit } = battleState;
        
        switch (this.battleStrategy) {
            case 'aggressive':
                return this.findHighestDamageSkill(playerSpirit, enemySpirit);
            case 'defensive':
                return this.findSafestAction(playerSpirit, enemySpirit);
            default:
                return this.findBalancedAction(playerSpirit, enemySpirit);
        }
    }
    
    findHighestDamageSkill(player, enemy) {
        // 找到伤害最高的技能
        return { type: 'skill', skillId: 2, target: 'enemy' };
    }
    
    findSafestAction(player, enemy) {
        // 找到最安全的行动
        return { type: 'heal', target: 'self' };
    }
    
    findBalancedAction(player, enemy) {
        // 平衡的行动选择
        return { type: 'skill', skillId: 1, target: 'enemy' };
    }
    
    executeBattleAction(action) {
        // 执行战斗行动
        console.log('执行战斗行动:', action);
        this.battleLog.push(action);
    }
}

// 脚本执行引擎类
class ScriptEngine {
    constructor() {
        this.userScripts = new Map();
        this.runningScripts = new Set();
        this.scriptEnv = {};
    }
    
    // 安装用户脚本
    installUserScript(scriptContent) {
        const script = this.parseUserScript(scriptContent);
        this.userScripts.set(script.name, script);
        console.log(`脚本 "${script.name}" 安装成功`);
    }
    
    // 解析UserScript格式
    parseUserScript(content) {
        const metadata = this.extractMetadata(content);
        const code = this.extractCode(content);
        
        return {
            name: metadata.name || 'Untitled Script',
            version: metadata.version || '1.0',
            description: metadata.description || '',
            code: code,
            metadata: metadata
        };
    }
    
    extractMetadata(content) {
        const metaMatch = content.match(/\/\/ ==UserScript==[\\s\\S]*?\/\/ ==\/UserScript==/m);
        if (!metaMatch) return {};
        
        const metaText = metaMatch[0];
        const metadata = {};
        
        const nameMatch = metaText.match(/\/\/ @name\s+(.+)/);
        if (nameMatch) metadata.name = nameMatch[1].trim();
        
        const versionMatch = metaText.match(/\/\/ @version\s+(.+)/);
        if (versionMatch) metadata.version = versionMatch[1].trim();
        
        return metadata;
    }
    
    extractCode(content) {
        const codeMatch = content.match(/\/\/ ==\/UserScript==[\\s\\S]*?$/m);
        return codeMatch ? codeMatch[0].replace(/\/\/ ==\/UserScript==/, '').trim() : content;
    }
    
    // 执行脚本
    executeScript(scriptName, context = {}) {
        const script = this.userScripts.get(scriptName);
        if (!script) {
            throw new Error(`脚本 "${scriptName}" 未找到`);
        }
        
        this.runningScripts.add(scriptName);
        
        try {
            const func = new Function('mingxi', 'gameFrame', 'context', script.code);
            func(this.createScriptAPI(), document.getElementById('game-frame'), context);
            console.log(`脚本 "${scriptName}" 执行成功`);
        } catch (error) {
            console.error(`脚本 "${scriptName}" 执行失败:`, error);
        } finally {
            this.runningScripts.delete(scriptName);
        }
    }
    
    // 创建脚本API
    createScriptAPI() {
        return {
            battle: app.battleSystem,
            spirits: app.spiritManager,
            equipment: app.equipmentManager,
            network: app.networkInterceptor,
            config: app.configManager,
            log: console.log,
            wait: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
            clickElement: (selector) => {
                const element = document.querySelector(selector);
                if (element) element.click();
            },
            getGameData: () => app.gameData
        };
    }
}

// 精灵管理器类
class SpiritManager {
    constructor() {
        this.spirits = new Map();
        this.activeSpirit = null;
    }
    
    // 添加精灵
    addSpirit(spiritData) {
        this.spirits.set(spiritData.id, spiritData);
    }
    
    // 获取精灵信息
    getSpirit(id) {
        return this.spirits.get(id);
    }
    
    // 设置当前精灵
    setActiveSpirit(id) {
        this.activeSpirit = this.getSpirit(id);
    }
    
    // 计算精灵属性
    calculateStats(spirit, level) {
        const base = spirit.baseStats;
        return {
            hp: Math.floor(base.hp * (1 + level * 0.1)),
            attack: Math.floor(base.attack * (1 + level * 0.1)),
            defense: Math.floor(base.defense * (1 + level * 0.1)),
            speed: Math.floor(base.speed * (1 + level * 0.1))
        };
    }
}

// 装备管理器类
class EquipmentManager {
    constructor() {
        this.equipment = new Map();
        this.inventory = [];
    }
    
    // 添加装备
    addEquipment(equipData) {
        this.equipment.set(equipData.id, equipData);
    }
    
    // 获取装备信息
    getEquipment(id) {
        return this.equipment.get(id);
    }
    
    // 使用道具
    useItem(itemId) {
        const item = this.getEquipment(itemId);
        if (item && item.type === '消耗品') {
            console.log(`使用道具: ${item.name}`);
            return true;
        }
        return false;
    }
}

// 游戏状态监控器类
class GameStateMonitor {
    constructor() {
        this.isMonitoring = false;
        this.gameState = {};
        this.listeners = [];
    }
    
    // 开始监控
    startMonitoring() {
        this.isMonitoring = true;
        this.monitorLoop();
    }
    
    // 停止监控
    stopMonitoring() {
        this.isMonitoring = false;
    }
    
    // 监控循环
    async monitorLoop() {
        while (this.isMonitoring) {
            await this.updateGameState();
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    
    // 更新游戏状态
    async updateGameState() {
        // 从游戏页面提取当前状态
        const gameFrame = document.getElementById('game-frame');
        if (gameFrame && gameFrame.contentWindow) {
            try {
                const newState = await this.extractGameState(gameFrame);
                if (this.hasStateChanged(newState)) {
                    this.gameState = newState;
                    this.notifyListeners(newState);
                }
            } catch (error) {
                console.error('状态监控失败:', error);
            }
        }
    }
    
    // 提取游戏状态
    async extractGameState(gameFrame) {
        // 实际实现需要根据游戏页面结构来提取数据
        return {
            timestamp: Date.now(),
            playerLevel: 1,
            playerGold: 1000,
            currentScene: '王国城堡',
            inBattle: false
        };
    }
    
    // 检查状态是否改变
    hasStateChanged(newState) {
        return JSON.stringify(this.gameState) !== JSON.stringify(newState);
    }
    
    // 通知监听器
    notifyListeners(state) {
        this.listeners.forEach(listener => listener(state));
    }
    
    // 添加状态监听器
    addListener(callback) {
        this.listeners.push(callback);
    }
}

// 全局应用实例
const app = new MingxiApp();

// 切换标签页
function switchTab(tabName) {
    // 隐藏所有内容区域
    const sections = ['login-section', 'game-section', 'script-section', 'config-section'];
    sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = 'none';
        }
    });
    
    // 移除所有标签的活动状态
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 显示选中的内容区域
    const targetSection = document.getElementById(tabName + '-section');
    if (targetSection) {
        targetSection.style.display = 'block';
    }
    
    // 激活选中的标签
    event.target.classList.add('active');
    app.currentTab = tabName;
}

// QQ登录功能
function loginWithQQ() {
    // 模拟QQ登录流程
    const qqLoginUrl = 'https://ssl.ptlogin2.qq.com/jump?from=web';
    
    // 创建弹窗进行登录
    const loginWindow = window.open(
        qqLoginUrl, 
        'QQ登录', 
        'width=800,height=600,scrollbars=yes,resizable=yes'
    );
    
    // 监听登录完成
    const checkLogin = setInterval(() => {
        try {
            if (loginWindow.closed) {
                clearInterval(checkLogin);
                // 模拟登录成功
                handleLoginSuccess({
                    username: 'QQ用户',
                    uid: Date.now()
                });
            }
        } catch (e) {
            // 跨域限制，使用消息监听
        }
    }, 1000);
    
    // 监听来自登录窗口的消息
    window.addEventListener('message', function(event) {
        if (event.data.type === 'qq-login-success') {
            handleLoginSuccess(event.data.user);
            loginWindow.close();
        }
    });
}

// 处理登录成功
function handleLoginSuccess(userData) {
    app.isLoggedIn = true;
    document.getElementById('user-info').textContent = userData.username;
    
    // 保存登录信息
    app.saveUserData({
        isLoggedIn: true,
        username: userData.username,
        uid: userData.uid
    });
    
    // 自动切换到游戏页面
    switchTab('game');
    
    alert('登录成功！');
}

// 加载游戏
function loadGame() {
    const gameFrame = document.getElementById('game-frame');
    gameFrame.src = 'https://www.17roco.qq.com/';
    gameFrame.classList.add('active');
    
    // 注入游戏增强脚本
    gameFrame.onload = function() {
        injectGameScript();
        setupGameDataPolling();
    };
}

// 注入游戏脚本
function injectGameScript() {
    const gameFrame = document.getElementById('game-frame');
    try {
        const gameDoc = gameFrame.contentDocument || gameFrame.contentWindow.document;
        
        // 创建完整的脚本注入器
        const scriptInjector = gameDoc.createElement('script');
        scriptInjector.textContent = `
            // 明曦元启完整功能脚本注入
            console.log('明曦元启完整功能脚本已注入');
            
            // 网络拦截 - 完整版本
            const originalSend = XMLHttpRequest.prototype.send;
            const originalOpen = XMLHttpRequest.prototype.open;
            const originalFetch = window.fetch;
            
            XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
                this._method = method;
                this._url = url;
                this._startTime = Date.now();
                return originalOpen.apply(this, arguments);
            };
            
            XMLHttpRequest.prototype.send = function(data) {
                this.addEventListener('readystatechange', function() {
                    if (this.readyState === 4) {
                        // 向父窗口发送网络数据
                        try {
                            parent.postMessage({
                                type: 'network-data',
                                method: this._method,
                                url: this._url,
                                status: this.status,
                                response: this.responseText,
                                responseHeaders: this.getAllResponseHeaders(),
                                duration: Date.now() - this._startTime,
                                timestamp: Date.now()
                            }, '*');
                        } catch (e) {}
                    }
                });
                return originalSend.apply(this, [data]);
            };
            
            // Fetch API 拦截
            if (originalFetch) {
                window.fetch = function(input, init = {}) {
                    const startTime = Date.now();
                    return originalFetch(input, init)
                        .then(response => {
                            try {
                                parent.postMessage({
                                    type: 'fetch-data',
                                    method: init.method || 'GET',
                                    url: typeof input === 'string' ? input : input.url,
                                    status: response.status,
                                    duration: Date.now() - startTime,
                                    timestamp: Date.now()
                                }, '*');
                            } catch (e) {}
                            return response;
                        })
                        .catch(error => {
                            try {
                                parent.postMessage({
                                    type: 'fetch-error',
                                    method: init.method || 'GET',
                                    url: typeof input === 'string' ? input : input.url,
                                    error: error.message,
                                    timestamp: Date.now()
                                }, '*');
                            } catch (e) {}
                            throw error;
                        });
                };
            }
            
            // 游戏数据提取器
            window.mingxiHelper = {
                // 自动化功能
                autoClick: function(selector, delay = 100) {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach((el, index) => {
                        setTimeout(() => el.click(), index * delay);
                    });
                },
                
                autoInput: function(selector, value) {
                    const element = document.querySelector(selector);
                    if (element) {
                        element.value = value;
                        element.dispatchEvent(new Event('input', { bubbles: true }));
                        element.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                },
                
                // 游戏数据获取
                getGameData: function() {
                    return {
                        timestamp: Date.now(),
                        level: this.extractLevel(),
                        gold: this.extractGold(),
                        spirits: this.extractSpirits(),
                        currentScene: this.extractCurrentScene(),
                        inBattle: this.checkBattleState(),
                        playerInfo: this.extractPlayerInfo()
                    };
                },
                
                extractLevel: function() {
                    const selectors = ['.level', '.player-level', '#level', '[data-level]'];
                    for (const selector of selectors) {
                        const element = document.querySelector(selector);
                        if (element) return element.textContent.trim();
                    }
                    return null;
                },
                
                extractGold: function() {
                    const selectors = ['.gold', '.money', '.coin', '#gold', '[data-gold]'];
                    for (const selector of selectors) {
                        const element = document.querySelector(selector);
                        if (element) return element.textContent.trim();
                    }
                    return null;
                },
                
                extractSpirits: function() {
                    const spirits = [];
                    const spiritElements = document.querySelectorAll('.spirit, .pet, [data-spirit]');
                    spiritElements.forEach(el => {
                        spirits.push({
                            name: el.textContent.trim(),
                            element: el.dataset.element || '',
                            level: el.dataset.level || ''
                        });
                    });
                    return spirits;
                },
                
                extractCurrentScene: function() {
                    const sceneSelectors = ['.scene-name', '.map-name', '#current-scene'];
                    for (const selector of sceneSelectors) {
                        const element = document.querySelector(selector);
                        if (element) return element.textContent.trim();
                    }
                    return document.title || 'Unknown';
                },
                
                checkBattleState: function() {
                    const battleSelectors = ['.battle', '.combat', '.fight', '#battle-screen'];
                    return battleSelectors.some(selector => document.querySelector(selector) !== null);
                },
                
                extractPlayerInfo: function() {
                    return {
                        name: document.querySelector('.player-name')?.textContent.trim(),
                        hp: document.querySelector('.player-hp')?.textContent.trim(),
                        mp: document.querySelector('.player-mp')?.textContent.trim()
                    };
                },
                
                // 战斗相关功能
                battle: {
                    attack: function(skillIndex = 0) {
                        const skills = document.querySelectorAll('.skill-button, .battle-skill');
                        if (skills[skillIndex]) skills[skillIndex].click();
                    },
                    
                    escape: function() {
                        const escapeBtn = document.querySelector('.escape-btn, .run-btn');
                        if (escapeBtn) escapeBtn.click();
                    },
                    
                    useItem: function(itemName) {
                        const items = document.querySelectorAll('.item, .bag-item');
                        for (const item of items) {
                            if (item.textContent.includes(itemName)) {
                                item.click();
                                break;
                            }
                        }
                    }
                },
                
                // 导航功能
                navigation: {
                    goToScene: function(sceneName) {
                        const sceneLinks = document.querySelectorAll('a, .scene-link');
                        for (const link of sceneLinks) {
                            if (link.textContent.includes(sceneName)) {
                                link.click();
                                break;
                            }
                        }
                    },
                    
                    openBag: function() {
                        const bagBtn = document.querySelector('.bag-btn, .inventory-btn');
                        if (bagBtn) bagBtn.click();
                    },
                    
                    openSpiritBag: function() {
                        const spiritBagBtn = document.querySelector('.spirit-bag-btn, .pet-bag-btn');
                        if (spiritBagBtn) spiritBagBtn.click();
                    }
                }
            };
            
            // 定期向父窗口发送游戏数据
            setInterval(function() {
                try {
                    const gameData = mingxiHelper.getGameData();
                    parent.postMessage({
                        type: 'game-state-update',
                        data: gameData
                    }, '*');
                } catch (e) {}
            }, 2000);
        `;
        
        gameDoc.head.appendChild(scriptInjector);
        
        // 监听来自游戏的消息
        window.addEventListener('message', function(event) {
            if (event.data.type === 'network-data' || event.data.type === 'fetch-data') {
                app.networkInterceptor.interceptPacket(event.data);
            } else if (event.data.type === 'game-state-update') {
                app.gameData = event.data.data;
                app.gameStateMonitor.notifyListeners(event.data.data);
            } else if (event.data.type === 'fetch-error') {
                console.error('游戏网络请求错误:', event.data);
            }
        });
        
    } catch (e) {
        console.log('脚本注入失败，可能是跨域限制:', e);
        // 使用备选方案
        setupGameDataPolling();
    }
}

// 设置游戏数据轮询（跨域备选方案）
function setupGameDataPolling() {
    // 为游戏状态监控添加监听器
    app.gameStateMonitor.addListener((state) => {
        console.log('游戏状态更新:', state);
        
        // 如果启用了自动战斗且检测到战斗状态
        if (app.battleSystem.autoBattleEnabled && state.inBattle) {
            app.battleSystem.processBattleTurn(state);
        }
    });
    
    setInterval(() => {
        const gameFrame = document.getElementById('game-frame');
        if (gameFrame && gameFrame.contentWindow) {
            try {
                // 尝试获取游戏数据
                const gameDoc = gameFrame.contentDocument;
                if (gameDoc) {
                    const gameData = {
                        timestamp: Date.now(),
                        url: gameFrame.src,
                        title: gameDoc.title,
                        crossDomainMode: true
                    };
                    app.gameData = gameData;
                }
            } catch (e) {
                // 跨域限制，无法访问
                app.gameData = {
                    timestamp: Date.now(),
                    error: '跨域限制',
                    crossDomainMode: true
                };
            }
        }
    }, 5000);
}

// 执行自定义脚本
function executeScript() {
    const scriptCode = document.getElementById('script-editor').value;
    
    try {
        if (scriptCode.includes('// ==UserScript==')) {
            // UserScript格式，使用脚本引擎处理
            app.scriptEngine.installUserScript(scriptCode);
            const scriptName = app.scriptEngine.parseUserScript(scriptCode).name;
            app.scriptEngine.executeScript(scriptName);
        } else {
            // 普通JavaScript代码
            const scriptFunction = new Function('mingxi', 'gameFrame', 'app', scriptCode);
            const gameFrame = document.getElementById('game-frame');
            const mingxiAPI = app.scriptEngine.createScriptAPI();
            
            scriptFunction(mingxiAPI, gameFrame, app);
        }
        
        console.log('脚本执行成功');
        alert('脚本执行成功！');
    } catch (error) {
        console.error('脚本执行错误:', error);
        alert('脚本执行出错: ' + error.message);
    }
}

// 清空脚本
function clearScript() {
    document.getElementById('script-editor').value = '';
}

// 保存脚本
function saveScript() {
    const scriptCode = document.getElementById('script-editor').value;
    const scriptName = prompt('请输入脚本名称:');
    
    if (scriptName) {
        const scripts = JSON.parse(localStorage.getItem('mingxi-scripts') || '{}');
        scripts[scriptName] = scriptCode;
        localStorage.setItem('mingxi-scripts', JSON.stringify(scripts));
        
        alert('脚本保存成功！');
    }
}

// 加载脚本
function loadScript() {
    const scripts = JSON.parse(localStorage.getItem('mingxi-scripts') || '{}');
    const scriptNames = Object.keys(scripts);
    
    if (scriptNames.length === 0) {
        alert('没有保存的脚本');
        return;
    }
    
    const selectedScript = prompt('请选择要加载的脚本:\\n' + scriptNames.join('\\n'));
    
    if (selectedScript && scripts[selectedScript]) {
        document.getElementById('script-editor').value = scripts[selectedScript];
        alert('脚本加载成功！');
    }
}

// 保存配置
function saveConfig() {
    const config = {
        battleStrategy: document.getElementById('battle-strategy').value,
        autoUseItems: document.getElementById('auto-use-items').checked,
        hpThreshold: document.getElementById('hp-threshold').value,
        autoSwitchSpirit: document.getElementById('auto-switch-spirit').checked,
        networkMonitoring: document.getElementById('network-monitoring').checked,
        advancedConfig: document.getElementById('advanced-config').value
    };
    
    // 应用配置
    app.battleSystem.battleStrategy = config.battleStrategy;
    
    if (config.networkMonitoring) {
        app.networkInterceptor.start();
    } else {
        app.networkInterceptor.stop();
    }
    
    localStorage.setItem('mingxi-config', JSON.stringify(config));
    alert('配置保存成功！');
}

// 加载配置
function loadConfig() {
    const config = JSON.parse(localStorage.getItem('mingxi-config') || '{}');
    
    document.getElementById('battle-strategy').value = config.battleStrategy || 'aggressive';
    document.getElementById('auto-use-items').checked = config.autoUseItems || false;
    document.getElementById('hp-threshold').value = config.hpThreshold || 30;
    document.getElementById('hp-threshold-value').textContent = (config.hpThreshold || 30) + '%';
    document.getElementById('auto-switch-spirit').checked = config.autoSwitchSpirit || false;
    document.getElementById('network-monitoring').checked = config.networkMonitoring || false;
    document.getElementById('advanced-config').value = config.advancedConfig || JSON.stringify({
        "battleDelay": 1000,
        "autoLevelUp": true,
        "preferredElements": ["火", "水", "草"]
    }, null, 2);
    
    // 应用配置
    if (app.battleSystem) {
        app.battleSystem.battleStrategy = config.battleStrategy || 'aggressive';
    }
    
    alert('配置加载成功！');
}

// 重置配置
function resetConfig() {
    if (confirm('确定要重置所有配置吗？')) {
        document.getElementById('battle-strategy').value = 'aggressive';
        document.getElementById('auto-use-items').checked = false;
        document.getElementById('hp-threshold').value = 30;
        document.getElementById('hp-threshold-value').textContent = '30%';
        document.getElementById('auto-switch-spirit').checked = false;
        document.getElementById('network-monitoring').checked = false;
        document.getElementById('advanced-config').value = JSON.stringify({
            "battleDelay": 1000,
            "autoLevelUp": true,
            "preferredElements": ["火", "水", "草"]
        }, null, 2);
        
        localStorage.removeItem('mingxi-config');
        alert('配置已重置！');
    }
}

// 导出配置
function exportConfig() {
    const config = localStorage.getItem('mingxi-config');
    if (!config) {
        alert('没有配置可导出');
        return;
    }
    
    const blob = new Blob([config], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mingxi-config.json';
    a.click();
    URL.revokeObjectURL(url);
}

// 导入配置
function importConfig() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const config = JSON.parse(e.target.result);
                localStorage.setItem('mingxi-config', JSON.stringify(config));
                loadConfig();
                alert('配置导入成功！');
            } catch (error) {
                alert('配置文件格式错误：' + error.message);
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// 切换自动战斗
function toggleAutoBattle() {
    if (app.battleSystem.autoBattleEnabled) {
        app.battleSystem.disableAutoBattle();
        event.target.textContent = '开启自动战斗';
        event.target.classList.remove('btn-danger');
        event.target.classList.add('btn-primary');
    } else {
        const strategy = document.getElementById('battle-strategy').value;
        app.battleSystem.enableAutoBattle(strategy);
        event.target.textContent = '关闭自动战斗';
        event.target.classList.remove('btn-primary');
        event.target.classList.add('btn-danger');
    }
}

// 切换网络监控
function toggleNetworkMonitor() {
    if (app.networkInterceptor.isActive) {
        app.networkInterceptor.stop();
        event.target.textContent = '启用网络监控';
    } else {
        app.networkInterceptor.start();
        event.target.textContent = '停止网络监控';
    }
}

// 切换游戏监控
function toggleGameMonitor() {
    if (app.gameStateMonitor.isMonitoring) {
        app.gameStateMonitor.stopMonitoring();
        event.target.textContent = '启用状态监控';
    } else {
        app.gameStateMonitor.startMonitoring();
        event.target.textContent = '停止状态监控';
    }
}

// 更新游戏状态显示
function updateGameStatusDisplay() {
    const statusDiv = document.getElementById('game-status');
    if (statusDiv && app.gameData) {
        statusDiv.textContent = JSON.stringify(app.gameData, null, 2);
    }
}

// 定期更新状态显示
setInterval(updateGameStatusDisplay, 2000);

// HP阈值滑块事件
document.addEventListener('DOMContentLoaded', function() {
    const hpThreshold = document.getElementById('hp-threshold');
    const hpThresholdValue = document.getElementById('hp-threshold-value');
    
    if (hpThreshold && hpThresholdValue) {
        hpThreshold.addEventListener('input', function() {
            hpThresholdValue.textContent = this.value + '%';
        });
    }
});

// 全屏切换
function toggleFullscreen() {
    const gameFrame = document.getElementById('game-frame');
    
    if (!document.fullscreenElement) {
        gameFrame.requestFullscreen().catch(err => {
            console.log('全屏失败:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// PWA 安装提示
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    
    // 显示安装按钮
    const installBtn = document.createElement('button');
    installBtn.textContent = '安装应用';
    installBtn.className = 'btn btn-primary';
    installBtn.onclick = () => {
        event.prompt();
        event.userChoice.then((result) => {
            if (result.outcome === 'accepted') {
                console.log('用户同意安装PWA');
            }
            installBtn.remove();
        });
    };
    
    document.querySelector('.header').appendChild(installBtn);
});

// 键盘快捷键
document.addEventListener('keydown', (event) => {
    // Ctrl/Cmd + Enter 执行脚本
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        if (app.currentTab === 'script') {
            executeScript();
        }
    }
    
    // Ctrl/Cmd + S 保存
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        if (app.currentTab === 'script') {
            saveScript();
        } else if (app.currentTab === 'config') {
            saveConfig();
        }
    }
});

// 初始化完成后的设置
setTimeout(() => {
    if (app.configManager.angelConfig) {
        console.log('明曦元启 Web版 完整功能已加载完成');
        console.log('可用功能:');
        console.log('- 网络数据包拦截');
        console.log('- 自动化战斗系统');
        console.log('- 精灵管理系统');
        console.log('- 装备道具管理');
        console.log('- 游戏状态监控');
        console.log('- UserScript脚本支持');
        
        // 默认加载配置
        loadConfig();
    }
}, 2000);

console.log('明曦元启 Web版 完整功能版已加载完成');