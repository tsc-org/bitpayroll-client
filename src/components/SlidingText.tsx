import { Heading, HeadingProps, Text } from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";

interface Props extends HeadingProps {
    text: string;
    duration?: number;
    delay?: number;
}
const SlidingText = ({text= "", duration=0.07, delay=2, ...props}: Props) => {
    text.replaceAll(" ", "\u00A0")
    const letterArray = Array.from(text)
    const writingDuration = (letterArray.length ?? 0) * duration
    const container: Variants = {
        hidden: {
            // opacity: 0,
            color: "var(--chakra-colors-orange-200)"
        },
        visible: (i = 1) => ({
            // opacity: 1,
            transition: { staggerChildren: duration, when: "afterChildren" },
            color: "var(--chakra-colors-grey-400)",
        })
    }
    
    const child: Variants = {
        hidden: {
            opacity: 0,
            scale: 0,
        },
        visible: {
            opacity: 1,
            scale: 2,
            transition: {duration: 0.01}
        }
    }

    return (
        <Heading {...props} as={motion.div} initial="hidden" variants={container} animate="visible" >
            {letterArray.map((char, index) => {
                return (
                    <Text as={motion.span} key={index} variants={child} >{char}</Text>
                )
            })}
        </Heading>
    )
}

export default SlidingText