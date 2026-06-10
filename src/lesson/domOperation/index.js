import 'animate.css';

// ここにコードを書きながら確認しましょう！
const title = document.getElementById('title');
const button = document.getElementById('button');
const eventTypeCard = document.querySelector(".card-type--yellow");
const card = document.querySelector(".card");


// 取得したbutton要素を対象の要素に設定
// button.addEventListener('イベントの種類', イベント発生後に実行する関数);

button.addEventListener("click", () => {
  title.classList.add("animate__hinge");
  setTimeout(() => {
    title.classList.remove("animate__hinge");
    card.classList.add("card-animation");
    eventTypeCard.style.display = '';
    eventTypeCard.classList.add("animate__fadeInUp");
  }, 2000);
})









// ↑ 練習問題はここまで書いてきたコードに追記する形で実装してください。 ↑
