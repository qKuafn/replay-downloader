[![npm version](https://badge.fury.io/js/fortnite-replay-downloader.svg)](https://npmjs.com/package/fortnite-replay-downloader)

# Fortnite Tournament Replay Downloader

@xNocken が作成したものに、コメントを追加 & run.batを作成

このリポジトリ全体をダウンロード or npm をダウンロード ➡️ このリポジトリの test.js と run.bat を入れる で使用可能

## 使用方法
test.jsを書き換えて使用
```js
const defaultPath = 'C:/Users/user名/Desktop/replay-downloader/Exports';
// 出力するファイルパスを事前に指定

type = 'replay';
// リプレイとして出力 (基本は変更不要)

const save_name = 'TournamentMatch_${id}.replay';
// 保存するファイル名を変更。${id} は入力したマッチID。｢.replay｣は消すと正常に動きません
```