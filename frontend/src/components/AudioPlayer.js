import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAudio, faTrashCan, faCircleChevronUp, faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';

function AudioPlayer({ id, filename, title, author, description, tags, onDelete }) {
    // src url for audio tag
    const audioFileUrl = `http://localhost:5555/public/Audio/${filename}`;

    // initialise state to manage the visibility of th description
    const [isVisible, setIsVisible] = useState(false);

    // function to toggle the visibility state
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    // handle delete click
    const handleDeleteClick = () => {
        onDelete(id);
    };

    return (
        <div className='audio-card'>
            <div className='audio-icon'>
                <FontAwesomeIcon icon={faFileAudio} />
            </div>
            <div className='audio-card-content'>
                <button onClick={toggleVisibility} className='btn-toggle'>
                    {isVisible ? <FontAwesomeIcon icon={faCircleChevronUp} /> : <FontAwesomeIcon icon={faCircleChevronDown} />}
                </button>

                <p className='audio-card-title'>{title}</p>
                <p className='audio-card-author'>{author}</p>
                <audio controls>
                    <source src={audioFileUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
                <div className='audio-card-tags'>
                    {tags.map((tag, index) => (
                        <p key={index} className='tag-text'>{tag}</p>
                    ))}
                </div>

                {/* toggle show/hide */}
                {isVisible && (
                    <div>
                        <p>{description}</p>
                        <button onClick={handleDeleteClick} className='audio-card-delete' >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                        
                    </div>
                )}

            </div>
        </div>
    )
}

export default AudioPlayer