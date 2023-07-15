import { contactusEndpoint } from "../apis";
import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";

const { CONTACT_US_API } = contactusEndpoint;

export function contactUsForm(
  countrycode,
  email,
  firstName,
  lastaName,
  message,
  phoneNo
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    
    try {
      const response = await apiConnector("POST", CONTACT_US_API, {
        countrycode,
        email,
        firstName,
        lastaName,
        message,
        phoneNo,
      });

      console.log("CONTACT_US_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Message Sent Successful");
    } catch (error) {
      console.log("CONTACT_US_API API ERROR............", error);
      toast.error("Message did not Recieved");
    }
    toast.dismiss(toastId);
  };
}
