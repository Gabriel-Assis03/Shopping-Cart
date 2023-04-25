import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { createProductElement } from './helpers/shopFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

// add os produtos na tela
const list = await fetchProductsList('computador');
list.forEach(async (e) => {
  const product = await createProductElement(e);
  document.querySelector('.products').appendChild(product);
});
// remove o 'caregando...' da tela
const load = document.querySelector('.loading');
load.parentNode.removeChild(load);
