import { border, defineStyleConfig } from "@chakra-ui/react";

const Button = defineStyleConfig({
    baseStyle: {
        borderRadius: 'lg',
        textAlign: 'center',
        height: 'auto !important',
    },
    sizes: {
        sm: {
            fontSize: 'sm',
            px: 4,
            py: 2,
        },
        md: {
            fontSize: 'md',
            px: 4,
            py: 0,
        },
        icon: {
            width: '46px',
            height: '46px',
        },
        full: {
            fontSize: 'md',
            px: 6,
            py: 4,
            width: 'full'
        }
    },
    variants: {
        primary: () => ({
            color: '#fff',
            bgColor: 'orange.200',
            _hover: {
                bgColor: 'orange.250',
            },
            _active: {
                bgColor: 'orange.275',
            }
            
        }),
        profileIcon: {
            color: 'grey.300',
            fontSize: '24px',
            border: '0.5px solid',
            borderColor: 'grey.100',
            borderRadius: '3px',
            fontWeight: "800",
        },
        outlined:{
            color: "##2e2e2e",
            bgColor: "transparent",
            border: '0.5px solid'

        }
    },
    defaultProps: {
        size: 'md',
        variant: 'primary',
    },
})

export default Button