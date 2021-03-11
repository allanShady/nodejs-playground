import express, { json } from 'express'
import todoRoutes from '../src/routes/todos'

const app = express();

app.use(json());
app.use(todoRoutes)

const PORT = 3000;
app.listen(PORT)