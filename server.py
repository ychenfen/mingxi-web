#!/usr/bin/env python3
import http.server
import socketserver
import os

# 切换到正确的目录
os.chdir('/Users/yuchenxu/Downloads/mingxi-web')

# 自定义处理器，默认返回原版页面
class MingxiHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/' or self.path == '':
            self.path = '/index-original.html'
        return super().do_GET()

# 尝试启动服务器
port = 3001
try:
    with socketserver.TCPServer(("", port), MingxiHTTPRequestHandler) as httpd:
        print(f"✅ 明曦元启原APK复刻版启动成功!")
        print(f"🌐 访问地址: http://localhost:{port}")
        print(f"📁 当前目录: {os.getcwd()}")
        print("=" * 50)
        httpd.serve_forever()
except Exception as e:
    print(f"❌ 启动失败: {e}")