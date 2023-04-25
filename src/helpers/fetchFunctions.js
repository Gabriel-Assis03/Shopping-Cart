export const fetchProduct = async () => {

};

export const fetchProductsList = async (product = null) => {
  // if (product !== null) {
  //   const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
  //   const data = await response.json();
  //   return data.results;
  // }
  // throw new Error('Termo de busca não informado');
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
