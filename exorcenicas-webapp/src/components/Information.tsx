import { Link, Text, VStack } from "@chakra-ui/react";




export function Information() {

    return (
        <VStack spacing='4'>
            <Text as='h2' fontWeight='bold' fontSize={{base: '1.5rem', sm: '1.25rem'}} textAlign='center'>
                Você está preparado para uma festa de arrepiar?
            </Text>
            <Text as='span' fontSize={{base: '1.25rem', sm: '1.2rem'}}fontWeight='thin' textAlign='center' w='100%' px='4' maxW='600px'>
                Então nos vemos dia <Text as='span' fontWeight='bold'>14/10 </Text>, no <Text as='span' fontWeight='bold'>Vila Ida</Text>, a partir das <Text as='span' fontWeight='bold'>21h</Text>!
                <br />
                Fique ligado em nosso Instagram  <Link
                    href={`https://www.instagram.com/exorcenicas/?hl=pt-br`}
                    _hover={{ color: 'app.primary', textDecoration: 'none' }}
                    target="_blank"
                    rel='noopener noreferer'
                    fontWeight='bold'
                >@exorcenicas</Link> e acompanhe as novidades!
            </Text>
        </VStack >
    );
}