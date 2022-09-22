import { Button, ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";


interface PrimaryButtonProps extends ButtonProps {
    children: ReactNode;
}


export function PrimaryButton({ children, ...rest }: PrimaryButtonProps) {

    return (
        <Button
            colorScheme='orange'
            bgColor='app.primary'
            fontFamily='Creepster'
            fontSize='1.5rem'
            p='4'
            letterSpacing='2px'
            rounded='lg'
            {...rest}
        >
            {children}
        </Button>
    );
}