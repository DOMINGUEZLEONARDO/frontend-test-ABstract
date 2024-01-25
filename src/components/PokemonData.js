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
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PokemonData({ pokemon, addCatchedPokemon }) {
  const [catched, setCatched] = useState(false);
  
  const handleCatched = async () => {
    const body = {
      id: pokemon.id,
      name: pokemon.name,
    }
    await axios.post("http://localhost:3000/api/catched", body);
    setCatched(true)
    addCatchedPokemon(body);
  }

  return (
    <Stack spacing="5" pb="5">
      <Stack spacing="5" position="relative">
        <Box position="absolute" right="0" zIndex="99">
          <Checkbox onChange={handleCatched} value={catched}>Catched</Checkbox>
        </Box>
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
              <Badge>Agua</Badge>
              <Badge>Agua</Badge>
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
