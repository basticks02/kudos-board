import React from 'react'
import './Card.css'
import image from '../images/Unknown.jpeg'

export default function Card({card, handleDeleteCard, handleUpvote}) {

  return (
    <div className='card'>
        <h3>{card.title}</h3>
        <img src={image} alt={card.title} />
        <div className='cardbuttons'>
            <button onClick={() => handleUpvote(card.id)}><i class="fa-solid fa-angle-up"></i> {card.upvote}</button>
            <button onClick={() => handleDeleteCard(card.id)}>Delete Board</button>
        </div>
    </div>
  )
}
