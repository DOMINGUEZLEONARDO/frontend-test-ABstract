import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import AllPokemonsTab from "@/components/AllPokemonsTab";
import CatchedPokemonsTab from "@/components/CatchedPokemonsTab";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [catchedPokemons, setCatchedPokemons] = useState();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${currentPage * 20}`
      )
      .then(async ({ data }) => {
        const promises = data.results.map((result) => axios(result.url));
        const fetchedPokemon = (await Promise.all(promises)).map(
          (res) => res.data
        );
        setPokemon((prev) => [...prev, ...fetchedPokemon]);
        setIsLoading(false);
      })
      .catch((error) =>
        console.error("Error loading the Pokémon list.", error)
      );
  }, [currentPage]);

  useEffect(() => {
    try {
      axios.get(`http://localhost:3000/api/catched`).then(async ({ data }) => {
        setCatchedPokemons(data);
      });
    } catch (error) {
      console.error("Error loading captured Pokémon", error);
    }
  }, []);

  function handleNextPage() {
    setCurrentPage(currentPage + 1);
  }

  const handleDelete = async (pokemonId) => {
    try {
      await axios.delete(`http://localhost:3000/api/catched/${pokemonId}`);
      setCatchedPokemons((prevCatched) =>
        prevCatched.filter((pokemon) => pokemon.id !== pokemonId)
      );
    } catch (error) {
      console.error("Error deleting the Pokémon", error);
    }
  };

  return (
    <>
      <Head>
        <title>Pokemon Challenge</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Tabs>
        <TabList
          justifyContent="left"
          flexDirection={{ base: "column", md: "row" }}
        >
          <Tab
            marginTop={{ base: "2", md: "24px" }}
            marginLeft={{ base: "2", md: "24px" }}
            fontWeight={500}
          >
            All Pokemons
          </Tab>
          <Tab
            marginTop={{ base: "2", md: "24px" }}
            marginLeft={{ base: "2", md: "24px" }}
            fontWeight={500}
          >
            Catched Pokemons
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel marginLeft={3} marginTop={3}>
            <AllPokemonsTab
              pokemon={pokemon}
              handleNextPage={handleNextPage}
              catchedPokemons={catchedPokemons}
              setCatchedPokemons={setCatchedPokemons}
              isLoading={isLoading}
            />
          </TabPanel>
          <TabPanel marginLeft={3} marginTop={3}>
            <CatchedPokemonsTab
              catchedPokemons={catchedPokemons}
              handleDelete={handleDelete}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
