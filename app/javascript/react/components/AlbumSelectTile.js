import React from 'react'

const AlbumSelectTile = (props) => {
  // debugger

  let songs = props.songs.map(song => {
    return(
      <option key={song.id} onChange={props.handlerFunction}>
        {song.name}
      </option>
    )
  })

  return(
    <div>
    {props.albumName}
      <select>
        {songs}
      </select>
    </div>
  )


}

export default AlbumSelectTile
