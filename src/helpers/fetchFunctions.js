export const fetchProduct = async (id = null) => {
  try {
    if (id !== null) {
      const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
      const data = await response.json();
      return data;
    }
    throw new Error('ID não informado');
  } catch (error) {
    console.error(error);
  }
};

export const fetchProductsList = async (product = null) => {
  // if (!product) throw new Error('Termo de busca não informado');
  // const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
  // const data = await response.json();
  // return data.results;
  try {
    if (product !== null) {
      const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
      const data = await response.json();
      return data.results;
    }
    throw new Error('Termo de busca não informado');
  } catch (error) {
    console.error(error);
  }
};
