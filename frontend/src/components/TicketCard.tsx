import React from 'react';
import type { Ticket } from '../pages/TicketsPage';

// interface Ticket {
//   subject: string;
//   requester: {
//     name: string;
//   };
//   created_at: string;
//   category: string;
//   priority: number;
//   comments: Array<{ created_at: string }>;
// }

interface TicketCardProps {
  ticket: Ticket;
  onTicketClick: (ticket: Ticket) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, onTicketClick }) => {
  const latestDate = ticket.comments.length > 0
    ? new Date(ticket.comments[ticket.comments.length - 1].created_at)
    : new Date(ticket.created_at);

  const formattedDate = latestDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className="ticket-card" onClick={() => onTicketClick(ticket)}>
      <div className="ticket-header">
        <h4>{ticket.subject}</h4>
        <span className={`priority-badge priority-${ticket.priority}`}>P{ticket.priority}</span>
      </div>
      <p>
        <strong>Solicitante:</strong> {ticket.requester.name}
      </p>
      <p>
        <strong>Última atualização:</strong> {formattedDate}
      </p>
    </div>
  );
};

export default TicketCard;