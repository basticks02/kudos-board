import './BoardCard.css'

export default function BoardCard({board}) {
  return (
    <div className='board-card'>
        <img src={board.image} alt={board.title} />
        <h3>{board.title}</h3>
        <p>{board.category}</p>
        <button>View Board</button>
        <button>Delete Board</button>

    </div>
  )
}
