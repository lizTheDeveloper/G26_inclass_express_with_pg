CREATE DATABASE pokemon;

\c pokemon;

CREATE TABLE pokemon (
    id SERIAL PRIMARY KEY,
    name TEXT,
    pokedex_number NUMERIC,
    type1 TEXT,
    type2 TEXT
);

CREATE TABLE moves (
    id SERIAL PRIMARY KEY,
    name TEXT,
    type TEXT
);
