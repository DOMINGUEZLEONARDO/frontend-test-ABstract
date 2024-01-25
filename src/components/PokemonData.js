import {
  Box,
  AspectRatio,
  Image,
  Stack,
  SimpleGrid,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Progress,
  Text,
  Tab,
  Badge,
  HStack,
  Checkbox,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import axios from "axios";
import { Chau_Philomene_One, Sansita_Swashed } from "next/font/google";
import { useEffect, useState } from "react";

export default function PokemonData({ pokemon, addCatchedPokemon }) {
  const [catched, setCatched] = useState(false);
  const [pokemonCapturar, setPokemonCapturar] = useState(false)
  const [pokemonYaCapturado, setPokemonYaCapturado] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchCatchedPokemon = async () => {
      try{
        const response = await axios.get("http://localhost:3000/api/catched");
        const catchedPokemons = response.data;
        const isCatched = catchedPokemons.some(p => p.id === pokemon.id);
        setPokemonYaCapturado(isCatched);
      }catch(error){
        console.error("error al obtener pokemons capturados", error)
      }
    };
     fetchCatchedPokemon();
    
  }, [pokemon.id]);

  const handleCatched = async () => {
    const body = {
      id: pokemon.id,
      name: pokemon.name,
    }
    
    try{
      await axios.post("http://localhost:3000/api/catched", body);
      setCatched(true)
      setPokemonCapturar(true)
      addCatchedPokemon(body); 

    }catch(error){
      setError(true)     
     
    }      
  }  
  setTimeout(() => {
    setPokemonCapturar(false);
  }, 2500);
    
  
  return (
    
    <Stack spacing="5" pb="5">
      <Stack spacing="5" position="relative">
        <Box position="absolute" right="0" zIndex="99">
          <Checkbox onChange={handleCatched} value={catched}>Catched</Checkbox>
        </Box>        
        {pokemonCapturar && (<Alert status='success'  padding={3} marginTop={6} fontFamily={"sans-serif"} fontSize="18">
          <AlertIcon />
           Has capturado a un nuevo Pokemon
        </Alert>)}
        {pokemonYaCapturado && ( <Alert status='warning' padding={3} marginTop={6} fontFamily={"sans-serif"} fontSize="18">
          <AlertIcon />
          Este pokemon ya lo tienes capturado en tu Pokebola
        </Alert>)}
        {error && <Alert status='error'>
          <AlertIcon />
          No se ha podido capturar el pokemon
      </Alert>}
        <AspectRatio w="full" ratio={1}>
          <Image
            objectFit="contain"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
          />
        </AspectRatio>
        <Stack direction="row" spacing="5">
          <Stack>
            <Text fontSize="sm">Weight</Text>
            <Text>20</Text>
          </Stack>
          <Stack>
            <Text fontSize="sm">Height</Text>
            <Text>12</Text>
          </Stack>
          <Stack>
            <Text fontSize="sm">Movimientos</Text>
            <Text>109</Text>
          </Stack>
          <Stack>
            <Text fontSize="sm">Tipos</Text>
            <HStack>
              {pokemon.types.map((type) => (
                <Badge size="xs" key={type.slot}>
                  {type.type.name}
                 </Badge>
              ))}
            </HStack>
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing="5" p="5" bg="gray.100" borderRadius="xl">
        <Stack>
          <Text fontSize="xs">hp</Text>
          <Progress bg="gray.300" borderRadius="full" value={80} />
        </Stack>
        <Stack>
          <Text fontSize="xs">attack</Text>
          <Progress bg="gray.300" borderRadius="full" value={65} />
        </Stack>
      </Stack>
    </Stack>
  );
}
