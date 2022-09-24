import { Flex, Icon, Link, Text, useBreakpointValue, VStack } from "@chakra-ui/react";
import { FaMapMarkerAlt } from 'react-icons/fa';


const date = '14/10/2022';
const hour = 'a partir das 21 hrs';



export function Information() {

    const isMobileVersion = useBreakpointValue({
        base: false,
        sm: true,
        md: false,
        lg: false,
        xl: false
    });


    return (
        <VStack spacing='4'>
            <Text as='h2' fontWeight='bold' fontSize='1.5rem'>
                Você está preparado para uma festa de arrepiar?
            </Text>
            <Text as='span' fontSize='1.25rem' fontWeight='thin' textAlign='center' w='100%' px='4' maxW='600px'>
                Então nós vemos dia <Text as='span' fontWeight='bold'>14/10 </Text>, no <Text as='span' fontWeight='bold'>Vila Ida</Text>, a partir das <Text as='span' fontWeight='bold'>21h</Text>!
                <br />
                Fique ligado em nosso Instagram  <Link
                    href={`https://www.instagram.com/exorcenicas/?hl=pt-br`}
                    _hover={{ color: 'app.primary', textDecoration: 'none' }}
                    target="_blank"
                    rel='noopener noreferer'
                    fontWeight='bold'
                >@exorcenicas</Link> e acompanhe as novidades!
            </Text>
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
        </VStack >
    );
}