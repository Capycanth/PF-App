import cors from 'cors';
import express, { Express } from 'express';
import { initializeDatabase } from './database';
import accountRouter from './routers/account.router';
import budgetRouter from './routers/budget.router';
import categoryRouter from './routers/category.router';
import prepaidRouter from './routers/prepaid.router';

const app: Express = express();
const PORT: number = 27017;

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());
app.use(express.static('../public'));

initializeDatabase(PORT);

app.use('/api/category', categoryRouter);
app.use('/api/account', accountRouter);
app.use('/api/prepaid', prepaidRouter);
app.use('/api/budget', budgetRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
