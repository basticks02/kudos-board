import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from './api'
import './CardPage.css'
import Card from './Card'
import NewCardModal from './NewCardModal'

export default function CardPage() {
    const {boardId} = useParams()
    const navigate = useNavigate()
    const [board, setBoard] = useState({})
    const [cards, setCards] = useState([])
    const [showModal, setShowModal] = useState(false)


    //fetch cards
    useEffect(() => {
        const getBoard = async () => {
            try {
                const boardResponse = await api.get(`/boards/${boardId}`);
                setBoard(boardResponse.data);

                api.get(`/boards/${boardId}/cards`)
                    .then((data) => {
                         setCards(data.data.cards);
                    })
            } catch (error) {
                console.error('Error: ', error);
            }
        }
        getBoard();
    }, [boardId])

    const handleReturntoDashboard = () => {
        navigate('/');
    }

    const handleCreateCard = async (newCard) => {
        try{
            const response = await api.post(`/boards/${boardId}/cards`, newCard);
            setCards((prevcards) => [...prevcards, response.data]);
        } catch (error) {
            console.error('Error creating Card: ', error);
        }
    }

    //delete card
    const handleDeleteCard = async (cardId) => {
        try{
          await api.delete(`/boards/${boardId}/cards/${cardId}`);
          setCards((cards) => cards.filter((card) => card.id !== cardId))
        } catch (error){
          console.error("Error deleting board:", error)
        }
      }

    //to increase Upvote
    const handleUpvote = async (cardId) => {
        try {
            const card = cards.find((card) => card.id === cardId);
            const updatedCard = { ...card, upvote: card.upvote + 1 };
            await api.patch(`/boards/${boardId}/cards/${cardId}`, { upvote: updatedCard.upvote });
            setCards((cards) =>
                cards.map((card) =>
                    card.id === cardId ? updatedCard : card
                )
            );
        } catch (error) {
            console.error('Error upvoting card: ', error);
        }
    }


  return (
    <div>
        <header>
            <span className='close-button' onClick={handleReturntoDashboard}>&times;</span>
            <div>
                <h1>KudoBoard</h1>
                <p>{board.title}</p>
            </div>
        </header>

            <div className='CreateCard'>
                <button onClick={() => setShowModal(true)} >Create Card</button>
            </div>

        <main className='cardlist'>

                    {
                        cards.map((card) => (
                            <Card key={card.id} card={card} handleDeleteCard={handleDeleteCard} handleUpvote={handleUpvote}/>
                        ))
                    }
        </main>

        <NewCardModal showModal={showModal} handleClose={() => setShowModal(false)} handleCreateCard={handleCreateCard}/>

        <footer>
            Basticks © 2024
        </footer>
    </div>
  )
}
