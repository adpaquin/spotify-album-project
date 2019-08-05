import React from "react"

const AlbumTile = props => {
  return(
    <div>
      {props.counter}. {props.songName}
    </div>
  )
}

export default AlbumTile
