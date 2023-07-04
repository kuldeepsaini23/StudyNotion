import React, { useState } from "react";
import IconBtn from "../../../common/IconBtn";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { FaGlobe, FaInstagram, FaTwitter } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

const SocialMedia = () => {
  const [addModal, setAddModal] = useState(null);
  const [addForm, setAddForm] = useState(null);
  const [websiteIcon, setWebsiteIcon] = useState(false);
  const [twitterIcon, setTwitterIcon] = useState(false);
  const [instagramIcon, setInstagramIcon] = useState(false);
  const { user } = useSelector((state) => state.profile);

  const { token } = useSelector((state) => state.auth);

  const [editSocials, setEditSocials] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log("Form Data - ", data);
    let result;

    if (editSocials) {
      //we are editing the sectiCategory
      // result = await updateCategory(
      //   {
      //     categoryId: editSocials,
      //     name: data.name,
      //     description: data.description,
      //   },
      //   token
      // );
    } else {
      // result = await createCategory(token, data);
    }
    // console.log(result)

    //update Values
    if (result) {
      setEditSocials(null);
      // fetchCategories();
      setValue("platform", "");
      setValue("link", "");
    }
  };

  // For cancel Button
  const cancelEdit = () => {
    setEditSocials(false);
    setAddForm(false);
  };

  const handleEdit = (id, platformName, link) => {
    if (editSocials === id) {
      cancelEdit();
      return;
    }

    setAddForm(true);
    setEditSocials(id);
    setValue("platform", platformName);
    setValue("link", link);
  };

  return (
    <>
      <div className="my-10 flex flex-col gap-y-5 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        {/* Left part */}
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Add Social Media Links
          </p>
          {/* Right part button */}
          <IconBtn
            text="Add"
            onclick={() => {
              setAddModal(true);
            }}
          >
            <AiOutlinePlusCircle className="font-bold" />
          </IconBtn>
        </div>

        <div className="w-11/12 max-w-[350px] flex justify-start items-center gap-6 mx-7">
          {websiteIcon && (
            <div className="relative group">
              <button
                onClick={() => {
                  handleEdit(1, "Website", "httpssfnsfkfkbkgbjg");
                }}
              >
                <FaGlobe className="text-3xl text-caribbeangreen-200" />
              </button>
              <button
                onClick={() => {
                  setWebsiteIcon(false);
                  setAddForm(false);
                }}
                className="absolute z-10 text-richblack-5 text-xl -top-2 -right-1 font-bold invisible group-hover:visible"
              >
                <AiOutlineCloseCircle />
              </button>
            </div>
          )}

          {twitterIcon && (
            <div className="relative group">
              <button
                onClick={() => {
                  handleEdit(2, "Twitter", "httpssfnsfkfkbkgbjg");
                }}
              >
                <FaTwitter className="text-3xl text-[#00acee]" />
              </button>
              <button
                onClick={() => {
                  setTwitterIcon(false);
                  setAddForm(false);
                }}
                className="absolute z-10 text-richblack-5 text-xl -top-2 -right-1 font-bold invisible group-hover:visible"
              >
                <AiOutlineCloseCircle />
              </button>
            </div>
          )}

          {instagramIcon && (
            <div className="relative group">
              <button
                onClick={() => {
                  handleEdit(3, "Instagram", "httpssfnsfkfkbkgbjg");
                }}
              >
                <FaInstagram className="text-3xl text-[#E4405F]" />
              </button>
              <button
                onClick={() => {
                  setInstagramIcon(false);
                  setAddForm(false);
                }}
                className="absolute z-10 text-richblack-5 text-xl -top-2 -right-1 font-bold invisible group-hover:visible"
              >
                <AiOutlineCloseCircle />
              </button>
            </div>
          )}
        </div>

        {addForm && (
          <>
            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <div className="flex flex-col gap-5 lg:flex-row">
                  <div className="relative flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="platform" className="lable-style">
                      Social Media Platform
                    </label>
                    <input
                      type="text"
                      name="platform"
                      id="platform"
                      placeholder="Enter Social Media Platform"
                      className="form-style"
                      {...register("platform", { required: true })}
                      readOnly
                    />

                    {errors.platform && (
                      <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your Social Media Platform.
                      </span>
                    )}
                  </div>
                  <div className="relative flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="link" className="lable-style">
                      Link
                    </label>
                    <input
                      type="text"
                      name="link"
                      id="link"
                      placeholder="Enter Your link"
                      className="form-style"
                      {...register("link", { required: true })}
                    />

                    {errors.link && (
                      <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your Link.
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  {editSocials && (
                    <button
                      onClick={() => {
                        setAddForm(null);
                      }}
                      className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >
                      Cancel
                    </button>
                  )}
                  <IconBtn type="submit" text={editSocials ? "Update" : "Save"} />
                </div>
              </div>
            </form>
          </>
        )}
      </div>

      {addModal && (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
          <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
            {/* Supported Social Media */}
            <div className="flex flex-wrap gap-7 items-center justify-center mb-5 p-5">
              <button data-tooltip-id="website"
                className="hover:scale-125 transition-all duration-500"
                onClick={() => {
                  setAddForm(true);
                  setAddModal(null);
                  setValue("platform", "Website");
                  setWebsiteIcon(true);
                }}
              >
                <FaGlobe className="text-3xl hover:text-caribbeangreen-200 text-richblack-400" />
              </button>
              <ReactTooltip
                id="website"
                place="top"
                content="Website"
                variant="success"
                style={{ backgroundColor: "#05BF8E", color: "rgb(256, 256, 256)" }}
              />

              <button data-tooltip-id="twitter"
                className="hover:scale-125 transition-all duration-500"
                onClick={() => {
                  setAddForm(true);
                  setAddModal(null);
                  setValue("platform", "Twitter");
                  setTwitterIcon(true);
                }}
              >
                <FaTwitter className="text-3xl hover:text-[#00acee] text-richblack-400" />
              </button>
              <ReactTooltip
                id="twitter"
                place="top"
                content="Twitter"
                variant="info"
              />

              <button data-tooltip-id="instagram"
                className="hover:scale-125 transition-all duration-500"
                onClick={() => {
                  setAddForm(true);
                  setAddModal(null);
                  setValue("platform", "Instagram");
                  setInstagramIcon(true);
                }}
              >
                <FaInstagram className="text-3xl hover:text-[#E4405F] text-richblack-400" />
              </button>
              <ReactTooltip
                id="instagram"
                place="top"
                content="Instagram"
                variant="error"
                style={{ backgroundColor: "#E4405F"}}
              />
            </div>

            {/* buttons */}
            <div className="flex items-center gap-x-4">
              {/* cancel button */}
              <button
                onClick={() => setAddModal(null)}
                className="rounded-md bg-richblack-200 cursor-pointer py-[8px] px-[20px] font-semibold text-richblack-900"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SocialMedia;
