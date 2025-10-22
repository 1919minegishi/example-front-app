# 1.laravelプロジェクト作成
composer create-project laravel/laravel my-react-app2

# 2. React/TypeScript環境の導入（Laravel Breezeを利用）
## コンテナ内で実行
docker exec -it laravel_web npm run dev

## 1. Breeze パッケージのインストール
composer require laravel/breeze --dev

## 2. React + TypeScript を指定して Breeze をインストール
php artisan breeze:install react --typescript

## 3. npm パッケージのインストールとフロントエンドのビルド
npm install
npm run build # または開発時は npm run dev

## Vite開発サーバーを起動
docker exec -it laravel_web npm run dev
npm run dev

# フロントにアクセス
http://192.168.1.23:5173/
