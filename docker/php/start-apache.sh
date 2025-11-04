#!/bin/bash

# Apacheの設定を確認
apache2ctl configtest

# エラーがない場合はApacheを起動
if [ $? -eq 0 ]; then
    echo "Apache configuration is valid. Starting Apache..."
    # フォアグラウンドでApacheを起動
    apache2-foreground
else
    echo "Apache configuration test failed."
    exit 1
fi
