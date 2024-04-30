import express from 'express';
const app = express();
import createUser from './routes/createUser';
import deleteUser from './routes/deleteUser';
import getUser from './routes/getUser';

// middleware for converting raw text into Json
app.use(express.json());
const PORT = process.env.PORT || 3000;

// this route for testing server is working or not
app.get('/', (req, res)=> {
    return res.json({message : "Hello from server"})
})

// routes for creating, updating, deleting and getUser data
app.use('/getUser', getUser);
app.use('/deleteUser', deleteUser);
app.use('/createUser', createUser);

// starting server on port 3000
app.listen(PORT, ()=> {
    console.log(`server is running on ${PORT}`);
})