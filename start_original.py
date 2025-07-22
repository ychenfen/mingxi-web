#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys
import webbrowser
from threading import Timer

def start_server():
    # 切换到应用目录
    os.chdir('/Users/yuchenxu/Downloads/mingxi-web')
    
    # 尝试不同端口
    ports = [3000, 5000, 8000, 8080, 8888, 9000]
    
    for port in ports:
        try:
            # 自定义处理器，默认访问original版本
            class OriginalHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
                def do_GET(self):
                    if self.path == '/' or self.path == '/index.html':
                        self.path = '/index-original.html'
                    return super().do_GET()
            
            httpd = socketserver.TCPServer(("", port), OriginalHTTPRequestHandler)
            
            print("=" * 70)
            print("🎮 明曦元启 原APK精确复刻版 - 服务器启动成功!")
            print("=" * 70)
            print(f"🌐 本地访问: http://localhost:{port}")
            print(f"🌐 网络访问: http://你的IP地址:{port}")
            print(f"📁 服务目录: {os.getcwd()}")
            print("=" * 70)
            print("🎯 复刻特性:")
            print("✅ 1:1原版UI界面复刻 - 完全基于APK分析")
            print("✅ 原版Activity跳转逻辑 - LauncherActivity → LoginActivity → LiteActivity")
            print("✅ 原版QQ登录流程 - 使用原APK相同的登录URL")
            print("✅ 原版控制界面 - 重登/换频/微操/脚本按钮")
            print("✅ 原版Watcher系统 - 战斗状态监控")
            print("✅ 原版脚本管理 - 添加/删除/搜索功能")
            print("✅ 原版颜色主题 - #ff0088ff主题色")
            print("✅ 原版中文文本 - 完全一致的界面文字")
            print("=" * 70)
            print("📋 使用说明:")
            print("1. 启动画面: 显示3秒明曦元启Logo")
            print("2. QQ登录: 点击'QQ登录'按钮登录（会自动登录）")
            print("3. 主界面: 悬浮菜单按钮 → 重登/换频/微操/脚本")
            print("4. 免费开关: 右上角切换免费模式")
            print("5. 微操模式: 显示战斗状态监控")
            print("6. 脚本管理: 管理自动化脚本")
            print("=" * 70)
            print("⚠️  这是原APK的1:1精确复刻版本")
            print("   所有界面和功能都严格按照原APK规格实现")
            print("=" * 70)
            print("按 Ctrl+C 停止服务器")
            print("=" * 70)
            
            # 3秒后自动打开浏览器
            Timer(3.0, lambda: webbrowser.open(f'http://localhost:{port}')).start()
            
            # 启动服务器
            httpd.serve_forever()
            
        except OSError as e:
            if 'Address already in use' in str(e):
                print(f"端口 {port} 已被占用，尝试下一个...")
                continue
            else:
                print(f"端口 {port} 启动失败: {e}")
                continue
        except KeyboardInterrupt:
            print("\n🛑 明曦元启服务器已停止")
            sys.exit(0)
        
        break
    else:
        print("❌ 所有端口都被占用，请手动释放端口后重试")
        sys.exit(1)

if __name__ == "__main__":
    start_server()