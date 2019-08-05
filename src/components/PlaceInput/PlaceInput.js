import React from "react";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";

const placeInput = props => {
  return (
    <DefaultInput
      placeholder="Place Name"
      value={props.placeName}
      onChangeText={props.onPlaceNameChanged}
    />
  );
}

export default placeInput;
