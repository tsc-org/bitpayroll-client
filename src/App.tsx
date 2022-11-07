import { ChakraProvider } from '@chakra-ui/react'
import './App.css'
import { AuthContextProvider } from './context/authContext'
import BaseRoutes from './Routes'
import theme from './chakra/chakra-theme'


function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <BaseRoutes />
      </AuthContextProvider>
    </ChakraProvider>
  )
}

export default App
