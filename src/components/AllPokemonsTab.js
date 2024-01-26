import {
    Box,
    Button,    
    Container,
    Flex,  
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Stack,
    Spinner,  
    useDisclosure,  
} from "@chakra-ui/react";
import PokemonCard from "@/components/PokemonCard";
import PokemonData from "@/components/PokemonData";
import { useState } from "react";

const AllPokemonsTab = ({pokemon, handleNextPage, catchedPokemons, setCatchedPokemons, isLoading}) => {
    const pokemonDataModal = useDisclosure();
    const [selectedPokemon, setSelectedPokemon] = useState();

    function handleViewPokemon(pokemon) {
        setSelectedPokemon(pokemon);
        pokemonDataModal.onOpen();
      }
     function addCatchedPokemon(body) {
        setCatchedPokemons([...catchedPokemons, body])
        
     }

  return (
    <>        
        <p>Capture your Pokemon</p>
        <Flex alignItems="center" minH="100vh" justifyContent="center">
        <Container maxW="container.lg">
                <Stack p="5" alignItems="center" spacing="5">
                    <SimpleGrid spacing={{ base: 5, md: 2 }} columns={{ base: 1, md: 3, lg: 5 }}>
                        {pokemon.map((poke) => (
                        <Box
                        as="button"
                        key={poke.id}
                        onClick={() => handleViewPokemon(poke)}
                        >
                            <PokemonCard pokemon={poke} />
                        </Box>
                        ))}
                    </SimpleGrid>
                    {isLoading && (<Spinner 
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                    />)}
                    <Button onClick={handleNextPage}>
                    Load more
                    </Button>
                </Stack>
        </Container>
        </Flex>
        <Modal {...pokemonDataModal}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textTransform="capitalize">
                    {selectedPokemon?.name}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {selectedPokemon && <PokemonData pokemon={selectedPokemon} addCatchedPokemon={addCatchedPokemon} catchedPokemons={catchedPokemons}/>}
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
  )
}

export default AllPokemonsTab;

