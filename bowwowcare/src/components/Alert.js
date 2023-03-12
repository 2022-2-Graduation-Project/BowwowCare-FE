import React, { useContext } from 'react';
import { CiCircleAlert } from "react-icons/ci";
import { ThemeContext } from '../context/ThemeProvider';
import Button from "./Button";

function Alert({ open, handleOpen, content, handleSubmit }) {
    const [themeMode, setThemeMode] = useContext(ThemeContext);
    return (
        <div>
            {open ? (
                <div className="fixed top-0 left-0 w-full h-screen bg-neutral-500/50 flex justify-center items-center">
                    <div className="px-4 pt-8 pb-6 w-11/12 bg-white rounded-md flex flex-col items-center">
                        <CiCircleAlert size="3rem" />
                        <div className="text-center py-4 whitespace-pre">{content}</div>
                        
                        {handleSubmit ? (
                            <div className="flex justify-between space-x-4 w-full">
                                <Button onClick={handleOpen} borderColor="gray" textColor="main-color" bgColor="none">
                                    취소
                                </Button>
                                <Button onClick={handleSubmit} bgColor={themeMode}>
                                    확인
                                </Button>
                            </div>
                        ) : (
                            <Button onClick={handleOpen} bgColor={themeMode}>
                                확인
                            </Button>
                        )}
                        
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default Alert
