# ベースイメージとして PHP 8.1 と Apache を含むものを使用
FROM php:8.1-apache

# 必要なパッケージのインストール (例: git, unzip, libpng-devなど)
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libonig-dev \
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    && rm -rf /var/lib/apt/lists/*

# PHP拡張のインストール (Laravelでよく使うものを例としています)
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Node.jsとnpmのインストール（重要なステップ）
# 例として、Node.jsの公式配布元から最新版をダウンロードしてインストール
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Composer のインストール
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# 起動スクリプトのコピーと実行権限の付与
COPY ./docker/php/start-apache.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/start-apache.sh

# Apache のドキュメントルートを /var/www/public に設定
# （Laravelのpublicディレクトリを指すようにします）
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# rewriteモジュールの有効化 (Laravelのルーティングに必要)
RUN a2enmod rewrite

# コンテナ起動時にApacheを起動
CMD ["/usr/local/bin/start-apache.sh"]
