import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import IconBtn from "../../../../common/IconBtn";
import {
  createCategory,
  updateCategory,
} from "../../../../../services/operations/adminAPI";
import { useState } from "react";
import { apiConnector } from "../../../../../services/apiconnector";
import CategoryTab from "./CategoryTab";
import { categories } from "../../../../../services/apis";

export default function AddCategory() {
  const { token } = useSelector((state) => state.auth);
  const [categorie, setCategorie] = useState([]);

  const [editCategory, setEditCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setCategorie(result?.data?.data);
      // console.log("Categories in category section", result?.data?.data);
    } catch (error) {
      console.log("could not fetch the category list", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log("Form Data - ", data);
    let result;

    if (editCategory) {
      //we are editing the sectiCategory
      result = await updateCategory(
        {
          categoryId: editCategory,
          name: data.name,
          description: data.description,
        },
        token
      );
    } else {
      result = await createCategory(token, data);
    }
    // console.log(result)

    //update Values
    if (result) {
      setEditCategory(null);
      fetchCategories();
      setValue("name", "");
      setValue("description", "");
    }
  };

  // For cancel Button
  const cancelEdit = () => {
    setEditCategory(false);
    setValue("name", "");
    setValue("description", "");
  };

  const handleEdit = (id, name, description) => {
    if (editCategory === id) {
      cancelEdit();
      return;
    }

    setEditCategory(id);
    setValue("name", name);
    setValue("description", description);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Category adding*/}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Add a Category
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="name" className="lable-style">
                First Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Category Name"
                className="form-style"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="-mt-1 text-[12px] text-pink-200">
                  Please enter your Category name.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="description">
              Category Descritpion <sup className="text-pink-200">*</sup>
            </label>
            <textarea
              id="description"
              placeholder="Enter the description of Category"
              {...register("description", { required: true })}
              className="form-style resize-x-none min-h-[130px] w-full"
            />
            {errors.description && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Descritpion of the Category is required
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          {editCategory && (
            <button
              onClick={cancelEdit}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            >
              Cancel
            </button>
          )}
          {
            <IconBtn
              type="submit"
              text={editCategory ? "Save Changes" : "Save"}
            />
          }
        </div>
      </form>
      {categories && (
        <CategoryTab
          categories={categorie}
          setCategories={setCategorie}
          handleEdit={handleEdit}
        />
      )}
    </>
  );
}
