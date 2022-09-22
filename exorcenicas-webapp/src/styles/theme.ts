import { extendTheme, TextProps } from '@chakra-ui/react';

export const fontStyles = {
    h1: {
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: '120%',
        maxW: '600px',
        w: '100%',
        fontSize: {
            base: '2.5rem',
            sm: '2rem',
            md: '2.5rem',
            lg: '2.5rem',
            xl: '2.5rem',
            '2xl': '2.5rem'
        },
    } as TextProps,
    h2: {
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: '110%',
        w: '100%',
        maxW: '600px',
        fontSize: {
            base: '2rem',
            sm: '1.5rem',
            md: '2rem',
            lg: '2rem',
            xl: '2rem',
            '2xl': '2rem'
        },
    } as TextProps,
    h3: {
        fontWeight: 'regular',
        textAlign: 'center',
        lineHeight: '110%',
        w: '100%',
        maxW: '600px',
        fontSize: {
            base: '1.75rem',
            sm: '1.5rem',
            md: '1.75rem',
            lg: '1.75rem',
            xl: '1.75rem',
            '2xl': '1.75rem'
        },
    } as TextProps,
    h4: {
        fontWeight: 'regular',
        textAlign: 'center',
        lineHeight: '110%',
        w: '100%',
        maxW: '600px',
        fontSize: {
            base: '1.5rem',
            sm: '1.25rem',
            md: '1.5rem',
            lg: '1.5rem',
            xl: '1.5rem',
            '2xl': '1.5rem'
        },
    } as TextProps,
    h5: {
        fontWeight: 'regular',
        textAlign: 'center',
        lineHeight: '110%',
        w: '100%',
        maxW: '600px',
        fontSize: {
            base: '1.25rem',
            sm: '1rem',
            md: '1.25rem',
            lg: '1.25rem',
            xl: '1.25rem',
            '2xl': '1.25rem'
        },
    } as TextProps,
    p: {
        fontWeight: 'thin',
        textAlign: 'left',
        lineHeight: '110%',
        w: '100%',
        fontFamily: 'Just Me Again Down Here',
        fontSize: {
            base: '1rem',
            sm: '1rem',
            md: '1rem',
            lg: '1rem',
            xl: '1rem',
            '2xl': '1rem'
        },
    } as TextProps,
    span: {
        fontFamily: 'Just Me Again Down Here',
    } as TextProps
}



export const theme = extendTheme({
    colors: {
        gray: {
            "900": "#181b23",
            "800": "#1f2029",
            "700": "#353646",
            "600": "#4b4d63",
            "500": "#616480",
            "400": "#797D9A",
            "300": "#9699B0",
            "200": "#B3B5C6",
            "100": "#D1D2DC",
            "50": "#EEEEF2"
        },
        app: {
            primary: 'red'
        }
    },
    fonts: {
        heading: 'Creepster, cursive',
        body: 'Just Me Again Down Here, sans-serif',
    },
    styles: {
        global: {
            body: {
                margin: 0,
                boxSizing: 'border-box',
                bg: 'gray.900',
                color: '#FFFFFF',
                CSS: {
                    'WebkitFontSmoothing': 'antialiased',
                },
            },
        }
    },
    breakpoints: {
        sm: '320px',
        md: '768px',
        lg: '960px',
        xl: '1280px',
        '2xl': '1536px'
    },
    components: {
        a: {
            'text-decoration': 'none',
            fontFamily: 'Just Me Again Down Here',
            color: 'white',
        }
    },
    ...fontStyles
});