import {
  Alert,
  AlertIcon,
  AspectRatio,
  Box,
  Checkbox,
  Image,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PokemonData({ pokemon, addCatchedPokemon }) {
  const [capturePokemon, setCapturePokemon] = useState(false);
  const [caughtPokemon, setcaughtPokemon] = useState(false);
  const [checkBox, setCheckBox] = useState(true);

  useEffect(() => {
    const fetchCatchedPokemon = async () => {
      console.log(pokemon);
      try {
        const response = await axios.get("http://localhost:3000/api/catched");
        const catchedPokemons = response.data;
        const isCatched = catchedPokemons.some((p) => p.id === pokemon.id);
        setcaughtPokemon(isCatched);
      } catch (error) {
        console.error("Error obtaining captured Pokémon", error);
      }
    };
    fetchCatchedPokemon();
  }, [pokemon.id]);

  const handleCatched = async () => {
    const body = {
      id: pokemon.id,
      name: pokemon.name,
    };

    try {
      await axios.post("http://localhost:3000/api/catched", body);
      setCapturePokemon(true);
      setTimeout(() => {
        setCapturePokemon(false);
        setcaughtPokemon(true);
      }, 4000);
      addCatchedPokemon(body);
      setCheckBox(false);
    } catch (error) {
      console.error("Error capturing the Pokémon", error);
    }
  };

  const moves = Object.keys(pokemon.moves).length;

  return (
    <Stack spacing="5" pb="5">
      <Stack spacing="5" position="relative">
        <Box position="absolute" right="0" zIndex="99">
          {checkBox && !caughtPokemon && (
            <Checkbox onChange={handleCatched}>Catched</Checkbox>
          )}
        </Box>
        {capturePokemon && (
          <Alert
            status="success"
            height="70px"
            borderRadius={5}
            padding="8px"
            marginTop={6}
            fontFamily={"sans-serif"}
            fontSize="18"
          >
            <AlertIcon />
            You have captured a new Pokémon.
          </Alert>
        )}
        {caughtPokemon && (
          <Alert
            status="warning"
            height="70px"
            borderRadius={5}
            padding="8px"
            marginTop={6}
            fontFamily={"sans-serif"}
            fontSize="18"
          >
            <AlertIcon />
            You already have this Pokémon captured in your Pokéball.
          </Alert>
        )}
        <AspectRatio w="full" ratio={1}>
          <Image            
            objectFit="contain"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
            alt={pokemon.name}/>
        </AspectRatio>
        <Stack direction="row" spacing="5">
          <Stack>
            <Text fontSize="sm" fontWeight={500}>
              Weight
            </Text>
            <Text size="xs" textAlign="center">
              {pokemon.weight}
            </Text>
          </Stack>
          <Stack>
            <Text fontSize="sm" fontWeight={500}>
              Height
            </Text>
            <Text size="xs" textAlign="center">
              {pokemon.height}
            </Text>
          </Stack>
          <Stack>
            <Text fontSize="sm" fontWeight={500}>
              Moves
            </Text>
            <Text textAlign="center" size="xs">
              {moves}
            </Text>
          </Stack>
          <Stack>
            <Text fontSize="sm" fontWeight={500}>
              Types
            </Text>
            {pokemon.types.map((type) => (
              <Text textAlign="center" size="xs" key={type.slot}>
                {type.type.name.toUpperCase()}
              </Text>
            ))}
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
