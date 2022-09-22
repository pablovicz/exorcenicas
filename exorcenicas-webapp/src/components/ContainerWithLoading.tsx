import { ReactNode } from "react";
import { Flex, Icon, Spinner, Text } from '@chakra-ui/react';
import { RenderByCondition } from "./RenderByCondition";
import {BiError} from 'react-icons/bi';


interface ContainerWithLoadingProps {
    isLoading: boolean;
    title?: string;
    children: ReactNode | ReactNode[];
    isLoadingError?: boolean;
    loadingErrorMessage?: ReactNode;
}

export function ContainerWithLoading({ isLoading, isLoadingError = false, loadingErrorMessage, title, children }: ContainerWithLoadingProps) {

    return (
        <>
            <RenderByCondition condition={!isLoading && isLoadingError}>
                <Flex
                    flex="1"
                    flexDir="column"
                    w="100%"
                    h="100%"
                    minH={400}
                    justify="center"
                    align="center"
                    p="5"
                >
                    <Icon as={BiError} fontSize="2rem" color="app.primary" />
                    {!!loadingErrorMessage ? (loadingErrorMessage) : (
                        <Text
                            as='span'
                            fontWeight="bold"
                            fontSize='1rem'
                            color="app.primary"
                            textAlign="center"
                            mt="2"
                        >
                            Erro ao Carregar
                        </Text>
                    )}
                </Flex>
            </RenderByCondition>
            <RenderByCondition condition={isLoading && !isLoadingError}>
                <Flex
                    flex="1"
                    flexDir="column"
                    w="100%"
                    h="100%"
                    minH={400}
                    justify="center"
                    align="center"
                    p="5"
                >
                    <Spinner color="app.primary" size="lg" />
                    <RenderByCondition condition={!!title}>
                        <Text as='span' textAlign='center' color="app.primary" fontSize='1rem' mt="2">
                            {title}
                        </Text>
                    </RenderByCondition>
                </Flex>
            </RenderByCondition>
            <RenderByCondition condition={!isLoading && !isLoadingError}>
                {children}
            </RenderByCondition>
        </>
    );
}