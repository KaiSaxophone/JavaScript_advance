// ここにコードを書きながら確認しましょう！

// 問題1
const [one, two, three] = arrayFn('React');
console.log(three);






// 練習問題
// 問題 1
function arrayFn(arg) {
  return ['jQuery', 'Vue', arg];
}

// 問題 2
function objectFn({name}) {
  console.log(name);
}

const argObject = {
  name: 'Gizumo',
  place: 'Shibuya',
};

objectFn(argObject);
