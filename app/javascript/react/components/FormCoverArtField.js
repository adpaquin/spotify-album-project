import React from 'react'

const FormCoverArtField = (props) => {
  return(
    <label> {props.label}
      <textarea
        onChange={props.handlerFunction}
        value={props.value}
      />
    </label>
  )

}

export default FormCoverArtField
