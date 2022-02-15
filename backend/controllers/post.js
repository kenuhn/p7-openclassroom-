const {PrismaClient, Prisma} = require('@prisma/client');
const prisma = new PrismaClient
const jwt = require('jsonwebtoken')
require('dotenv')


exports.getAllPost = async (req, res, next) => {
   
    const posts = await prisma.post.findMany({
        include: {
            like: true,
            commentaires: true,
            dislike: true,
                _count: {
                    select:{
                        like: true,
                        commentaires: true,
                        dislike: true,
                    }
                }
        }
    })
    try{
        if(posts){
            res.status(200).json(posts)
        }
    }
    catch(err){
        res.status(400).json(err)
    }
}

exports.deleteOnePost = async (req, res , next) => {
  
    try {   
    const postSupr = await prisma.post.delete({
        where: {
            id: parseInt(req.params.id),
        }
    })

        res.status(200).json(postSupr).json({message: 'post supprimé'})
    }
    catch (err){
        res.status(400).json(err)
    }
}

exports.createpost = async (req, res, next) => {

    try {
            const posts = await prisma.post.create({
                data:{
                    nom: req.body.nom,
                    description: req.body.description,
                    auteurID: parseInt(req.params.id),
                    imagesUrl: `${req.protocol}://${req.get('host')}/images_post/${req.file.filename}`
                },
            })
            res.status(201).json(posts)
    }   
    catch (err){
        res.status(400).json(err)
       throw err
    }
}

exports.likeOnePost = async (req, res, next) => {

    let like = parseInt(req.body.like);
    console.log(req.params.postId)
    try{
        const token = req.cookies.jwt; // récupère le token dans le headers
        if (!token){
            res.status(400).json({message: "erreur de token"})
        }
        else {
            const decodedToken=  jwt.verify(token, `${process.env.SECRET_TOKEN}`) // verifie le token dans le headers et celui dans 
            var userConnected = decodedToken.utilisateurId
            console.log(decodedToken)
            console.log(userConnected)
        }
        console.log(like)
        console.log( prisma.dislikes)

        switch (like){
               
            case 1 : 
                const newLike = await prisma.likes.create({ 
                   data:{
                    postID: parseInt(req.params.postId),
                    userlikedID: parseInt(userConnected)
                   },
                })
                res.status(201).json(newLike)  
            break;

            case 0 :
                var findlike = await prisma.likes.findFirst({ 
                    where: {
                    postID: parseInt(req.params.postId),
                    userlikedID: parseInt(userConnected) 
                    }
                })
                if(findlike){
                    var deleteLike = await prisma.likes.delete({
                        where: {
                            id: findlike.id
                        }
                    })
                }
                res.status(200).json(deleteLike)
              break;
        
            case -1 :
                var findlike = await prisma.likes.findFirst({ 
                    where: {
                    postID: parseInt(req.params.postId),
                    userlikedID: parseInt(userConnected) 
                    }
                })
                if(!findlike){
                const dislike = await prisma.dislikes.create({ 
                    data: {
                    postID: parseInt(req.params.postId),
                    userdislikedID: parseInt(userConnected)
                    } 
                })
                res.status(201).json( dislike )
            }
            else {
                res.status(400).json({message: 'vous avez likez veuillez enlever votre like'})
            }
              break;

              case -2 :
                var finddislikes = await prisma.dislikes.findFirst({ 
                    where: {
                    postID: parseInt(req.params.postId),
                    userdislikedID: parseInt(userConnected) 
                    }
                })
                if(finddislikes){
                const deletedislike = await prisma.dislikes.delete({ 
                    where: {
                       id: finddislikes.id
                    } })
                   res.status(200).json({ deletedislike })
                }
                else { 
                    res.status(400).json({ message: "vous n'avez pas disliké" })
                }
              break;
        }
        
    }
    catch (e){
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            res.status(400).json( Prisma.PrismaClientKnownRequestError)
        }
        else{
            res.status(400).json(e)
        }
        throw e
    }
}

exports.getAllLike = async (req, res, next) => {
   
    const like = await prisma.likes.findMany({
    })
    try{
        if(like){
            res.status(200).json(like)
        }
    }
    catch(err){
        res.status(400).json(err)
    }
}
