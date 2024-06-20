import './Board.css'
import api from './api'

export default function Board({board, handleDeleteBoard}) {

  return (
    <div className='board-card'>
        <img src={board.randomImg} alt={board.title} />
        <h3>{board.title}</h3>
        <p>{board.category}</p>
        <button>View Board</button>
        <button onClick={() => handleDeleteBoard(board.id)}>Delete Board</button>

    </div>
  )
}
