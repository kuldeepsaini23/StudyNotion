import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const RequirementField = ({
  name,
  label,
  register,
  errors,
  setValue,
  getValue,
}) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState("");

  useEffect(()=>{
    register(name,{
      required:true,
      validate:(value)=> value.length > 0
    })
  })
  

  useEffect(()=>{
    setValue(name, requirementList)
  },[requirementList])

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  };

  const removeAddRequirement = (index) => {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index, 1);
    setRequirementList(updatedRequirementList);
  };

  return (
    <div className='flex flex-col space-y-2'>
      <label htmlFor={name} className='text-sm text-richblack-5'>
        {label}
        <sup className='text-pink-200'>*</sup>
      </label>
      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="w-full form-style"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>

      {/* data which is being displayed after hitting add button */}
      {
        requirementList.length > 0 && (
          <ul className="mt-2 list-inside list-disc">
            {
              requirementList.map((requirement, index)=>(
                <li key={index} className="flex items-center text-richblack-5">
                  <span>{requirement}</span>
                  <button onClick={()=>removeAddRequirement(index)}
                  className="text-xs text-pure-greys-300 ml-2">
                    clear
                  </button>
                </li>
              ))
            }
          </ul>
        )
      }

      {/* error */}
      {
        errors[name] && (
          <span className='ml-2 text-xs tracking-wide text-pink-200'>
            {label} is required
          </span>
        )
      }
    </div>
  );
};

export default RequirementField;
