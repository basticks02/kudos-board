import { useState, useEffect } from 'react'
import './Dashboard.css'
import NewBoardModal from './NewBoardModal'
import Board from './Board'
import api from './api'

export default function Dashboard() {
    const [searchTerm, setSearchTerm] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [boards, setBoards] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('All')

    //Fetching boards from the backend
    useEffect(() => {
      const fetchBoards = async () => {
        try{
          const response = await api.get('/boards')
          const boardandimg = response.data.map(board => ({
            ...board,
            randomImg: `https://picsum.photos/200/300?random=${Math.floor(Math.random()*1000)}`
          }))
          setBoards(boardandimg)
        } catch (error){
          console.error("Error fetching boards:", error)
        }
      }
      fetchBoards()
    }, [])

    //Filtering boards based on search term and category
      const filteredBoards = boards.filter(board =>
        board.title.toLowerCase().includes(searchTerm.toLowerCase()) && (selectedCategory === 'All' || board.category === selectedCategory)
      );

      //Sorting recent boards based on recency
      const sortedBoards = selectedCategory === 'Recent'
      ? [...filteredBoards].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      : filteredBoards;

      const handleCloseModal = () => {
        setShowForm(false);
      }

      //Creating a new board
      const handleCreateBoard = async (data) => {
        try{
          const response = await api.post('/boards', data)
          const newBoard ={
            ...response.data,
            randomImg: `https://picsum.photos/200/300?random=${Math.floor(Math.random()*1000)}`
          }
          setBoards([...boards, newBoard])
        } catch (error){
          console.error("Error creating board:", error)
        }
      }

      //Deleting a board
      const handleDeleteBoard = async (id) => {
        try{
          await api.delete(`/boards/${id}`)
          setBoards(boards.filter((board) => board.id !== id))
        } catch (error){
          console.error("Error deleting board:", error)
        }
      }

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
            <button onClick={() => setSelectedCategory('All')}>All</button>
            <button onClick={() => setSelectedCategory('Recent')}>Recent</button>
            <button onClick={() => setSelectedCategory('Celebration')}>Celebration</button>
            <button onClick={() => setSelectedCategory('Thank You')}>Thank You</button>
            <button onClick={() => setSelectedCategory('Inspiration')}>Inspiration</button>
            <button onClick={() => setShowForm(!showForm)}>Create a New Board</button>
        </div>

        <NewBoardModal showForm={showForm} handleCloseModal={handleCloseModal} handleCreateBoard={handleCreateBoard}/>

        <div className='board-list'>
            {sortedBoards.length > 0 ? (sortedBoards.map(board => (
                <Board key={board.id} board={board} handleDeleteBoard={handleDeleteBoard}/>)
            )) : (<h2>No boards</h2>)}
        </div>

        <footer>
          @Basticks 2024
        </footer>
    </>
  )
}
