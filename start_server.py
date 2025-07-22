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
            handler = http.server.SimpleHTTPRequestHandler
            httpd = socketserver.TCPServer(("", port), handler)
            
            print("=" * 60)
            print("🚀 明曦元启 Web版 服务器启动成功!")
            print("=" * 60)
            print(f"🌐 本地访问: http://localhost:{port}")
            print(f"🌐 网络访问: http://你的IP地址:{port}")
            print(f"📁 服务目录: {os.getcwd()}")
            print("=" * 60)
            print("📋 使用说明:")
            print("1. 在浏览器中打开上述地址")
            print("2. 点击'QQ登录'按钮登录")
            print("3. 切换到'游戏'标签加载游戏")
            print("4. 在'脚本'标签中运行自动化脚本")
            print("5. 在'配置'标签中调整设置")
            print("=" * 60)
            print("按 Ctrl+C 停止服务器")
            print("=" * 60)
            
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
            print("\n🛑 服务器已停止")
            sys.exit(0)
        
        break
    else:
        print("❌ 所有端口都被占用，请手动释放端口后重试")
        sys.exit(1)

if __name__ == "__main__":
    start_server()