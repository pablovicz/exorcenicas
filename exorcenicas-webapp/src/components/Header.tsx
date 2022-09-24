import { Center, useBreakpointValue } from "@chakra-ui/react";
import { Image } from "./Image";
import Logo from '../assets/logo.png';

export function Header() {

    const isWideVersion = useBreakpointValue({
        base: false,
        sm: false,
        md: false,
        lg: true,
        xl: true
    });

    const isTabletVersion = useBreakpointValue({
        base: false,
        sm: false,
        md: true,
        lg: false,
        xl: false
    });


    return (
        <Center as='header' w='full' my='6'>
            <Image
                width={isWideVersion ? 18.75 : isTabletVersion ? 15.5 : 11}
                height={isWideVersion ? 18.75 : isTabletVersion ? 15.5 : 11}
                type='rem'
                alt='Exorcênicas Logo'
                src={Logo}
            />
        </Center>
    );
}