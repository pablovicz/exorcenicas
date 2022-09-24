import { Box, Button, Center, FormControl, FormErrorMessage, FormLabel, FormLabelProps, HStack, Icon, IconButton, Input, InputProps, Progress, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { FileUploadResponse, UploadController } from "../../services/api";
import { RenderByCondition } from "../RenderByCondition";


interface FileInputProps extends InputProps {
    name?: string;
    label?: string;
    labelProps?: FormLabelProps
    onCallback: (id: string) => void;
    error?: string;
}



export function FileInput({ name, label, labelProps, onCallback, error, ...rest }: FileInputProps) {

    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedData, setSubmittedData] = useState<FileUploadResponse>({} as FileUploadResponse);


    const { uploadAsset } = UploadController();

    const [file, setFile] = useState([]);


    async function handleChange(file: any) {
        setIsSubmitting(true);
        setFile(file);
        await uploadAsset(file[0])
            .then(response => {
                setSubmittedData(response.data);
                onCallback(response.data.id);
            })
            .catch(error => {
                setFile([]);
                toast({
                    status: 'error',
                    duration: 10000,
                    title: 'Erro no Upload!',
                    description: 'Não estamos conseguindo registrar sua compra, por favor, envie o comprovante de sua compra na <a href="https://www.instagram.com/exorcenicas/?hl=pt-br" target="_blank" rel="noopener noreferer">nossa DM.</a>',
                    isClosable: true,
                    position: 'bottom'
                });
            });
        setIsSubmitting(false);

    }

    async function handleDelete() {
        setSubmittedData({} as FileUploadResponse);
        setFile([]);
    }


    return (
        <FormControl isInvalid={!!error}>
            <RenderByCondition condition={!!label}>
                <FormLabel
                    htmlFor={name}
                    fontWeight="semibold"
                    _focus={{ color: "app.primary" }}
                    color='white'
                    fontSize='1rem'
                    fontFamily='Roboto'
                    mb='4'
                    {...labelProps}
                >
                    {label}
                </FormLabel>
            </RenderByCondition>
            <Center w='100%'>
                <RenderByCondition condition={!isSubmitting && file.length === 0}>
                    <Input
                        name={name}
                        type='file'
                        variant='unstyled'
                        justifyContent='center'
                        multiple={false}
                        value={file}
                        fontWeight='regular'
                        fontFamily='Roboto'
                        onChange={e => handleChange(e?.target?.files)}
                        cursor='pointer'
                        isDisabled={isSubmitting}
                        fontSize='1rem'
                        {...rest}
                    />
                </RenderByCondition>
                <RenderByCondition condition={isSubmitting}>
                    <VStack spacing='1' rounded='lg' minW='150px' p='1'>
                        <Text as='span' color='app.primary' w='100%' textAlign='center' fontSize='1.25rem'>
                            Fazendo Upload...
                        </Text>
                        <Spinner color="app.primary" size="md" />
                    </VStack>
                </RenderByCondition>
                <RenderByCondition condition={!!submittedData && Object.keys(submittedData).length > 0 && !isSubmitting}>
                    <HStack spacing='2' bgColor='app.primary' rounded='lg'>
                        <Text as='span' color='white' px='6'>
                            {submittedData?.filename}
                        </Text>
                        <IconButton
                            variant='unstyled'
                            color='white'
                            _hover={{
                                color:
                                    'yellow',
                                scale:
                                    1.2
                            }}
                            aria-label='delete'
                            onClick={handleDelete}
                            icon={<Icon as={FiX} fontSize='1rem' />}
                        />
                    </HStack>
                </RenderByCondition>
            </Center>
            <RenderByCondition condition={!!error}>
                <FormErrorMessage fontSize='1rem'>{error}</FormErrorMessage>
            </RenderByCondition>
        </FormControl>
    );
}