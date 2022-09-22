import { Box, Flex, HStack, Text, useBreakpointValue, useDisclosure, VStack } from "@chakra-ui/react";
import { theme } from "../styles/theme";


import { Batch, useGetBatchesQuery } from "../graphql/generated";
import { ContainerWithLoading } from "../components/ContainerWithLoading";
import { Information } from "../components/Information";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PrimaryButton } from "../components/PrimaryButton";
import { PurchaseModal } from "../components/PurshaseModal";
import { currencyFormatter } from "../utils/utils";
import SmokeBg from '../assets/background.png';
import GhostAsset from '../assets/ghost-first.png';
import { Image } from "../components/Image";
import './animation.css';




export function HomePage() {

    const { data, loading, error } = useGetBatchesQuery();

    const currentBatch = data?.batches?.filter(batch => batch?.soldAmount as number < batch?.amount)[0];

    const { isOpen, onOpen, onClose } = useDisclosure();

    const isMobileVersion = useBreakpointValue({
        base: false,
        sm: true,
        md: false,
        lg: false,
        xl: false
    });


    return (
        <Flex
            flexDir="column"
            align="center"
            justify="center"
            w='100vw'
            h='100vh'
            overflowX="hidden"
            overflowY="hidden"
            backgroundImage={SmokeBg}
            backgroundSize={'auto'}
            backgroundPosition={'center bottom'}
            backgroundRepeat='repeat-x'
            className="area"
        >
            <ul className="circles">
                {[1, 2, 3, 4, 5, 6].map(item => (
                    <Box as='li' key={item}>
                        <Image
                            src={GhostAsset}
                            alt='Ghost'
                            width={isMobileVersion ? 4 : 8}
                            height={isMobileVersion ? 4 : 8}
                            type='rem'
                        />
                    </Box>
                ))}
            </ul>

            <Flex
                position='absolute'
                w='100vw'
                h='100vh'
                top='0'
                zIndex={200}
                minW={300}
                pb={{ base: '10', sm: '4' }}
                px='4'
                flexDir='column'
                align='center'
                justify='space-between'
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
            >
                <VStack
                    spacing='4'
                    mb='12'
                    w="full"

                >
                    <Header />
                    <Information />
                </VStack>
                <VStack spacing='12'>
                    <ContainerWithLoading isLoading={loading} title='Carregando...' isLoadingError={!!error} loadingErrorMessage='Ops! Não conseguimos carregar os dados.'>
                        <VStack spacing='4'>
                            {data?.batches?.map(batch => (
                                <VStack spacing='2' key={batch.id}>
                                    <HStack spacing='6' >
                                        <Text
                                            as='span'
                                            fontSize='1.5rem'
                                            fontWeight='bold'
                                            textDecoration={batch.soldAmount === batch.amount ? 'line-through' : undefined}
                                            color={batch.soldAmount === batch.amount ? 'gray.600' : 'app.primary'}
                                        >
                                            {batch.name} (<Text fontWeight='regular' as='span' color={batch.soldAmount === batch.amount ? 'gray.600' : 'white'}>
                                                {batch.soldAmount}/{batch.amount}
                                            </Text>)
                                        </Text>
                                    </HStack>
                                    {batch.active ? (
                                        <Text fontWeight='regular' as='span' fontSize='1.5rem' color={batch.soldAmount === batch.amount ? 'gray.600' : 'white'}>
                                            {currencyFormatter.format(batch.price)}
                                        </Text>
                                    ) : (
                                        <Text fontWeight='regular' as='span' fontSize='1.5rem' color={batch.soldAmount === batch.amount ? 'gray.600' : 'white'}>
                                            ???
                                        </Text>
                                    )}
                                </VStack>
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