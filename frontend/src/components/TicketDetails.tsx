import React from 'react';

interface Ticket {
  subject: string;
  requester: {
    name: string;
    email: string;
  };
  created_at: string;
  comment: {
    body: string;
  };
  comments: Array<{
    author: {
      role: string;
      name: string;
    };
    created_at: string;
    body: string;
  }>;
}

interface TicketDetailsProps {
  ticket: Ticket;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR');
  };

  return (
    <div className="ticket-details-container">
      <h2>{ticket.subject}</h2>
      <p>
        <strong>Solicitante:</strong> {ticket.requester.name} ({ticket.requester.email})
      </p>
      <p>
        <strong>Data de Envio:</strong> {formatDate(ticket.created_at)}
      </p>

      <hr />

      <h3>Comentários</h3>
      <div className="comments-list">
        {ticket.comments.map((comment, index) => (
          <div key={index} className="comment-item">
            <p>
              <strong>{comment.author.name} ({comment.author.role}):</strong>
              <small> em {formatDate(comment.created_at)}</small>
            </p>
            <p className="comment-body">{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketDetails;