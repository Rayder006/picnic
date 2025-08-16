import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryColumn from '../components/CategoryColumn';
import Modal from '../components/Modal';
import TicketDetails from '../components/TicketDetails';

export interface Ticket {
  subject: string;
  requester: {
    name: string;
    email: string;
  };
  created_at: string;
  category: string;
  priority: number;
  comment: { body: string };
  comments: Array<{
    author: {
      role: string;
      name: string;
    };
    created_at: string;
    body: string;
  }>;
}

const TicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get<Ticket[]>('http://localhost:3000/');
        
        const sortedTickets = response.data.sort((a, b) => {
            const lastCommentDateA = a.comments.length > 0 ? a.comments[a.comments.length - 1].created_at : a.created_at;
            const lastCommentDateB = b.comments.length > 0 ? b.comments[b.comments.length - 1].created_at : b.created_at;
            
            return new Date(lastCommentDateB).getTime() - new Date(lastCommentDateA).getTime();
        });

        setTickets(sortedTickets);
      } catch (err) {
        setError('Não foi possível carregar os tickets. Verifique se o servidor do backend está rodando.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  if (loading) {
    return <div>Carregando tickets...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }
  
  const categorias = {
    'Autenticação/Financeiro': tickets.filter(t => t.category === 'Autenticação/Financeiro'),
    'Logística/Produto': tickets.filter(t => t.category === 'Logística/Produto'),
    'Preferência/Comercial': tickets.filter(t => t.category === 'Preferência/Comercial'),
    'Outros': tickets.filter(t => t.category === 'Outros'),
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard de Tickets de Suporte</h1>
      <div className="kanban-container">
        <CategoryColumn title="Prioridade 1 - Autenticação/Financeiro" tickets={categorias['Autenticação/Financeiro']} onTicketClick={handleTicketClick} />
        <CategoryColumn title="Prioridade 2 - Logística/Produto" tickets={categorias['Logística/Produto']} onTicketClick={handleTicketClick} />
        <CategoryColumn title="Prioridade 3 - Preferência/Comercial" tickets={categorias['Preferência/Comercial']} onTicketClick={handleTicketClick} />
        <CategoryColumn title="Outros" tickets={categorias['Outros']} onTicketClick={handleTicketClick} />
      </div>

      {selectedTicket && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <TicketDetails ticket={selectedTicket} />
        </Modal>
      )}
    </div>
  );
};

export default TicketsPage;