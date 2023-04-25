import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { createProductElement } from './helpers/shopFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const list = await fetchProductsList('computador');
list.forEach(async (e) => {
  const product = await createProductElement(e);
  document.querySelector('.products').appendChild(product);
});
