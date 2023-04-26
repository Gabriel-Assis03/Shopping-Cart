import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { createProductElement } from './helpers/shopFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { saveCartID } from './helpers/cartFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

// add os produtos na tela
const list = await fetchProductsList('computador');
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

// add produtos ao carrinho

// localStorage.clear();
const allProducts = await document.getElementsByClassName('product');
for (let index = 0; index < allProducts.length; index += 1) {
  const filho = allProducts[index].childNodes;
  filho[4].addEventListener('click', () => {
    saveCartID(filho[0].textContent);
  });
}
