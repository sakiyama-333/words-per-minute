// WPSの計算方法
// 単語数÷秒数×60秒

// 「単語数を計測」ボタンを取得
const countBtn = document.querySelector("#count-button");
// 単語数を表示する領域を取得
const wordsCount = document.querySelector(".words-count");

function countBtnClick() {
  // 空白文字で区切って配列に単語を格納。単語数を調べる
  const englishTextCount = document
    .querySelector("#english-text")
    .value.split(" ").length;
  // 単語数を表示
  wordsCount.innerHTML = `単語数: ${englishTextCount}`;
}
countBtn.addEventListener("click", countBtnClick);

// タイマー機能

// スコアの部分を更新
