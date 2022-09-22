import { Flex, Icon, Link, Text, useBreakpointValue, VStack } from "@chakra-ui/react";
import { GrInstagram } from "react-icons/gr";



export function Footer() {

    const isMobileVersion = useBreakpointValue({
        base: false,
        sm: true,
        md: false,
        lg: false,
        xl: false
    });


    return (
        <VStack spacing='2' w='full' as='footer' mt='20'>
            <Link
                href={`https://www.instagram.com/exorcenicas/?hl=pt-br`}
                _hover={{ color: 'app.primary', textDecoration: 'none' }}
                target="_blank"
                rel='noopener noreferer'
            >
                <Flex flexDir={isMobileVersion ? 'column' : 'row'} align='center' justify='space-between' w='100%'>
                    <Icon as={GrInstagram} fontSize={isMobileVersion ? '2rem' : '1.5rem'} />
                    <Text ml={isMobileVersion ? undefined : '4'} mt={isMobileVersion ? '4' : undefined} fontSize={isMobileVersion ? '1rem' : '1.5rem'} fontWeight='regular' textAlign='left' lineHeight='120%'>
                        No caso de dúvidas, nos mande uma DM!
                    </Text>
                </Flex>
            </Link>

        </VStack>
    );
}