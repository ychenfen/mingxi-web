#!/usr/bin/env python3
import http.server
import socketserver
import os
import webbrowser

os.chdir('/Users/yuchenxu/Downloads/mingxi-web')

class MingxiHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/' or self.path == '':
            self.path = '/index-original.html'
        return super().do_GET()

# 尝试多个端口
for port in [4000, 4001, 4002, 5000, 6000]:
    try:
        httpd = socketserver.TCPServer(("", port), MingxiHandler)
        print("🎮 明曦元启原APK复刻版已启动!")
        print(f"🌐 地址: http://localhost:{port}")
        print("📱 特性: 1:1原版UI复刻，完整功能实现")
        print("=" * 50)
        
        # 自动打开浏览器
        webbrowser.open(f'http://localhost:{port}')
        
        httpd.serve_forever()
        break
    except OSError:
        continue