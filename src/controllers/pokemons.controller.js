import fs from "node:fs/promises";
import Data from "../fakedata/pokemon.data.js";

const { readFile, writeFile } = fs;

const CURRENT_DIR = process.cwd();

const getAll = async (req, res) => {
  let jsonData = null;

  try {
    jsonData = await readFile(
      `${CURRENT_DIR}/src/fakedata/pokemon.data.json`,
      "utf8"
    );
  } catch (e) {
    console.error(e.message);
  }

  const data = JSON.parse(jsonData);

  res.json({ Data: data.results });
};

const getAll_ = (req, res) => {
  const data = Data;
  res.json({ Data: data });
};

const create = (req, res) => {
  const name = req.body.pokemonName;
  const url = req.body.pokemonUrl;

  const newPokemon = {
    name,
    url,
  };

  Data.push(newPokemon);

  res.status(201).json({ message: "add", pokemonCreated: newPokemon });
};

export const pokemonsController = {
  getAll,
  create,
};
