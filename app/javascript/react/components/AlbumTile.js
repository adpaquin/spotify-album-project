import React from "react"
import { Link } from "react-router-dom"

const AlbumTile = props => {
  return(
    <div>
    <a href={`/albums/${props.id}`}><img src={props.cover_image}/></a>
    </div>
  )
}

export default AlbumTile


// <a href='/albums'><img src={props.cover_image}/></a>
