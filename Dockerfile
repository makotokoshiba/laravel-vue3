# PHP & Laravel 用イメージ
FROM php:8.3-fpm

# システムツールやPHP拡張のインストール
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    zip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-install pdo_mysql zip mbstring exif pcntl bcmath gd

# Composerインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 作業ディレクトリ設定
WORKDIR /var/www

# コードをコピー
COPY . .

# 依存関係をコピーしてインストール（ビルドキャッシュのため）
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

# パーミッション調整（必要に応じて）
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# ポートはphp-fpmなのでEXPOSEは特に不要。php artisan serveを使うなら8000を使います

CMD ["php-fpm"]
