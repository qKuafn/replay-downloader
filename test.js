const fs = require('fs');

const replayDownloader = require('.');

let [id, savePath, ...fa] = process.argv.slice(2);

// この下3行は変更可能
const defaultPath = 'C:/Users/user名/Desktop/replay-downloader/Exports'; // 出力するファイルパスを事前に指定
type = 'replay'; // リプレイとして出力 (基本は変更不要)
const save_name = 'TournamentMatch_${id}.replay'; // 保存するファイル名を変更。${id} は入力したマッチID。｢.replay｣は消すと正常に動きません

const UpdatedbasePath = savePath || defaultPath;
const SaveFilePath = UpdatedbasePath.endsWith('/') ? UpdatedbasePath : UpdatedbasePath + '/';

let checkpoint = false;
let event = false;
let packets = true;

if (fa.includes('--checkpoint') || fa.includes('-c')) {
  checkpoint = true;
}

if (fa.includes('--event') || fa.includes('-e')) {
  event = true;
}

if (fa.includes('--no-data') || fa.includes('-nd')) {
  packets = false;
}

if (type === 'replay') {
  replayDownloader.downloadReplay({
    matchId: id,
    eventCount: event ? 1000 : 0,
    dataCount: packets ? 1000 : 0,
    checkpointCount: checkpoint ? 1000 : 0,
    maxConcurrentDownloads: 10,
    updateCallback: (data) => {
      // console.log('One');
      // console.log('header', `${data.header.current}/${data.header.max}`);
      process.stdout.write(`\rデータ取得中 : ${data.dataChunks.current}/${data.dataChunks.max}`);
      if (data.dataChunks.current === data.dataChunks.max && data.dataChunks.max !== 0) {
        process.stdout.write('\n\n');
        console.log('データ取得が完了しました') ;
      }
      // console.log('events', `${data.eventChunks.current}/${data.eventChunks.max}`);
      // console.log('checkpoints', `${data.checkpointChunks.current}/${data.checkpointChunks.max}`);
    },
  }).then((replay) => {
    fs.writeFileSync(`${SaveFilePath}${save_name}.replay`, replay);
    console.log(`\n${SaveFilePath}${save_name}.replay にファイルを保存\n`) ;
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
