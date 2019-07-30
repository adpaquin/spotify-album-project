import React from 'react'

const FormCoverArtField = (props) => {
  return(
    <label> {props.label}
      <textarea
        onChange={props.handlerFunction}
      />
    </label>
  )

}

export default FormCoverArtField
