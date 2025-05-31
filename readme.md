[![npm version](https://badge.fury.io/js/fortnite-replay-downloader.svg)](https://npmjs.com/package/fortnite-replay-downloader)

# Fortnite Tournament Replay Downloader

@xNocken が作成したものに、コメントを追加 & run.batを作成

## 使用方法
⭐️  [Node.js](https://nodejs.org/ja/download)のダウンロードが必要です 
⭐️  このリポジトリ全体をダウンロード または、 [npm](https://npmjs.com/package/fortnite-replay-downloader) をダウンロード ➡️ このリポジトリの test.js と run.bat を入れる(置き換え)ことで使用可能です。(後者がおすすめ)

### run.batを起動し、表示される内容を入力するとリプレイファイルがダウンロードされます

## カスタム設定

カスタムの設定を行う場合、[Visual Studio Code](https://code.visualstudio.com/download)のダウンロードが必要です

```js
const defaultPath = 'C:/Users/user名/Desktop/replay-downloader/Exports';
// 出力するファイルパスを事前に指定

type = 'replay';
// リプレイとして出力 (基本は変更不要)

const save_name = 'TournamentMatch_${id}.replay';
// 保存するファイル名を変更。${id} は入力したマッチID。｢.replay｣は消すと正常に動きません
```