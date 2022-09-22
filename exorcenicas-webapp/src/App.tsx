import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { client } from './lib/apollo';
import { HomePage } from './pages/HomePage';
import { theme } from './styles/theme';


function App() {

  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme} resetCSS>
        <HomePage />
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default App
