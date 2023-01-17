import React from 'react';
import { CiCircleAlert } from "react-icons/ci";


function Alert({ open, handleOpen, content, handleSubmit }) {
    return (
        <div>
            {open ? (
                <div className="fixed top-0 left-0 w-full h-screen bg-neutral-500/50 flex justify-center items-center">
                    <div className="px-4 pt-8 pb-6 w-11/12 bg-white rounded-md flex flex-col items-center">
                        <CiCircleAlert size="3rem" />
                        <div className="text-center py-4 whitespace-pre mb-2">{content}</div>
                        
                        {handleSubmit ? (
                            <div className="flex justify-between space-x-4 w-full">
                                <button onClick={handleOpen} className="h-12 mt-4 w-full font-bold border border-gray text-main-color text-center">
                                    취소
                                </button>
                                <button onClick={handleSubmit} className="h-12 mt-4 w-full font-bold rounded-md bg-main-color text-white text-center">
                                    확인
                                </button>
                            </div>
                        ) : (
                            <button onClick={handleOpen} className="h-12 mt-4 w-full font-bold rounded-md bg-main-color text-white text-center">
                                확인
                            </button>
                        )}
                        
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default Alert
