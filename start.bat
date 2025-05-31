@echo off
chcp 65001 > nul

:input_matchid
echo.
echo マッチIDを入力してください (入力必須)
set /p matchId=ここに入力... : 

REM 入力チェック
IF "%matchId%"=="" (
    echo.
    echo ⚠️ マッチIDは必須です。
    echo.
    goto input_matchid
)

REM ハイフンを全部消す
set "matchId=%matchId:-=%"

REM 入力チェック
set "len=0"
set "tmp=%matchId%"
:len_loop
if not "%tmp%"=="" (
    set "tmp=%tmp:~1%"
    set /a len+=1
    goto len_loop
)

REM デフォルト保存パス
set "defaultSavePath=C:/Users/%USERNAME%/Downloads/replay-downloader-ReplayFiles"

if not %len%==32 (
    echo.
    echo ⚠️ 入力は、「- 」を除くと32文字である必要があります。現在の長さ：%len%
    echo.
    goto input_matchid
)

echo.
echo 保存するフォルダパスを入力してください (設定しない場合ダウンロードフォルダーに保存されます)
echo 　　注意 ⚠️ ：パスは必ず「/ 」を使用し、「\ 」や「\\ 」は使わないでください
echo 　　悪い例：C:\Users\User\...
echo 　　(指定しない場合はEnterを押して進んでください)
set /p savePath=ここに入力... : 

echo.
echo 以下の内容で出力します...
echo マッチID: %matchId%
if "%savePath%"=="" (
    echo ファイルパス: %defaultSavePath%
) else (
    echo ファイルパス: %savePath%
)

echo.
REM 入力がある場合はNode.jsスクリプト実行
node test.js %matchId% "%savePath%"

:confirm_retry
echo.
set /p retry=もう一度入力しますか？ [y/n] : 
if /i "%retry%"=="y" goto input_matchid
if /i "%retry%"=="n" goto end
echo 不正な入力です。y または n を入力してください。
goto confirm_retry


:end
echo 終了します...
exit /b