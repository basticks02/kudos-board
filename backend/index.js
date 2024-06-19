const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors');

const express = require('express');
const app = express()
app.use(cors());
const port = 3000;

app.use(express.json())

//CRUD for Boards

//to get all the data from database
app.get('/boards', async (req, res) => {
    try{
        const boards = await prisma.board.findMany();
        res.status(200).json(boards)
    } catch (error){
        res.status(500).json({error: 'Something went wrong'})
    }
})

//to Post data to the database
app.post('/boards', async (req, res) => {
    const {title, category, author, image} = req.body;
    try{
        const newBoard = await prisma.board.create({
            data:{
                title,
                category,
                author,
                image
            }
        });
        res.status(201).json(newBoard)
    } catch (error){
        res.status(500).json({error: 'Something went wrong'})
    }
})

//to Delete data from the database
app.delete('/boards/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const deletedBoard = await prisma.board.delete({
            where:{id: parseInt(id)}
        });
        res.status(200).json(deletedBoard)
    } catch (error){
        res.status(500).json({error: 'Something went wrong'})
    }
})

//to Get an individual data set from the database
app.get('/boards/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const board = await prisma.board.findUnique({
            where:{id: parseInt(id)}
        });

        if (board){
            res.status(200).json(board)
        }else{
            res.status(404).json({error: 'Board not found'})
        }
    } catch (error){
        res.status(500).json({error: 'Something went wrong'})
    }
})

//CRUD for Cards

//to get all cards
app.get('/boards/:boardId/cards', async (req, res) => {
    const {boardId} = req.params;
    try{
        const cards = await prisma.card.findMany({
            where: {boardId: parseInt(boardId)}
        })
        res.status(200).json({cards})
    } catch (error){
        res.status(500).json({error: 'Something went wrong'})
    }
})

//TODO to get a single card

//to post a card
app.post('/boards/:boardId/cards', async (req, res) => {
    const {boardId} = req.params;
    const {title, description, upvote, image} = req.body;
    try{
        const newCard = await prisma.card.create({
            data:{
                title,
                description,
                upvote,
                image,
                boardId: parseInt(boardId),
            }
        });
        res.status(201).json(newCard)
    } catch (error){
        res.status(500).json({error: 'Something went wrong'})
    }
})

//to delete a card
app.delete('/boards/:boardId/cards/:cardId', async (req, res) => {
    const {boardId, cardId} = req.params;
    try{
        const deletedCard = await prisma.card.delete({
            where:{id: parseInt(cardId),
        }
        });
        res.status(200).json(deletedCard)
    } catch (error){
        res.status(500).json({error: 'Something went wrong'})
    }
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})
