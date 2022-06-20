// WPSの計算方法
// 単語数÷秒数×60秒

// 必要なElementを取得
const countBtn = document.querySelector("#count-button");
const wordsCount = document.querySelector(".words-count");

//----------------   単語数を調べる   ----------------

function countBtnClick() {
  // 空白文字で区切って配列に単語を格納。単語数を調べる
  const englishTextCount = document
    .querySelector("#english-text")
    .value.split(" ").length;
  // 単語数を表示
  wordsCount.innerHTML = `単語数: ${englishTextCount}`;
}
countBtn.addEventListener("click", countBtnClick);


//----------------   タイマー機能   ----------------

// 経過時間を更新するための変数
let elapsedTime = 0;
// setTimeoutの戻り値を入れる変数
let timerId = 0;
// クリック時の時間を保持するための変数
let startTime = 0;
// ストップした時の時間を保持するための変数。ストップ→再開した時に0から始まるのを防ぐ
let timeToadd = 0

// 必要なElementを取得
const startBtn = document.querySelector("#start-button");
const stopBtn = document.querySelector("#stop-button");
const resetBtn = document.querySelector("#reset-button");
const timerElement = document.querySelector(".timer");

// ミリ秒から分・秒に変換する関数
function timeFunction() {
  let minutes = Math.floor(elapsedTime / 60000);
  let seconds = Math.floor((elapsedTime % 60000) / 1000);

  // HTMLを書き換える
  minutes = ("0" + minutes).slice(-2);
  seconds = ("0" + seconds).slice(-2);
  timerElement.textContent = minutes + ":" + seconds;
}

// 経過時間を計算する関数
function countUp() {
  timerId = setTimeout(function () {
    elapsedTime = Date.now() - startTime;
    elapsedTime = Date.now() - startTime + timeToadd;

    timeFunction();

    countUp();
  }, 1000);
}

// スタートボタンを押した時の処理
startBtn.addEventListener("mousedown", function () {
  startTime = Date.now();
  countUp();
});

// ストップボタンを押した時の処理
stopBtn.addEventListener("mousedown", function () {
  clearTimeout(timerId);
  timeToadd += Date.now() - startTime;
});

// // リセットボタンをクリックした時の処理
resetBtn.addEventListener("mousedown", function () {
  elapsedTime = 0;
  timeToadd = 0;
  timeFunction();
});

