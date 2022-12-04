import { extendTheme } from "@chakra-ui/react";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";

const colors = {
    grey: {
        100: '#ededed',
        150: '#e4e4e4',
        175: '#c8c8c8',
        200: '#4d4d4d',
        250: '#454545',
        275: '#3e3e3e',
        300: '#3a3a3a',
        350: '#2e2e2e',
        375: '#232323',
        400: '#1b1b1b'
    },
    orange: {
        100: '#fef4e8',
        150: '#feefdd',
        175: '#fddeb8',
        200: '#f7931a',
        250: '#de8417',
        275: '#c67615',
        300: '#b96e14',
        350: '#945810',
        375: '#6f420c',
        400: '#563309'
    }
}

const space = {
    mainPageGapX: '24px',
    mainPageGapY: '24px',
    mainPageGapXsm: '16px',
    mainPageGapYsm: '16px',
}

const theme = extendTheme({ 
    colors,
    space,
    components: {
       Button, 
       Checkbox,
    }
})

export default theme
