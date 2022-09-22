import { Box, Button, Center, Flex, HStack, Img, Text, useBreakpoint, useBreakpointValue, VStack } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import Logo from '../assets/logo.png'
import { Image } from "../components/Image";
import { useGetBatchesQuery } from "../graphql/generated";
import { ContainerWithLoading } from "../components/ContainerWithLoading";


export function HomePage() {

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

    const { data, loading, error } = useGetBatchesQuery();

    const currentBatch = data?.batches?.filter(batch => batch?.soldAmount as number < batch?.amount)[0];


    return (
        <Flex
            flexDir="column"
            align="center"
            justify="space-between"
            w='100vw'
            h='100vh'
            minW={300}
            overflowX="hidden"
            css={{
                '::-webkit-scrollbar': {
                    'width': '10px'
                },
                /* Track */
                '::-webkit-scrollbar-track': {
                    'background': theme.colors.gray[900]
                },
                /* Handle */
                '::-webkit-scrollbar-thumb': {
                    'background': theme.colors.gray[600],
                    'borderRadius': '10px'
                },
                /* Handle on hover */
                '::-webkit-scrollbar-thumb:hover': {
                    'background': 'red'
                }
            }}
            bgColor='gray.900'
            py={{ base: '10', sm: '4' }}
            px='4'
        >
            <VStack spacing='16'>
                <Image
                    width={isWideVersion ? 18.75 : isTabletVersion ? 15.5 : 8.5}
                    height={isWideVersion ? 18.75 : isTabletVersion ? 15.5 : 8.5}
                    type='rem'
                    alt='Exorcênicas Logo'
                    src={Logo}
                />
                <ContainerWithLoading isLoading={loading} title='Carregando...' isLoadingError={!!error} loadingErrorMessage='Ops! Não conseguimos carregar os dados.'>
                    <VStack spacing='4'>
                        {data?.batches?.map(batch => (
                            <HStack spacing='6'>
                                <Text
                                    as='span'
                                    fontSize='1.25rem'
                                    fontWeight='bold'
                                    textDecoration={batch.soldAmount === batch.amount ? 'line-through' : undefined}
                                    color={batch.soldAmount === batch.amount ? 'red' : 'orange'}
                                >
                                    {batch.name} - <Text fontWeight='regular' as='span' color={batch.soldAmount === batch.amount ? 'red' : 'white'}>
                                        {batch.soldAmount}/{batch.amount}
                                    </Text>
                                </Text>
                            </HStack>
                        ))}
                        <Box rounded='lg' bgColor='orange' p='2'>
                            <Image
                                alt={currentBatch?.qrCode.fileName}
                                src={currentBatch?.qrCode.url}
                                width={10}
                                height={10}
                                type='rem'
                            />
                        </Box>
                    </VStack>
                    <Button colorScheme='orange' fontFamily='Creepster' fontSize='1.5rem' p='4' letterSpacing='2px' rounded='lg'>
                        CONFIRMAR PAGAMENTO
                    </Button>
                </ContainerWithLoading>
            </VStack>

        </Flex>
    );
}