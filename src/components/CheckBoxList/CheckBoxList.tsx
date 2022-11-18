import { Box, Checkbox } from '@chakra-ui/react'
import React, { useState } from 'react'

const CheckBoxList = ({employeesData, toggleCheck}: any) => {
    
  return (
    <Box>
        {employeesData.map((emp: any, idx: number) => (
            <Checkbox onChange={(e) => toggleCheck(e, idx)}>
                {emp?.firstName} {emp?.lastName}
            </Checkbox>
        ))}
    </Box>
  )
}

export default CheckBoxList