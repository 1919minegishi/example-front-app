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
http://localhost:5173/

# laravelサーバーを起動してログインにアクセス
```
docker exec -it laravel_web bash
php artisan serve --host=0.0.0.0 --port=80
```
http://192.168.1.23/login



1. サーバー構成
- このプロジェクトでは2つのサーバーが必要です：

(1)Laravelサーバー (必須)
```
php artisan serve --host=0.0.0.0
```
- ルーティングの処理
- コントローラーの実行
- 認証処理
- データベース接続
- セッション管理

(2)Viteサーバー (開発時のみ必須)
```
npm run dev
```
- JavaScriptやCSSなどのアセットの提供
- ホットリロード機能
- TypeScriptのコンパイル
- Reactコンポーネントの配信

2. アクセスフロー
   http://192.168.1.23/login にアクセスした時の処理の流れ：
(1)ブラウザ → Laravelサーバー
```
// routes/auth.php
   Route::get('login', [AuthenticatedSessionController::class, 'create'])
   ->name('login');
```
(2)Laravel → コントローラー
```
   // AuthenticatedSessionController.php
   public function create(): Response
   {
   return Inertia::render('Auth/Login', [
   'canResetPassword' => Route::has('password.request'),
   'status' => session('status'),
   ]);
   }
```
(3)Inertia.js → React
```
   // resources/views/app.blade.php
   @vite(['resources/js/app.tsx'])
```
   ↓
```
   // resources/js/Pages/Auth/Login.tsx
   export default function Login() {
   // Reactコンポーネントの実装
   }
```
3. React Routerを使用しない理由
   このプロジェクトでは、React Routerの代わりにInertia.jsを使用しています。その理由は：

(1)サーバーサイドルーティング
- Laravelのルーティングシステムをそのまま使用
- URLの一元管理が可能
- SEOに有利（サーバーサイドレンダリング）

(2)Inertia.jsの特徴
- Laravel ⇔ React間のシームレスな連携
- ページ遷移時のフルリロード不要（SPAのような動作）
- Laravelの認証システムをそのまま使用可能
(3)実際の使用例
```
   // リンクの場合
   <Link href={route('login')}>ログイン</Link>

   // フォーム送信の場合
   const { post } = useForm({...});
   post(route('login'));
```

4. 開発環境でのURL構成

メインアプリケーション: http://192.168.1.23/login
- Laravelサーバーが処理
- ルーティング、認証、ビジネスロジックを担当

アセット配信: http://192.168.1.23:5173
- Viteサーバーが処理
- JavaScriptやCSSの配信
- 開発時のホットリロード機能を提供

この構成により、以下のメリットがあります：
- Laravelの堅牢な機能（認証、バリデーション等）を活用
- Reactの動的なUI構築能力を活用
- 開発時の優れた開発者体験（ホットリロード等）
- 本番環境ではビルドされたアセットを使用（Viteサーバー不要）



Inertia.jsを使用したモダンなSPA開発
https://zenn.dev/shunjuio/articles/152dba0dc01bae

Inertia.jsがなぜ使いやすいのかをなるべく丁寧に言語化する
https://qiita.com/itokoooooh/items/142a1d6f0aba7c5d798e

