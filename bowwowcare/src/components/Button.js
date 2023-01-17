function Button ({size, bgColor="main-color", textColor="white", borderColor="none", children, onClick}) {
    return (
        <button onClick={onClick} className={`h-12 w-full font-bold rounded-md bg-${bgColor} border border-${borderColor} text-${textColor} text-center`}>
            {children}
        </button>
    )
};

export default Button;