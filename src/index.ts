import express from 'express';
const app = express();

app.get('/', (req, res)=> {
    return res.json({message : "res from server"})
})






app.listen(3000, ()=> {
    console.log('server is on');
})