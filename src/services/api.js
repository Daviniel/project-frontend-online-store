const BASE_URL = 'https://api.mercadolibre.com';

export async function getCategories() {
  try {
    const response = await fetch(`${BASE_URL}/sites/MLB/categories`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  try {
    const response = await fetch(`${BASE_URL}/sites/MLB/search?category=${categoryId}&q=${query}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}