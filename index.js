const express = require('express')
const server = express()
//import prisma
const prisma = require('./prisma/prismaClient')

server.use(express.json()); // Middleware to parse JSON bodies

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

// Create a new Quote
server.post('/qoutes', async (req, res) => {
    try {
        const { text, authorId } = req.body; // Extract data from the request body
        const newQuote = await prisma.quote.create({
            data: {
                text,
                authorId,
            },
        });
        res.status(201).send(newQuote); // Send the created quote as the response
    } catch (error) {
        console.error("Error creating quote:", error.message);
        res.status(500).send({ error: "Failed to create quote" });
    }
});

// Update a Quote
server.put('/qoutes/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract the quote ID from the URL
        const { text, authorId } = req.body; // Extract data from the request body
        const updatedQuote = await prisma.quote.update({
            where: { id: parseInt(id) }, 
            data: {
                text,
                authorId,
            },
        });
        res.send(updatedQuote); // Send the updated quote as the response
    } catch (error) {
        console.error("Error updating quote:", error.message);
        res.status(500).send({ error: "Failed to update quote" });
    }
});

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