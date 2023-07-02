import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPayment } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints

function loadScript(src) {
  return new Promise((resolve)=>{
    const script = document.createElement("script");
    script.src = src;

    script.onload = ()=>{
      resolve(true);
    }

    script.onerror = ()=>{
      resolve(false)
    }

    document.body.appendChild(script);
  })
}


//Capture payment
export async function buyCourse(token, courses, userDeatils, navigate, dispatch){
  const toastId = toast.loading("Loading...");
  try{
    //laod the script
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    // Validate 
    if(!res){
      toast.error("RazorPay SDK failed to load")
      return;
    }

    //initiate the order
    const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API,{courses},{
      Authorization: `Bearer ${token}`,
    })

    if(!orderResponse.data.success){
      throw new Error(orderResponse.data.message);
    }
    // console.log("PAYMENT CAPTURING RESPONSE....",orderResponse);

    //options
    const options = {
      key:process.env.RAZORPAY_KEY,
      currency:orderResponse.data.message.currency,
      amount:`${orderResponse.data.message.amount}`,
      order_id:orderResponse.data.message.id,
      name: "StudyNotion",
      description:"thank you for Purchasing the Courses",
      image:rzpLogo,
      prefill:{
        name:`${userDeatils.firstName} ${userDeatils.lastName}`,
        email:`${userDeatils.email}`
      },
      handler:function(response){
        //send successfull mail
        sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token);

        //verify payment
        verifyPayment({...response, courses}, token, navigate, dispatch)
      },
    }

    //opening payment dialog box(Miss hogya tha ye)
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function(response){
      toast.error("Oops, Payment failed");
      console.log("Cannot open payment window");
    })


  }catch(error){
    console.log("PAYMENT CAPTURING ERROR....", error);
    toast.error("Could not make Payment")
  } 

  toast.dismiss(toastId)
}

//Send mail
async function sendPaymentSuccessEmail(response, amount, token){
  try{
    await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
      orderId: response.razorpay_order_id,
      paymentId: response.razorpay_payment_id,
      amount:amount 
    },{
      Authorization: `Bearer ${token}`,
    })
    
  }catch(error){
    console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
  }
}

//verify payemnt --> not need to export because they are called when capture payment runs
async function verifyPayment(bodyData, token, navigate, dispatch){
  const toastId = toast.loading("Loading...");
  dispatch(setPayment(true));
  try{
 
    const response = await apiConnector("POST", COURSE_VERIFY_API,
      bodyData,{
        Authorization: `Bearer ${token}`,
      }
    )

    if(!response.data.success){
      throw new Error(response.data.message);
    }
    // console.log("PAYMENT VERIFY RESPONSE....",response);
    toast.success("Payment Successfull")
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());

  }catch(error){
    console.log("PAYMENT VERIFY ERROR...", error);
    toast.error("could not verify payment")
  }
  toast.dismiss(toastId)
  dispatch(setPayment(false))
}