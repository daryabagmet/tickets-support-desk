import { useSelector, useDispatch } from 'react-redux';
import { closeTicket, getTicket } from '../features/tickets/ticketSlice';
import { getNotes, createNote } from '../features/notes/noteSlice';
import { useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/spinner';
import NoteItem from '../components/noteItem';
import BackButton from '../components/backButton';

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transfrom: 'translate(-50%, -50%)',
    position: 'relative',
  }
}
Modal.setAppElement('#root');

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNotetext] = useState('');
  const { ticket, isLoading, isError, message} = useSelector((state) => state.tickets);
  const { notes, isLoading: notesIsLoading} = useSelector((state) => state.notes);

  const dispatch = useDispatch();
  const params = useParams();
  const ticketId  = params.id;
  const navigate = useNavigate();

  useEffect(()=> {
    if(isError){
      toast.error(message)
    }

    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId))

  }, [isError, message, ticketId]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success('Ticket Closed');
    navigate('/tickets');
  } 

  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({noteText, ticketId}));
    closeModal();
  }

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  

  if(isLoading || notesIsLoading){
    return <Spinner />
  }

  if(isError){
    return <h3>Something Went Wrong</h3>
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
       <BackButton url='/tickets' />
       <h2>
        Ticket Id: {ticket._id}
        <span className={`status status-${ticket.status}`}>
          {ticket.status}
        </span>
       </h2>
       <h3>Date Submitted: { new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
       <h3>Product: {ticket.product}</h3>

       <div className='ticket-desc'>
        <h3>Description of Issue</h3>
        <p>{ticket.description}</p>
       </div>

       { notes && notes.length > 0 && <h2>Notes</h2> }
      </header>
      {
        ticket.status !== 'closed' && (
          <button onClick={openModal} className='btn'><FaPlus/> Add Note</button>
        )
      }

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Add Note'>
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>X</button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea name="noteText" id="noteText" placeholder='Note text' value={noteText} onChange={(e) => setNotetext(e.target.value)}></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>Submit</button>
          </div>

        </form>
      </Modal>

      {
        notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))
      }

      {
        ticket.status !== 'closed' && (
          <button onClick={onTicketClose} className='btn btn-block btn-danger'>
            Close Ticket
          </button>
        )
      }
    </div>
  )
}

export default Ticket
