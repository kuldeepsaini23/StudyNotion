import React, { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { apiConnector } from "../../../services/apiconnector";
import { contactusEndpoint } from "../../../services/apis";
import CountryCode from "../../../data/countrycode.json";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log("Loggin data", data);
    try {
      setLoading(true);
      // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API,data);
      const response = { staus: "okay" };
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
        firstname: "",
        lastname: "",
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
          <label htmlFor="firstname" className="lable-style">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter First Name"
            {...register("firstname", { required: true })}
            className="form-style"
          />
          {errors.firstname && <span>Please enter your name</span>}
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className="lable-style">
            Last Name{" "}
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter Last Name"
            {...register("lastname")}
            className="form-style"
          />
          {/* Not mandatory so no erro is shown */}
        </div>
      </div>

      {/*Email*/}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="lable-style">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email Address"
          {...register("email", { required: true })}
          className="form-style"
        />
        {errors.email && <span>Please enter your email</span>}
      </div>

      {/* /* Country Code and Phone no */}

      <div className="flex flex-col gap-2">
        <label className="w-full mt-[10px]" htmlFor="phonenumber">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Phone Number<sup className="text-pink-200">*</sup>
          </p>
        </label>

        <div>
          {/* Dropdown */}
          <div>
            <select
              name="dropdown"
              id="dropdown"
              {...register("countrycode", { required: true })}
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
          <div>
            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
              className="text-black"
              {...register("phoneNo", {
                required: { vale: true, message: "Please Enter Phone Number" },
                maxLength: { value: 10, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span>
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      {/*Message*/}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="lable-style">
          Message
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
        {errors.message && <span>Please enter your Message</span>}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactUsForm;
