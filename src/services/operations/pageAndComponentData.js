import { toast } from 'react-hot-toast'
import { apiConnector } from '../apiconnector'
import {catalogData} from "../apis"

export const  getCatalogPageData = async(categoryId)=> {
  //creating toast of laosing
  const toastId = toast.loading("Loading...")
  let result = []
  try{
    //calling api
    const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {categoryId:categoryId})
    // console.log("Catalog COURSES API RESPONSE............", response)
    if(!response?.data?.success)
      throw new Error("Could not fetch category page Details")

      result = response?.data;
      // console.log(result);
      // toast.success("Catalog Data Fetched Successfully")

  }catch(error){
    console.log("CATALOG PAGE DATA API ERROR.....", error);
    result = error.response?.data
    toast.error("Something Went Wrong")
  }
  //removing toast
  toast.dismiss(toastId)
  return result
}

