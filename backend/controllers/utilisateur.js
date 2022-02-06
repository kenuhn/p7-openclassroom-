const bcrypt         = require('bcrypt');
const {PrismaClient} = require('@prisma/client');
const prisma         = new PrismaClient({});
const jwt            =  require('jsonwebtoken');
require('dotenv')

exports.inscription =  async (req, res, next ) => {
        
        try {
          const existingUser = await prisma.utilisateur.findUnique({ where: { email: req.body.email } });
          if (existingUser) throw { email: 'Email already exists' };
          
          req.body.mdp = await bcrypt.hash(req.body.mdp, 12);//  hash du req.body.mdp pour que le mot de pass soit  hasher dans la base de donné 
                const user = await prisma.utilisateur.create({
                    data: { 
                        pseudo: req.body.pseudo,
                        email: req.body.email,
                        mdp: req.body.mdp,
                    },
                  });
            res.status(201).json({message: 'utilisateur crée!'})
            
        
        } catch (err) {
        
          return res.status(400).json(err);
        }
      }


exports.login = async (req, res, next) => {

    try {
        const utilisateurLa = await prisma.utilisateur.findUnique({
            where: {
                email: req.body.email
            }
        })
         if (!utilisateurLa){
          throw 'utilisateur non présent dans la base de donné'  
         }
         bcrypt.compare(req.body.mdp, utilisateurLa.mdp)
         .then(valid => {
             if (!valid) {
                 return res.status(401).json({ error: 'Mot de passe incorrect !' })
             }
             res.status(200).json({
                 utilisateurId: utilisateurLa.id,
                 token: jwt.sign(
                     { utilisateurId: utilisateurLa.id },
                     process.env.SECRET_TOKEN,
                     { expiresIn: '24h' }
                 )
             })
         })
    }
    catch(err){
        return res.status(400).json(err)

    }
}

exports.getOneUser = async (req, res, next) => {

    try {
        const getUser = await prisma.utilisateur.findUnique({
            where: {
               id: parseInt(req.params.id)
            },
            include:{
                posts: true,
                Commentaire: true
            }
        })
        res.status(200).json({
            data: getUser
        })
    }
catch (err){
        res.status(400).json(err).send({message: 'utilisateur non trouvé'})
    }
}


exports.update = async (req, res, next ) => { // modifier le pseudo dans la base de donnné par le  req.body.pseudo
    try {   
       const updateUser = await prisma.utilisateur.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                pseudo: req.body.pseudo
            }
        })
        res.status(200).json(updateUser)
    }
    catch (err) {
        res.status(400).json({ message: 'erreur dans la requête '})
    }
}