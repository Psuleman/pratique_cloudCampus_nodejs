import express  from "express";
import morgan from "morgan";
import bodyParser from "body-parser"
import {initDb, Pokemon} from "./src/db/sequelize.js"
import * as pokemonRoutes from "./src/routes/pokemons-route.js"
import * as userRoutes from "./src/routes/users-routes.js"
import authMdlr from "./src/auth/auth.js"

//const express = require('express')
const app = express()
const port = 3000

//creation middleware
/*const logger = (req, res, next) => {
    console.log(`url de la requête en entrée ${req.url}`)
    next()
}

app.use(logger)//pour executer les middleware*/


// const Pokemon = pokemon_model(sequelize, DataTypes)

// sequelize.authenticate()
// .then( ( )=> console.log(`la connexion à la db est établie`))
// .catch(error => console.error(`l'application est disponible ${error}`))

// sequelize.sync({force: true})
// .then(_=>{
//     console.log(`la synchro est en cours`)
//     pokemons.map(pokemon=>{
//         Pokemon.create({
//             name: pokemon.name,
//             hp: pokemon.hp,
//             cp: pokemon.cp,
//             picture: pokemon.picture,
//             types: pokemon.types.join()
//         }).then(pokemon=>console.log(pokemon.toJSON()))
//     })
// })
// .catch(error => console.error(`erreur lors de la synchronisation ${error}`))
// app.use(express.urlencoded({extended: true}))
// //app.use(morgan('dev'))
// app.use(morgan("combined"))
// app.use(bodyParser.json())

// app.get('/', (req, res)=>{
//     res.send('API Rest ')
// })

// app.get('/api/pokemons/:id', (req, res)=>{
//     let id = req.params.id
//     let pokemon = pokemons.find(pokemon => pokemon.id === parseInt(id))
//     res.json(success("données pokemon", pokemon))
//     //res.json(pokemon)
//     //res.send(`Cette id correspond à ${pokemon.name}`)
// })

// app.post('/api/pokemons', (req, res) => {
//     const id = getUniqueId(pokemons)
//     const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } }
//     pokemons.push(pokemonCreated)

//     res.json(success(`un nouveau pokemon a été crée ${pokemonCreated.name}`, pokemonCreated))
// })

// app.put('/api/pokemons/:id', (req, res) => {
//     const id = parseInt(req.params.id)
//     const pokemonUpd = { ...req.body, id:id}
//     pokemons[id] = pokemonUpd

//     res.json(success(`MAJ des données du pokemon ${pokemons[id].name}`, pokemonUpd))
// })
//bodyParser
app.use(morgan('dev'))
app.use(morgan("combined"))
app.use(bodyParser.json())

//Mettre à jours la base de données
//initDb() 

//User routes
userRoutes.userLogin(app)

app.use((req,res, next)=>{
    const message = `la ressource demandé ${req.url} ,'existe pas`
    res.status(404).json({message})
    next()
})

app.use(authMdlr) //pour protéger les routes
//pokemon routes
pokemonRoutes.findAllPokemons(app)
pokemonRoutes.findPokemonByPk(app)
pokemonRoutes.createPokemon(app)
pokemonRoutes.deletePokemon(app)



app.listen(port, ()=>console.log(`l'application est disponible sur http://localhost:${port}`))