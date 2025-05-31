const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const needlePath = path.join(__dirname, 'node_modules', 'needle');
if (!fs.existsSync(needlePath)) {
  console.log('needle モジュールが見つかりません。npm install needle を実行します...');
  try {
    execSync('npm install needle', { stdio: 'inherit' });
    console.log('needle のインストールが完了しました。\n');
  } catch (err) {
    console.error('needle のインストールに失敗しました:', err);
    process.exit(1);
  }
}

const replayDownloader = require('.');
let [id, savePath, ...fa] = process.argv.slice(2);

const defaultPath = 'C:/Users/Owner/Downloads/replay-downloader-master (1)/replay-downloader-master'; //リプレイファイルを保存するフォルダのパス
type = 'replay'; //ファイルのタイプ(変更する必要なし)
const save_name = `TournamentMatch_${id}`;

const UpdatedbasePath = savePath || defaultPath;
const SaveFilePath = UpdatedbasePath.endsWith('/') ? UpdatedbasePath : UpdatedbasePath + '/';

let checkpoint = false;
let event = false;
let packets = true;

if (fa.includes('--checkpoint') || fa.includes('-c')) checkpoint = true;
if (fa.includes('--event') || fa.includes('-e')) event = true;
if (fa.includes('--no-data') || fa.includes('-nd')) packets = false;

if (type === 'replay') {
  replayDownloader.downloadReplay({
    matchId: id,
    eventCount: event ? 1000 : 0,
    dataCount: packets ? 1000 : 0,
    checkpointCount: checkpoint ? 1000 : 0,
    maxConcurrentDownloads: 10,
    updateCallback: (data) => {
      process.stdout.write(`\rデータ取得中 : ${data.dataChunks.current}/${data.dataChunks.max}`);
      if (data.dataChunks.current === data.dataChunks.max && data.dataChunks.max !== 0) {
        process.stdout.write('\n\n');
        console.log('データ取得が完了しました');
      }
    },
  }).then((replay) => {
    fs.writeFileSync(`${SaveFilePath}${save_name}.replay`, replay);
    console.log(`\n${SaveFilePath}${save_name}.replay にファイルを保存\n`);
  }).catch((err) => {
    console.log(err);
  });
} else if (type === 'metadata') {
  replayDownloader.downloadMetadata({
    matchId: id,
    chunkDownloadLinks: true,
  }).then((metadata) => {
    fs.writeFileSync(`${id}.json`, JSON.stringify(metadata, null, 2));
  }).catch((err) => {
    console.log(err);
  });
} else {
  console.log('Invalid type', type);
}
