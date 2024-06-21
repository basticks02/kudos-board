import React, {useState} from 'react'
import './NewCardModal.css'

export default function NewCardModal({showModal, handleClose, handleCreateCard}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [gifSearch, setGifSearch] = useState('');
    const [selectedGif, setSelectedGif] = useState('');
    const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCard ={
        title,
        description,
        image: selectedGif,
        author
    }
    handleCreateCard(newCard);
    setTitle('');
    setDescription('');
    setGifSearch('');
    setSelectedGif('');
    setAuthor('');
    handleClose();
  };

  if (!showModal) return null;

  return (
    <div className={`cardmodal ${showModal ? 'showModal' : ''}`} onClick={handleClose}>
        <div className='cardmodal-content' onClick={(e) => e.stopPropagation()}>
            <span className='cardclose' onClick={handleClose}>&times;</span>
            <h3>Create New Card</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter card title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Enter card description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Search GIFs..."
                    value={gifSearch}
                    onChange={(e) => setGifSearch(e.target.value)}
                />
                <button type="button" onClick={() => console.log('Search GIFs')}>Search</button>
                <div className='gif-container'>
                    <img src="https://media.giphy.com/media/l0HlNQ03J5JxX6lva/giphy.gif" alt="gif" onClick={() => setSelectedGif('https://media.giphy.com/media/l0HlNQ03J5JxX6lva/giphy.gif')} />

                    //TODOs : Add GIFs here
                </div>

                <input
                    type="text"
                    placeholder="Enter author (optional)"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />

                <button type="submit">Create Card</button>
            </form>
        </div>
    </div>
  )
}
