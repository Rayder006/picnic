import React from 'react';
import TicketCard from './TicketCard';
import type { Ticket } from '../pages/TicketsPage';

interface CategoryColumnProps {
  title: string;
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
}

const CategoryColumn: React.FC<CategoryColumnProps> = ({ title, tickets, onTicketClick }) => {
  return (
    <div className="category-column">
      <h2>{title} ({tickets.length})</h2>
      <div className="tickets-container">
        {tickets.map((ticket, index) => (
          <TicketCard
            key={index}
            ticket={ticket}
            onTicketClick={onTicketClick}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryColumn;