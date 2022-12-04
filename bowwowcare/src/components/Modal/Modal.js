import React  from "react";
import { IoIosClose } from "react-icons/io";

function Modal(props) {
  return props.trigger ? (
    <div className="fixed top-0 left-0 w-full h-screen bg-neutral-500/50 flex justify-center items-center ">
      <div className="px-1 py-6 w-11/12 bg-white rounded-md">
        <div className="relative flex mx-4">
          <div className=" w-5/6 text-left">{props.solution}</div>
          <button className="absolute top-0 right-0" onClick={() => props.setTrigger(false)}>
            <IoIosClose className="" size="2rem" />
          </button>
        </div>
        <div className="m-4">{props.children}</div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Modal;
