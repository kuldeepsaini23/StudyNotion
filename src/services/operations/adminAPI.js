import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { categories } from "../apis";

const { CREATE_CATEGORY_API, DELETE_CATEGORY_API, UPDATE_CATEGORY_API } =
  categories;

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
    toast.error("Failed To Create Category");
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
    toast.error("Failed To update Category");
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
    toast.error("Failed To Delete Category");
  }
  toast.dismiss(toastId);
}
