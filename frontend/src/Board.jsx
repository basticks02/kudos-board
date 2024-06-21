import { Link } from 'react-router-dom'
import './Board.css'

export default function Board({board, handleDeleteBoard}) {

  return (
    <div className='board-card'>
        <img src={board.randomImg} alt={board.title} />
        <h3>{board.title}</h3>
        <p>{board.category}</p>
        <button className='viewboard'>
          <Link to={`/boards/${board.id}/cards`}>View Board</Link>
        </button>
        <button className='deleteit' onClick={() => handleDeleteBoard(board.id)}>Delete Board</button>
    </div>
  )
}
