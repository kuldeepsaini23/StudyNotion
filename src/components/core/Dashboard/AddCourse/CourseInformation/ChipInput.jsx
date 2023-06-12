import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {AiOutlineClose} from "react-icons/ai"

const ChipInput = ({ name, label, register, errors, setValue }) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  useEffect(()=>{
    register(name,{
      required:true,
      validate:(value)=> value.length > 0
    })
  })

  useEffect(()=>{
    setValue(name, requirementList)
  },[requirementList])


  const handleKeyDown = (event) => {
    console.log(event)
    if ( event.key === "," || event.key === "Enter" ) {
      alert("helllo")
      handleAddRequirement();
    }
  };

  const handleAddRequirement = () => {
    if (requirement) {
      const newRequirement = requirement.split(",")[0];
      setRequirementList([...requirementList, newRequirement]);
      setRequirement(""); // Clear the input field
    }
  };

  const removeAddRequirement = (index) => {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index, 1);
    setRequirementList(updatedRequirementList);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-sm text-richblack-5">
        {label}
        <sup className="text-pink-200">*</sup>
      </label>

      <div className="flex w-full flex-wrap gap-y-2">
        {requirementList.length > 0 && (
          requirementList.map((requirement, index) => (
            <div className="m-1 flex items-center rounded-full px-2 py-1 text-sm text-richblack-5 bg-yellow-400" key={index}>
              <span>{requirement}</span>
              <button onClick={() => removeAddRequirement(index)} className="ml-2 focus:outline-none">
                <AiOutlineClose />
              </button>
            </div>
          ))
        )}

        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          // onKeyDown={handleKeyDown}
          onKeyUp={handleKeyDown}
          className="w-full form-style"
        />
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
};

export default ChipInput;



