import './NewBoardModal.css'
import React, {useState} from 'react'

export default function NewBoardModal({showForm, handleCloseModal, handleCreateBoard}) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [category, setCategory] = useState('')

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      category,
      author
    };
    handleCreateBoard(data);
    handleCloseModal();
  };

  if (!showForm) {
    return null;
  }

  return (
    <div className='modal'>
        <div className='modal-content'>
        <span className='close-button' onClick={handleCloseModal}>&times;</span>
        <form className='newboard' onSubmit={handleFormSubmit}>
            <h2>Make a Board</h2>
            <input
            type='text'
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />


        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="" >Category</option>
          <option value="Recent">Recent</option>
          <option value="Celebration">Celebration</option>
          <option value="Inspiration">Inspiration</option>
          <option value="Thank You">Thank You</option>

        </select>

        <input
            type='text'
            placeholder="Author(optional)"
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />

        <button type='submit'>Create</button>
        </form>
        </div>
    </div>
  )
}
