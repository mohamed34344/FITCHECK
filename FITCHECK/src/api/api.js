const API_URL = "https://dummyjson.com/products";

export const getProducts = async () => {
    const response  = await fetch(`${API_URL}?limit=0`);
    const data = await response.json();
    return data.products;
};

export const getProductById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    return data;
}