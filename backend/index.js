const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors');

const express = require('express');
const app = express()
app.use(cors());
const port = 3000;

app.use(express.json())


//to get all the data from database
app.get('/boards', async (req, res) => {
    try{
        const boards = await prisma.board.findMany();
        res.json(boards)
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

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})
