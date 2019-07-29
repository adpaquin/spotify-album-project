import React from 'react'

const FormAlbumNameField = (props) => {
  return(
    <label> {props.label}
      <textarea
        onChange={props.handlerFunction}
      />
    </label>
  )

}

export default FormAlbumNameField
