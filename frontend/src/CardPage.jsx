import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from './api'
import './CardPage.css'
import Card from './Card'


export default function CardPage() {
    const {boardId} = useParams()
    const navigate = useNavigate()
    const [board, setBoard] = useState({})
    const [cards, setCards] = useState([])

    useEffect(() => {
        const getBoard = async () => {
            try{
                const boardResponse = await api.get(`/boards/${boardId}`);
                setBoard(boardResponse.data);
                const cardsResponse = await api.get(`/boards/${boardId}/cards`);
                setCards(cardsResponse.data);
            } catch (error) {
                console.error('Error: ', error);
            }
        }
        getBoard();
    }, [boardId])

    const handleReturntoDashboard = () => {
        navigate('/');
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

        <main className='cardlist'>
            <button>Create Card</button>
            <Card/>
        </main>

        <footer>
            Basticks © 2024
        </footer>
    </div>
  )
}
