// Path: Kandban Board/client/src/components/TicketCard.tsx

import { Link } from 'react-router-dom';

import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import { MouseEventHandler } from 'react';

interface TicketCardProps {
  ticket: TicketData;
  deleteTicket: (ticketId: number) => Promise<ApiMessage>
}

const TicketCard = ({ ticket, deleteTicket }: TicketCardProps) => {

  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    const ticketId = Number(event.currentTarget.value);
    if (!isNaN(ticketId)) {
      try {
        await deleteTicket(ticketId);
        console.log('Ticket deleted successfully');
      } catch (error) {
        console.error('Failed to delete ticket:', error);
      }
    }
  };

  return (
    <div className='ticket-card'>
      <h3>{ticket.name}</h3>
      <p>{ticket.description}</p>
      <p>{ticket.assignedUser?.username}</p>
      <div className="ticket-actions">
        <Link to='/edit' state={{id: ticket.id}} className='editBtn'>Edit</Link>
        <button 
          type='button' 
          value={String(ticket.id)} 
          onClick={handleDelete} 
          className='deleteBtn'
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TicketCard;