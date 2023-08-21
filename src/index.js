import { fetchBreeds, fetchCatByBreed, loader } from './cat-api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

refs.breedSelect.addEventListener('change', onBreedSelect);

fetchBreeds()
  .then(data => {
    data.map(breed => renderBreedSelect(breed));
  })
  .catch(() =>
    Notify.failure('Oops! Something went wrong! Try reloading the page!')
  )
  .finally(() => {
    refs.breedSelect.classList.remove('visually-hidden');
    loader.classList.add('visually-hidden');
    new SlimSelect({
      select: '.breed-select',
      settings: {
        placeholderText: 'Select breed',
      },
    });
  });

function onBreedSelect(e) {
  loader.classList.remove('visually-hidden');
  refs.catInfo.classList.add('visually-hidden');
  fetchCatByBreed(e.target.value)
    .then(data => {
      console.log(data.breeds[0]);
      renderBreedInfo(data);
    })
    .catch(() =>
      Notify.failure('Oops! Something went wrong! Try reloading the page!')
    )
    .finally(() => {
      refs.catInfo.classList.remove('visually-hidden');
      loader.classList.add('visually-hidden');
    });
}

function renderBreedSelect({ reference_image_id, name }) {
  const markup = `<option value="${reference_image_id}">${name}</option>`;
  refs.breedSelect.insertAdjacentHTML('beforeend', markup);
}

function renderBreedInfo({ url, breeds }) {
  const markup = `
  <img src="${url}" alt="${breeds[0].name}">
  <div class="breed-box__text"><h2>${breeds[0].name}</h2><p>${breeds[0].description}</p><p><span class="bold">Temperament:</span> ${breeds[0].temperament}</p></div>`;
  refs.catInfo.innerHTML = markup;
}
