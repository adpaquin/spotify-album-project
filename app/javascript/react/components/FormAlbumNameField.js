import React from 'react'

const FormAlbumNameField = (props) => {
  return(
    <label> <div className="album-name-header">{props.label}</div>
      <textarea
        onChange={props.handlerFunction}
        value={props.value}
      />
    </label>
  )

}

export default FormAlbumNameField
