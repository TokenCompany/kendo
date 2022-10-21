# 事前準備

## Expo の環境

本アプリは Expo managed workflow で作っています。
以下を参考に Expo CLI をセットアップしてください。

https://docs.expo.dev/get-started/installation/

## Yarn

パッケージ管理には Yarn を利用します。以下を参考に Yarn を使えるようにしておいてください。

https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable

# プロジェクトの実行

```
# 本プロジェクトをcloneしディレクトリに移動
cd kendo-app

# 必要なパッケージのインストール
yarn

# Expoサーバーのスタート
yarn start

# その後画面の支持に従ってシミュレーターなどでアプリを起動
# 例: "i"でiOSシミュレーターにてアプリを実行

```

# ディレクトリ構成

```
├── App.tsx			// メインのファイル,一番始めに実行される
├── app.json		// Expoの各種設定
├── assets			// 画像,フォントなどを格納
├── src					// ソースコードは主にこの中
    ├── components	// 細かいUIコンポーネント
    ├── hooks				// カスタムhooks,ロジックはここに分離する
    ├── navigation	// react-navigation関連,画面遷移を定義
    ├── screens			// 各画面単位のファイル
    ├── store				// reduxのストア
    ├── styles			// 共通のスタイル
    └── types				// 型定義
```

# 利用してる主なライブラリ

## react-navigation

画面遷移のためのライブラリ。

## redux と redux-tool-kit

状態管理のライブラリ。  
redux-tool-kit を用いることで、redux を少し簡単に書くことができます。

## redux-persist

redux の状態を端末(スマホ)に永続化します。  
本アプリではサーバーなどを利用せず端末にデータを保存するため。  
redux のツリーを丸ごと保存しています。
