import React from "react"
import { Link } from "react-router-dom"

const AlbumTile = props => {
  return(
    <div>
      <Link to={`/albums/${props.id}`}>
        <img src={props.cover_image} height="800" width="800" />
      </Link>
    </div>
  )
}

export default AlbumTile
