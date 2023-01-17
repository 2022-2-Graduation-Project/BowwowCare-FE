import React from 'react';
import { CiCircleAlert } from "react-icons/ci";

function Alert({ open, handleOpen, content }) {
    return (
        <div>
            {open ? (
                <div className="fixed top-0 left-0 w-full h-screen bg-neutral-500/50 flex justify-center items-center">
                    <div className="px-4 pt-8 pb-6 w-11/12 bg-white rounded-md flex flex-col items-center">
                        <CiCircleAlert size="3rem" />
                        <div className="text-center py-4">{content}</div>
                        <button className="h-12 mt-4 w-full font-bold rounded-md bg-main-color text-white text-center" onClick={handleOpen}>
                            확인
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default Alert
