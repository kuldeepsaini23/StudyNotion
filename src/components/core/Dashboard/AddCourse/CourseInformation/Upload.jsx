import React, { useState, useRef, useEffect } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

const Upload = ({ name, label, register, errors, setValue }) => {
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);


  useEffect(()=>{
    register(name,{
      required:true,
    })
  })

  useEffect(()=>{
    setValue(name, imageFile)
  },[imageFile])

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-sm text-richblack-5">
        {label}
        <sup className="text-pink-200">*</sup>
      </label>
      {/* drag and drop modal */}
      <div
        className="bg-richblack-700 flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500"
        onClick={handleClick}
      >
        <div className="flex w-full flex-col items-center p-6">
          {previewSource === null ? (
            <>
              {/* input of image */}
              <input
                id={name}
                name={name}
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              {/* Icon */}
              <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
                <AiOutlineCloudUpload className="text-2xl text-yellow-50" />
              </div>

              {/* text */}
              <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                Drag and drop an image, or click tok
                <span className="font-semibold text-yellow-50">Browse</span>a
                file
              </p>

              {/* Aspect Ratio and recommended Size text */}
              <ul className="mt-10 flex flex-row space-x-12 justify-between text-center text-richblack-200 list-disc text-xs">
                <li>Aspect ratio 16:9</li>
                <li>Recommended size 1024x576</li>
              </ul>
            </>
          ) : (
            <>
              <img
                src={previewSource}
                alt={`${label}`}
                className="w-full  h-full rounded-md object-cover"
              />
              <button className="mt-3 text-richblack-400 underline" type="button" 
                onClick={()=>{setPreviewSource(null); setImageFile(null)}}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* erros */}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
};

export default Upload;
