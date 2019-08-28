import React from "react";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";

const placeInput = props => {
  return (
    <DefaultInput
      placeholder="Place Name"
      value={props.placeName}
      onChangeText={props.onPlaceNameChanged}
      valid={props.valid}
      touched={props.touched}
    />
  );
}

export default placeInput;
