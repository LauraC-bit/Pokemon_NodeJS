import fs from "node:fs/promises";
import { PokemonDAO } from "../daos/pokemon.dao.js";

const { readFile, writeFile } = fs;

const CURRENT_DIR = process.cwd();

const getAll = async (req, res) => {
  const result = await PokemonDAO.read();
  if (!!result.error) return res.status(400).json({ message: result.error });
  return res.json({ Pokemons: result });
};

const create = async (req, res) => {
  const name = req.body.name;
  const url = req.body.url;

  let result = await PokemonDAO.read();
  result = result.data;
  if (!!result.error) return res.status(400).json({ message: result.error });

  const newPokemon = {
    name,
    url,
  };

  console.log(result);

  result.results.push(newPokemon);

  const error = await PokemonDAO.write(result);
  if (!!error) return res.status(400).json({ message: error });
  res.status(201).json({
    message: "Pokemon added successfully",
    pokemonCreated: newPokemon,
  });
};

export const pokemonsController = {
  getAll,
  create,
};
