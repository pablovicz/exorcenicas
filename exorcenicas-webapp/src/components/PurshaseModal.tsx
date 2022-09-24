import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    VStack,
    Text,
    useBreakpointValue,
    Box,
    Center,
    useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Batch, useCreatePayingPersonMutation, useUpdateBatchMutation } from '../graphql/generated';
import { theme } from '../styles/theme';
import { currencyFormatter } from '../utils/utils';
import { Image } from './Image';
import { ClipboardInput } from './Inputs/ClipboardInput';
import { FileInput } from './Inputs/FileInput';
import { RgInput } from './Inputs/RgInput';
import { TextInput } from './Inputs/TextInput';
import { PrimaryButton } from './PrimaryButton';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { PhoneInput } from './Inputs/PhoneInput';
import QrCode from '../assets/qr-code.jpeg';


interface PurchaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentBatch: Batch;
}


interface UncontrolledFormData {
    name: string;
    document: string;
    phone: string;
}

const formScheme = yup.object().shape({
    name: yup.string().required('O nome é obrigatório.').min(3, 'O nome deve possuir pelo menos 3 caracteres'),
    document: yup.string().required('O RG é obrigatório.'),
    phone: yup.string().required('O Telefone é obrigatório.')
});


export function PurchaseModal({ isOpen, onClose, currentBatch }: PurchaseModalProps) {

    const isWideVersion = useBreakpointValue({
        base: false,
        sm: false,
        md: false,
        lg: true,
        xl: true
    });

    const [receiptId, setReceiptId] = useState('');
    const [errorCount, setErrorCount] = useState(0);
    const [receiptError, setReceiptError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [updateBatchMutation] = useUpdateBatchMutation();

    const { register, handleSubmit, formState, setValue, reset } = useForm<UncontrolledFormData>({
        resolver: yupResolver(formScheme)
    });

    const [createPayingPerson, { loading }] = useCreatePayingPersonMutation();


    function handleClose() {
        if (!isSubmitting) {
            onClose();
            reset();
        }
    }

    useEffect(() => {
        if (!currentBatch) {
            setReceiptId('');
            setReceiptError('');
            handleClose();
        }
    }, [currentBatch]);

    const toast = useToast();

    useEffect(() => {
        if (!!receiptId) {
            setReceiptError('');
        }
    }, [receiptId]);


    const onSubmit: SubmitHandler<UncontrolledFormData> = async (values, event) => {
        event?.preventDefault();

        if (!receiptId) {
            setReceiptError('Por favor, insira seu comprovante.');
        } else {
            setIsSubmitting(true);

            const response = await createPayingPerson({
                variables: {
                    name: values.name,
                    document: values.document,
                    phone: values.phone,
                    batch: currentBatch.name,
                    price: currencyFormatter.format(currentBatch.price),
                    receiptId: receiptId
                }
            }).then(async () => {

                const newSoldAmount = currentBatch?.soldAmount as number + 1;

                await updateBatchMutation({
                    variables: {
                        id: currentBatch.id,
                        soldAmount: newSoldAmount,
                        active: newSoldAmount !== currentBatch.amount
                    }
                }).then(async () => {
                    toast({
                        status: 'success',
                        position: 'bottom',
                        duration: 10000,
                        isClosable: true,
                        title: 'Compra Registrada!',
                        description: 'A compra foi registrada com sucesso.'
                    });
                    if (newSoldAmount === currentBatch.amount && !!currentBatch.nextBatchId) {
                        await updateBatchMutation({
                            variables: {
                                id: currentBatch.nextBatchId as string,
                                active: true
                            }
                        }).then(() => { console.log('atualizou') }).catch(err => { console.log(err) });
                    }
                }).catch(() => { });
                setIsSubmitting(false);
                handleClose();
            }).catch(error => {
                let message = 'Ocorreu um erro ao registrar sua compra, por favor, tente mais novamente.';

                if (errorCount > 3) {

                    message = 'Não estamos conseguindo registrar sua compra, por favor, envie o comprovante de sua compra na <a href="https://www.instagram.com/exorcenicas/?hl=pt-br" target="_blank" rel="noopener noreferer">nossa DM.</a>'
                }

                toast({
                    status: 'error',
                    position: 'bottom',
                    duration: 10000,
                    isClosable: true,
                    title: 'Ops! Erro ao registrar compra!',
                    description: message
                });
                setErrorCount(errorCount + 1);
                setIsSubmitting(false);
            });

        }

    }


    return (
        <Modal isOpen={isOpen} onClose={handleClose} size={isWideVersion ? 'lg' : 'full'} scrollBehavior='inside'>
            <ModalOverlay />
            <ModalContent bgColor='gray.800' rounded='3xl'>
                <ModalHeader
                    as='h1'
                    color="app.primary"
                    fontFamily='Creepster'
                    textAlign='center'
                    fontSize='2rem'
                >
                    COMPRAR
                </ModalHeader>
                <ModalCloseButton color='white' colorScheme='whiteAlpha' />
                <ModalBody
                    mb="4"
                    css={{
                        '::-webkit-scrollbar': {
                            'width': '10px'
                        },
                        /* Track */
                        '::-webkit-scrollbar-track': {
                            'background': theme.colors.gray[800]
                        },
                        /* Handle */
                        '::-webkit-scrollbar-thumb': {
                            'background': theme.colors.gray[600],
                            'borderRadius': '10px'
                        },
                        /* Handle on hover */
                        '::-webkit-scrollbar-thumb:hover': {
                            'background': theme.colors.app.primary
                        }
                    }}
                >
                    <Center w='100%'>
                        <Center
                            bgColor='app.primary'
                            rounded='md'
                            w='80%'
                        >
                            <Text
                                as='span'
                                w='100%'
                                fontSize='1rem'
                                px='4'
                                color='white'
                                textAlign='center'
                                fontWeight='regular'
                            >
                                <Text as='span' fontWeight='bold'>Atenção!</Text> <br />Esse é um evento para maiores de 18 anos.
                            </Text>

                        </Center>
                    </Center>

                    <VStack spacing='12' w='100%' px='4' as='form' mt='4'>

                        <TextInput
                            label='Nome'
                            error={formState.errors.name}
                            {...register('name')}
                        />
                        <RgInput
                            label='RG'
                            error={formState.errors.document}
                            {...register('document')}
                        />
                        <PhoneInput
                            label='Telefone'
                            error={formState.errors.phone}
                            {...register('phone')}
                        />

                        <VStack spacing='4' w='100%' px='8'>
                            <Text as='h3' fontSize='2rem' color='app.primary' fontWeight='bold'>
                                {currentBatch?.name?.toUpperCase()} - <Text as='span' color='white' fontWeight='thin'>{currencyFormatter.format(currentBatch?.price)}</Text>
                            </Text>
                            <Box rounded='lg' bgColor='app.primary' p='2'>
                                <Image
                                    alt='Qr code'
                                    src={QrCode}
                                    width={isWideVersion ? 10 : 8}
                                    height={isWideVersion ? 10 : 8}
                                    type='rem'
                                />
                            </Box>
                            <ClipboardInput
                                name='pixKey'
                                value='exorcenicas@gmail.com'
                                label='Chave Pix'
                                successTitle='Chave PIX copiada!'
                                labelProps={{
                                    textAlign: 'center',
                                }}

                            />
                        </VStack>
                        <FileInput
                            label='Comprovante'
                            px={isWideVersion ? '8' : '2'}
                            onCallback={setReceiptId}
                            error={receiptError}
                        />
                    </VStack>
                    <Center>
                        <PrimaryButton
                            borderRadius='0px 0px 25px 25px'
                            py='6'
                            mb='6'
                            mt='12'
                            onClick={handleSubmit(onSubmit)}
                            isLoading={isSubmitting}
                        >
                            CONFIRMAR
                        </PrimaryButton>
                    </Center>
                </ModalBody>

            </ModalContent>
        </Modal>
    );
}