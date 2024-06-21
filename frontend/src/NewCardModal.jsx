import React, {useState} from 'react'
import './NewCardModal.css'

export default function NewCardModal({showModal, handleClose, handleCreateCard}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [gifSearch, setGifSearch] = useState('');
    const [selectedGif, setSelectedGif] = useState('');
    const [author, setAuthor] = useState('');
    const [gifs,setGifs] = useState([]);

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
    setGifs([]);
    handleClose();
  };

  const fetchGifs = async () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${gifSearch}&limit=8`);
    const data = await response.json();
    setGifs(data.data);
  }

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
                    maxLength={15}
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
                <button type="button" onClick={fetchGifs}>Search</button>

                <div className='gif-container'>
                {gifs.map((gif) => (
                    <img
                        key={gif.id}
                        src={gif.images.fixed_height.url}
                        alt={gif.title}
                        onClick={() => setSelectedGif(gif.images.fixed_height.url)}
                    />
                ))}
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
