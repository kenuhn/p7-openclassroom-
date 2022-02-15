const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient
const jwt = require('jsonwebtoken')


exports.getAllComment = async (req, res, next) => {
    try {
        const findByPostId = await prisma.commentaire.findMany({
            where: {
                postID: parseInt(req.params.postId)
            }
        })
        res.status(200).json({ findByPostId })
    }
    catch (err) {
        res.status(400).json({ err })
        throw err
    }
}

exports.deleteOneComment = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]; // récupère le token dans le headers
    if (!token) {
        res.status(400).json({ message: "erreur de token" })
    }
    else {
        const decodedToken = jwt.verify(token, `${process.env.SECRET_TOKEN}`) // verifie le token dans le headers et celui dans 
        var userConnected = decodedToken.utilisateurId
        console.log(decodedToken)
        console.log(userConnected)
    }
    try {
        const postSupr = await prisma.commentaire.delete({
            where: {
                id: req.body.id,
            }
        })
        res.status(400).json({ postSupr })
    }
    catch (err) {
        res.status(400).json(err)
        throw err
    }
}

exports.postcomment = async (req, res, next) => {
    try {
            const commentaires = await prisma.commentaire.create({
                data: {
                    postID: parseInt(req.params.postId),
                    pseudoComm: req.body.pseudoComm,
                    texte: req.body.texte
                },
            })
          return  res.status(201).json(commentaires)
    }
    catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            res.status(400).json(Prisma.PrismaClientKnownRequestError)
        }
        else {
            res.status(400).json(e)
        }
        throw e
    }
}