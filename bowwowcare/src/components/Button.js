import { colorVariants } from '../utils/Dictionary';

function Button ({size, bgColor="primary", textColor="white", borderColor="none", children, onClick, disabled}) {
    const bgColorVariant = "bg"+bgColor;
    const textColorVariant = "text"+textColor;
    const borderColorVariant = "border"+borderColor;

    return (
        <button disabled={disabled} onClick={onClick} className={`h-12 w-full font-bold rounded-md  ${colorVariants[bgColorVariant]} border ${colorVariants[borderColorVariant]} ${colorVariants[textColorVariant]} text-center`}>
            {children}
        </button>
    )
};


export default Button;