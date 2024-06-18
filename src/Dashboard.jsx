import { useState } from 'react'
import './Dashboard.css'
import NewBoardForm from './NewBoardForm'
import BoardCard from './BoardCard'

export default function Dashboard() {
    const [searchTerm, setSearchTerm] = useState('')
    const [showForm, setShowForm] = useState(false)

    const boards = [
        {
          id: 1,
          title: 'Happy Birthday Trenisha!',
          category: 'Celebration',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 2,
          title: 'You Deserve The Best!',
          category: 'Inspiration',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 3,
          title: 'Thanks a Bunch!',
          category: 'Thank You',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 4,
          title: 'Happy Birthday!',
          category: 'Celebration',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 5,
          title: 'Nice work!',
          category: 'Celebration',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 6,
          title: 'You\'re the best!',
          category: 'Celebration',
          image: 'https://via.placeholder.com/150',
        },
      ];

      const filteredBoards = boards.filter(board =>
        board.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <>
        <header>
            <h1>KUDOBOARD</h1>
            <input
                type="text"
                placeholder='Search boards...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </header>

        <div className='filter-buttons'>
            <button>All</button>
            <button>Recent</button>
            <button>Celebration</button>
            <button>Thank You</button>
            <button>Inspiration</button>
            <button onClick={() => setShowForm(!showForm)}>Create a New Board</button>
        </div>
        {showForm && <NewBoardForm/>}
        <div className='board-list'>
            {filteredBoards.map(board => (
                <BoardCard key={board.id} board={board}/>
            ))}
        </div>

        <footer>
          @Basticks 2024
        </footer>
    </>
  )
}
