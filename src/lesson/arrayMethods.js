// ここにコードを書きながら確認しましょう！











// 練習問題
// 問題 1
const array = [
  {
    tag: 'p',
    className: 'hoge',
  },
  {
    tag: 'div',
    className: 'fuga',
  },
  {
    tag: 'h1',
    className: 'piyo',
  },
];

// プロパティclassNameのvalueにc-というプレフィックスを付与

// consoleの出力が下記のようになっていればOKです。

// [
//   { tag: 'p', className: 'c-hoge' },
//   { tag: 'div', className: 'c-fuga' },
//   { tag: 'h1', className: 'c-piyo' }
// ]

const newArray = array.map(object => ({...object, className: `c-${object.className}` }));
console.log(newArray);