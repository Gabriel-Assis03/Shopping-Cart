export const getAddress = async (cep) => {
  // seu código aqui
  const dados = Promise.any([
    fetch(`https://cep.awesomeapi.com.br/json/${cep}`),
    fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`),
  ])
    .then((response) => response.json());
  return dados;
};

async function verificaCep(cep) {
  const { message } = await getAddress(cep);
  if (message !== undefined) {
    throw new Error('CEP não encontrado');
  }
}

export const searchCep = async () => {
  // seu código aqui
  const span = document.querySelector('.cart__address');
  const cep = document.querySelector('.cep-input').value;
  try {
    await verificaCep(cep);
  } catch (error) {
    span.innerHTML = 'CEP não encontrado';
    return;
  }
  const { city, state, street, neighborhood, address, district } = await getAddress(cep);
  const messa = `${street || address} - ${neighborhood || district} - ${city} - ${state}`;
  span.innerHTML = messa;
};
