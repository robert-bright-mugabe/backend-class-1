const express = require('express')
const server = express()
//import prisma
const prisma = require('./prisma/prismaClient')

server.get('/', (req,res)=>(
    res.send("Server is live and ready to give you the data.")
))

// Get all Quotes
server.get('/qoutes', async (req,res)=>{
    try{
        let quotes = await prisma.quote.findMany()
        res.send(quotes)
    }
    catch(error){
        res.send(error)
    }
})

// Get all Authors
server.get('/authors', async (req, res) => {
    try {
        let authors = await prisma.author.findMany();
    } catch (error) {
        console.error("Error fetching authors:", error.message);
        res.status(500).send({ error: "Failed to fetch authors" });
    }
});

const PORT = 4001;

server.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})