import { Flex, Icon, Link, Text, useBreakpointValue, VStack } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
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
        <VStack spacing='4' w='full' as='footer' mt='20'>
            <Link
                href={`https://www.google.com/maps/place/Vila+Ida+Curitiba/@-25.4281708,-49.2765797,17z/data=!3m1!4b1!4m5!3m4!1s0x94dce5a4d92c8565:0x5bfc135a22b4f414!8m2!3d-25.4281757!4d-49.274391`}
                _hover={{ color: 'app.primary', textDecoration: 'none' }}
                target="_blank"
                rel='noopener noreferer'
            >
                <Flex flexDir={isMobileVersion ? 'column' : 'row'} align='center' justify='space-between' w='100%'>
                    <Icon as={FaMapMarkerAlt} fontSize='1.5rem' />
                    <Text
                        mt={isMobileVersion ? '4' : undefined}
                        ml={isMobileVersion ? undefined : '4'}
                        as='span'
                        fontSize='1.5rem'
                        textAlign={isMobileVersion ? 'center' : 'left'}
                        fontWeight='thin'
                        lineHeight='120%'
                    >
                        Vila Ida Curitiba <br /> Al. Dr. Muricy, 1089
                    </Text>
                </Flex>
            </Link>
            <Link
                href={`https://www.instagram.com/exorcenicas/?hl=pt-br`}
                _hover={{ color: 'app.primary', textDecoration: 'none' }}
                target="_blank"
                rel='noopener noreferer'
            >
                <Flex flexDir={isMobileVersion ? 'column' : 'row'} align='center' justify='space-between' w='100%'>
                    <Icon as={GrInstagram} fontSize='1.5rem' />
                    <Text
                        ml={isMobileVersion ? undefined : '4'}
                        mt={isMobileVersion ? '4' : undefined}
                        fontSize='1.25rem'
                        fontWeight='thin'
                        textAlign={isMobileVersion ? 'center' : 'left'}
                        lineHeight='120%'
                        >
                        No caso de dúvidas, nos mande uma DM!
                    </Text>
                </Flex>
            </Link>

        </VStack>
    );
}