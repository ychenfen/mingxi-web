#!/bin/bash
cd "$(dirname "$0")"

echo "🎮 正在启动明曦元启原APK复刻版..."
echo "="*50

# 尝试打开HTML文件
if command -v open >/dev/null 2>&1; then
    echo "📱 使用默认浏览器打开..."
    open "index-original.html"
elif command -v xdg-open >/dev/null 2>&1; then
    echo "📱 使用默认浏览器打开..."
    xdg-open "index-original.html"
else
    echo "📱 请手动用浏览器打开: index-original.html"
fi

echo "✅ 明曦元启已启动!"
echo "📋 如果页面没有打开，请手动用浏览器打开："
echo "   文件路径: $(pwd)/index-original.html"
echo "="*50

# 保持终端打开
read -p "按Enter键退出..."