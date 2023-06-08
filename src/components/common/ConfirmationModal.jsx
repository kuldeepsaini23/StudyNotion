import React from "react";
import IconBtn from "./IconBtn";

const ConfirmationModal = ({ modalData }) => {
  return (
    <div>
      <div>
        {/* heading */}
        <p>{modalData.text1}</p>

        {/* text */}
        <p>{modalData.text1}</p>

        {/* buttons */}
        <div>
          {/* yes button */}
          <IconBtn
            onClick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          /> 
          {/* cancel button */}
          <button onClick={modalData?.btn2Handler}>
            {modalData?.btn2Text}
          </button>

        </div>

      </div>
    </div>
  );
};

export default ConfirmationModal;
