// 必要な関数をモジュールからインポートする
import { $axios } from "./axiosHelper.js";
import { createErrorElement, createElements } from "./createElement.js";

window.addEventListener("DOMContentLoaded", () => {
  // ここに処理を書いていく

  const list = document.querySelector(".list");

  $axios("https://pokeapi.co/api/v2/pokemon/?limit=151")
    .then(response => {
      const pokemonList = response.data.results;

      const promiseList = pokemonList.map(pokemonData => {

        let pokemonImg;
        let japanesePokemonName;

        return $axios(pokemonData.url)
          .then(response => {
            // 画像を取得
            pokemonImg = response.data.sprites.other["official-artwork"].front_default;

            // thenメソッドにpromiseを返す
            return $axios(response.data.species.url);
          })

          .then(response => {
            // 日本語名を取得
            japanesePokemonName = response.data.names[0].name;

            return { pokemonImg, japanesePokemonName };
          })

          .catch(message => {
            createErrorElement(message);
            console.log(message);
          });
      });

      Promise.all(promiseList)
        .then(promiseList => {
          for (const pokemon of promiseList) {

            // HTML要素を生成
            const pokemonHTML =
            `
              <li class="list-item">
                <div class="character">
                  <img src="${pokemon.pokemonImg}" width="475" height="475" alt="" class="character__img">
                </div>
                <p class="character__name">${pokemon.japanesePokemonName}</p>
              </li>
            `
            const fragment = createElements(pokemonHTML);
            list.appendChild(fragment);
          }
        })

        .catch(message => {
          createErrorElement(message);
          console.log(message);
        });
    })

    .catch((message) => {
      createErrorElement(message);
      console.log(message);
    });
})