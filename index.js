const express = require("express");
const projectRouter = require('./routers/projectRouter')
const actionRouter = require('./routers/actionRouter')

const server = express();

server.use(express.json());
server.use('/api/project', projectRouter)
server.use('/api/action', actionRouter)

const port = 4500;

server.get('/', (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
  });

server.listen(port, () => console.log(`\n** Running on port ${port} **\n`))