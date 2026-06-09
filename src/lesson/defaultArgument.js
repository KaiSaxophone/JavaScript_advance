// ここにコードを書きながら確認しましょう！

console.log(discountRateCalc(4500));

console.log(discountRateCalc(6000, 20));








// 練習問題
// 問題 1
function discountRateCalc(price, rate = 5) {
  return price * (1 - rate * 0.01);
}