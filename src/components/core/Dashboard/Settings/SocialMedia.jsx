import React, { useState } from "react";
import IconBtn from "../../../common/IconBtn";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { FaGlobe, FaInstagram, FaTwitter, FaLinkedin, FaEdit } from "react-icons/fa";
import * as Icons from "react-icons/fa";
// import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  createSocial,
  deleteSocial,
  updateSocial,
} from "../../../../services/operations/SettingsAPI";
import { toast } from "react-hot-toast";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { RiDeleteBin6Line } from "react-icons/ri";

const SocialMedia = () => {
  const [addModal, setAddModal] = useState(null);
  const [addForm, setAddForm] = useState(null);
  // const [websiteIcon, setWebsiteIcon] = useState(false);
  // const [twitterIcon, setTwitterIcon] = useState(false);
  // const [instagramIcon, setInstagramIcon] = useState(false);
  const { user } = useSelector((state) => state.profile);
  // console.log(user);

  const { token } = useSelector((state) => state.auth);

  const [editSocials, setEditSocials] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data - ", data);
    let result;

    if (editSocials) {
      result = dispatch(
        updateSocial(
          {
            socialId: editSocials,
            platform: data.platform,
            link: data.link,
          },
          token
        )
      );
    } else {
      result = dispatch(createSocial(token, data));
    }
    // console.log(result)

    //update Values
    if (result) {
      setEditSocials(null);
      setAddForm(null);
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

  const handleDelete = (socialId) => {
    if (socialId) {
      dispatch(deleteSocial(token, { socialId: socialId }));
    }
  };

  const handleModalClick = (platformName) => {
    if (user?.socials.length > 0) {
      console.log(user?.socials);
      const filterPlatformName = user?.socials?.filter(
        (social) => social.name === platformName
      );
      console.log("Filtered", filterPlatformName);
      if (filterPlatformName.length > 0) {
        return toast.error(`Cannot add more than one ${platformName} link`);
      }
    }

    setAddForm(true);

    setAddModal(null);

    setValue("platform", platformName);
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
                      onClick={cancelEdit}
                      className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >
                      Cancel
                    </button>
                  )}
                  <IconBtn
                    type="submit"
                    text={editSocials ? "Update" : "Save"}
                  />
                </div>
              </div>
            </form>
          </>
        )}

        {/* Links added by user*/}
        {user?.socials?.length > 0 && (
          <Table className="rounded-xl border border-richblack-800">
            <Thead>
              <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2 justify-between">
                {/* 1st grid */}
                <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                  Name
                </Th>
                {/* 2nd grid */}
                <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                  Link
                </Th>
                {/* 3rd grid */}
                <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                  Actions
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {user?.socials?.map((social, i) => {
                const iconName =
                  social.name === "Website" ? "FaGlobe" : `Fa${social.name}`;
                const Icon = Icons[iconName];
                return (
                  <Tr className="flex gap-x-10 px-6 py-8 justify-between" key={i}>
                    <Td className="text-left text-sm font-medium uppercase text-richblack-100">
                      <Icon className="text-lg text-richblack-5" />
                    </Td>
                    <Td className="text-left text-sm font-medium text-richblack-100 pivoted">
                      {social.link}
                    </Td>
                    <Td className="text-left text-sm font-medium uppercase text-richblack-100 pivoted">
                      <button
                         className="px-2 Transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                        onClick={() =>
                          handleEdit(social._id, social.name, social.link)
                        }
                      >
                        <FaEdit fontSize={20} />
                      </button>
                      <button onClick={() => handleDelete(social._id)}
                        className="px-1 Transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                      >
                        <RiDeleteBin6Line fontSize={20} />
                      </button>
                      
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        )}
      </div>

      {addModal && (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
          <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
            {/* Supported Social Media */}
            <div className="flex flex-wrap gap-7 items-center justify-center mb-5 p-5">
              <button
                data-tooltip-id="website"
                className="hover:scale-125 transition-all duration-500"
                onClick={() => {
                  handleModalClick("Website");
                }}
              >
                <FaGlobe className="text-3xl hover:text-caribbeangreen-200 text-richblack-400" />
              </button>
              <ReactTooltip
                id="website"
                place="top"
                content="Website"
                variant="success"
                style={{
                  backgroundColor: "#05BF8E",
                  color: "rgb(256, 256, 256)",
                }}
              />

              <button
                data-tooltip-id="twitter"
                className="hover:scale-125 transition-all duration-500"
                onClick={() => {
                  handleModalClick("Twitter");
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

              <button
                data-tooltip-id="instagram"
                className="hover:scale-125 transition-all duration-500"
                onClick={() => {
                  handleModalClick("Instagram");
                }}
              >
                <FaInstagram className="text-3xl hover:text-[#E4405F] text-richblack-400" />
              </button>
              <ReactTooltip
                id="instagram"
                place="top"
                content="Instagram"
                variant="error"
                style={{ backgroundColor: "#E4405F" }}
              />

              <button
                data-tooltip-id="linkedin"
                className="hover:scale-125 transition-all duration-500"
                onClick={() => {
                  handleModalClick("Linkedin");
                }}
              >
                <FaLinkedin className="text-3xl hover:text-blue-200 text-richblack-400" />
              </button>
              <ReactTooltip
                id="linkedin"
                place="bottom"
                content="Linkedin"
                variant="info"
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
