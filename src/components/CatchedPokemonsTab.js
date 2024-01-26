import {
    Box,
    Button,  
    Card,
    CardFooter,  
    Container,
    CardHeader,
    Flex,
    Heading,   
    SimpleGrid,
    Stack,  
    useDisclosure,  
} from "@chakra-ui/react";

const CatchedPokemonsTab = ({catchedPokemons, handleDelete}) => {
  return (
    <div>
        <Flex minH="100vh" justifyContent="center">
              <Container maxW="container.lg">
                <Stack p="5" alignItems="center" spacing="5">                  
                  <SimpleGrid spacing={{base: 5, md: 2}} columns={{ base: 1, md: 3, lg: 4 }}>
                    {catchedPokemons && catchedPokemons.map(({name, id}) => (<Card key={id}>
                      <CardHeader textAlign="Center">
                        <Heading size='md'>{name.toUpperCase()}</Heading>
                      </CardHeader>               
                        <CardFooter display="flex" alignItems="center" justifyContent="center">
                          <Button colorScheme="red" alignItems="center" onClick= {() => handleDelete(id)}>
                              Delete
                          </Button>
                        </CardFooter>
                    </Card>))}
                  </SimpleGrid>
                </Stack>
              </Container>
            </Flex> 
      
    </div>
  )
}

export default CatchedPokemonsTab
