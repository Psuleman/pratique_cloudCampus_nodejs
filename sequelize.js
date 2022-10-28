import { Sequelize, DataTypes } from "sequelize";
import { pokemon_model } from "../models/pokemon.js";
import user_model from "../models/user.js";
import { pokemons } from "./mock-pokemon.js";
import bcrypt from 'bcrypt'

// const sequelize = new Sequelize('pokedex', 'balde', '161100', {
//     host: 'localhost',
//     dialect: 'mariadb',
//     dialectOptions: {
//         timezone: 'Etc/GMT-2',
//     },
//     logging: false
// })

const sequelize = new Sequelize('pokedex', 'cloudcampus', 'clouD161124', {
    host: '35.224.215.24',
    dialect: 'mysql',
    dialectOptions: {
        timezone: '-02:00',
    },
    logging: false
})

const Pokemon = pokemon_model(sequelize, DataTypes)
const User = user_model(sequelize, DataTypes)


const initDb = (str) => {
    return sequelize.sync({ force: true }).then(_ => {
        pokemons.map(pokemon => {
            Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types: pokemon.types
            })
                .then(pokemon => console.log(pokemon.toJSON()))
                .catch(error => console.error(`bug de creation dun pokemon avec l'erreur ${error}`))
        })
        console.log('La base de donnée a bien été initialisée !')

        bcrypt.hash('pikachu', 10).then(hash => {
            return User.create({
                username: "pikachu",
                password: hash,
            }).then(user => console.log(user.toJSON()))
        }).catch(error => console.error(`erreur lors de la create de l'utilisateur ${error}`))

    })
}

export { initDb, Pokemon, User }