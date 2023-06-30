import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { categories, profileEndpoints } from "../apis";

const { CREATE_CATEGORY_API, DELETE_CATEGORY_API, UPDATE_CATEGORY_API } =
  categories;

const { GET_ALL_USERS_DATA_API, DELETE_ACCOUNT_BY_ADMIN } = profileEndpoints;

export async function createCategory(token, formData) {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_CATEGORY_API, formData, {
      Authorization: `Bearer ${token}`,
    });
    console.log("Create Category RESPONSE....", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    } else {
      result = true;
    }

    toast.success("Category Created");
  } catch (error) {
    console.log("Creating Category ERROR....", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
}

export async function updateCategory(formData, token) {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", UPDATE_CATEGORY_API, formData, {
      Authorization: `Bearer ${token}`,
    });
    console.log("Update Category RESPONSE....", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    } else {
      result = true;
    }

    toast.success(response.data.message);
  } catch (error) {
    console.log("Updating Category ERROR....", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
}

export async function deleteCategory(data, token) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("DELETE", DELETE_CATEGORY_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("Deleting Category RESPONSE....", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success(response.data.message);
  } catch (error) {
    console.log("Deleting Category ERROR....", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
}

export async function allUserData(token) {
  const toastId = toast.loading("Loading...");

  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_USERS_DATA_API, null,{
      Authorization: `Bearer ${token}`,
    });
    console.log("GETING ALL USERS DATA RESPONSE....", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;

    toast.success("Successfull");
  } catch (error) {
    console.log("Deleting Category ERROR....", error);
    toast.error("Something Went Wrong");
  }
  toast.dismiss(toastId);
  return result;
}

export async function deleteAccountByAdmin(userId, token) {
  const toastId = toast.loading("Loading...");


  try {
    const response = await apiConnector("DELETE", DELETE_ACCOUNT_BY_ADMIN, {userId},{
      Authorization: `Bearer ${token}`,
    });
    console.log("DELEETE ACCOUNT BY ADMIN API RESPONSE....", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Delete Successfull");
  } catch (error) {
    console.log("Deleting Category ERROR....", error);
    toast.error("Something Went Wrong");
  }
  toast.dismiss(toastId);

}

