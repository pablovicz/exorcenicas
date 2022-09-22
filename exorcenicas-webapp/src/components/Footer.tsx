import { Flex, Icon, Link, Text, VStack } from "@chakra-ui/react";
import { GrInstagram } from "react-icons/gr";



export function Footer() {

    return (
        <VStack spacing='2' w='full' as='footer' mt='20'>
            <Link
                href={`https://www.instagram.com/exorcenicas/?hl=pt-br`}
                _hover={{ color: 'app.primary', textDecoration: 'none' }}
                target="_blank"
                rel='noopener noreferer'
            >
                <Flex flexDir='row' align='center' justify='space-between' w='100%'>
                    <Icon as={GrInstagram} fontSize='1rem' />
                    <Text ml='4' fontSize='1.5rem' fontWeight='regular' textAlign='left' lineHeight='120%'>
                        No caso de dúvidas, nos mande uma DM!
                    </Text>
                </Flex>
            </Link>

        </VStack>
    );
}