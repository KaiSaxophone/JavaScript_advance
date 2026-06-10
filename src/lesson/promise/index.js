// ここにコードを書きながら確認しましょう！

// Promiseで非同期処理の完了を待機するパターン

// console.log('1番目の処理');

// new Promise(resolve => {
//   setTimeout(() => {
//     console.log('2番目の処理');
//     resolve();
//   }, 2000);
// }).then(() => {
//   setTimeout(() => {
//     console.log('3番目の処理');
//   }, 1000);
// });










// 練習問題
// 問題 1

// 関数returnPromiseを実行し、非同期処理の結果である「エラーが発生しました」をconsoleに出力してください。
// ただし、関数returnPromiseは編集しないこと。
const returnPromise = () => {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject('エラーが発生しました');
    }, 3000);
  });
};

returnPromise()
  .catch((message) => console.log(message));