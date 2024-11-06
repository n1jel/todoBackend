import express, { Express, Request, Response } from 'express'
import connectToDb from './db.config';

const app: Express = express();
const port = process.env.PORT || 3000;

connectToDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send("MyTodo");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app