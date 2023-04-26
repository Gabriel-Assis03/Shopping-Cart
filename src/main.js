import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
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

// add id no localStorage
// localStorage.clear(); // limpa o localStorage
const allProducts = await document.getElementsByClassName('product');
for (let index = 0; index < allProducts.length; index += 1) {
  const filho = allProducts[index].childNodes;
  filho[4].addEventListener('click', () => {
    saveCartID(filho[0].textContent);

    const ol = document.querySelector('.cart__products');
    const li = document.querySelectorAll('.cart__product');
    console.log(li);
    if (li !== null) {
      li.forEach((e) => ol.removeChild(e));
    }

    const idsCart = JSON.parse(localStorage.getItem('cartProducts'));
    if (idsCart !== null) {
      for (let index2 = 0; index2 < idsCart.length; index2 += 1) {
        fetchProduct(idsCart[index2])
          .then((product) => createCartProductElement(product))
          .then((productCart) => document.querySelector('.cart__products')
            .appendChild(productCart))
          .catch((error) => console.log('Erro ao fazer requisição.', error.message));
      }
    }
  });
}
// add ids na tela
// const idsCart = JSON.parse(localStorage.getItem('cartProducts'));
// if (idsCart !== null) {
//   for (let index = 0; index < idsCart.length; index += 1) {
//     fetchProduct(idsCart[index])
//       .then((product) => createCartProductElement(product))
//       .then((productCart) => document.querySelector('.cart__products')
//         .appendChild(productCart))
//       .catch((error) => console.log('Erro ao fazer requisição.', error.message));
//   }
// }

// idsCart.forEach(async (e) => {
//   const product = await fetchProduct(e);
//   const productCart = await createCartElement(product);
//   document.querySelector('.cart__products').appendChild(productCart);
// });
