import axios from 'axios';
import { createErrorElement, createElements } from './createElement.js';

window.addEventListener('DOMContentLoaded', () => {

  const formElement = document.forms['search-form'];

  formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const characterElement = document.getElementById('character');
    const messageElement = document.getElementById('error-message');
    const pictureBookId = formElement.elements['id'].value;

    if (messageElement !== null) messageElement.remove();
    while (characterElement.lastChild) {
      characterElement.removeChild(characterElement.lastChild);
    }
    
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pictureBookId}`)
      .then(({data}) => {
        const imgPath = data.sprites.other['official-artwork'].front_default;
        const jaRequestUrl = data.species.url;

        axios.get(jaRequestUrl)
          .then(({data}) => {
            const characterName = data.names[0].name;

            const imgElement = `<img src="${imgPath}" width="475" height="475" alt="" class="character__img">`;
            const nameElement = `<p class="character__name">${characterName}</p>`;
            const fragment = createElements(imgElement + nameElement);

            characterElement.appendChild(fragment);

          }).catch((error) => {
            formElement.after(createErrorElement('エラーが発生しました。時間をおいて再度お試しください。'));
          })

      }).catch((error) => {

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