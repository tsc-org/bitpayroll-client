import { Box, Button, Center, Container, Icon, Image, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import CheckCircle from "../assets/icons/check-circle.svg"

const Verification = () => {
  return (
    <Center w="full" h="100vh">
      <Container maxW="438px" textAlign="center" p={12} fontSize="sm" border="0.5px solid" borderColor="grey.100" borderRadius="10px">
        <Image src={CheckCircle} mx="auto" />
        <Stack fontSize="18px" spacing={4} mt="56px" mb="102px">
            <Text fontWeight="500">Successful!!</Text>
            <Text>Your account was created. Please confirm your email to continue</Text>
        </Stack>
        <Button size="full">
            <Link to="/dashboard">
              Go to Dashboard
            </Link>
        </Button>
      </Container>
    </Center>
  )
}

export default Verification