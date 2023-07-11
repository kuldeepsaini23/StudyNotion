import { toast } from "react-hot-toast";
import { searchEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";

const {SEARCH_PREDEFINED_RESULT_API, QUERY_SEARCH_API, SEARCH_PAGE_API } = searchEndpoints;

export const getAllCourses = async () => {
  let result = [];

  try {
    const response = await apiConnector(
      "GET",
      SEARCH_PREDEFINED_RESULT_API,
      null
    
    );
    console.log("INSTRUCTOR COURSES API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("INSTRUCTOR COURSES API ERROR............", error);
    toast.error(error.message);
  }
  return result;
};



export const getQueryCourses = async (query) => {
  let result = [];
  
  try {
    const response = await apiConnector(
      "GET",
      `${QUERY_SEARCH_API}/${query}`,
      null
    
    );
    console.log("QUERY SEARCH_API API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses");
    }
    result = response?.data;
  } catch (error) {
    console.log("QUERY SEARCH_API API ERROR............", error);
    // toast.error(error.message);
  }
  return result;
};


export const getSearchPageData = async (query) => {
  let result = [];
  
  try {
    const response = await apiConnector(
      "GET",
      `${SEARCH_PAGE_API}/${query}`,
      null
    
    );
    console.log("SEARCH_PAGE_API API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("SEARCH_PAGE_API API ERROR............", error);
    // toast.error(error.message);
  }
  return result;
};

