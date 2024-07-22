import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Helmet } from 'react-helmet';

function Upload() {

    // variables
    const [audioFile, setAudioFile] = useState(null);
    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [description, setDescription] = useState();
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState({});
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch available tags from the backend
        const fetchTags = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5555/api/tags', {
                    headers: {
                        'Authorization': token,
                    }
                });
                const fetchedTags = res.data;
                setTags(fetchedTags);

                // Initialize selectedTags state
                const initialSelectedTags = {};
                fetchedTags.forEach(tag => {
                    initialSelectedTags[tag.name] = false;
                });
                setSelectedTags(initialSelectedTags);

            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        fetchTags();
    }, [navigate]);

    const handleFileChange = (e) => {
        setAudioFile(e.target.files[0]);
    };

    const handleTagChange = (e) => {
        setSelectedTags({
            ...selectedTags,
            [e.target.name]: e.target.checked,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if at least one checkbox is checked
        if (!Object.values(selectedTags).includes(true)) {
            alert('Please select at least one tag.');
            return;
        }

        // Check if all the fields are filled
        if (!audioFile || !title || !author || !description) {
            alert('Please fill in all fields and select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('audioFile', audioFile);
        formData.append('title', title);
        formData.append('author', author);
        formData.append('description', description);
        formData.append('tags', Object.keys(selectedTags).filter(tag => selectedTags[tag]).join(','));
        formData.append('uploadedBy', username);

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:5555/api/audio', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token,
                },
            });
            alert('Upload successful!');

            // navigate to home
            navigate('/home');
        } catch (error) {
            console.log(error);
            alert('Error uploading the file. Please try again.')
        }
    };

    const handleCancel = () => {  
        // redirect back to home page
        navigate('/home');
      }

    return (
        <div className="upload-bg">
            <Helmet>
                <title>Upload Audio File</title>
            </Helmet>
            <div className="upload-container">
                <h1>Upload Audio File</h1>
                <p>*All fields are required.</p>
                <form onSubmit={handleSubmit} className="form-upload">
                    <input
                        type="file"
                        accept="audio/*"
                        name="audioFile"
                        className="form-control"
                        required
                        onChange={handleFileChange}
                    />

                    <div className="upload-input">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter title"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="upload-input">
                        <label>Author</label>
                        <input 
                            type="text" 
                            name="author" 
                            placeholder="Enter author" 
                            required 
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>

                    <div className="upload-input-container">
                        <label>Description</label>
                        <textarea 
                            name="description" 
                            className="upload-desc" 
                            rows="4" 
                            required 
                            placeholder="Give a description for the audio ..." 
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="upload-input-container">
                        <label>Tags</label>
                        <div className="audio-card-tags">
                            {tags.map(tag => (
                                <div key={tag._id}>
                                    <label className="tags-label">
                                        <input
                                            type="checkbox"
                                            name={tag.name}
                                            checked={selectedTags[tag.name] || false}
                                            onChange={handleTagChange}
                                        />
                                        <span>{tag.name}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-upload-btns">
                        <button className="btn-pri btn-cancel" onClick={handleCancel}>Cancel</button>
                        <input type="submit" className="btn-pri btn-submit" />
                    </div>
                    
                </form>
            </div>

        </div>
    )
}

export default Upload