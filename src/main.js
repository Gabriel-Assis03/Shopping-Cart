import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { createProductElement } from './helpers/shopFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

// add os produtos na tela
const list = await fetchProductsList('computador');
console.log(list);
try {
  if (list !== undefined && list.length !== 0) {
    list.forEach(async (e) => {
      const product = await createProductElement(e);
      document.querySelector('.products').appendChild(product);
    });
  } else {
    throw new Error('Algum erro ocorreu, recarregue a página e tente novamente');
  }
} catch (error) {
  console.error(error);
  const h2 = document.createElement('h2');
  h2.innerHTML = error.message;
  h2.className = 'error';
  document.querySelector('.products').appendChild(h2);
}
// remove o 'caregando...' da tela
const load = document.querySelector('.loading');
load.parentNode.removeChild(load);
