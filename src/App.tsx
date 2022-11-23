import { ChakraProvider } from '@chakra-ui/react'
import './App.css'
import { AuthContextProvider } from './context/authContext'
import BaseRoutes from './Routes'
import theme from './chakra/chakra-theme'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <BaseRoutes />
        </AuthContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App
