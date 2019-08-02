import React from 'react'

const FormAlbumNameField = (props) => {
  return(
    <label> {props.label}
      <textarea
        onChange={props.handlerFunction}
        value={props.value}
      />
    </label>
  )

}

export default FormAlbumNameField
