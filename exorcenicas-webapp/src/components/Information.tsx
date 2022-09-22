import { Flex, Icon, Link, Text, useBreakpointValue, VStack } from "@chakra-ui/react";
import { FaMapMarkerAlt } from 'react-icons/fa';

const location = {
    cep: '80020-040',
    city: 'Curitiba',
    district: 'São Francisco',
    number: 1089,
    state: 'PR',
    street: 'Al. Dr. Muricy',
    location: {
        latitude: -25.4281757,
        longitude: -49.274391
    }
}


const date = '10/10/2022';
const hour = 'a partir das 22 hrs';



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
            <VStack spacing='2'>
                <Text as='span' fontSize={isMobileVersion ? '1.25rem' : '2rem'} textAlign='center' w='100%'>
                    {date}
                </Text>
                <Text as='span' fontSize={isMobileVersion ? '1rem' : '1.5rem'} textAlign='center' w='100%'>
                    {hour}
                </Text>
            </VStack>
            <Link
                href={`https://www.google.com/maps/place/Vila+Ida+Curitiba/@-25.4281708,-49.2765797,17z/data=!3m1!4b1!4m5!3m4!1s0x94dce5a4d92c8565:0x5bfc135a22b4f414!8m2!3d-25.4281757!4d-49.274391`}
                _hover={{ color: 'app.primary', textDecoration: 'none' }}
                target="_blank"
                rel='noopener noreferer'
            >
                <Flex flexDir={isMobileVersion ? 'column' : 'row'} align='center' justify='space-between' w='100%'>
                    <Icon as={FaMapMarkerAlt} fontSize={isMobileVersion ? '1.5rem' : '1rem'} />
                    <Text
                        ml={isMobileVersion ? undefined : '4'}
                        mt={isMobileVersion ? '4' : undefined}
                        fontSize={isMobileVersion ? '1rem': '1.5rem'}
                        fontWeight='regular'
                        textAlign={isMobileVersion ? 'center' : 'left'}
                        lineHeight='120%'
                    >
                        {location.street}, {location.number}{isMobileVersion ? (<br />) : ' - '}{location.district}, {location.city} - {location.state}, {location.cep}
                    </Text>
                </Flex>
            </Link>
        </VStack >
    );
}