// 必要な関数をモジュールからインポートする
import { $axios } from "./axiosHelper.js";
import { createErrorElement, createElements } from "./createElement.js";

window.addEventListener("DOMContentLoaded", () => {
  // ここに処理を書いていく

  const list = document.querySelector(".list");

  $axios("https://pokeapi.co/api/v2/pokemon/?limit=151")
    .then((response) => {
      // ポケモンの一覧情報がconsoleに表示される

      for (let i = 0; i < 151; i++) {
        $axios(response.data.results[i].url)
          .then((response) => {
            // 画像を取得
            const pokemonImg = response.data.sprites.other["official-artwork"].front_default;

            $axios(response.data.species.url).then((response) => {
              // 日本語名を取得
              const japanesePokemonName = response.data.names[0].name;

              // HTML要素を生成
              const pokemonHTML = 
              `<li class="list-item">
                <div class="character">
                  <img src="${pokemonImg}" width="475" height="475" alt="" class="character__img">
                </div>
                <p class="character__name">${japanesePokemonName}</p>
              </li>
              `
              const fragment = createElements(pokemonHTML);
              list.appendChild(fragment);
            });
          })
      };
    })

    .catch((message) => {
      createErrorElement(message);
      console.log(message);
    });
});
