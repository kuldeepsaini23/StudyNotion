import React from "react";
import {MdEditCalendar} from "react-icons/md";

const IconBtn = ({
  text,
  onClick,
  children,
  disabled,
  outLine = false,
  customClasses,
  type,
  icon,
}) => {
  return (
    <button disabled={disabled} onClick={onClick} type={type} className={`${customClasses}`}>
      {children ? (
        <>
          <MdEditCalendar/>
          <span>{text}</span>
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default IconBtn;
