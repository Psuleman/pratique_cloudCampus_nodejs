import { Sequelize, DataTypes } from "sequelize";
import { pokemon_model } from "../models/pokemon.js";
import { pokemons } from "./mock-pokemon.js";
import user_model from "../models/users.js";
import bcrypt from 'bcrypt'

const sequelize = new Sequelize('pokedex', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
        timezone: 'local',
    },
    logging: false
})
const Pokemon = pokemon_model(sequelize, DataTypes)
const User = user_model(sequelize, DataTypes)

const initDb = () => sequelize.sync({force: true})
.then(_=>{
    console.log(`la synchro est en cours`)
    pokemons.map(pokemon=>{
        Pokemon.create({
            name: pokemon.name,
            hp: pokemon.hp,
            cp: pokemon.cp,
            picture: pokemon.picture,
            types: pokemon.types.join()
        }).then(pokemon=>console.log(pokemon.toJSON()))
    })
    //Création premier utilisateur
    bcrypt.hash('pikachu', 10).then((hash => {
    User.create({
        username: 'pikachu',
        password: hash,
    })
    .then(user=>console.log(`L'utilisateur ${user.username} a bien été créé`))
    }))
    .catch(arror=>console.error(`erreur lors de la création de l'utilisateur`))
})
.catch(error => console.error(`erreur lors de la synchronisation ${error}`))


export {initDb, Pokemon, User}