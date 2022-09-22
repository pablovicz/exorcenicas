import { Center, Img, ImgProps } from "@chakra-ui/react";


interface ImageProps extends ImgProps {
    width: number;
    height: number;
    type?: 'rem' | 'px';
}


export function Image({ width, height, type = 'px', ...rest }: ImageProps) {

    const widthPx = `${width}${type}`;
    const heightPx = `${height}${type}`;


    return (
        <Center w={widthPx} h={heightPx}>
            <Img
               {...rest}
                maxW={widthPx}
                maxH={heightPx}
                userSelect='none'
            />
        </Center>
    );

}