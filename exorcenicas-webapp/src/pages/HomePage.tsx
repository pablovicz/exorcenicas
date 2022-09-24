import { Box, Center, Flex, HStack, Text, useBreakpointValue, useDisclosure, VStack } from "@chakra-ui/react";
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
import { useMemo } from "react";
import { RenderByCondition } from "../components/RenderByCondition";




export function HomePage() {

    const { data, loading, error, refetch } = useGetBatchesQuery();

    console.log(loading)

    const currentBatch = useMemo(() => {
        return data?.batches?.filter(batch => batch?.soldAmount as number < batch?.amount && batch.active)[0];
    }, [data]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const isMobileVersion = useBreakpointValue({
        base: false,
        sm: true,
        md: false,
        lg: false,
        xl: false
    });

    function handleModalClose() {
        refetch();
        onClose();
    }

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
                        'background': theme.colors.gray[800],
                        'borderRadius': '10px'
                    },
                    /* Handle on hover */
                    '::-webkit-scrollbar-thumb:hover': {
                        'background': theme.colors.app.primary
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
                        <VStack spacing='8'>
                            {data?.batches?.map(batch => (
                                <Flex flexDir='row' align='center' justify='center' key={batch.id}>
                                    <Box w='55px' />
                                    <VStack
                                        spacing='2'
                                        borderWidth='1px'
                                        borderStyle='solid'
                                        borderColor='app.primary'
                                        minW='200px'
                                        rounded='xl'
                                        bgColor='gray.900'
                                        px='4'
                                        py='2'
                                    >
                                        <HStack spacing='6' >
                                            <Text
                                                as='span'
                                                fontSize='1.5rem'
                                                fontWeight='bold'
                                                textDecoration={!batch.active && batch.soldAmount === batch.amount ? 'line-through' : undefined}
                                                color={batch.active && batch.soldAmount === batch.amount ? 'gray.600' : 'app.primary'}
                                            >
                                                {batch.name?.toUpperCase()} (<Text fontWeight='regular' as='span' color={!batch.active && batch.amount !== batch.soldAmount ? 'gray.600' : 'white'}>
                                                    {batch.soldAmount}/{batch.amount}
                                                </Text>)
                                            </Text>
                                        </HStack>
                                        {batch.active || batch.amount === batch.soldAmount ? (
                                            <Text fontWeight='regular' as='span' fontSize='1.5rem' color={!batch.active && batch.amount !== batch.soldAmount ? 'gray.600' : 'white'}>
                                                {currencyFormatter.format(batch.price)}
                                            </Text>
                                        ) : (
                                            <Text fontWeight='regular' as='span' fontSize='1.25rem' color={!batch.active ? 'gray.600' : 'white'}>
                                                A REVELAR
                                            </Text>
                                        )}
                                    </VStack>
                                    <Flex
                                        flexDir='column'
                                        align='flex-start'
                                        justify='center'
                                        bg='transparent'
                                        ml='-45px'
                                        mt='-60px'
                                        transform='rotate(30deg)'
                                        w='100px'
                                    >
                                        <Text
                                            fontWeight='regular'
                                            as='span'
                                            fontSize='1.5rem'
                                            fontFamily='Just Me Again Down Here'
                                            color={!batch.active && batch.soldAmount !== batch.amount ? '#39FF14' : (batch.soldAmount !== batch.amount && (((batch?.soldAmount ?? 0) / batch.amount) > 0.8) ? 'yellow' : '')}
                                        >
                                            {!batch.active && batch.soldAmount !== batch.amount ? 'Em Breve!' : (batch.soldAmount !== batch.amount && (((batch?.soldAmount ?? 0) / batch.amount) > 0.8) ? 'Últimos!' : '')}
                                        </Text>
                                    </Flex>
                                </Flex>
                            ))}
                        </VStack>
                        <RenderByCondition condition={!!currentBatch}>
                            <Center>
                                <PrimaryButton onClick={onOpen} isDisabled={!currentBatch}>
                                    COMPRAR
                                </PrimaryButton>
                            </Center>
                        </RenderByCondition>
                    </ContainerWithLoading>
                </VStack>
                <Footer />
                <PurchaseModal isOpen={isOpen} onClose={handleModalClose} />
            </Flex>

        </Flex>
    );

}