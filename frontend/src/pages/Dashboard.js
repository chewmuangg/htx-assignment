import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket, faHome, faGear } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { Helmet } from 'react-helmet';
import AudioPlayer from "../components/AudioPlayer";

function Dashboard() {

  // variables 
  const [username, setUsername] = useState();
  const [audioFiles, setAudioFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleUpload = () => {
    // navigate to upload page
    navigate('/upload');
  };

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    // redirect back to landing page
    navigate('/');
  }

  useEffect(() => {
    // Check if user is logged in by checking for token
    /*const token = localStorage.getItem('token');
    if (!token) {
      // Redirect back to landing page (log in page)
      navigate('/');
    }*/

    setLoading(true);

    // Retrieve token from local storage
    const token = localStorage.getItem('token');

    // Retrieve username from local storage
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);

    // Retrieve audio files list uploaded by user from database
    const fetchAudioFiles = async () => {
      try {
        const res = await axios.get(`http://localhost:5555/api/audio/${username}`, {
          headers: {
            'Authorization': token,
          }
        });

        const fetchedAudioFiles = res.data.data;
        setAudioFiles(fetchedAudioFiles);
        setLoading(false);

      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchAudioFiles();

  }, [navigate, username]);

  // function to delete audio from db
  const handleDelete = async (id) => {
    // confirmation alert
    const confirmDelete = window.confirm("Are you sure you want to delete this audio file?");

    // check if user confirm 
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5555/api/audio/delete/${id}`);

        // update the UI by removing the deleted file from the state
        setAudioFiles(audioFiles.filter(file => file._id !== id));
        alert('Audio file successfully deleted!');

      } catch (error) {
        console.log(error);
        alert('Error deleting the audio file. Please try again.')
      }
    }
  };

  return (
    <div className="home-container">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <header className="header">
        <div className="header-container">
          <div>
            <img src='/images/audiox-logo-landscape.png' alt="audioX logo" width="100%" />
          </div>
          <button className="btn-pri btn-upload" onClick={handleUpload}><FontAwesomeIcon icon={faArrowUpFromBracket} className="icon-btn" /> Upload</button>
          <div className="nav">
            <Link className="nav-links-active" to="/home"><FontAwesomeIcon icon={faHome} className="icon-btn" /> Home</Link>
            <Link className="nav-links" to="/settings"><FontAwesomeIcon icon={faGear} className="icon-btn" /> Settings</Link>
          </div>
          <br />
          <br />
          <button className="btn-logout" onClick={handleLogout}>Log out</button>
        </div>
      </header>

      <div className="content">
        <h1>{username}'s Audio List</h1>
        <div>
          {audioFiles.map(audio => (
            <AudioPlayer
              key={audio._id}
              id={audio._id}
              filename={audio.filename}
              title={audio.title}
              author={audio.author}
              description={audio.description}
              tags={audio.tags}
              onDelete={handleDelete}
            />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Dashboard