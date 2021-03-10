import React, { useState } from 'react';

const SongList = () => {
    const [songs, setSongs] = useState([
        { title: 'abc', id:1 },
        { title: 'xyz', id:2 },
        { title: 'hiii', id:3 }
    ]);
    const addSong = () => {
        setSongs([...songs, { title: 'new song', id:4 }])
    }
    return ( 
        <div className="song-list">
            <ul>
                {songs.map( song => {
                    return ( <li key={song.id}>{song.title}</li>)
                })}
            </ul>
            <button onClick={addSong}>Add a song</button>
        </div>
     );
}
 
export default SongList;