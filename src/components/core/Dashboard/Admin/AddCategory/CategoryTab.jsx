import React, { useState } from "react";
import { useSelector } from "react-redux";
import { fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { deleteCategory } from "../../../../../services/operations/adminAPI";

const CategoryTab = ({ categories, setCategories, handleEdit }) => {
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const handleCourseDelete = async (categoryId) => {
    setLoading(true);
    await deleteCategory({ categoryId: categoryId }, token);

    const categories = await fetchCourseCategories();
    if (categories.length > 0) {
      // console.log("categories", categories)
      setCategories(categories);
    }
    setLoading(false);
  };

  return (
    <>
      { !loading ? (
        <div className="my-10">
          <Table className="rounded-xl border border-richblack-800">
            <Thead>
              <Tr className="grid grid-cols-3 gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                {/* 1st grid */}
                <Th className="text-left text-lg font-bold uppercase text-richblack-5">
                  Name
                </Th>
                {/* 2nd grid */}
                <Th className="text-left text-lg font-bold uppercase text-richblack-5">
                  Description
                </Th>
                {/* 3rd grid */}
                <Th className="text-right text-lg font-bold uppercase text-richblack-5">
                  Actions
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {/* Cards yha se shru ho rhe hh */}
              {categories.map((category, index) => (
                <Tr
                  key={index}
                  className="grid grid-cols-3 border-b border-richblack-800 px-6 py-8 justify-between gap-x-10"
                >
                  {/* 1st grid */}
                  <Td className="text-lg font-semibold text-richblack-5">
                    {category.name}
                  </Td>
                  {/* 2nd grid */}
                  <Td className="text-sm font-medium text-richblack-100">
                    {category.description.length > 100
                      ? category.description.slice(0, 90) + "..."
                      : category.description}
                  </Td>

                  {/* 3rd grid */}
                  <Td className="text-right text-sm font-medium uppercase text-richblack-100">
                    <button
                      title="Edit"
                      className="px-2 Transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                      disabled={loading}
                      onClick={() =>
                        handleEdit(
                          category._id,
                          category.name,
                          category.description
                        )
                      }
                    >
                      <FiEdit2 fontSize={20} />
                    </button>
                    <button
                      title="Delete"
                      className="px-1 Transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                      onClick={() => {
                        setConfirmationModal({
                          text1: "Do you want to delete This course?",
                          text2:
                            "All The data related to This course will be deleted",
                          btn1Text: "Delete",
                          btn1Handler: !loading
                            ? () => handleCourseDelete(category._id)
                            : () => {},
                          btn2Text: "Cancel",
                          btn2Handler: !loading
                            ? () => setConfirmationModal(null)
                            : () => {},
                        });
                      }}
                    >
                      <RiDeleteBin6Line fontSize={20} />
                    </button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {confirmationModal && (
            <ConfirmationModal modalData={confirmationModal} />
          )}
        </div>
      ) :(
        <div className="text-richblack-5">Loading</div>
      )}
    </>
  );
};

export default CategoryTab;
