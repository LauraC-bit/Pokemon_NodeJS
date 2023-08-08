import fs from "node:fs/promises";
import { PokemonDAO } from "../daos/pokemon.dao.js";

const { readFile, writeFile } = fs;

// ----------------------------------------------------------- READ

const CURRENT_DIR = process.cwd();

const getAll = async (req, res) => {
  const { userId } = req.body;
  const result = await PokemonDAO.read(userId);
  if (!!result.error) return res.status(400).json({ message: result.error });
  return res.json({ Pokemons: result });
};

// -------------------------------------------------------- CREATE

const create = async (req, res) => {
  const name = req.body.name;
  const url = req.body.url;
  const userId = req.body.userId;

  let result = await PokemonDAO.read(userId);
  result = result.data;
  if (!!result.error) return res.status(400).json({ message: result.error });

  const newPokemon = {
    name,
    url,
    userId,
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

// --------------------------------------------------------------- DELETE
//try 404 not found
const deleteT = async (req, res) => {
  const { PokemonId, userId } = req.params;

  const id = Number(PokemonId);
  if (Number.isNaN(id) || typeof id !== "number")
    return res.status(400).json({ message: `id '${PokemonId}' not valid` });

  const result = await PokemonDAO.read(userId);
  if (!!result.error) return res.status(400).json({ message: result.error });

  const pokemonExist = result.data.map((t) => t.id).includes(PokemonId);

  if (!pokemonExist)
    return res
      .status(400)
      .json({ message: `Pokemon with id '${id}' doesn't exist !` });

  const newPokemonsList = result.data.filter((t) => t.id !== PokemonId);

  const dataJson = JSON.stringify({ pokemons: newPokemonsList });

  const error = await PokemonDAO.write(dataJson);
  if (!!error) return res.status(400).json({ message: error });

  res.status(200).json({
    message: `Pokemon successfully deleted`,
    pokemonDeleted: PokemonId,
  });
};

// ------------------------------------------------------------------- UPDATE

const update = async (req, res) => {
  const { PokemonId, name, userId } = req.body;

  const result = await PokemonDAO.read(userId);
  if (!!result.error)
    return res.status(400).json({ message: result.data.error });

  const pokemonExist = result.data.map((t) => t.id).includes(PokemonId);
  if (!pokemonExist)
    return res
      .status(400)
      .json({ message: `Pokemon with id "${PokemonId}" doesn't exist !` });

  const newPokemonsList = result.data.map((t) =>
    t.id === PokemonId ? { ...t, name: name } : { ...t }
  );

  const dataJson = JSON.stringify({ pokemon: newPokemonsList });

  const error = await PokemonDAO.write(dataJson);
  if (!!error) return res.status(400).json({ message: error });

  res.status(200).json({
    message: `Pokemon successfully updated`,
    pokemonUpdated: PokemonId,
  });
};

export const pokemonsController = {
  getAll,
  create,
  update,
  deleteT,
};
