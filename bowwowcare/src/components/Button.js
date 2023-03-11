import styled from "styled-components";

function Button ({size, bgColor, textColor="white", borderColor="none", children, onClick, disabled}) {
    return (
        <StyledButton disabled={disabled} onClick={onClick} className={`h-12 w-full font-bold rounded-md border border-${borderColor} text-${textColor} text-center`}>
            {children}
        </StyledButton>
    )
};

const StyledButton = styled.button`
    background: ${({theme}) => theme.primary};
`;

export default Button;