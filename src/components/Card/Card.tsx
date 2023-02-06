import { Box, Button, Flex, Icon, Image, Skeleton, Spacer, Text } from '@chakra-ui/react';
import React from 'react'
import styles from "./Card.module.scss"

interface Props {
    imgSrc?: string;
    bgColor?: string;
    icon?: any;
    title?: string;
    value?: any;
    actionText?: string;
    action?: (x: any) => void;
    loading?: boolean;
}

const Card: React.FC<Props> = ({imgSrc, bgColor, icon, title, value, action, actionText, loading}) => {

 
  return (
    <Box height="full" borderRadius="5px" position="relative" bgColor={bgColor || "white"} >
      {imgSrc && <Image src={imgSrc} boxSize="100%" alt='card background' position={"absolute"} top={0} left={0} objectFit="cover" />}
      <Box p={{base: "mainPageGapYsm", lg:"mainPageGapY"}} fontWeight="500" color={bgColor? "white" : "grey.375"} >
          <Icon  boxSize={{base: "28px", md: "36px", lg: "48px", xl: "64px"}} as={icon} mt="0.5em" mb="1em" />
          <Text fontSize={{base: "sm", lg: "md"}} >{title}</Text>
          <Flex gap={2} mt={2} flexWrap="wrap">
              {loading? <Skeleton w="100px" h="30px" /> : <Text fontSize={{base: "14px", lg: "25px"}} fontWeight="800" lineHeight={1}>{value}</Text>}
              <Spacer/>
              {actionText && <Button onClick={action} size={{base:"xs", md:"sm"}} mt={2}>{actionText}</Button>}
          </Flex>
      </Box>
    </Box>
  )
}

export default Card