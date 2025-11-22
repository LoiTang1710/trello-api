import express from 'express'

const app = express()

const hostname = "localhost"
const port = 8017

app.get("/", (req, res) => {
  res.send('<h1>Hello cot</h1>');
});

app.listen(port,hostname, () =>{console.log(`hello ni, i'm running at ${hostname}: ${port}/`)} );
