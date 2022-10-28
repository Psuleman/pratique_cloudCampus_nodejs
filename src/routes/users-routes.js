import { User } from '../db/sequelize.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { private_key } from '../auth/private_key.js'

export function userLogin(app) {
    app.post('/api/login', (req, res) => {

        User.findOne({ where: { username: req.body.username } }).then(user => {

            if (!user) {
                const message = `l'utilisateur demandé n'existe pas.`;
                res.status(404).json({ message })
            }

            bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
                if (!isPasswordValid) {
                    const message = `Le mot de passe de l'utilisateur n'est pas correct`;
                    return res.status(401).json({ message:message, data: user })
                }

                //jwt traitement
                const token = jwt.sign(
                    { userId: user.id },
                    private_key,
                    { expiresIn: '24h' }
                )

                const message = `L'utilisateur a été connecté avec succès`;
                return res.json({ message, data: user.username, token })
            })
        })
            .catch(error => {
                const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants`
                return res.status(500).json({ message, data: error })
            })
    })
}