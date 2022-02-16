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
    try {
        const postSupr = await prisma.commentaire.delete({
            where: {
                id: parseInt(req.params.commentID),
            }
        })
        res.status(200).json({ postSupr })
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