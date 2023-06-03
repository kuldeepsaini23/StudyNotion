import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../../services/apiconnector";
import { contactusEndpoint } from "../../../services/apis";
import CountryCode from "../../../data/countrycode.json";
import 'react-loading-skeleton/dist/skeleton.css'

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
  
    const { countrycode, email, firstName, lastaName, message, phoneNo } = data;
    console.log("Loggin data",  countrycode, email, firstName, lastaName, message, phoneNo);
    try {
      setLoading(true);
      const response = await apiConnector(
        "POST",
       `http://localhost:4000/api/v1/reach/contact`,
        {countrycode, email, firstName, lastaName, message, phoneNo}
      );
      console.log("heello")
      console.log("logging Data", response);
      setLoading(false);
    } catch (error) {
      console.log("Error: ", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastaName: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form
      onSubmit={handleSubmit(submitContactForm)}
      className="flex flex-col gap-7"
    >
      <div className="flex flex-col gap-5 lg:flex-row">
        {/* First Name */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstName" className="lable-style">
            First Name<sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter First Name"
            {...register("firstName", { required: true })}
            className="form-style"
          />
          {errors.firstName && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your First name.
            </span>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastaName" className="lable-style">
            Last Name{" "}
          </label>
          <input
            type="text"
            name="lastaName"
            id="lastaName"
            placeholder="Enter Last Name"
            {...register("lastaName")}
            className="form-style"
          />
          {/* Not mandatory so no erro is shown */}
        </div>
      </div>

      {/*Email*/}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="lable-style">
          Email<sup className="text-pink-200">*</sup>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email Address"
          {...register("email", { required: true })}
          className="form-style"
        />
        {errors.email && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Email Address.
          </span>
        )}
      </div>

      {/* /* Country Code and Phone no */}

      <div className="flex flex-col gap-2">
        <label className="lable-style" htmlFor="phonenumber">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Phone Number<sup className="text-pink-200">*</sup>
          </p>
        </label>

        <div className="flex gap-5">
          {/* Dropdown */}
          <div className="flex w-[81px] flex-col gap-2">
            <select
              name="dropdown"
              id="dropdown"
              {...register("countrycode", { required: true })}
              className="form-style"
            >
              {CountryCode.map((element, index) => {
                return (
                  <option key={index} value={element.code}>
                    {element.code} -{element.country}
                  </option>
                );
              })}
            </select>
          </div>

          {/* phone number */}
          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
              className="form-style"
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please Enter Your Phone Number",
                },
                maxLength: { value: 11, message: "Invalid Phone Number" },
                minLength: { value: 8, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      {/*Message*/}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="lable-style">
          Message<sup className="text-pink-200">*</sup>
        </label>
        <textarea
          name="emmessageail"
          id="message"
          cols="30"
          rows="7"
          placeholder="Enter Your Message Here..."
          {...register("message", { required: true })}
          className="form-style"
        />
        {errors.message && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Message
          </span>
        )}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactUsForm;
