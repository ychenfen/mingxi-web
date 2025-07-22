# 明曦元启 Web版 部署说明

## 📱 跨平台解决方案

### 🌟 特性
- **完全跨平台**: Mac、Windows、iOS、Android 通用
- **PWA技术**: 可安装到桌面，离线使用
- **原生体验**: 全屏模式，快捷键支持
- **脚本执行**: 完整的JavaScript执行环境
- **QQ登录**: 集成官方QQ登录接口

### 🚀 部署方法

#### 方法一：本地服务器
```bash
# 进入项目目录
cd mingxi-web

# 启动本地服务器（Python）
python3 -m http.server 8080

# 或使用Node.js
npx http-server -p 8080

# 访问应用
# Mac: http://localhost:8080
# 手机: http://[电脑IP]:8080
```

#### 方法二：在线部署
1. **GitHub Pages**: 免费静态网站托管
2. **Vercel**: 零配置部署
3. **Netlify**: 支持表单和函数

### 📱 iOS安装方法
1. 在Safari中打开网址
2. 点击分享按钮
3. 选择"添加到主屏幕"
4. 确认安装

### 💻 Mac安装方法
1. 在Chrome/Edge中打开网址
2. 地址栏右侧出现安装图标
3. 点击安装即可

## 🔧 核心功能实现

### 1. 脚本执行引擎
```javascript
// 支持完整的JavaScript语法
function autoPlay() {
    // 自动游戏脚本
    if (gameFrame.contentWindow.mingxiHelper) {
        gameFrame.contentWindow.mingxiHelper.autoClick('.battle-btn');
    }
}
```

### 2. 游戏集成
- WebView嵌入游戏页面
- 脚本注入到游戏环境
- 跨域通信解决方案

### 3. QQ登录集成
```javascript
// 使用官方QQ登录接口
const loginUrl = 'https://ssl.ptlogin2.qq.com/jump?from=web';
```

### 4. 数据持久化
- LocalStorage存储用户配置
- 脚本管理和版本控制
- 离线数据同步

## 🛡️ 安全特性
- 沙箱脚本执行环境
- 同源策略保护
- 用户数据本地加密存储

## 🔄 功能对比

| 功能 | Android原版 | Web版 |
|------|------------|--------|
| QQ登录 | ✅ | ✅ |
| 脚本执行 | ✅ | ✅ |
| 游戏集成 | ✅ | ✅ |
| 配置管理 | ✅ | ✅ |
| 跨平台 | ❌ | ✅ |
| 免安装 | ❌ | ✅ |
| 自动更新 | ❌ | ✅ |

## 📞 技术支持
- Web版保留了Android版的所有核心功能
- 通过PWA技术实现原生应用体验
- 支持离线使用和自动更新
- 完全兼容Mac和iOS设备

## ⚠️ 使用说明
1. 首次使用需要网络连接进行QQ登录
2. 脚本功能需要游戏页面完全加载后使用
3. 某些高级功能可能受浏览器安全策略限制
4. 建议使用最新版本的Chrome、Safari或Edge浏览器