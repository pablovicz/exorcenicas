import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

import InputMask from "react-input-mask";
import {
    Input as ChakraInput, FormLabel, FormControl,
    InputProps as ChrakraInputProps, FormErrorMessage, InputGroup, FormLabelProps
} from '@chakra-ui/react';
import { RenderByCondition } from '../RenderByCondition';


export interface RgInputProps extends ChrakraInputProps {
    name: string;
    label?: string;
    error?: FieldError;
    isValid?: boolean;
    labelProps?: FormLabelProps;
}


const InputBase: ForwardRefRenderFunction<HTMLInputElement, RgInputProps> = ({ name, label, error = null, isValid = null, labelProps, ...rest }, ref) => {

    return (
        <FormControl isInvalid={!!error}>
            <RenderByCondition condition={!!label}>
                <FormLabel
                    htmlFor={name}
                    fontWeight="semibold"
                    _focus={{ color: "app.primary" }}
                    color='white'
                    fontSize='1.25rem'
                    fontFamily='Roboto'
                    {...labelProps}
                >
                    {label}
                </FormLabel>
            </RenderByCondition>
            <InputGroup>
                < ChakraInput
                    name={name}
                    variant="flushed"
                    as={InputMask}
                    mask='99.999.999-9'
                    bgColor="none"
                    borderColor='white'
                    fontWeight='regular'
                    color='white'
                    _focus={{ color: "app.primary" }}
                    focusBorderColor="app.primary"
                    _placeholder={{ color: 'gray.200', fontWeight: 'thin' }}
                    _disabled={{ bgColor: "transparent", borderColor: "gray.200", color: "gray.200", cursor: "not-allowed" }}
                    fontFamily='Roboto'
                    px="6"
                    pt='8'
                    pb='4'
                    size="md"
                    fontSize='1.5rem'
                    ref={ref}
                    {...rest}
                />
            </InputGroup>
            <RenderByCondition condition={!!error}>
                <FormErrorMessage fontSize='1.25rem'>{error?.message}</FormErrorMessage>
            </RenderByCondition>
        </FormControl>
    )
}


export const RgInput = forwardRef(InputBase);