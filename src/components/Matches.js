import React from 'react';

const Matches = props => {
  console.log(props)
  return (
    <div>
      <p>{props.first_name} {props.last_name}</p>
    </div>
  )
}

export default Matches;
