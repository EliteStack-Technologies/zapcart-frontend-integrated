import axios from "axios";

export const getBanners = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/banners?sub_domain_name=abc`
    );
    return response.data.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An error occurred while fetching banners";

    console.error("Error fetching banners:", errorMessage);

    throw new Error(errorMessage);
  }
};

export const getCategory = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories?sub_domain_name=abc`
    );

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An error occurred while fetching categories";

    console.error("Error fetching categories:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const getProduct = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/all?sub_domain_name=abc`
    );

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An error occurred while fetching products";

    console.error("Error fetching products:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const getAccountDetails = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/account-details/details?sub_domain_name=abc`
    );

    // const response = await axios.get(`/api/v1/account-details`);

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An error occurred while fetching account details";

    console.error("Error fetching account details:", errorMessage);

    throw new Error(errorMessage);
  }
};



export const getCategoryProducts = async (categoryId) => {
  
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${categoryId}/products?sub_domain_name=abc`);
console.log(response,'resssssssssss');

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An error occurred while fetching category products";

    console.error("Error fetching category products:", errorMessage);

    throw new Error(errorMessage);
  }
};