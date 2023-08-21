import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_7RvyBjI9s8tKxNXCwK8Fjin3OTq1zRAwAx3zXW20WQ8I0OVrZ5z1E7PAyLAYiDvg';

export const loader = document.querySelector('.loader');
const BREEDS_URL = 'https://api.thecatapi.com/v1/breeds';
const CAT_INFO_URL = 'https://api.thecatapi.com/v1/images/';

export function fetchBreeds() {
  return fetch(BREEDS_URL).then(res => {
    if (!res.ok) {
      loader.classList.add('visually-hidden');
      throw new Error(res.status);
    }
    return res.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(`${CAT_INFO_URL}${breedId}`).then(res => {
    if (!res.ok) {
      loader.classList.add('visually-hidden');
      throw new Error(res.status);
    }
    return res.json();
  });
}
