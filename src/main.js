import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { saveCartID } from './helpers/cartFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

// add os produtos na tela
try {
  const list = await fetchProductsList('computador');
  list.forEach(async (e) => {
    const product = await createProductElement(e);
    document.querySelector('.products').appendChild(product);
  });
} catch (error) {
  console.error(error);
  const h2 = document.createElement('h2');
  h2.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
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
  filho[4].addEventListener('click', async () => {
    saveCartID(filho[0].textContent);

    // atualiza o carrinho
    const cartProducts = document.querySelector('.cart__products');
    const li = document.querySelectorAll('.cart__product');
    if (li !== null) {
      li.forEach((e) => cartProducts.removeChild(e));
    }
    const totalPrice = document.querySelector('.total-price');
    let soma = Number(localStorage.getItem('totalCart'));
    const idsCart = JSON.parse(localStorage.getItem('cartProducts'));
    if (idsCart !== null) {
      for (let index2 = 0; index2 < idsCart.length; index2 += 1) {
        fetchProduct(idsCart[index2])
          .then((product) => createCartProductElement(product))
          .then((productCart) => cartProducts
            .appendChild(productCart))
          .catch((error) => console.log('Erro ao fazer requisição.', error.message));
      }
      const price = document.querySelectorAll('.product__price__value')[index];
      console.log(price);
      soma += Number(price.innerHTML);
      totalPrice.innerHTML = soma;
      localStorage.setItem('totalCart', soma);
    }
  });
}
const idsCart = JSON.parse(localStorage.getItem('cartProducts'));
const totalPrice = document.querySelector('.total-price');
let soma = 0;
if (idsCart !== null) {
  for (let index = 0; index < idsCart.length; index += 1) {
    // add ids na tela
    fetchProduct(idsCart[index])
      .then((product) => createCartProductElement(product))
      .then((productCart) => document.querySelector('.cart__products')
        .appendChild(productCart))
      .catch((error) => console.log('Erro ao fazer requisição.', error.message));
    soma = localStorage.getItem('totalCart');
    totalPrice.innerHTML = soma;
  }
}
