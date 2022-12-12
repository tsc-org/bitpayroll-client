import { defineStyleConfig } from "@chakra-ui/react";

const Button = defineStyleConfig({
    baseStyle: {
        borderRadius: 'lg',
        textAlign: 'center',
        height: 'auto !important',
    },
    sizes: {
        xs: {
            px: 2,
            py: 1,
        },
        sm: {
            fontSize: 'sm',
            px: 4,
            py: 2,
        },
        md: {
            fontSize: 'md',
            px: 4,
            py: 2,
        },
        icon: {
            width: '46px',
            height: '46px',
        },
        full: {
            fontSize: 'md',
            px: 6,
            py: 4,
            width: 'full',
            maxWidth: "280px",
        },
        "no-size": {
            width: "0px",
            height: "0px",
            p: 0,
            m: 0,
        }
    },
    variants: {
        primary: () => ({
            color: '#fff',
            bgColor: 'orange.200',
            _hover: {
                bgColor: 'orange.250',
                _disabled: {
                    bgColor: 'orange.200'
                }
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
            _hover: {
                bgColor: "grey.150"
            },
            _active: {
                bgColor: "grey.200",
                color: "grey.100"
            },
        },
        outlined:{
            color: "##2e2e2e",
            bgColor: "transparent",
            border: '0.5px solid'

        },
        "page-switch-active": {
            fontSize: "12px",
            bgColor: "orange.175",
            color: "grey.375",
            borderRadius: "100%",
            width: "24px",
            height: "24px",
        },
        "page-switch-inactive": {
            fontSize: "12px",
            bgColor: "grey.100",
            color: "grey.175",
            borderRadius: "100%",
            width: "24px",
            height: "24px",
            _hover: {
                transform: "scale(1.2)",
            }
        }
    },
    defaultProps: {
        size: 'md',
        variant: 'primary',
    },
})

export default Button