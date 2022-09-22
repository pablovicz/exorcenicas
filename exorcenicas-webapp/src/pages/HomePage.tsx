import { Box, Button, Flex, HStack, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { theme } from "../styles/theme";


import { Batch, useGetBatchesQuery } from "../graphql/generated";
import { ContainerWithLoading } from "../components/ContainerWithLoading";
import { Information } from "../components/Information";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Image } from "../components/Image";
import { PrimaryButton } from "../components/PrimaryButton";
import { PurchaseModal } from "../components/PurshaseModal";




export function HomePage() {




    const { data, loading, error } = useGetBatchesQuery();

    const currentBatch = data?.batches?.filter(batch => batch?.soldAmount as number < batch?.amount)[0];

    const { isOpen, onOpen, onClose } = useDisclosure();


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
            py={{ base: '10', sm: '4' }}
            px='4'
        >
            <Header />
            <VStack spacing='16'>
                <Information />
                <ContainerWithLoading isLoading={loading} title='Carregando...' isLoadingError={!!error} loadingErrorMessage='Ops! Não conseguimos carregar os dados.'>
                    <VStack spacing='4'>
                        {data?.batches?.map(batch => (
                            <HStack key={batch.id} spacing='6' >
                                <Text
                                    as='span'
                                    fontSize='1.5rem'
                                    fontWeight='bold'
                                    textDecoration={batch.soldAmount === batch.amount ? 'line-through' : undefined}
                                    color={batch.soldAmount === batch.amount ? 'gray.600' : 'app.primary'}
                                >
                                    {batch.name} - <Text fontWeight='regular' as='span' color={batch.soldAmount === batch.amount ? 'gray.600' : 'white'}>
                                        {batch.soldAmount}/{batch.amount}
                                    </Text>
                                </Text>
                            </HStack>
                        ))}
                    </VStack>
                    <HStack>
                        <PrimaryButton onClick={onOpen}>
                            COMPRAR
                        </PrimaryButton>
                    </HStack>
                </ContainerWithLoading>
            </VStack>
            <Footer />
            <PurchaseModal isOpen={isOpen} onClose={onClose} currentBatch={currentBatch as Batch} />

        </Flex>
    );


    // <Box rounded='lg' bgColor='orange' p='2'>
    //                         <Image
    //                             alt={currentBatch?.qrCode.fileName}
    //                             src={currentBatch?.qrCode.url}
    //                             width={10}
    //                             height={10}
    //                             type='rem'
    //                         />
    //                     </Box>
}