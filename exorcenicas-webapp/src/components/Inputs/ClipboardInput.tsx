import { Input as ChakraInput, HStack, FormControl, FormLabel, Flex, IconButton, Icon, useToast, FormLabelProps } from "@chakra-ui/react";
import { useState } from "react";
import { FiCopy } from "react-icons/fi";



interface ClipboardInputProps {
    name: string;
    label?: string;
    value: string;
    successTitle?: string;
    labelProps?: FormLabelProps;
}


export function ClipboardInput({ name, value, label, successTitle = 'Valor Copiado', labelProps }: ClipboardInputProps) {

    const [focusColor, setFocusColor] = useState("white");

    const toast = useToast();
    
    const copyToClipBoard = async (copyValue: string) => {

        try {
            await navigator.clipboard.writeText(copyValue);
            toast({
                status: 'success',
                position: 'bottom',
                duration: 10000,
                isClosable: true,
                title: successTitle
            })
        } catch (err) {
        }
    };

    

    return (
        <FormControl
            onFocus={() => setFocusColor("app.primary")}
            onMouseEnter={() => setFocusColor("app.primary")}
            onMouseLeave={() => setFocusColor("white")}
        >
            {
                !!label && (
                    <FormLabel
                        htmlFor={name}
                        color={focusColor}
                        w='100%'
                        fontSize={{ base: '1.5rem', sm: '2rem' }}
                        {...labelProps}
                    >
                        {label}
                    </FormLabel>
                )
            }
            <Flex
                w="100%"
                //h={70}
                flexDir="row"
                justify="center"
                align="center"
                bgColor="transparent"
                borderBottomColor={focusColor}
                borderBottomWidth={1}
                color={focusColor}
                _hover={{ bgColor: "transparent", borderBottomColor: { focusColor } }}

            >
                <HStack
                    w="90%"
                    spacing="2"
                    h="100%"
                    align="center"
                >
                    < ChakraInput
                        w="100%"
                        h="90%"
                        name={name}
                        variant="unstyled"
                        border="none"
                        size="md"
                        isDisabled={true}
                        fontFamily="Just Me Again Down Here"
                        fontSize='1.5rem'
                        _disabled={{ color: focusColor }}
                        value={value}
                    />
                    <IconButton
                        aria-label="copiar"
                        icon={<Icon as={FiCopy} color='white' _hover={{ color: 'app.primary', scale: 1.2 }} fontSize='1.5rem' />}
                        onClick={() => copyToClipBoard(value)}
                        variant='unstyled'

                    />
                </HStack>
            </Flex>
        </FormControl>
    );
}
