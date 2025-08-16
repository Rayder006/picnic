// backend/src/index.ts

import express, { Request, Response } from 'express';
import ticketData from '../../data/zendesk_mock_tickets_llm_flavor.json';
import { categorizeTicket, CategorizedTicket } from './categorizer'; // Importar a nova interface

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/', (req: Request, res: Response<CategorizedTicket[]>) => {
    const tickets = ticketData.tickets;
    const categorizedTickets = tickets.map(ticket => categorizeTicket(ticket));

    res.json(categorizedTickets);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});