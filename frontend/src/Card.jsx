import React from 'react'
import './Card.css'

export default function Card({card, handleDeleteCard, handleUpvote}) {

  return (
    <div className='card'>
        <h3>{card.title}</h3>
        <img src={card.image} alt={card.title} />
        <div className='cardbuttons'>
            <button className='upvotebutton' onClick={() => handleUpvote(card.id)}><i class="fa-solid fa-angle-up"></i> {card.upvote}</button>
            <button className='deletecard' onClick={() => handleDeleteCard(card.id)}>Delete Board</button>
        </div>
    </div>
  )
}
