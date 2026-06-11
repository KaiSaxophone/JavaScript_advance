import axios from 'axios';
import { createErrorElement, createElements } from './createElement.js';

// window.addEventListener('DOMContentLoaded', () => {
//   // HTMLのパース（解析）が完了したら実行される

//   // formタグを取得
//   const formElement = document.forms['search-form'];

//   formElement.addEventListener('submit', (event) => {
//     // 「検索」ボタンをクリックした後の処理

//     // formのデフォルトの動作をキャンセル
//     event.preventDefault();

//     const characterElement = document.getElementById('character');
//     const messageElement = document.getElementById('error-message');
//     const pictureBookId = formElement.elements['id'].value;

//     // 表示の初期化
//     if (messageElement !== null) messageElement.remove();
//     while (characterElement.lastChild) {
//       characterElement.removeChild(characterElement.lastChild);
//     }

//     axios.get(`https://pokeapi.co/api/v2/pokemon/${pictureBookId}`).then(({data}) => {

//       // API通信が成功した時の処理
//       // console.log(data);
//       // ポケモンの画像url
//       const imgPath = data.sprites.other['official-artwork'].front_default;
//       // 日本語訳のリクエスト先url
//       const jaRequestUrl = data.species.url;

//       axios.get(jaRequestUrl).then(({ data }) => {
//         // ポケモン名の日本語訳
//         const characterName = data.names[0].name;

//         //取得したポケモンの情報をもとに表示するHTML要素を作成
//         const imgElement = `<img src="${imgPath}" width="475" height="475" alt="" class="character__img">`;
//         const nameElement = `<p class="character__name">${characterName}</p>`;
//         const fragment = createElements(imgElement + nameElement);

//         characterElement.appendChild(fragment);

//       }).catch(error => {
//         // console.log(error);
//       });
    
//     }).catch(error => {
//     // API通信が失敗した時の処理
//       // console.log(error);

//       // リクエストに失敗した場合はエラーメッセージを表示
//       switch (error.response && error.response.status) {
//         case 404:
//           formElement.after(createErrorElement(error.message));
//           break;
//         default:
//           formElement.after(createErrorElement('エラーが発生しました。時間をおいて再度お試しください。'));
//           break;
//       }
//     });
//   });
// });


// HTMLの読み込みとパース（解析）が完了したら発火
window.addEventListener('DOMContentLoaded', () => {

  // formタグを取得
  const formElement = document.forms['search-form'];
  // console.log(formElement);

  // フォームが送信されると発火
  formElement.addEventListener('submit', (event) => {
    // formのデフォルトの動作をキャンセル
      // ? formはデフォルトの動作としてサーバーにリクエストを送信する
      // ? 今回は非同期で通信を行うのでこの機能は不要のため無効化
    event.preventDefault(); // prevent = 防ぐ
    // console.log('検索ボタンがクリックされました。');

    // HTML要素とformのidの値を取得
      // ポケモン情報挿入用のdivタグ
    const characterElement = document.getElementById('character');
    // console.log(characterElement);
      // エラーメッセージ
    const messageElement = document.getElementById('error-message');
    // console.log(messageElement);
    // フォームで入力されたid
    const pictureBookId = formElement.elements['id'].value;
    // console.log(pictureBookId);

    // 初期化処理
    if (messageElement !== null) messageElement.remove();
    while (characterElement.lastChild) {
      characterElement.removeChild(characterElement.lastChild);
    }
    
    // 受け取ったidをもとにaxiosでajax通信
      // 通信成功時、responseのdataプロパティを取得
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pictureBookId}`)
      .then(({data}) => {
        // console.log(data);
        
        // dataオブジェクトの中から画像URLを探して変数に代入
        const imgPath = data.sprites.other['official-artwork'].front_default;
        // console.log(data.sprites.other['official-artwork'].front_default);
        // 日本語名取得URLを変数に代入
        const jaRequestUrl = data.species.url;
        // console.log(jaRequestUrl);

        // 再度axiosで日本語名取得する
        axios.get(jaRequestUrl)
          .then(({data}) => {
            const characterName = data.names[0].name;
            // console.log(characterName);

            // 取得したポケモン情報をもとに画面表示するHTMLを作成
              // imgタグの作成
            const imgElement = `<img src="${imgPath}" width="475" height="475" alt="" class="character__img">`;
              // pタグの作成
            const nameElement = `<p class="character__name">${characterName}</p>`;
              // 上記2つの要素を結合
            const fragment = createElements(imgElement + nameElement);
            console.log(fragment);

            characterElement.appendChild(fragment);

          }).catch((error) => {
            formElement.after(createErrorElement('エラーが発生しました。時間をおいて再度お試しください。'));
          })

      }).catch((error) => {

        // リクエストに失敗した場合はエラーメッセージを表示
        switch (error.response && error.response.status) {
          case 404:
            formElement.after(createErrorElement(error.message));
            break;
          default:
            formElement.after(createErrorElement('エラーが発生しました。時間をおいて再度お試しください。'));
            break;
        }
      })
    
  });
  
})