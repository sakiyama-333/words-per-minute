// WPSの計算方法
// 単語数÷秒数×60秒

// 必要なElementを取得
const wordsCount = document.querySelector(".words-count");
let getTextarea = document.querySelector("#english-text")

//----------------   単語数を調べる   ----------------

getTextarea.addEventListener("input", () => {
    // 空白文字で区切って配列に単語を格納。単語数を調べる
    getTextarea = document
    .querySelector("#english-text")
    .value.split(" ").length;
    // 単語数を表示
  wordsCount.innerHTML = `単語数: ${getTextarea}`;
});

//----------------   タイマー機能   ----------------

// 経過時間を更新するための変数
let elapsedTime = 0;
// setTimeoutの戻り値を入れる変数
let timerId = 0;
// クリック時の時間を保持するための変数
let startTime = 0;
// ストップした時の時間を保持するための変数。ストップ→再開した時に0から始まるのを防ぐ
let timeToadd = 0;
// 分
let minutes = 0;
// 秒
let seconds = 0;

// 必要なElementを取得
const startBtn = document.querySelector("#start-button");
const stopBtn = document.querySelector("#stop-button");
const resetBtn = document.querySelector("#reset-button");
const timerElement = document.querySelector(".timer");

// ミリ秒から分・秒に変換する関数
function timeFunction() {
  minutes = Math.floor(elapsedTime / 60000);
  seconds = Math.floor((elapsedTime % 60000) / 1000);

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
startBtn.addEventListener("mousedown", () => {
  startTime = Date.now();
  countUp();
});

// ストップボタンを押した時の処理
let resultValue;
let score;
stopBtn.addEventListener("mousedown",() => {
  clearTimeout(timerId);
  timeToadd += Date.now() - startTime;
  //----------------   スコアを更新   ----------------
  let timeTaken = parseInt(minutes) * 60 + parseInt(seconds);
  score = Math.round((getTextarea / timeTaken) * 60);
  // Elementを取得し、書き換える
  resultValue = document.querySelector(".result-value");
  resultValue.textContent = score;
});

// // リセットボタンをクリックした時の処理
let nowTimeDate = 0;
let scoreList = [];
let storage = localStorage;
resetBtn.addEventListener("mousedown",() => {
  // 値をクリア
  elapsedTime = 0;
  timeToadd = 0;
  timeFunction();
  // TODO: textarea内の値も削除

  // 今日の日時を取得
  const now = new Date();
  const year = now.getFullYear();
  const Month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  // 時間・分が一桁だったら、先頭に0を付ける
  if (hour < 10 && minute < 10) {
    nowTimeDate = `${year}/${Month}/${day} 0${hour}:0${minute}`;
  } else if (minute < 10) {
    nowTimeDate = `${year}/${Month}/${day} ${hour}:0${minute}`;
  } else {
    nowTimeDate = `${year}/${Month}/${day} ${hour}:${minute}`;
  }

  const scoreItem = {
    timeDate: nowTimeDate,
    pastScore: score,
  };
  scoreList.push(scoreItem);
  storage.item = JSON.stringify(scoreList);
  const parentUl = document.querySelector("#parent-ul");
  const li = document.createElement("li");
  li.className = "pastScores";
  parentUl.appendChild(li);
  li.innerHTML = `${scoreItem.timeDate} => ${scoreItem.pastScore}`;
});

// リロード時に過去のスコアを取得、表示
document.addEventListener("DOMContentLoaded", () => {
  const json = storage.item;
  if (json === undefined) {
    return;
  }
  scoreList = JSON.parse(json);

  for (const items of scoreList) {
    const li = document.createElement("li");
    li.className = "pastScores";
    const parentUl = document.querySelector("#parent-ul");
    parentUl.appendChild(li);
    li.innerHTML = `${items.timeDate} => ${items.pastScore}`;
  }
});
